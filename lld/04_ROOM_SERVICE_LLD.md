# Room Service LLD (Low Level Design)

## 1. Responsibility

The **Room Service** manages the lifecycle and configuration of meetings. It is the "Source of Truth" for whether a meeting exists and acts as the gatekeeper for entry rules.

### Responsibilities
*   **Creation:** Generating unique, URL-friendly room IDs.
*   **Validation:** Checking if a room is valid and active.
*   **Constraints:** Enforcing Phase 1 participant limits (Hard limit check before signaling).
*   **History:** Storing meeting metadata (host, created_at).

---

## 2. Database Schema

**Table: `meetings`**

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: `uuidv4()` | Internal DB ID |
| `roomId` | VARCHAR(12) | UNIQUE, NOT NULL | Public Friendly ID (e.g. `abc-defg-hij`) |
| `host_id` | UUID | FK -> Users | Creator of the meeting |
| `created_at` | TIMESTAMP | DEFAULT `NOW()` | Creation time |
| `is_active` | BOOLEAN | DEFAULT `TRUE` | Soft delete flag |

---

## 3. Redis Cache Design

*   **Write-Through Strategy:**
    *   On Create: Write to DB -> Write to Redis.
    *   On Read: Read Redis -> If Miss, Read DB + Populate Redis.
*   **Key:** `room:{roomId}` (Public ID).
*   **Value:** JSON `{ id, hostId, maxParticipants: 4 }`.
*   **TTL:** 24 Hours (Meetings are ephemeral in Phase 1).

---

## 4. Create Room Flow

**Endpoint:** `POST /rooms`

1.  **Auth Check:** Handled by Gateway (User ID injected in headers).
2.  **ID Generation:**
    *   Generate random string `xxx-yyyy-zzz`.
3.  **Persistence:**
    *   `INSERT INTO meetings ...`
4.  **Caching:**
    *   `SET room:xxx-yyyy-zzz {...}` in Redis.
5.  **Response:**
    *   `201 Created` `{ roomId: "xxx-yyyy-zzz" }`.

---

## 5. Validate Room Flow

**Endpoint:** `GET /rooms/:roomId`

1.  **Input:** `roomId` from params.
2.  **Cache Lookup:**
    *   `GET room:{roomId}`.
    *   If found, return 200.
3.  **DB Lookup (Fallback):**
    *   `SELECT * FROM meetings WHERE roomId = ?`.
    *   If found, cache and return 200.
    *   If not found, return `404 Not Found`.

---

## 6. Participant Limit Logic

While the Signaling Service enforces the *live* count, the Room Service defines the *policy*.
*   The Room Service returns `maxParticipants: 4` in the room metadata.
*   The Frontend checks this metadata.
*   The Signaling Service checks the Redis Set size against this number.

---

## 7. Failure Handling

*   **DB Down:** Return 500.
*   **Redis Down:** Fallback to DB-only mode (slower but functional).
