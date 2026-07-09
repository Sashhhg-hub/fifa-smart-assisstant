# Stadium GPT

FIFA Smart Assistant — a monorepo for match insights, powered by React, Express, MongoDB, and Google Gemini.

## Project Structure

```
stadium-gpt/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── api/          # Express backend
├── packages/
│   └── shared/       # Shared TypeScript types
└── package.json      # Root workspace config
```

## Prerequisites

- Node.js >= 20
- npm >= 10

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start the development servers:

   ```bash
   # Frontend (http://localhost:5173)
   npm run dev:web

   # Backend (http://localhost:3001)
   npm run dev:api
   ```

## Scripts

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run dev:web`    | Start the Vite dev server      |
| `npm run dev:api`    | Start the Express dev server   |
| `npm run build`      | Build all workspaces           |
| `npm run lint`       | Run ESLint across the monorepo |
| `npm run lint:fix`   | Fix auto-fixable lint issues   |
| `npm run format`     | Format code with Prettier      |
| `npm run typecheck`  | Type-check all workspaces      |

## Tech Stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend  | Node.js, Express, TypeScript          |
| Database | MongoDB                               |
| AI       | Google Gemini API                     |
