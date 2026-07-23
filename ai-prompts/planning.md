# AI Collaboration Journal — Planning Phase

> **Purpose:** Summarize AI-assisted planning sessions. Living document — append new entries; do not duplicate prior decisions.
> **Project:** SupportFlow

---

## Entry 001 — 2026-07-21

### Prompt Objective

Kick off SupportFlow from scratch as a real product: define the business problem, scope an MVP, document business entities and rules, plan a phased implementation roadmap, and create foundational project documentation — **without writing application code**.

### AI Recommendations

**Product positioning**
- Frame SupportFlow as an **internal** tool for support teams (agents, leads, admins), not a customer-facing helpdesk in v1.
- Optimize for: time-to-resolution, accountability, visibility, process standardization, and auditability.

**MVP scope (recommended in)**
- Ticket CRUD with full lifecycle (open → in progress → on hold → resolved → closed)
- Role-based auth (Agent, Team Lead, Admin)
- Assignment, priority, categories
- Internal comments and immutable activity log
- Lightweight Team Lead dashboard (counts, aging tickets)
- Admin: user management, category/priority config

**MVP scope (recommended out)**
- Customer self-service portal
- Email integration
- SLA engine, automation rules, attachments, full-text search
- Multi-tenant / multi-team isolation

**Business model**
- Core entities: User, Customer (lightweight), Ticket, Category, Priority, Comment, Activity
- Soft-delete for config entities to preserve historical references
- Server-enforced status transition rules from day one

**Engineering approach**
- Six phases: Planning → Setup → Backend → Frontend → Integration → Launch
- PostgreSQL + migration tool; API-first backend; React + TypeScript frontend (proposed, pending ADR)
- Activity log as append-only table — cheap early, costly to retrofit

### Decisions Accepted

| Decision | Detail |
|----------|--------|
| Internal users only for MVP | Agents create tickets on behalf of customers; no customer login |
| Shared queue model | All agents can see all tickets; team-scoped queues deferred |
| Immutable activity log | Every mutation on a ticket produces an audit entry |
| Soft-delete for categories/priorities | `is_active` flag; existing tickets retain references |
| UTC timestamps | Stored UTC; localized in UI |
| Resolution summary required | Cannot resolve without documenting the solution |
| Closed tickets read-only | Reopen restricted to Admin/Team Lead |

### Alternatives Considered

| Alternative | Why not chosen (for MVP) |
|-------------|--------------------------|
| Customer-facing portal in v1 | Significantly increases auth, visibility, and UX scope |
| Team-scoped ticket visibility | Adds permission complexity; shared queue sufficient for small teams |
| Email-as-ticket-source in v1 | Requires email infra, parsing, and dedup logic |
| Hard-delete categories/priorities | Breaks referential integrity on historical tickets |
| Real-time WebSocket updates | Not needed at moderate scale; polling/refresh acceptable |
| Inline customer fields only (no Customer entity) | Faster to build; acceptable for MVP with extraction path later |
| GraphQL API | REST is simpler for CRUD-heavy MVP; GraphQL if mobile clients planned later |

### Reasoning Behind Important Decisions

**Internal-only MVP**
Support teams are the primary users on day one. Building a customer portal requires public auth, email verification, scoped ticket visibility, and a separate UX surface. Deferring this keeps the MVP focused and shippable in ~10 weeks.

**Activity log from day one**
Auditability is a stated business objective. An append-only activity table adds minimal schema complexity but prevents a painful migration later when compliance or quality review needs arise.

**Server-side status transitions**
Invalid state changes (e.g., Agent reopening a closed ticket) must be blocked at the API layer, not just hidden in the UI. UI enforcement alone is bypassable and leads to data corruption.

**Shared queue over team isolation**
For a small internal team, a single queue with filters is simpler and matches how many support teams start. Multi-team routing can layer on top of the same ticket model later.

**Phased delivery with API-first backend**
Building and testing the backend against acceptance criteria before UI work allows parallel progress later and ensures business rules are centralized in one place.

### Open Items (Carried Forward)

- [ ] SSO vs. email/password for MVP auth
- [ ] Separate Customer entity vs. inline fields on Ticket
- [ ] SLA baseline targets
- [ ] Auto-close resolved tickets after N days (suggest 7)
- [ ] Hosting environment and stack ADR
- [ ] Create architecture decision record before Phase 1

