# AGENTS.md

## Cursor Cloud specific instructions

Pomelo is a single-page **Vite + React 19 + TypeScript + Tailwind CSS 4** app (a wedding
planner with Home / Checklist / Budget tabs). State is client-side only and persisted to
`localStorage` via the hooks in `src/hooks/` — there is no backend, database, or API.

- **Dependencies / package manager**: npm (`package-lock.json`). The startup update script
  already runs `npm install`.
- **Standard commands** live in `package.json` scripts: `npm run dev`, `npm run build`
  (`tsc -b && vite build`), `npm run lint`.
- **Dev server caveat**: this is Vite, so `npm run dev` serves on **http://localhost:5173**
  (not port 3000). The `README.md` is stale — it describes a Next.js setup and references
  port 3000, `.env.local`, and `npm run start`; those do not apply to this Vite project.
- The `.env.example` (`NEXT_PUBLIC_APP_URL`) is a leftover from the Next.js scaffold and is
  not read by the app; no env vars are required to run it.
