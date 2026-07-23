# SupportFlow — Architecture

> **Status:** Accepted  
> **Last updated:** 2026-07-21  
> **Related:** [design-notes.md](./design-notes.md) · [api-contract.md](./api-contract.md) · [implementation-plan.md](./implementation-plan.md)

---

## 1. Recommended Architecture: Layered Monolith

SupportFlow uses a **layered monolith** — a single deployable application with strict internal boundaries between presentation, API, business logic, and data access.

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
│              React SPA · Vite · SCSS Design System          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / JSON (REST)
┌──────────────────────────▼──────────────────────────────────┐
│                    API Layer (Express)                      │
│         Routes → Controllers → Middleware (auth, errors)    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   Service Layer                             │
│    Business rules · status transitions · activity logging   │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   Data Layer (Mongoose)                       │
│              MongoDB collections · schema validation          │
└─────────────────────────────────────────────────────────────┘
```

### Why this architecture fits SupportFlow

| Factor | Fit |
|--------|-----|
| **Team size** | 1–2 developers benefit from a single codebase with clear folders, not distributed-system overhead. |
| **MVP scope** | CRUD-heavy internal tool with well-defined entities maps cleanly to REST + service layer. |
| **Domain complexity** | Status transitions, RBAC, and audit logging belong in a dedicated service layer — not scattered in route handlers. |
| **Deployment** | One backend process + one static frontend build is simple to host, debug, and scale initially. |
| **Future growth** | Layers can be extracted (e.g., notification worker, search service) without rewriting the core. |

### How structure supports growth

1. **Service layer isolation** — Ticket lifecycle rules live in `services/`, not controllers. When we add email notifications or SLA timers, they hook into existing services without touching routes.
2. **API-first contract** — Frontend consumes documented REST endpoints. A mobile app or automation client can use the same API later.
3. **Component-based UI** — Design system primitives in `components/ui/` compose into feature pages without duplication.
4. **Config externalized** — Environment variables and seed data are separate from logic, enabling staging/production parity.
5. **Extractable modules** — Activity logging, auth middleware, and aggregation queries can become packages or microservices if load demands it — but only when measured need arises.

---

## 2. Alternatives Considered

### A. Microservices

Split tickets, users, notifications, and reporting into separate services.

**Rejected because:** Operational complexity (service discovery, distributed transactions, deployment pipelines) far exceeds MVP needs. SupportFlow has moderate traffic and a cohesive domain — a monolith is faster to build and easier to reason about.

**When to reconsider:** Multiple teams owning independent domains, or a single component (e.g., real-time notifications) needs independent scaling.

### B. Server-Side Rendered (Next.js full-stack)

Single Next.js app with API routes and React pages.

**Rejected because:** The team chose React + Vite + Express explicitly. Separating frontend and backend allows independent deployment, clearer API contracts, and aligns with a future mobile or third-party API consumer. Next.js adds framework coupling the project doesn't need yet.

### C. GraphQL API

Flexible queries for ticket list, detail, and dashboard in one request.

**Rejected because:** MVP endpoints are predictable CRUD + filters. REST with query parameters is simpler to document, test, and cache. GraphQL adds schema maintenance and N+1 query risk without clear MVP benefit.

### D. PostgreSQL (relational) instead of MongoDB

Strong referential integrity, joins for dashboard aggregations, migration tooling.

**Deferred in favor of team choice:** MongoDB + Mongoose was selected for developer familiarity and schema flexibility. Referential integrity and transactions must be enforced in the service layer. See [Stack Review](#3-technology-stack-review) for mitigations.

### E. Feature-based (vertical slice) folder structure

Organize by `features/tickets/`, `features/auth/` each containing route, service, model, and components.

**Partially adopted:** Backend will move toward feature modules in Phase 2. For scaffolding, horizontal layers (routes, services, models) are clearer for a greenfield project and match Express conventions. Frontend uses a hybrid: `pages/` for routes, `components/ui/` for shared primitives, feature folders added as screens grow.

---

## 3. Technology Stack Review

### Accepted stack

| Layer | Choice | Role |
|-------|--------|------|
| Frontend | React 18 + Vite | SPA with fast HMR and lean build |
| Styling | SCSS | Design tokens, mixins, component styles |
| Language | JavaScript | Team preference; TypeScript can be adopted later |
| Backend | Node.js + Express | REST API, middleware ecosystem |
| Database | MongoDB + Mongoose | Document store, schema validation, hooks |
| API style | REST / JSON | Predictable CRUD + filter query params |

### Concerns and mitigations

| Concern | Severity | Mitigation |
|---------|----------|------------|
| **Referential integrity** (ticket → user, category) | Medium | Mongoose `ref` + `populate`; validate IDs in service layer before writes |
| **Status transition rules** | Low | Enforce exclusively in `ticket.service.js`, not in Mongoose hooks alone |
| **Audit log immutability** | Medium | Separate `Activity` collection; no update/delete endpoints; append-only service |
| **Dashboard aggregations** | Low | MongoDB aggregation pipeline; add indexes on `status`, `assignee`, `createdAt` |
| **No migration tool** (vs. SQL) | Medium | Versioned seed scripts + schema change checklist; consider `migrate-mongo` if schema churn increases |
| **JavaScript vs TypeScript** | Low | JSDoc types on service functions; ESLint strict rules; migrate to TS incrementally if desired |
| **SCSS without CSS modules** | Low | BEM-style class naming in components; design tokens in `_variables.scss` prevent drift |

### Recommended additions (included in scaffold)

- **helmet** — security headers
- **cors** — controlled cross-origin for dev/prod
- **morgan** — HTTP request logging
- **dotenv** — environment configuration
- **express-async-errors** or wrapper — consistent async error handling

### Not needed yet

- Redis, message queues, WebSockets, GraphQL, ORM beyond Mongoose

---

## 4. Project Structure

### Repository layout (monorepo)

```
SupportFlow/
├── backend/                 # Express API
├── frontend/                # React SPA
├── docs/                    # Project documentation
├── ai-prompts/              # AI collaboration journal
├── package.json             # Workspace root scripts
├── .editorconfig
├── .gitignore
└── README.md
```

### Backend (`backend/src/`)

| Directory | Purpose |
|-----------|---------|
| `config/` | Environment loading, database connection |
| `routes/` | HTTP route definitions; thin — delegate to controllers |
| `controllers/` | Parse request, call service, format response |
| `services/` | Business logic, validation, orchestration |
| `models/` | Mongoose schemas and models |
| `middleware/` | Auth, error handling, request logging |
| `utils/` | Shared helpers (API errors, pagination, constants) |
| `app.js` | Express app factory (middleware, routes) |
| `server.js` | Entry point — connect DB, start server |

### Frontend (`frontend/src/`)

| Directory | Purpose |
|-----------|---------|
| `components/ui/` | Reusable design system primitives (Button, Card, Badge…) |
| `components/layout/` | Shell components (header, sidebar, page container) |
| `pages/` | Route-level page components |
| `layouts/` | Page layout wrappers (auth layout, app layout) |
| `styles/` | SCSS tokens, mixins, global styles, component SCSS |
| `services/` | API client and endpoint functions |
| `hooks/` | Custom React hooks |
| `utils/` | Formatting, constants, helpers |
| `assets/` | Static images, icons |

---

## 5. Cross-Cutting Concerns

### Error handling

- Backend: centralized `errorHandler` middleware returns consistent JSON `{ error: { code, message } }`
- Frontend: API client intercepts errors; toast notifications for user-facing failures

### Authentication (Phase 2)

- JWT in HTTP-only cookie or `Authorization` header (TBD)
- Role middleware on protected routes

### Logging

- `morgan` for HTTP access logs
- `console` structured logs in dev; upgrade to `pino` if log volume grows

### Security defaults

- `helmet` for headers
- Input validation on all write endpoints (express-validator or Joi in Phase 2)
- Rate limiting on auth endpoints (Phase 2)

---

## 6. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-21 | Layered monolith | Right complexity for MVP team and scope |
| 2026-07-21 | Monorepo (npm workspaces) | Single repo, shared scripts, atomic changes |
| 2026-07-21 | React + Vite + JavaScript | Team preference; fast dev experience |
| 2026-07-21 | MongoDB + Mongoose | Team preference; document model fits ticket + embedded comments |
| 2026-07-21 | REST over GraphQL | Simpler contract for CRUD MVP |
| 2026-07-21 | SCSS design system | Token-based styling without runtime CSS-in-JS cost |

---

## Revision History

| Date | Changes |
|------|---------|
| 2026-07-21 | Initial architecture document |
