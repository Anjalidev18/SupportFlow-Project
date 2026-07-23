# SupportFlow — Design Notes

> **Status:** Foundation established  
> **Last updated:** 2026-07-21  
> **Implementation:** `frontend/src/styles/`

---

## Design Philosophy

SupportFlow targets the visual language of **Linear**, **Notion**, **GitHub Issues**, and **Vercel** — tools that feel fast, quiet, and purposeful. The UI should:

- **Reduce cognitive load** — muted surfaces, clear hierarchy, generous whitespace
- **Prioritize content** — tickets and actions are the hero; chrome stays subtle
- **Feel precise** — tight typography, consistent spacing, intentional borders
- **Communicate state clearly** — status badges and priority colors are scannable at a glance
- **Stay approachable** — friendly without being playful; professional internal tool

We avoid heavy gradients, oversized shadows, and decorative elements. Depth comes from **layered neutrals** and **1px borders**, not drop shadows.

---

## 1. Typography

**Font stack:** `Inter` (primary), system UI fallbacks.

Inter is the common thread across Linear, GitHub, and Vercel — optimized for UI density and readability at small sizes.

| Token | Size | Weight | Line height | Use |
|-------|------|--------|-------------|-----|
| `$font-size-xs` | 12px | 400 | 1.5 | Timestamps, meta labels |
| `$font-size-sm` | 13px | 400–500 | 1.5 | Table cells, secondary text |
| `$font-size-base` | 14px | 400 | 1.6 | Body text, form inputs |
| `$font-size-md` | 16px | 500 | 1.5 | Section headings |
| `$font-size-lg` | 20px | 600 | 1.4 | Page titles |
| `$font-size-xl` | 28px | 600 | 1.3 | Marketing / landing hero |

**Why:** 14px base matches GitHub Issues and Linear — dense enough for data tables, large enough for all-day reading. Weights stay in 400–600 range; no ultralight weights that disappear on non-retina screens.

---

## 2. Spacing Scale

4px base grid. All margins, paddings, and gaps use scale tokens — never arbitrary values.

| Token | Value |
|-------|-------|
| `$space-1` | 4px |
| `$space-2` | 8px |
| `$space-3` | 12px |
| `$space-4` | 16px |
| `$space-5` | 20px |
| `$space-6` | 24px |
| `$space-8` | 32px |
| `$space-10` | 40px |
| `$space-12` | 48px |
| `$space-16` | 64px |

**Why:** A constrained scale prevents "almost the same" spacing that makes layouts feel unintentional. Card padding uses `$space-5`; page gutters use `$space-6`–`$space-8`.

---

## 3. Color Palette

### Neutrals (cool gray — Vercel/Linear influence)

| Token | Hex | Use |
|-------|-----|-----|
| `$color-bg` | `#FAFAFA` | Page background |
| `$color-surface` | `#FFFFFF` | Cards, panels, inputs |
| `$color-surface-hover` | `#F4F4F5` | Row hover, subtle fills |
| `$color-border` | `#E4E4E7` | Default borders |
| `$color-border-strong` | `#D4D4D8` | Emphasized dividers |
| `$color-text` | `#18181B` | Primary text |
| `$color-text-secondary` | `#71717A` | Meta, placeholders |
| `$color-text-tertiary` | `#A1A1AA` | Disabled, timestamps |

### Brand

| Token | Hex | Use |
|-------|-----|-----|
| `$color-primary` | `#2563EB` | Primary actions, links |
| `$color-primary-hover` | `#1D4ED8` | Button hover |
| `$color-primary-subtle` | `#EFF6FF` | Selected rows, info backgrounds |

**Why blue:** Universal "action" color in SaaS; distinct from status semantics below.

### Semantic — Status (ticket lifecycle)

| Status | Background | Text | Rationale |
|--------|------------|------|-----------|
| Open | `#F4F4F5` | `#52525B` | Neutral — awaiting action |
| In Progress | `#EFF6FF` | `#1D4ED8` | Active work — brand blue |
| On Hold | `#FEF9C3` | `#A16207` | Pause — amber caution |
| Resolved | `#DCFCE7` | `#15803D` | Success — green |
| Closed | `#F4F4F5` | `#A1A1AA` | Muted — archived |

### Semantic — Priority

| Priority | Color | Rationale |
|----------|-------|-----------|
| Low | `#71717A` | Recedes visually |
| Medium | `#2563EB` | Default attention |
| High | `#EA580C` | Orange urgency |
| Critical | `#DC2626` | Red — immediate |

### Feedback

| Token | Hex | Use |
|-------|-----|-----|
| `$color-success` | `#16A34A` | Confirmations |
| `$color-warning` | `#CA8A04` | Warnings |
| `$color-error` | `#DC2626` | Errors, destructive |
| `$color-info` | `#2563EB` | Informational toasts |

---

## 4. Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `$radius-sm` | 4px | Badges, small chips |
| `$radius-md` | 6px | Buttons, inputs |
| `$radius-lg` | 8px | Cards, modals |
| `$radius-xl` | 12px | Large panels, landing cards |
| `$radius-full` | 9999px | Avatars, pills |

**Why:** 6–8px radius is the sweet spot for modern SaaS — softer than GitHub's near-square, tighter than overly rounded "consumer" apps.

---

## 5. Shadows

Used sparingly. Prefer borders for elevation.

