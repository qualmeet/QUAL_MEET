# TURN Credential Service LLD (Low Level Design)

## 1. Responsibility

The **TURN Credential Service** ensures that users can relay media when P2P fails, without opening the TURN server to public abuse.

### Responsibilities
*   **Credential Generation:** Creating time-limited usernames/passwords for COTURN.
*   **Load Balancing:** Returning a list of available ICE servers.
*   **Protection:** Rate limiting requests to prevent quota theft.

---

## 2. Credential Generation Algorithm

Implements the **REST API for TURN Server** standard.

1.  **Shared Secret:** Must match the `static-auth-secret` in `turnserver.conf`.
2.  **Format:**
    *   `username` = `timestamp:userId` (e.g., `1735689600:user-123`).
    *   `password` = HMAC-SHA1(`username`, `secret`).
    *   `ttl` = 86400 (24 hours) usually, but we restrict to meeting duration.

---

## 3. TTL Rules

*   **Credential TTL:** Set to **60 minutes** (3600s).
*   **Why?** Meetings rarely last longer. If they do, frontend requests new credentials.
*   **Timestamp Check:** COTURN automatically rejects credentials where `timestamp < current_time - ttl`.

---

## 4. Redis Quota Tracking

To prevent a single user from scraping thousands of credentials:
*   **Key:** `turn_limit:{userId}`.
*   **Limit:** Max 10 requests per hour.
*   **Increment:** `INCR turn_limit:{userId}`.
*   **Expiry:** `EXPIRE 3600`.

---

## 5. API Response Format

**Endpoint:** `GET /ice-servers`

```json
{
  "iceServers": [
    {
      "urls": "stun:stun.qualmeet.com:3478"
    },
    {
      "urls": "turn:turn.qualmeet.com:3478?transport=udp",
      "username": "1735689600:user-123",
      "credential": "generated_hmac_password"
    },
    {
      "urls": "turn:turn.qualmeet.com:3478?transport=tcp",
      "username": "1735689600:user-123",
      "credential": "generated_hmac_password"
    }
  ]
}
```

---

## 6. Abuse Prevention Rules

1.  **Auth Required:** Never expose this endpoint publicly.
2.  **Rate Limiting:** Enforced via Redis (Section 4).
3.  **Cors:** Strict origin policy.
