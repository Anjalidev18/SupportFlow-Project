# SupportFlow

Internal web application for support teams to manage customer issues throughout their lifecycle — from ticket creation to resolution.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, JavaScript, SCSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |

## Prerequisites

- **Node.js** 18 or later
- **MongoDB** 6+ running locally (or a remote connection string)
- **npm** 9+

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` if your MongoDB connection differs from the default.

### 3. Start MongoDB

Ensure MongoDB is running on `mongodb://localhost:27017` (default), or update `MONGODB_URI` in `backend/.env`.

### 4. Run the application

```bash
# Start both frontend and backend
npm run dev
```

Or run individually:

```bash
npm run dev:backend   # API on http://localhost:5000
npm run dev:frontend  # App on http://localhost:5173
```

### 5. Verify

- **Frontend:** [http://localhost:5173](http://localhost:5173) — landing page with system status
- **Health check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

## Project Structure

```
SupportFlow/
├── backend/           # Express REST API
│   └── src/
│       ├── config/    # Environment & database
│       ├── routes/    # Route definitions
│       ├── controllers/
│       ├── services/  # Business logic (Phase 2)
│       ├── models/    # Mongoose schemas (Phase 2)
│       └── middleware/
├── frontend/          # React SPA
│   └── src/
│       ├── components/ui/     # Design system primitives
│       ├── components/layout/
│       ├── pages/
│       ├── styles/            # SCSS design tokens
│       └── services/          # API client
├── docs/              # Requirements, architecture, API contract
└── ai-prompts/        # AI collaboration journal
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:backend` | Start API only |
| `npm run dev:frontend` | Start frontend only |
| `npm run lint` | Lint both packages |
| `npm run format` | Format with Prettier |

## Documentation

- [Architecture](./docs/architecture.md)
- [Requirements Analysis](./docs/requirements-analysis.md)
- [Acceptance Criteria](./docs/acceptance-criteria.md)
- [Implementation Plan](./docs/implementation-plan.md)
- [Design Notes](./docs/design-notes.md)
- [API Contract](./docs/api-contract.md)

## Current Status

**Phase 1 — Project Setup & Foundation** (in progress)

- Project scaffolded with health check endpoint
- Design system tokens and UI primitives established
- Landing page with live API status indicator
- Business features (auth, tickets, dashboard) — Phase 2+

## License

Private — internal use only.
