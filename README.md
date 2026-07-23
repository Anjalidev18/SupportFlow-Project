# SupportFlow – Support Ticket Management System

SupportFlow is a full-stack web application designed to help support teams efficiently manage customer support requests throughout their lifecycle. The application provides secure authentication, ticket management, team management, reporting, and a responsive user interface for streamlined support operations.

---

## Features

- JWT-based User Authentication
- User Registration & Login
- Protected Routes
- Dashboard with support metrics
- Ticket Management (Create, Read, Update, Delete)
- Team Management
- Reports Dashboard
- RESTful API
- MongoDB Database Integration
- Responsive User Interface
- Form Validation
- Error Handling

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, JavaScript, SCSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token (JWT) |

---

## Project Architecture

```text
Frontend (React + Vite)
          │
          ▼
Backend (Express REST API)
          │
          ▼
MongoDB Database
```

---

## Prerequisites

Before running the project, ensure the following are installed:

- Node.js 18 or later
- npm 9 or later
- MongoDB 6+ (Local or MongoDB Atlas)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Anjalidev18/SupportFlow-Project.git
```

Navigate to the project directory:

```bash
cd SupportFlow-Project
```

Install all dependencies:

```bash
npm install
```

---

## Environment Variables

Create environment files from the provided examples.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Example backend configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/supportflow
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

Update the values if your local environment differs.

---

## Running the Application

Start both frontend and backend simultaneously:

```bash
npm run dev
```

Or start each service individually:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

---

## Application URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |

---

## Project Structure

```text
SupportFlow/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
│   └── package.json
│
├── docs/
├── ai-prompts/
├── package.json
└── README.md
```

---

## Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start frontend and backend |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code using Prettier |

---

## API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/tickets` | Retrieve all tickets |
| POST | `/api/tickets` | Create a new ticket |
| PUT | `/api/tickets/:id` | Update an existing ticket |
| DELETE | `/api/tickets/:id` | Delete a ticket |
| GET | `/api/teams` | Retrieve all teams |
| GET | `/api/reports` | Retrieve dashboard reports |

For detailed API information, refer to:

- `docs/api-contract.md`

---

## Project Documentation

The repository includes supporting documentation created during the development process:

- Requirements Analysis
- Implementation Plan
- Architecture Documentation
- Design Notes
- API Contract
- Acceptance Criteria
- Test Strategy
- Debugging Notes
- Code Review Notes
- Reflection
- Pull Request Description
- AI Prompt History

---

## Current Status

The project has been completed and includes:

- Secure Authentication using JWT
- Dashboard Module
- Ticket Management
- Team Management
- Reports Dashboard
- REST API Backend
- MongoDB Integration
- Responsive Design
- Form Validation
- Error Handling

---

## Future Improvements

Possible future enhancements include:

- Role-based access control
- Email notifications
- File attachments for tickets
- Advanced analytics and reporting
- Real-time notifications
- Unit and integration testing

---

## License

This project was developed for educational and evaluation purposes.