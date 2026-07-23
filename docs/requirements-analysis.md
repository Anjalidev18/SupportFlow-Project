# SupportFlow — Requirements Analysis

> **Status:** Planning phase  
> **Last updated:** 2026-07-21  
> **Purpose:** Living document capturing product discovery, business analysis, and foundational decisions for SupportFlow.

---

## 1. Product Discovery

### 1.1 Overall Business Objective

SupportFlow exists to give internal support teams a single, reliable place to **capture, track, prioritize, and resolve customer issues** without losing context across handoffs, channels, or time.

**Primary goals:**

| Goal | Description |
|------|-------------|
| **Reduce time-to-resolution** | Agents spend less time searching for context and more time solving problems. |
| **Improve accountability** | Every ticket has a clear owner, status, and history. |
| **Increase visibility** | Team leads and managers can see workload, bottlenecks, and trends. |
| **Standardize the support process** | Consistent statuses, priorities, and workflows reduce ad-hoc handling. |
| **Enable auditability** | A complete activity trail supports quality review, compliance, and post-incident analysis. |

**Success metrics (MVP targets):**

- Average first-response time decreases vs. current process (baseline TBD).
- ≥ 95% of open tickets have an assigned owner within 24 hours.
- ≥ 90% of resolved tickets include a resolution summary.
- Support agents report the tool as usable without training beyond a short onboarding (qualitative, post-launch survey).

---

### 1.2 Target Users and Responsibilities

| Role | Primary responsibilities | Key needs |
|------|------------------------|-----------|
| **Support Agent** | Triage incoming issues, communicate with customers, update ticket status, document resolution steps. | Fast ticket creation, clear queue views, easy status updates, comment/thread history. |
| **Team Lead** | Monitor team workload, reassign tickets, handle escalations, review SLA adherence. | Dashboard with open/aging tickets, bulk reassignment, filter by agent/priority/status. |
| **Manager / Admin** | Configure categories, priorities, user access; review aggregate metrics. | User management, basic reporting, system configuration. |
| **Customer** *(indirect)* | Submits issues via email, portal, or internal intake; receives updates. | Timely acknowledgment and clear communication *(MVP: ticket created on their behalf by agents; customer-facing portal is post-MVP)*. |

**MVP user scope:** Support Agents, Team Leads, and Admins (internal users only). Customer self-service portal is deferred.

---

### 1.3 End-to-End Ticket Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Created   │────▶│   Triaged   │────▶│ In Progress │────▶│   Resolved  │
│  (Open/New) │     │ (Assigned)  │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
       │                   │                   │                    │
       │                   │                   │                    ▼
       │                   │                   │             ┌─────────────┐
       │                   ▼                   ▼             │   Closed    │
       │             ┌─────────────┐     ┌─────────────┐      │  (Archive)  │
       └────────────▶│  On Hold    │     │  Escalated  │      └─────────────┘
                     │ (Waiting)   │     │             │
                     └─────────────┘     └─────────────┘
