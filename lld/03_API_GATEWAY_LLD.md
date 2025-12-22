# API Gateway LLD (Low Level Design)

## 1. Responsibility & Scope

The **API Gateway** acts as the single entry point for all HTTP traffic. It insulates internal microservices from the public internet and handles cross-cutting concerns.

### Responsibilities
*   **Routing:** Proxying requests to the appropriate backend service.
*   **Authentication:** Verifying JWTs for protected routes.
*   **Rate Limiting:** Protecting services from abuse.
*   **CORS:** Handling Cross-Origin Resource Sharing headers.

---

## 2. Route Table

| Path | Method | Target Service | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | POST | `auth-service` | NO |
| `/api/auth/login` | POST | `auth-service` | NO |
| `/api/rooms` | POST | `room-service` | **YES** |
| `/api/rooms/:id` | GET | `room-service` | **YES** |
| `/api/ice-servers` | GET | `turn-credential-service` | **YES** |

*   **WebSocket:** `/socket.io/*` -> Bypasses Gateway logic usually (handled by Nginx LB directly to Signaling), OR proxied via Gateway with `ws: true`. For Phase 1, assuming Nginx handles WSS routing, but if Gateway proxies it, it must support connection upgrades.

---

## 3. JWT Middleware Logic

1.  **Extraction:**
    *   Look for `Authorization: Bearer <token>` header.
2.  **Verification:**
    *   `jwt.verify(token, JWT_SECRET)`.
3.  **Injection:**
    *   If valid, attach decoded user info to request headers before proxying.
    *   `X-User-Id: <userId>`
    *   `X-User-Email: <email>`
4.  **Rejection:**
    *   If missing/invalid: `res.status(401).json({ error: 'Unauthorized' })`.

---

## 4. Proxying Rules

*   **Library:** `http-proxy-middleware` or `fastify-http-proxy`.
*   **Path Rewriting:**
    *   `/api/auth/*` -> `/auth/*` (if service expects root paths).
    *   Or keep paths consistent across Gateway and Services.
*   **Timeout:** Set timeouts (e.g., 5000ms) to prevent hanging requests.

---

## 5. Rate Limiting Rules

*   **Library:** `express-rate-limit` / `rate-limit-redis`.
*   **Global Limit:** 100 requests per 15 minutes per IP.
*   **Auth Limit:** 5 login attempts per minute per IP.
*   **Storage:** Redis is preferred for distributed counting.

---

## 6. Error Handling

*   **Upstream Down:** If a service is unreachable, return `503 Service Unavailable`.
*   **Timeout:** Return `504 Gateway Timeout`.
*   **Standardization:** Ensure all errors return JSON: `{ "error": "message" }`.

---

## 7. What Gateway Does NOT Do

*   **Business Logic:** No database queries (except maybe Redis for rate limiting).
*   **Aggregation:** It does not combine responses from multiple services (simple pass-through).
*   **WebRTC Media:** Absolutely no media traffic.