### Artifacts Created

- `docs/requirements-analysis.md`
- `docs/acceptance-criteria.md`
- `docs/implementation-plan.md`
- `ai-prompts/planning.md` (this file)

---

## Entry 002 — 2026-07-21

### Prompt Objective

Establish engineering foundation before feature work: architecture review, stack validation, folder structure, frontend design system, and full project scaffolding (no business features).

### AI Recommendations

**Architecture**
- Layered monolith: React SPA → Express API → Service layer → Mongoose/MongoDB
- Rejected microservices, Next.js full-stack, and GraphQL for MVP complexity reasons
- npm workspaces monorepo for atomic changes across frontend/backend

**Stack review**
- Accepted team choices (React + Vite + JS, SCSS, Express, MongoDB)
- Flagged MongoDB referential integrity as main concern — mitigate via service-layer validation
- Recommended helmet, cors, morgan, dotenv (included in scaffold)

**Design system**
- Inter font, cool-gray neutrals, 4px spacing grid, 6–8px border radius
- Status/priority semantic colors; bordered cards over heavy shadows
- SaaS-inspired patterns from Linear, Notion, GitHub Issues, Vercel

### Decisions Accepted

| Decision | Detail |
|----------|--------|
| Layered monolith | Single deployable app with strict internal layers |
| MongoDB + Mongoose | Team preference; integrity enforced in services |
| JavaScript (not TypeScript) | Team preference for MVP; JSDoc/ESLint for safety |
| SCSS design tokens | `_variables.scss` as single source of truth |
| Health endpoint at `/api/health` | Returns API + DB status per api-contract.md |
| Vite proxy to backend | `/api` proxied to `:5000` in dev |

### Alternatives Considered

| Alternative | Why not chosen |
|-------------|----------------|
| PostgreSQL | Team chose MongoDB; planning doc updated |
| TypeScript | Team chose JavaScript for faster onboarding |
| CSS Modules / Tailwind | Team chose SCSS; BEM-style classes for components |
| Feature-based backend folders | Horizontal layers clearer for greenfield; feature modules in Phase 2 |
| Docker Compose in scaffold | Deferred; manual MongoDB for now |

### Reasoning Behind Important Decisions

**Layered monolith over microservices:** SupportFlow is an internal tool with a cohesive domain and small team. A monolith ships faster and is easier to debug; layers provide extraction points later.

**MongoDB with service-layer validation:** While PostgreSQL offers stronger referential integrity, the team's MongoDB familiarity reduces ramp-up time. Business rules (status transitions, audit log) live in services regardless of database.

**Design system before screens:** Defining tokens and primitives first prevents one-off styles during Phase 3 and ensures visual consistency across ticket list, detail, and dashboard.

### Implementation Notes

- Backend: `backend/src/` with config, routes, controllers, middleware, services/, models/
- Frontend: `frontend/src/components/ui/` for Button, Card, Badge, Spinner, EmptyState
- Landing page demonstrates design system + live health check
- Remaining Phase 1 gaps: Docker Compose, CI pipeline, git hooks

### Open Items (Carried Forward)

- [ ] Docker Compose for MongoDB + app
- [ ] CI pipeline (lint on PR)
- [ ] Git pre-commit hooks
- [ ] Auth strategy: JWT vs. HTTP-only cookie
- [ ] SSO vs. email/password
- [ ] Customer entity vs. inline fields

### Artifacts Created / Updated

- `docs/architecture.md` (new)
- `docs/design-notes.md` (new)
- `docs/api-contract.md` (new)
- `docs/implementation-plan.md` (updated)
- `backend/` — Express scaffold with health check
- `frontend/` — Vite + React + SCSS design system + landing page
- `README.md`, `.gitignore`, `.editorconfig`, root `package.json`

---

## Template for Future Entries

```markdown
## Entry NNN — YYYY-MM-DD

### Prompt Objective
[What we asked the AI to help with]

### AI Recommendations
[Key suggestions]

### Decisions Accepted
[What we agreed to]

### Alternatives Considered
[What we evaluated and rejected]

### Reasoning Behind Important Decisions
[Why]

### Open Items (Carried Forward)
[Unresolved questions]

### Artifacts Created / Updated
[Files changed]
```