```

**Lifecycle stages:**

| Stage | Description | Typical actor |
|-------|-------------|---------------|
| **Created** | Issue is logged with title, description, customer reference, and category. Status: `open`. | Agent or automated intake |
| **Triaged** | Priority and category confirmed; ticket assigned to an agent or queue. Status: `open` → `in_progress` or remains `open` in queue. | Agent or Team Lead |
| **In Progress** | Agent is actively working the issue. Internal notes and customer-facing replies are recorded. | Assigned Agent |
| **On Hold** | Waiting on customer input, third party, or internal dependency. Status: `on_hold`. | Assigned Agent |
| **Escalated** | Issue requires senior agent or specialist attention. May change assignee and/or priority. | Agent or Team Lead |
| **Resolved** | Solution documented; pending customer confirmation or auto-close window. Status: `resolved`. | Assigned Agent |
| **Closed** | Issue confirmed complete; ticket archived. Status: `closed`. | Agent, Team Lead, or auto-close after N days |

**Key lifecycle events (audit trail):**

- Status changes (with reason where applicable)
- Assignment / reassignment
- Priority changes
- Comments (internal vs. customer-visible — internal only in MVP)
- Resolution summary added

---

### 1.4 MVP Core Features

Features marked **MVP** are required for initial release. Everything else is post-MVP.

#### Authentication & Authorization
- [ ] **MVP** — Email/password or SSO login for internal users
- [ ] **MVP** — Role-based access: Agent, Team Lead, Admin

#### Ticket Management
- [ ] **MVP** — Create ticket (title, description, customer email/name, category, priority)
- [ ] **MVP** — View ticket list with filters (status, priority, assignee, category, date range)
- [ ] **MVP** — View ticket detail with full history
- [ ] **MVP** — Update ticket status
- [ ] **MVP** — Assign / reassign ticket
- [ ] **MVP** — Change priority
- [ ] **MVP** — Add internal comments
- [ ] **MVP** — Add resolution summary on resolve

#### User & Team Management
- [ ] **MVP** — Admin: invite / deactivate users
- [ ] **MVP** — Admin: assign roles
- [ ] **MVP** — View list of agents (for assignment dropdown)

#### Configuration
- [ ] **MVP** — Admin: manage categories (e.g., Billing, Technical, Account)
- [ ] **MVP** — Admin: manage priority levels (e.g., Low, Medium, High, Critical)

#### Dashboard & Reporting (lightweight)
- [ ] **MVP** — Team Lead dashboard: open ticket count by status, by agent, aging tickets (> 48h open)
- [ ] **MVP** — Agent view: "My tickets" queue

#### Audit & History
- [ ] **MVP** — Immutable activity log per ticket (who did what, when)

---

### 1.5 Post-MVP Enhancements (without affecting MVP scope)

These can be added incrementally behind the same core data model:

| Enhancement | Value | Notes |
|-------------|-------|-------|
| **Customer self-service portal** | Customers submit and track their own tickets | Requires public auth, email verification, scoped visibility |
| **Email integration** | Auto-create tickets from inbound email; send replies from ticket | Requires email provider (SendGrid, SES, etc.) |
| **SLA tracking & alerts** | First-response and resolution SLA timers with breach notifications | Builds on priority + created-at timestamps |
| **Tags & custom fields** | Flexible categorization beyond fixed categories | Schema extension; UI for admin config |
| **Knowledge base linking** | Suggest articles when creating/viewing tickets | Separate KB module or external integration |
| **Bulk actions** | Mass assign, close, or change priority | Team Lead productivity |
| **Advanced analytics** | Trend charts, CSAT, agent performance | Reporting layer on activity data |
| **File attachments** | Screenshots, logs on tickets | Storage service (S3, etc.) |
| **Real-time notifications** | In-app or push when assigned or mentioned | WebSockets or polling |
| **Multi-team / multi-tenant** | Separate queues per product line or business unit | Tenant isolation in data model |
| **Automation rules** | Auto-assign by category, auto-escalate on age | Rule engine on ticket events |
| **API & webhooks** | Integrate with CRM, billing, monitoring tools | Public API with auth |

---

## 2. Business Analysis

### 2.1 Primary Business Entities

| Entity | Description | Key attributes |
|--------|-------------|----------------|
| **User** | Internal support staff member | id, name, email, role, status (active/inactive), created_at |
| **Customer** | End customer who raised an issue | id, name, email, optional external_id, created_at |
| **Ticket** | A single customer issue / support request | id, title, description, status, priority, category_id, customer_id, assignee_id, created_by, resolved_at, closed_at, resolution_summary, created_at, updated_at |
| **Category** | Classification of issue type | id, name, description, is_active, sort_order |
| **Priority** | Urgency level | id, name, level (numeric rank), color/label, is_active |
| **Comment** | Note or reply on a ticket | id, ticket_id, author_id, body, is_internal, created_at |
| **Activity** | Audit log entry for ticket changes | id, ticket_id, actor_id, action, field_changed, old_value, new_value, created_at |

**MVP entity scope:** User, Customer (lightweight — may be inline on ticket initially), Ticket, Category, Priority, Comment, Activity.

---

### 2.2 Entity Relationships

```
┌──────────┐         creates          ┌──────────┐
│   User   │─────────────────────────▶│  Ticket  │
│ (Agent)  │         assigned_to      │          │
└──────────┘◀─────────────────────────│          │
       │                              └────┬─────┘
       │ writes                            │
       ▼                              belongs_to
┌──────────┐                              │
│ Comment  │◀─────────────────────────────┤
└──────────┘                              │
                                          ▼
┌──────────┐         raised_by      ┌──────────┐
│ Category │◀───── categorizes ─────│ Customer │
└──────────┘                        └──────────┘
       ▲
       │
┌──────────┐
│ Priority │──── sets urgency on ────▶ Ticket
└──────────┘

