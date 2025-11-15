# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

This is a Turborepo monorepo with the following workspace structure:

### Apps
- **apps/app**: Next.js 16 frontend (React 19) with tRPC client, uses App Router
- **apps/api**: Hono-based API server with tRPC backend
- **apps/auth-server**: Standalone Hono authentication server using better-auth

### Packages
- **packages/auth**: Shared better-auth configuration and client
- **packages/db**: Drizzle ORM setup for PostgreSQL with schema definitions
- **packages/logger**: Shared Pino logger with pretty printing

## Development Commands

### Root Level
- `bun install` - Install all dependencies
- `bun run dev` - Run all apps in development mode (uses Turbo)
- `bun run build` - Build all apps and packages
- `bun run lint` - Run sherif to check monorepo dependency consistency
- `bun run format:check` - Check code formatting across all workspaces
- `bun run format:write` - Format code across all workspaces

### Database (packages/db)
- `bun run generate` - Generate Drizzle migrations from schema
- `bun run migrate` - Apply migrations to database
- `bun run studio` - Open Drizzle Studio for database inspection
- `bun run nuke` - Generate and apply migrations (fresh start)

### Auth Package (packages/auth)
- `bun run db:generate` - Generate better-auth database schema

### Individual Apps
- `bun run dev` - Run specific app in development with hot reload
  - API: `cd apps/api && bun run dev` (runs on PORT from .env)
  - Auth Server: `cd apps/auth-server && bun run dev` (runs on PORT from .env)
  - Frontend: `cd apps/app && bun run dev` (Next.js dev server)

## Architecture

### Authentication Flow
- **better-auth** is used for authentication with email/password
- Auth is configured in `packages/auth/src/server.ts` with custom fields (onboarded, role)
- Standalone auth server (`apps/auth-server`) handles auth endpoints at `/api/auth/*`
- Auth state is managed via cookies and sessions stored in PostgreSQL
- Additional fields: `onboarded` (boolean) and `role` (string) on user model

### API Architecture
- **Hono** serves as the HTTP framework for both API and auth servers
- **tRPC** handles type-safe API calls between frontend and backend
- API server structure:
  - `apps/api/src/app.ts` - Hono app with CORS, security headers, tRPC endpoint
  - `apps/api/src/trpc/init.ts` - tRPC initialization with context, procedures (public/protected)
  - `apps/api/src/trpc/routers/` - Individual router modules
  - Protected procedures use auth middleware to verify session from headers
  - Timing middleware adds artificial delay in dev (100-500ms) for realistic testing

### Frontend Architecture
- Next.js 16 with App Router and React 19
- tRPC React Query integration for API calls
- Client setup in `apps/app/src/server/api/client.tsx`
- Uses `credentials: "include"` for cross-origin auth cookies
- Shared workspace packages referenced via `@clio/*` imports

### Database
- PostgreSQL with Drizzle ORM
- Connection via `postgres` package (not pg or postgres.js)
- Schema defined in `packages/db/src/schema/`
- Uses snake_case naming convention
- Migrations in `packages/db/src/migrations/`

### Logging
- Pino logger with pretty printing in development
- Imported from `@clio/logger`
- Used in both Hono servers via middleware

## Environment Variables

Each app manages its own environment:
- `apps/api` - PORT, DATABASE_URL, ALLOWED_ORIGINS, AUTH_SECRET
- `apps/auth-server` - PORT, ALLOWED_ORIGINS, AUTH_SECRET, DATABASE_URL (via auth package)
- `apps/app` - NEXT_PUBLIC_API_URL, etc.

Bun automatically loads .env files, no dotenv package needed.

## Git Hooks

Pre-commit hook (via Husky):
1. Runs `sherif` to validate monorepo dependencies
2. Runs `turbo run format:write` to format all code
3. Stages formatted files automatically

## Technology Stack

- **Runtime**: Bun (not Node.js)
- **Monorepo**: Turborepo
- **Frontend**: Next.js 16, React 19, TailwindCSS 4, shadcn/ui
- **Backend**: Hono, tRPC 11
- **Auth**: better-auth with Drizzle adapter
- **Database**: PostgreSQL, Drizzle ORM
- **Validation**: Zod
- **Logging**: Pino

## Important Notes

- Use Bun commands, not npm/pnpm/yarn (see existing CLAUDE.md for Bun-specific APIs)
- All workspace packages use `workspace:*` protocol
- CORS is configured to allow credentials for auth cookies
- API and auth-server are separate processes (can run independently)
- Frontend proxies API calls to backend via tRPC over HTTP
