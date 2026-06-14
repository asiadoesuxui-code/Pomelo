# Pomelo

A wedding planning web application — guest lists, budgets, vendors, timelines, and checklists in one calm workspace.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build       |
| `npm run start` | Run production server  |
| `npm run lint`  | Run ESLint             |

## Project structure

```
src/
  app/
    layout.tsx    # Root layout & fonts
    page.tsx      # Landing page
    globals.css   # Theme & Tailwind
```

## Initialize git (if needed)

If git was not initialized during setup, run this from the project root:

```bash
git init
git add .
git commit -m "Initial Pomelo scaffold"
```