┌──────────┐
│ Activity │──── logs all changes on ─▶ Ticket
└──────────┘
```

**Relationship rules:**

- A **Ticket** belongs to exactly one **Customer** (MVP: customer may be embedded as name/email on ticket if separate Customer entity is deferred).
- A **Ticket** has one **Category** and one **Priority** at any time (both configurable by Admin).
- A **Ticket** has zero or one **assignee** (User); unassigned tickets sit in a team queue.
- A **Ticket** has many **Comments** and many **Activity** entries.
- A **User** can author many **Comments** and perform many **Activity** actions.
- **Categories** and **Priorities** are managed by Admin; soft-delete via `is_active` to preserve historical references.

---

### 2.3 Business Rules and Assumptions

#### Business Rules

| ID | Rule |
|----|------|
| BR-01 | Every ticket must have a title and description at creation. |
| BR-02 | Every ticket must have a status from the defined set: `open`, `in_progress`, `on_hold`, `resolved`, `closed`. |
| BR-03 | Only the assignee, a Team Lead, or an Admin may change ticket status. |
| BR-04 | Resolving a ticket requires a non-empty resolution summary. |
| BR-05 | Closed tickets are read-only except for Admin reopen (reopen → `open` or `in_progress`). |
| BR-06 | Assignment can be performed by any Agent (self-assign from queue), Team Lead, or Admin. |
| BR-07 | Priority and category must reference active configuration values. |
| BR-08 | All status, assignment, and priority changes are recorded in the activity log. |
| BR-09 | Deactivated users cannot log in; their historical tickets and comments remain visible. |
| BR-10 | Team Leads can view all tickets; Agents can view all tickets (shared queue model for MVP). |

#### Assumptions

| ID | Assumption |
|----|------------|
| AS-01 | Single organization / tenant for MVP (no multi-tenant isolation required). |
| AS-02 | All users are trusted internal staff; no customer login in MVP. |
| AS-03 | Volume is moderate (< 10,000 active tickets, < 100 concurrent users) — standard relational DB is sufficient. |
| AS-04 | English-only UI for MVP. |
| AS-05 | Customer identity is identified by email; duplicate emails may refer to the same customer (dedup is post-MVP). |
| AS-06 | Timezone: all timestamps stored in UTC; displayed in user's local timezone (or org default). |
| AS-07 | No real-time collaboration required for MVP (optimistic UI / refresh acceptable). |
| AS-08 | Email notifications are not required for MVP launch. |

---

### 2.4 Edge Cases to Consider from the Beginning

Design and data model should accommodate these even if full UI handling is deferred:

| Edge case | Risk | MVP handling |
|-----------|------|--------------|
| **Unassigned ticket sits in queue indefinitely** | SLA breach, customer dissatisfaction | Dashboard highlights unassigned and aging tickets; Team Lead can bulk-view |
| **Agent deactivated while tickets assigned** | Orphaned ownership | Allow reassignment; show "inactive assignee" badge; Admin/Lead can reassign |
| **Ticket reopened after close** | History confusion | Reopen creates activity entry; preserve full history; status → `open` |
| **Duplicate tickets for same customer/issue** | Wasted effort | MVP: manual merge/link deferred; allow search by customer email |
| **Concurrent edits (two agents update same ticket)** | Lost updates | Last-write-wins with activity log showing both changes; optimistic locking post-MVP |
| **Very long description or comment** | Storage, UI overflow | Enforce reasonable max length (e.g., 10,000 chars); truncate in list views |
| **Invalid status transitions** | Workflow corruption | Enforce allowed transitions server-side (e.g., `closed` → only `open` via reopen) |
| **Category/priority deactivated while in use** | Broken references | Soft-delete only; existing tickets retain reference; hide from new ticket form |
| **Empty or whitespace-only fields** | Data quality | Server-side validation on create/update |
| **Customer email format invalid** | Bad contact data | Validate email format on ticket create |
| **Ticket created without assignee** | Triage gap | Default status `open`, assignee null; appears in unassigned queue |
| **Resolution without root cause** | Poor knowledge capture | Resolution summary required; structured fields post-MVP |
| **High comment volume on single ticket** | Performance | Paginate comments; index by ticket_id + created_at |
| **Search across many tickets** | Slow queries | Index on status, assignee_id, customer email, created_at; full-text search post-MVP |

#### Allowed Status Transitions (MVP)

| From | To |
|------|-----|
| `open` | `in_progress`, `on_hold`, `resolved`, `closed` |
| `in_progress` | `on_hold`, `resolved`, `open` |
| `on_hold` | `in_progress`, `resolved`, `open` |
| `resolved` | `closed`, `open` (reopen) |
| `closed` | `open` (reopen — Admin/Lead only) |

---

## 3. Open Questions

Track unresolved decisions here; move to **Decisions** section once resolved.

| # | Question | Owner | Status |
|---|----------|-------|--------|
| Q1 | SSO provider (Google Workspace, Okta) vs. email/password for MVP? | Team | Open |
| Q2 | Separate Customer entity vs. inline customer fields on Ticket for MVP? | Team | Open — lean toward inline for speed, extract later |
| Q3 | Baseline SLA targets (first response, resolution)? | Product | Open |
| Q4 | Auto-close resolved tickets after N days? | Product | Open — suggest 7 days default |
| Q5 | Hosting environment (cloud provider, on-prem)? | Engineering | Open |

---

## 4. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-21 | Internal users only for MVP; no customer portal | Reduces auth and visibility complexity; agents create tickets on behalf of customers |
| 2026-07-21 | Shared queue model — all agents can see all tickets | Simpler permissions for MVP; team-scoped queues deferred |
| 2026-07-21 | Immutable activity log from day one | Auditability is a core objective; cheap to implement early, expensive to retrofit |
| 2026-07-21 | Soft-delete for categories and priorities | Preserves referential integrity on historical tickets |
| 2026-07-21 | UTC storage for all timestamps | Standard practice; display localization handled in UI layer |

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-07-21 | Planning session | Initial document created |
