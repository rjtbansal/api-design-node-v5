# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Habit Tracker API — the companion/starter repo for the "API Design with Node.js, v5" Frontend Masters course. This `main` branch is the **starter project**: route files currently contain only dummy handlers (static JSON responses), and there is no database layer, auth logic, or tests wired up yet. See `API_DOCS.md` for the full target API contract (request/response shapes, error formats, pagination, rate limiting) that the real implementation should eventually satisfy, and `schedule.txt` for the course's build order (DB schema → CRUD → auth/JWT → middleware → testing → deployment).

Node.js 23.6.0+ is required.

## Commands

- `npm run dev` — run the server with `tsx --watch` (auto-restart on change)
- `npm start` — run once via `node` (no watch)
- `npm test` — run the full Vitest suite once
- `npm run test:watch` — Vitest in watch mode
- `npm run test:coverage` — Vitest with coverage
- Run a single test file: `npx vitest run path/to/file.test.ts`
- Run tests matching a name: `npx vitest run -t "test name"`

There is no lint or typecheck script defined in `package.json`; `tsconfig.json` has `noEmit: true` (type-checking only, no build step — TS files run directly via `tsx`).

## Environment

Env vars are loaded and validated in `env.ts` (Zod schema), not read directly from `process.env` elsewhere — always import `env` from `env.ts`. Key vars: `DATABASE_URL` (must start with `postgresql://`), `JWT_SECRET` (min 32 chars), `JWT_EXPIRES_IN`, `BCRYPT_ROUNDS`, `PORT`, `APP_STAGE`/`NODE_ENV`.

`APP_STAGE` (`dev` | `test` | `production`) drives which dotenv file `custom-env` loads: `dev` loads `.env`, `test` loads `.env.test`. Production is expected to get env vars from the platform, not a file. `env.ts` calls `process.exit(1)` on invalid env, so a missing/malformed var fails fast at import time rather than at first use.

## Architecture

- `src/index.ts` — entrypoint; imports the app from `server.ts` and starts listening on `env.PORT`.
- `src/server.ts` — builds the Express app, mounts `/health` and the three route groups (`/api/auth`, `/api/habits`, `/api/users`). Exports `app` (named + default) so it can be imported into tests without binding a port.
- `src/routes/*.ts` — one router per resource (`authRoutes.ts`, `habitRoutes.ts`, `userRoutes.ts`), each exporting an Express `Router` via `export default router`. Currently stub handlers only.
- `drizzle.config.ts` expects a schema at `src/db/schema.ts` (postgresql dialect, migrations output to `./migrations`) — this path doesn't exist yet, so DB-touching work needs to create it first.
- `vitest.config.ts` references `./tests/setup/globalSetup.ts` for global test setup (e.g. spinning up/tearing down a test DB) and forces single-threaded sequential test execution to avoid DB conflicts — neither the `tests/` directory nor that setup file exists yet, so the first test-related work needs to create them.

## Conventions

- Files use `.ts` extensions in import specifiers (`from './server.ts'`) — required by the `nodenext`/`allowImportingTsExtensions`/`rewriteRelativeImportExtensions` TS config combo. Keep this pattern in new relative imports.
- No semicolons, single quotes (enforced by `.prettierrc` — existing files are inconsistent, but new code should follow this).
