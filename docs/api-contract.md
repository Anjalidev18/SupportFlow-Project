# SupportFlow — API Contract

> **Status:** Foundation — health endpoint implemented; MVP endpoints planned  
> **Last updated:** 2026-07-21  
> **Base URL (dev):** `http://localhost:5000/api`  
> **Format:** JSON

---

## Conventions

### Request / Response

- `Content-Type: application/json` for all request bodies
- Timestamps in ISO 8601 UTC (`2026-07-21T14:30:00.000Z`)
- IDs are MongoDB ObjectIds as strings (`"507f1f77bcf86cd799439011"`)

### Pagination (planned)

Query params: `?page=1&limit=20` (default limit: 20, max: 100)

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

### Error format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": [{ "field": "title", "message": "Title is required" }]
  }
}
```

| HTTP Status | Meaning |
|-------------|---------|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Not authorized (role/permission) |
| 404 | Resource not found |
| 409 | Conflict (e.g., invalid status transition) |
| 500 | Internal server error |

### Authentication (Phase 2)

JWT via `Authorization: Bearer <token>` or HTTP-only cookie (TBD).

Protected routes return `401` without valid credentials.

---

## Implemented Endpoints

### Health Check

Verify API and database connectivity.

```
GET /api/health
```

**Response `200 OK`**

```json
{
  "status": "ok",
  "service": "supportflow-api",
  "version": "0.1.0",
  "timestamp": "2026-07-21T15:00:00.000Z",
  "database": "connected"
}
```

**Response `503 Service Unavailable`** (database disconnected)

```json
{
  "status": "degraded",
  "service": "supportflow-api",
  "version": "0.1.0",
  "timestamp": "2026-07-21T15:00:00.000Z",
  "database": "disconnected"
}
```

---

## Planned MVP Endpoints

> Not yet implemented. Documented here as the contract target for Phase 2.

### Auth

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/login` | Login with email/password | Public |
| POST | `/api/auth/logout` | Invalidate session | User |
| GET | `/api/auth/me` | Current user profile | User |

### Users (Admin)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/users` | List all users | Admin |
| POST | `/api/users` | Create user | Admin |
| PATCH | `/api/users/:id` | Update role/status | Admin |

### Tickets

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/tickets` | List tickets (filters, pagination) | User |
| POST | `/api/tickets` | Create ticket | User |
| GET | `/api/tickets/:id` | Ticket detail + comments + activity | User |
| PATCH | `/api/tickets/:id` | Update ticket fields | User |
| PATCH | `/api/tickets/:id/status` | Change status (validated transitions) | User |
| PATCH | `/api/tickets/:id/assign` | Assign / reassign | User |
| POST | `/api/tickets/:id/comments` | Add comment | User |

**Filters for `GET /api/tickets`:** `status`, `priority`, `assignee`, `category`, `search`, `page`, `limit`, `sort`

### Categories (Admin)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/categories` | List active categories | User |
| POST | `/api/categories` | Create category | Admin |
| PATCH | `/api/categories/:id` | Update / deactivate | Admin |

### Priorities (Admin)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/priorities` | List active priorities | User |
| POST | `/api/priorities` | Create priority | Admin |
| PATCH | `/api/priorities/:id` | Update / deactivate | Admin |

### Dashboard

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/dashboard/summary` | Counts by status, by assignee | Lead, Admin |
| GET | `/api/dashboard/aging` | Tickets open > 48h | Lead, Admin |

---

## Resource Schemas (Planned)

### Ticket

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Cannot reset password",
  "description": "Customer reports reset email never arrives.",
  "status": "open",
  "priority": "507f1f77bcf86cd799439012",
  "category": "507f1f77bcf86cd799439013",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "assignee": "507f1f77bcf86cd799439014",
  "createdBy": "507f1f77bcf86cd799439015",
  "resolutionSummary": null,
  "resolvedAt": null,
  "closedAt": null,
  "createdAt": "2026-07-21T10:00:00.000Z",
  "updatedAt": "2026-07-21T10:00:00.000Z"
}
```

**Status enum:** `open` | `in_progress` | `on_hold` | `resolved` | `closed`

### User

```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "Alex Agent",
  "email": "alex@company.com",
  "role": "agent",
  "status": "active",
  "createdAt": "2026-07-21T10:00:00.000Z"
}
```

**Role enum:** `agent` | `lead` | `admin`

### Comment

```json
{
  "_id": "507f1f77bcf86cd799439016",
  "ticket": "507f1f77bcf86cd799439011",
  "author": "507f1f77bcf86cd799439015",
  "body": "Checked mail logs — email bounced.",
  "isInternal": true,
  "createdAt": "2026-07-21T11:00:00.000Z"
}
```

### Activity (read-only)

```json
{
  "_id": "507f1f77bcf86cd799439017",
  "ticket": "507f1f77bcf86cd799439011",
  "actor": "507f1f77bcf86cd799439015",
  "action": "status_changed",
  "field": "status",
  "oldValue": "open",
  "newValue": "in_progress",
  "createdAt": "2026-07-21T11:30:00.000Z"
}
```

---

## Revision History

| Date | Changes |
|------|---------|
| 2026-07-21 | Initial contract — health endpoint + planned MVP routes |
