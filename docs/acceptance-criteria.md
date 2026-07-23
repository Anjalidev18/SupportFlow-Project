# SupportFlow — Acceptance Criteria

> **Status:** Planning phase  
> **Last updated:** 2026-07-21  
> **Purpose:** Living document defining testable acceptance criteria for MVP features. Each criterion should be verifiable before a feature is considered complete.

---

## How to Use This Document

- Criteria are grouped by feature area.
- Format: **Given / When / Then** (behavior-driven).
- Priority: **P0** = must-have for MVP launch, **P1** = should-have, **P2** = nice-to-have.
- Status: `Not Started` | `In Progress` | `Done`
- Link to requirements: see [requirements-analysis.md](./requirements-analysis.md).

---

## 1. Authentication & Authorization

### AC-AUTH-01: User login (P0)
- **Given** a registered active user with valid credentials
- **When** they submit the login form
- **Then** they are authenticated and redirected to their role-appropriate home view
- **Status:** Not Started

### AC-AUTH-02: Invalid login rejected (P0)
- **Given** a user submits incorrect email or password
- **When** they attempt to log in
- **Then** they see a generic error message (no indication of which field failed) and remain unauthenticated
- **Status:** Not Started

### AC-AUTH-03: Deactivated user cannot log in (P0)
- **Given** a user account with status `inactive`
- **When** they attempt to log in with previously valid credentials
- **Then** login is denied
- **Status:** Not Started

### AC-AUTH-04: Role-based route protection (P0)
- **Given** an authenticated Agent
- **When** they attempt to access Admin-only pages (user management, category config)
- **Then** they are denied access (403 or redirect)
- **Status:** Not Started

### AC-AUTH-05: Session persistence (P0)
- **Given** a logged-in user
- **When** they refresh the page or navigate within the app
- **Then** their session remains valid until logout or expiry
- **Status:** Not Started

### AC-AUTH-06: Logout (P0)
- **Given** a logged-in user
- **When** they click logout
- **Then** their session is invalidated and they are redirected to the login page
- **Status:** Not Started

---

## 2. Ticket Creation

### AC-TKT-01: Create ticket with required fields (P0)
- **Given** an authenticated Agent
- **When** they submit a new ticket with title, description, customer name, customer email, category, and priority
- **Then** a ticket is created with status `open`, the creating user recorded, and a timestamp
- **Status:** Not Started

### AC-TKT-02: Validation on missing required fields (P0)
- **Given** an Agent creating a ticket
- **When** they omit title, description, or customer email
- **Then** the form shows validation errors and no ticket is created
- **Status:** Not Started

### AC-TKT-03: Invalid email rejected (P0)
- **Given** an Agent enters a malformed customer email
- **When** they submit the ticket form
- **Then** validation fails with a clear error message
- **Status:** Not Started

### AC-TKT-04: Activity log on creation (P0)
- **Given** a ticket is successfully created
- **When** viewing the ticket detail
- **Then** the activity log shows a `created` event with the actor and timestamp
- **Status:** Not Started

### AC-TKT-05: Optional assignee on create (P1)
- **Given** an Agent creating a ticket
- **When** they optionally select an assignee
- **Then** the ticket is created with that assignee and an `assigned` activity entry
- **Status:** Not Started

---

## 3. Ticket List & Search

### AC-LIST-01: View all tickets (P0)
- **Given** an authenticated Agent or Team Lead
- **When** they navigate to the ticket list
- **Then** they see a paginated list of tickets with title, status, priority, assignee, customer, and created date
- **Status:** Not Started

### AC-LIST-02: Filter by status (P0)
- **Given** the ticket list is displayed
- **When** the user filters by one or more statuses
- **Then** only matching tickets are shown
- **Status:** Not Started

### AC-LIST-03: Filter by priority (P0)
- **Given** the ticket list is displayed
- **When** the user filters by priority
- **Then** only matching tickets are shown
- **Status:** Not Started

### AC-LIST-04: Filter by assignee (P0)
- **Given** the ticket list is displayed
- **When** the user filters by assignee (including "Unassigned")
- **Then** only matching tickets are shown
- **Status:** Not Started

### AC-LIST-05: Filter by category (P1)
- **Given** the ticket list is displayed
- **When** the user filters by category
- **Then** only matching tickets are shown
- **Status:** Not Started

### AC-LIST-06: Sort by date and priority (P1)
- **Given** the ticket list is displayed
- **When** the user sorts by created date or priority
- **Then** tickets are reordered accordingly
- **Status:** Not Started

### AC-LIST-07: My tickets view (P0)
- **Given** an authenticated Agent
- **When** they navigate to "My Tickets"
- **Then** they see only tickets assigned to them
- **Status:** Not Started

---

## 4. Ticket Detail & Updates

### AC-DET-01: View ticket detail (P0)
- **Given** a ticket exists
- **When** a user opens the ticket detail page
- **Then** they see title, description, status, priority, category, customer info, assignee, comments, and activity log
- **Status:** Not Started

### AC-DET-02: Update status (P0)
- **Given** an assignee, Team Lead, or Admin viewing an open ticket
- **When** they change the status to an allowed transition
- **Then** the status updates and an activity entry is recorded
- **Status:** Not Started

### AC-DET-03: Invalid status transition blocked (P0)
- **Given** a ticket with status `closed`
- **When** an Agent (non-Admin/Lead) attempts to change status
- **Then** the change is rejected
- **Status:** Not Started

### AC-DET-04: Assign / reassign ticket (P0)
- **Given** a ticket exists
- **When** an Agent self-assigns, or a Lead/Admin reassigns to another active user
- **Then** the assignee updates and an activity entry is recorded
- **Status:** Not Started

