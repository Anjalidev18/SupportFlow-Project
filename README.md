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

Before running the project, ensure you have:

- Node.js 18 or later
- npm 9 or later
- MongoDB 6+ (Local installation or MongoDB Atlas)

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

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Example configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/supportflow
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

Update the values if your local environment differs.

---

## Getting Started

1. Ensure MongoDB is running.
2. Create the backend `.env` file.
3. Start the application.
4. Register a new account.
5. Log in using your registered credentials.
6. Begin managing tickets, teams, and reports.

---

## Running the Application

Start both frontend and backend:

```bash
npm run dev
```

Or start them individually:

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
│   ├── .env.example
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
| `npm run dev` | Start frontend and backend concurrently |
| `npm run dev:frontend` | Start the frontend |
| `npm run dev:backend` | Start the backend API |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code using Prettier |

---

## API Documentation

The complete list of API endpoints, request/response formats, and implementation details can be found in:

- `docs/api-contract.md`

---

## Project Documentation

This repository includes the following documentation:

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

- JWT Authentication
- User Registration & Login
- Dashboard
- Ticket Management
- Team Management
- Reports Dashboard
- REST API
- MongoDB Integration
- Responsive Design
- Form Validation
- Error Handling

---

## Future Improvements

Potential future enhancements include:

- Role-based access control
- Email notifications
- File attachments
- Advanced analytics
- Real-time notifications
- Unit and integration testing

---

## License

This project was developed for educational and evaluation purposes.