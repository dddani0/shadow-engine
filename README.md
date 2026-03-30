# Shadow Engine

A visual novel game engine built with a modern full-stack architecture.

## 🏗️ Architecture

| Part      | Technology                              |
|-----------|-----------------------------------------|
| Backend   | NestJS + Prisma + PostgreSQL            |
| Frontend  | Angular 21 + Vitest                     |

## 📁 Repository Structure

```
shadow-engine/
├── backend/          # NestJS REST API server
│   ├── src/          # Source code
│   ├── prisma/       # Database schema & migrations
│   └── test/         # E2E tests
├── frontend/         # Angular web application
│   ├── src/          # Source code
│   └── dist/         # Production build output
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v22+)
- **npm**
- **PostgreSQL** (running locally on port 5432)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadow-engine
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run db:generate
   npm run db:migrate
   npm run start:dev
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run start
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - API reference, database setup, deployment
- [Frontend Documentation](./frontend/README.md) - Development server, building, testing

## 🔧 Development Commands

### Backend

| Command              | Description                    |
|----------------------|--------------------------------|
| `npm run start:dev`  | Start development server       |
| `npm run db:migrate` | Run database migrations        |
| `npm run db:push`    | Sync schema without migration  |
| `npm run test`       | Run unit tests                 |
| `npm run test:e2e`   | Run end-to-end tests           |
| `npm run lint`       | Lint TypeScript files          |

### Frontend

| Command        | Description                      |
|----------------|----------------------------------|
| `npm run start`| Start development server         |
| `npm run build`| Build for production             |
| `npm run test` | Run unit tests with Vitest       |

## 🎮 Features

- **Project Management** - Create and manage visual novel projects
- **Scene Editor** - Build and organize scenes
- **Choice System** - Create branching narratives with choices
- **Playback Engine** - Run and test your visual novel

## 📄 License

MIT