### AC-DET-05: Change priority (P0)
- **Given** a ticket exists
- **When** the assignee, Lead, or Admin changes priority
- **Then** priority updates and an activity entry is recorded
- **Status:** Not Started

### AC-DET-06: Add internal comment (P0)
- **Given** a ticket detail page
- **When** a user submits a non-empty comment
- **Then** the comment appears in chronological order with author name and timestamp
- **Status:** Not Started

### AC-DET-07: Resolve with summary (P0)
- **Given** a ticket in a resolvable status
- **When** the user sets status to `resolved` without a resolution summary
- **Then** the action is blocked with a validation error
- **Status:** Not Started

### AC-DET-08: Resolve with summary succeeds (P0)
- **Given** a ticket in a resolvable status
- **When** the user sets status to `resolved` with a non-empty resolution summary
- **Then** status becomes `resolved`, `resolved_at` is set, and activity is logged
- **Status:** Not Started

### AC-DET-09: Closed ticket is read-only (P0)
- **Given** a ticket with status `closed`
- **When** an Agent attempts to edit fields or add comments
- **Then** the action is blocked (except Admin/Lead reopen)
- **Status:** Not Started

### AC-DET-10: Reopen closed ticket (P1)
- **Given** a closed ticket
- **When** an Admin or Team Lead reopens it
- **Then** status returns to `open` and a reopen activity entry is recorded
- **Status:** Not Started

---

## 5. Dashboard (Team Lead)

### AC-DASH-01: Open ticket summary (P0)
- **Given** a Team Lead is logged in
- **When** they view the dashboard
- **Then** they see counts of tickets grouped by status
- **Status:** Not Started

### AC-DASH-02: Tickets by agent (P0)
- **Given** the Team Lead dashboard
- **When** displayed
- **Then** open ticket count per agent is shown (including unassigned count)
- **Status:** Not Started

### AC-DASH-03: Aging tickets highlight (P1)
- **Given** tickets open longer than 48 hours
- **When** the dashboard loads
- **Then** aging tickets are surfaced (count and/or list link)
- **Status:** Not Started

---

## 6. Admin — User Management

### AC-ADM-01: List users (P0)
- **Given** an Admin
- **When** they navigate to user management
- **Then** they see all users with name, email, role, and status
- **Status:** Not Started

### AC-ADM-02: Invite / create user (P0)
- **Given** an Admin
- **When** they create a user with name, email, and role
- **Then** the user is created with status `active` and can log in
- **Status:** Not Started

### AC-ADM-03: Deactivate user (P0)
- **Given** an active user
- **When** an Admin deactivates them
- **Then** the user status becomes `inactive` and they cannot log in
- **Status:** Not Started

### AC-ADM-04: Change user role (P1)
- **Given** an active user
- **When** an Admin changes their role
- **Then** the new role takes effect on next request (or immediately)
- **Status:** Not Started

---

## 7. Admin — Configuration

### AC-CFG-01: Manage categories (P0)
- **Given** an Admin
- **When** they add, edit, or deactivate a category
- **Then** active categories appear in ticket forms; deactivated categories do not appear for new tickets but remain on existing tickets
- **Status:** Not Started

### AC-CFG-02: Manage priorities (P0)
- **Given** an Admin
- **When** they add, edit, or deactivate a priority level
- **Then** active priorities appear in ticket forms; deactivated priorities behave like categories
- **Status:** Not Started

### AC-CFG-03: Seed default categories and priorities (P0)
- **Given** a fresh system install
- **When** the application is first set up
- **Then** default categories (e.g., Billing, Technical, Account, General) and priorities (Low, Medium, High, Critical) exist
- **Status:** Not Started

---

## 8. Activity Log & Audit

### AC-AUD-01: Complete activity history (P0)
- **Given** a ticket with multiple changes
- **When** viewing the activity log
- **Then** every status change, assignment, priority change, and creation event is listed with actor and timestamp
- **Status:** Not Started

### AC-AUD-02: Activity log is append-only (P0)
- **Given** any user role
- **When** they attempt to edit or delete an activity entry via API or UI
- **Then** the operation is rejected
- **Status:** Not Started

---

## 9. Non-Functional Criteria

### AC-NFR-01: Page load performance (P1)
- **Given** a typical dataset (< 5,000 tickets)
- **When** a user loads the ticket list
- **Then** the page renders within 2 seconds on a standard connection
- **Status:** Not Started

### AC-NFR-02: API error handling (P0)
- **Given** a server error occurs
- **When** the user performs an action
- **Then** they see a user-friendly error message (not a stack trace)
- **Status:** Not Started

### AC-NFR-03: Responsive layout (P1)
- **Given** a user on a tablet-width viewport
- **When** they use core flows (list, detail, create)
- **Then** the UI remains usable without horizontal scrolling
- **Status:** Not Started

### AC-NFR-04: Accessibility basics (P1)
- **Given** keyboard-only navigation
- **When** using primary flows
- **Then** all interactive elements are reachable and form fields have labels
- **Status:** Not Started

---

## MVP Launch Checklist

All **P0** criteria must pass before MVP launch.

| Area | P0 total | P0 done | Ready |
|------|----------|---------|-------|
| Authentication | 6 | 0 | ☐ |
| Ticket Creation | 4 | 0 | ☐ |
| Ticket List | 5 | 0 | ☐ |
| Ticket Detail | 8 | 0 | ☐ |
| Dashboard | 2 | 0 | ☐ |
| User Management | 3 | 0 | ☐ |
| Configuration | 3 | 0 | ☐ |
| Audit | 2 | 0 | ☐ |
| Non-Functional | 1 | 0 | ☐ |

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-07-21 | Planning session | Initial acceptance criteria for MVP |
