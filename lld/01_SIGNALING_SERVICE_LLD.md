# Signaling Service LLD (Low Level Design)

## 1. Responsibility & Non-Responsibility

### Responsibilities
*   **WebSocket Management:** Handling WebSocket upgrades, connections, and disconnections.
*   **Signaling Relay:** Forwarding SDP (Offer/Answer) and ICE candidates between peers.
*   **Room Presence:** Managing the list of active participants in a room using Redis.
*   **Multi-Node Scaling:** Using Redis Pub/Sub to sync events across multiple signaling instances.
*   **State Recovery:** Handling reconnections and enforcing presence TTL.

### Explicit Non-Responsibilities
*   **Media Processing:** NO audio/video parsing, transcoding, or mixing.
*   **Recording:** NO storage of media streams.
*   **Auth Issuance:** Does NOT issue JWTs (only verifies them).
*   **Business Logic:** Does NOT validate room creation/ownership (delegates to Room Service implicitly via validation).

---

## 2. WebSocket Connection Lifecycle

1.  **Handshake Request:**
    *   Client connects to `wss://api.qualmeet.com/socket.io/?token=JWT_TOKEN`.
    *   Query parameter `token` is mandatory.
2.  **JWT Verification:**
    *   Server extracts `token`.
    *   Verifies signature using shared secret/public key.
    *   Checks `exp` (expiration).
    *   **Failure:** If invalid/expired, immediately close connection with code `4001` (Unauthorized).
3.  **Connection Established:**
    *   On success, decode JWT to get `userId`.
    *   Map `socket.id` to `userId`.
    *   Send `connected` acknowledgment to client.

---

## 3. Internal In-Memory State

The service maintains local mappings for quick lookups. Note: "Truth" is in Redis, but local state tracks socket associations.

```typescript
// Map socket ID to User ID (for disconnect cleanup)
const socketToUser = new Map<string, string>();

// Map User ID to Socket ID (for direct messaging)
const userToSocket = new Map<string, string>();

// Map Socket ID to Room ID (to know which room a socket is in)
const socketToRoom = new Map<string, string>();

// Buffer for ICE candidates arriving before Remote Description
// Key: targetUserId, Value: Queue of candidates
const iceCandidateBuffer = new Map<string, RTCIceCandidate[]>();
```

---

## 4. Redis Design (Presence + Pub/Sub)

### Keys & Data Structures

1.  **Room Presence (Set):**
    *   **Key:** `room:{roomId}:users`
    *   **Type:** `Set` (Stores `userId`s)
    *   **Usage:** Quick lookup of who is in the room.

2.  **User Presence (String/Key with TTL):**
    *   **Key:** `presence:{roomId}:{userId}`
    *   **Type:** `String` (Value: `timestamp`)
    *   **TTL:** 30 seconds.
    *   **Usage:** Heartbeat mechanism. If key vanishes, user is considered offline.

3.  **Pub/Sub Channels:**
    *   **Channel:** `room_events:{roomId}`
    *   **Usage:** Broadcasts `OFFER`, `ANSWER`, `ICE`, `JOIN`, `LEAVE` to all nodes serving this room.

### Writers vs Readers
*   **Writer:** The signaling node hosting the specific user's socket connection writes to Redis.
*   **Reader:** All signaling nodes subscribe to `room_events:{roomId}` for rooms they have clients in.

---

## 5. Room Join Flow (Step-by-Step)

1.  **Client Event:** `socket.emit('join_room', { roomId })`
2.  **Validation:**
    *   Check if `roomId` is valid format.
    *   (Optional) HTTP call to Room Service to verify room exists (cached).
3.  **Limit Check:**
    *   `SCARD room:{roomId}:users` -> count.
    *   If count >= **4** (Phase 1 Limit), emit `error` ({ message: 'Room full' }).
4.  **State Update:**
    *   Redis: `SADD room:{roomId}:users {userId}`.
    *   Redis: `SET presence:{roomId}:{userId} {timestamp} EX 30`.
    *   Local: Update `socketToRoom`, `socketToUser`, `userToSocket`.
5.  **Join Event:**
    *   Fetch all members: `SMEMBERS room:{roomId}:users`.
    *   Identify **Existing Peers** (everyone except self).
    *   Emit to Self: `room_joined` ({ existingPeers: [id1, id2...] }).
    *   Publish via Redis: `user_joined` ({ userId }) to `room_events:{roomId}`.

---

## 6. Room Leave Flow

### Explicit Leave
1.  Client emits `leave_room`.
2.  Server removes `userId` from Redis Set `room:{roomId}:users`.
3.  Server deletes `presence:{roomId}:{userId}`.
4.  Publish `user_left` ({ userId }) to `room_events:{roomId}`.
5.  Clear local maps.

