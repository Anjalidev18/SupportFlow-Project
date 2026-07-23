# SupportFlow — Implementation Plan

> **Status:** Phase 1 — Foundation (in progress)  
> **Last updated:** 2026-07-21  
> **Purpose:** Phased roadmap from planning through MVP launch. Updated as phases complete.

---

## Overview

This plan delivers SupportFlow MVP in six phases. Each phase has clear deliverables, exit criteria, and dependencies. Phases are sequential unless noted.

```
Phase 0          Phase 1         Phase 2          Phase 3
Planning    ──▶  Project Setup ─▶ Backend Core  ──▶  Frontend Core
(DONE)           & Foundation     & API              & UI

                                                      │
                                                      ▼
                              Phase 4         Phase 5
                              Integration  ──▶  Testing,
                              & Polish         Docs & Launch
```

**Estimated timeline (indicative, 1–2 developers):**

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 0: Planning | 1 week | Week 1 |
| Phase 1: Project Setup | 3–5 days | Week 2 |
| Phase 2: Backend Core | 2–3 weeks | Week 4–5 |
| Phase 3: Frontend Core | 2–3 weeks | Week 7–8 |
| Phase 4: Integration & Polish | 1–2 weeks | Week 9–10 |
| Phase 5: Testing, Docs & Launch | 1 week | Week 11 |

---

## Phase 0: Planning & Discovery ✅

**Goal:** Align on scope, entities, rules, and acceptance criteria before writing code.

### Deliverables
- [x] [requirements-analysis.md](./requirements-analysis.md) — product discovery and business analysis
- [x] [acceptance-criteria.md](./acceptance-criteria.md) — testable MVP criteria
- [x] [implementation-plan.md](./implementation-plan.md) — this document
- [x] [ai-prompts/planning.md](../ai-prompts/planning.md) — collaboration journal
- [x] [architecture.md](./architecture.md) — layered monolith, stack decisions
- [x] [design-notes.md](./design-notes.md) — design system tokens
- [x] [api-contract.md](./api-contract.md) — health endpoint + planned MVP routes
- [ ] Resolve open questions (SSO, hosting, customer entity approach)

### Exit Criteria
- Stakeholders agree on MVP scope and out-of-scope items
- All P0 acceptance criteria are defined
- Open questions documented with owners

---

## Phase 1: Project Setup & Foundation

**Goal:** Establish repository structure, tooling, CI, and development environment so the team can build consistently.

### Tasks

#### 1.1 Repository & Tooling
- [x] Initialize npm workspaces monorepo (`frontend` + `backend`)
- [x] Configure package manager, linter, formatter (ESLint, Prettier)
- [ ] Set up Git hooks (pre-commit: lint + format)
- [x] Add `.env.example` with documented variables (no secrets)
- [x] Configure editor config (`.editorconfig`)

#### 1.2 Backend Scaffold
- [x] Stack: Node.js + Express + Mongoose (see [architecture.md](./architecture.md))
- [x] Project structure: routes, controllers, services, models, middleware
- [x] Database connection (MongoDB + Mongoose)
- [x] Health check endpoint (`GET /api/health`)
- [x] Structured logging (morgan) and error handling middleware
- [x] Environment-based configuration

#### 1.3 Frontend Scaffold
- [x] Stack: React 18 + Vite + JavaScript + SCSS
- [x] Routing (react-router-dom), landing layout, SCSS design system
- [x] API client setup with error handling
- [ ] Auth context / state management approach (Phase 2)

#### 1.4 DevOps & CI
- [ ] Docker Compose for local dev (app + database)
- [ ] CI pipeline: lint, type-check, unit tests on PR
- [ ] Branch protection rules documented

#### 1.5 Seed Data
- [ ] Migration for schema v1 (users, tickets, categories, priorities, comments, activities)
- [ ] Seed script: default categories, priorities, admin user

### Exit Criteria
- [x] `npm run dev` starts frontend + backend locally
- [ ] Docker Compose for local dev (app + database)
- [ ] CI passes on empty/skeleton test suite
- [x] README with setup instructions
- [x] Landing page with live health check indicator
- [ ] Seed script for default categories, priorities, admin user (Phase 2)

---

## Phase 2: Backend Core & API

**Goal:** Implement domain logic, persistence, and REST (or GraphQL) API for all MVP features.

### Tasks

#### 2.1 Authentication & Users
- [ ] User model and password hashing (or SSO integration)
- [ ] Login / logout / session or JWT endpoints
- [ ] Role-based authorization middleware
- [ ] Admin: CRUD users, deactivate, role assignment

#### 2.2 Configuration
- [ ] Category and Priority models with soft-delete
- [ ] Admin API: manage categories and priorities
- [ ] Seed defaults on first run

#### 2.3 Ticket Domain
- [ ] Ticket model with status enum and validation
- [ ] Status transition rules (server-side enforcement)
- [ ] Create, read, update ticket endpoints
- [ ] Assignment and priority change endpoints
- [ ] Resolution summary validation on resolve
- [ ] List endpoint with filters (status, priority, assignee, category) and pagination

#### 2.4 Comments & Activity
- [ ] Comment model (internal only for MVP)
- [ ] Activity log service — auto-record on ticket mutations
- [ ] Append-only guarantee on activity table
- [ ] Paginated comments and activity on ticket detail

#### 2.5 Dashboard API
- [ ] Aggregations: counts by status, by assignee
- [ ] Aging tickets query (> 48h open)

#### 2.6 Testing (Backend)
- [ ] Unit tests for status transition logic
- [ ] Unit tests for authorization rules
- [ ] Integration tests for critical API flows (create ticket, assign, resolve, close)
- [ ] Test database isolation (fixtures / transactions)