| Token | Value | Use |
|-------|-------|-----|
| `$shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Dropdowns |
| `$shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Modals, popovers |
| `$shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Landing feature cards on hover |

**Why:** Linear and Vercel rely on borders + background contrast. Shadows appear only for floating elements.

---

## 6. Buttons

| Variant | Appearance | Use |
|---------|------------|-----|
| **Primary** | Blue fill, white text | Main CTA — one per view |
| **Secondary** | White fill, border | Alternative actions |
| **Ghost** | No border, hover fill | Toolbar, table actions |
| **Danger** | Red fill or red text | Delete, irreversible |

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 28px | 0 10px | 13px |
| `md` | 32px | 0 14px | 14px |
| `lg` | 36px | 0 18px | 14px |

**States:** hover (darken fill / add surface-hover), focus (2px blue ring), disabled (50% opacity, no pointer), loading (spinner replaces label).

**Why:** 32px default height matches input fields for aligned form rows. One primary button per screen reduces decision fatigue.

---

## 7. Forms

- **Inputs:** 32px height, `$radius-md`, 1px `$color-border`, focus ring `$color-primary`
- **Labels:** 13px, `$color-text`, `$space-2` below label before input
- **Helper text:** 12px, `$color-text-secondary`
- **Error:** red border + 12px error message below
- **Textarea:** min-height 80px, same border/focus as inputs

**Why:** Consistent input height with buttons enables horizontal form toolbars (e.g., comment box + submit).

---

## 8. Cards

- Background: `$color-surface`
- Border: 1px `$color-border`
- Radius: `$radius-lg`
- Padding: `$space-5`
- Optional header with bottom border for titled sections

**Why:** Bordered cards (not shadowed) match GitHub Issues and Notion database views.

---

## 9. Tables

- Header: 12px uppercase or 13px semibold, `$color-text-secondary`, `$color-surface-hover` background
- Rows: 44px min-height, bottom border `$color-border`
- Hover: `$color-surface-hover` background
- Cell padding: `$space-3` `$space-4`
- Sticky header on scroll (app views)

**Why:** 44px rows are touch-friendly and match clickable row affordance in Linear.

---

## 10. Status Badges

Pill shape (`$radius-full`), 12px font, 500 weight, 2px 8px padding.

Each status maps to semantic colors in §3. Badge = background + text color pair; never border-only for status (harder to scan).

Optional dot prefix (6px circle) for extra clarity in dense tables.

---

## 11. Page Layouts

### App shell (authenticated — Phase 3)

```
┌──────────┬────────────────────────────────────┐
│ Sidebar  │  Page header (title + actions)     │
│  240px   ├────────────────────────────────────┤
│          │  Content area (max-width optional) │
│          │                                    │
└──────────┴────────────────────────────────────┘
```

- Sidebar: fixed, `$color-surface`, right border
- Content: `$color-bg` background, `$space-6` padding
- Page header: title left, primary action right

### Landing / marketing

- Centered max-width 1120px
- Hero + feature grid + footer
- More vertical rhythm (`$space-12`+ between sections)

---

## 12. Responsive Breakpoints

| Token | Width | Behavior |
|-------|-------|----------|
| `$bp-sm` | 640px | Stack form columns |
| `$bp-md` | 768px | Collapse sidebar to overlay |
| `$bp-lg` | 1024px | Full app layout |
| `$bp-xl` | 1280px | Wider content max-width |

**Mobile strategy:** SupportFlow is primarily a desktop agent tool. Tablet gets usable layout; phone gets read-only fallback message in MVP (not optimized).

---

## 13. Loading States

| Pattern | Use |
|---------|-----|
| **Spinner** | Button loading, inline refresh |
| **Skeleton** | Table rows, card content — preserves layout |
| **Page loader** | Initial route load — centered spinner |

**Why skeletons over spinners for lists:** prevents layout shift; feels faster (Linear pattern).

---

## 14. Empty States

- Centered in content area
- Simple line icon (SVG, `$color-text-tertiary`)
- Title: 16px semibold
- Description: 14px secondary, max-width 360px
- Optional CTA button

**Tone:** helpful, not cute. "No tickets yet" + "Create your first ticket" — not illustrations.

---

## 15. Notification Patterns

| Type | Position | Duration | Style |
|------|----------|----------|-------|
| Toast success | Top-right | 4s auto-dismiss | Green left border |
| Toast error | Top-right | Manual dismiss | Red left border |
| Toast info | Top-right | 4s | Blue left border |
| Inline alert | Above form | Persistent until resolved | Full-width banner in content |

**Why top-right toasts:** standard SaaS pattern; doesn't block main content.

---

## 16. Motion

| Token | Value | Use |
|-------|-------|-----|
| `$transition-fast` | 120ms ease | Hover, focus |
| `$transition-base` | 200ms ease | Dropdowns, modals |
| `$transition-slow` | 300ms ease | Page transitions |

Keep motion subtle. No bounce or spring animations.

---

## File Map

```
frontend/src/styles/
├── _variables.scss      # All tokens
├── _mixins.scss         # respond-to, focus-ring, truncate
├── _reset.scss          # Minimal reset
├── _typography.scss     # Base type styles
├── main.scss            # Entry — imports all
└── components/
    ├── _buttons.scss
    ├── _forms.scss
    ├── _cards.scss
    ├── _tables.scss
    ├── _badges.scss
    ├── _notifications.scss
    └── _states.scss     # loading, empty
```

---

## Revision History

| Date | Changes |
|------|---------|
| 2026-07-21 | Initial design system foundation |