### Socket Disconnect
1.  `socket.on('disconnect')` triggers.
2.  Lookup `userId` and `roomId` from local maps.
3.  Execute **Explicit Leave** logic.

### Presence TTL Expiry (Safety Net)
1.  Redis Key `presence:{roomId}:{userId}` expires.
2.  (Requires Redis Keyspace Notifications or separate worker)
3.  Worker detects expiry -> Publishes `user_left`.
    *   *Note for Phase 1:* We rely mostly on socket disconnect. TTL is for hard crashes.

---

## 7. WebRTC Negotiation Rules (CRITICAL)

To prevent "glare" (simultaneous offers):

1.  **Existing Peers (in room)**: ALWAYS behave as the **Offerer**.
2.  **New Peer (joining)**: ALWAYS behaves as the **Answerer**.
3.  **Polite Peer:** The New Peer receives offers and responds. The Existing Peers initiate.

---

## 8. SDP Signaling Flow

### Offer Creation
1.  **Existing Peer** receives `user_joined` (indicating New Peer).
2.  **Existing Peer** creates WebRTC Offer.
3.  Sends `offer` ({ targetUserId: NewPeerId, sdp: ... }) to Server.
4.  Server publishes to Redis `room_events:{roomId}` (target: NewPeer).
5.  New Peer's node receives event, forwards to New Peer via Socket.

### Answer Creation
1.  **New Peer** receives `offer`.
2.  Sets Remote Description.
3.  Creates Answer.
4.  Sends `answer` ({ targetUserId: ExistingPeerId, sdp: ... }) to Server.
5.  Server relays back to Existing Peer.

---

## 9. ICE Candidate Handling

### The Problem
ICE candidates often generated immediately, reaching the other peer *before* the SDP Offer/Answer arrives. Setting candidate without RemoteDescription fails.

### Buffer Logic
1.  **Receive Candidate:** Server receives `ice_candidate` ({ targetUserId, candidate }).
2.  **Forwarding:** Server relays to Target Client.
3.  **Client-Side Logic (Frontend LLD ref):**
    *   If `RemoteDescription` is set -> Add Candidate.
    *   If `RemoteDescription` is null -> **Queue** candidate in memory.
    *   Once SDP processing finishes -> **Flush** queue.

---

## 10. Reconnection Handling

1.  **Socket Reconnect:**
    *   Socket.IO automatically attempts reconnect.
    *   On re-connect, client must re-emit `join_room` to ensure presence is refreshed.
2.  **Page Refresh:**
    *   Treated as a totally new connection.
    *   Old socket disconnects -> `user_left`.
    *   New socket connects -> `user_joined`.
    *   Peers must tear down old PC and establish new PC (Mesh reset).
3.  **Same User Rejoining:**
    *   If `user_joined` comes for a user already in local list, overwrite/reset connection.

---

## 11. Error & Edge Case Handling

*   **Invalid Room:** Emit `error` -> Client redirects to home.
*   **Room Full:** Emit `error` -> Client shows "Room Capacity Reached".
*   **Duplicate Joins:** If same `userId` joins from two sockets, the first one is usually disconnected or the second one kicks the first (Last-Write-Wins logic for presence).
*   **Redis Failure:** Log critical error. Service enters "Degraded Mode" (local-only, no multi-node).

---

## 12. Scaling & Multi-Node Behavior

*   **State:** Stateless (except for socket connection).
*   **Redis Pub/Sub:**
    *   Every Signaling Node subscribes to `room_events:{roomId}` for every room it serves.
    *   When Node A receives a message from Client A intended for Client B (on Node B):
        1.  Node A publishes to Redis.
        2.  Node B receives message.
        3.  Node B looks up Client B in `userToSocket`.
        4.  Node B sends to Client B.

---

## 13. Explicit Non-Goals

*   **SFU / MCU:** No media manipulation.
*   **Chat Persistence:** Chat messages are ephemeral, relayed like signaling.
*   **Video Recording:** Not supported.

---

## 14. Implementation Checklist

- [ ] WebSocket Server initialized (Socket.IO/WS).
- [ ] JWT Middleware implemented & verifying tokens.
- [ ] Redis Client connected (Pub and Sub clients).
- [ ] `join_room` handler (Limit check + Redis SADD + Event emit).
- [ ] `leave_room` handler (Redis SREM + Event emit).
- [ ] `offer` / `answer` relays working.
- [ ] `ice_candidate` relays working.
- [ ] Redis Pub/Sub wiring (Broadcasting events across nodes).
- [ ] Disconnect handler cleaning up resources.
- [ ] Heartbeat / Presence TTL update logic.