### Exit Criteria
- All MVP API endpoints documented (OpenAPI / Swagger)
- Integration tests cover all P0 acceptance criteria at API level
- Postman collection or similar for manual QA

---

## Phase 3: Frontend Core & UI

**Goal:** Build user-facing screens for all MVP workflows with a clean, modern UX.

### Tasks

#### 3.1 Auth UI
- [ ] Login page
- [ ] Protected routes by role
- [ ] Session handling (redirect on expiry)

#### 3.2 Layout & Navigation
- [ ] App shell: sidebar or top nav
- [ ] Role-aware menu items
- [ ] User profile / logout

#### 3.3 Ticket List
- [ ] Paginated table with status badges, priority indicators
- [ ] Filters: status, priority, assignee, category
- [ ] "My Tickets" view
- [ ] Click-through to detail

#### 3.4 Ticket Create
- [ ] Form with validation (mirrors backend rules)
- [ ] Category and priority dropdowns (active values only)
- [ ] Optional assignee picker

#### 3.5 Ticket Detail
- [ ] Header: title, status, priority, assignee, customer
- [ ] Status change control (allowed transitions only)
- [ ] Assign / reassign control
- [ ] Comment thread with compose box
- [ ] Activity log timeline
- [ ] Resolution summary modal on resolve

#### 3.6 Dashboard (Team Lead)
- [ ] Status summary cards
- [ ] Per-agent workload breakdown
- [ ] Aging tickets section

#### 3.7 Admin Screens
- [ ] User management table + create/deactivate
- [ ] Category management
- [ ] Priority management

#### 3.8 UX Polish
- [ ] Loading and empty states
- [ ] Error toasts / inline errors
- [ ] Confirmation dialogs for destructive actions
- [ ] Basic responsive layout

### Exit Criteria
- All P0 UI flows functional against backend API
- No console errors on happy paths
- Consistent visual design across screens

---

## Phase 4: Integration & Polish

**Goal:** Connect frontend and backend end-to-end, harden edge cases, and prepare for QA.

### Tasks
- [ ] End-to-end smoke tests (Playwright or Cypress) for critical paths
- [ ] Enforce all status transition rules in UI (disable invalid options)
- [ ] Handle inactive assignee display
- [ ] Closed ticket read-only UI
- [ ] Pagination and filter state in URL (shareable links)
- [ ] Performance check on ticket list (indexes verified)
- [ ] Security review: auth on all endpoints, input sanitization, CSRF if cookie-based auth
- [ ] Error boundary and global error handling in frontend

### Exit Criteria
- E2E tests pass in CI
- Manual QA checklist completed against [acceptance-criteria.md](./acceptance-criteria.md)
- No open P0 bugs

---

## Phase 5: Testing, Documentation & Launch

**Goal:** Final validation, documentation, deployment, and MVP release.

### Tasks

#### 5.1 Testing
- [ ] Full regression against all P0 acceptance criteria
- [ ] Load smoke test (optional: 100 concurrent list requests)
- [ ] Accessibility spot-check (keyboard nav, labels)

#### 5.2 Documentation
- [ ] README: architecture overview, setup, environment variables
- [ ] API documentation published (Swagger UI or static OpenAPI)
- [ ] User guide: agent workflow, lead dashboard, admin setup
- [ ] Runbook: deployment, rollback, common issues

#### 5.3 Deployment
- [ ] Staging environment provisioned
- [ ] Production environment provisioned
- [ ] Database backup strategy
- [ ] Deploy staging → validate → deploy production
- [ ] Create initial Admin account in production

#### 5.4 Launch
- [ ] Onboard pilot team (3–5 agents)
- [ ] Collect feedback after 1 week
- [ ] Triage post-MVP backlog

### Exit Criteria
- MVP live in production
- All P0 acceptance criteria marked Done
- Runbook and user guide available to team

---

## Post-MVP Roadmap (Reference)

Prioritized enhancements after launch — see [requirements-analysis.md § 1.5](./requirements-analysis.md#15-post-mvp-enhancements-without-affecting-mvp-scope):

1. Email integration (inbound ticket creation + outbound replies)
2. SLA tracking and breach alerts
3. Customer self-service portal
4. Full-text search
5. File attachments
6. Bulk actions for Team Leads
7. Automation rules

---

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Scope creep into post-MVP features | Delays launch | Medium | Strict adherence to P0 criteria; defer to backlog |
| Auth complexity (SSO) | Delays Phase 2 | Medium | Default to email/password for MVP; SSO as fast-follow |
| Unclear status workflow | Rework | Low | Documented transitions in requirements; enforce server-side |
| Performance with large ticket volume | Poor UX | Low | Index key fields early; paginate all lists |
| MongoDB referential integrity | Orphaned refs | Medium | Validate IDs in service layer; use Mongoose refs |
| Missing audit trail | Compliance gap | Low | Activity log built in Phase 2 before UI |

---

## Architecture Decisions (Resolved)

| Decision | Choice | Status |
|----------|--------|--------|
| Architecture pattern | Layered monolith | ✅ Accepted |
| Backend | Node.js + Express | ✅ Accepted |
| Frontend | React + Vite + JavaScript + SCSS | ✅ Accepted |
| Database | MongoDB + Mongoose | ✅ Accepted |
| API style | REST / JSON | ✅ Accepted |
| Repository layout | npm workspaces monorepo | ✅ Accepted |
| Auth strategy | JWT or session (TBD) | Open — Phase 2 |
| Hosting | AWS, GCP, Railway, Fly.io | Open |

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-07-21 | Planning session | Initial implementation plan |
| 2026-07-21 | Foundation session | Stack locked, scaffold complete, design system established |
