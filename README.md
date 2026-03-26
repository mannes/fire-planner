# FIRECalc

Browser-only FIRE (Financial Independence, Retire Early) calculator. No backend, no API calls — all calculations run client-side.

## Features

- **FIRE Number** — how much you need to retire, with portfolio progress bar
- **Years to FIRE** — deterministic projection with portfolio growth chart
- **SWR Explorer** — compares 3–5% withdrawal rates across FIRE number, years to FIRE, and portfolio longevity
- **Monte Carlo** — 1000 simulations with log-normal returns, fan chart, and depletion histogram
- **Multilanguage** — Dutch (default) and English
- **FIRE concepts** — inline explainers on the 4% rule, expected returns, and sequence-of-returns risk

## Getting started

Requires Node 24 (`nvm use 24`).

```bash
npm install
npm run dev
```

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start dev server                          |
| `npm run build`     | Type-check and build for production       |
| `npm run typecheck` | TypeScript type check                     |
| `npm run lint`      | ESLint                                    |
| `npm run format`    | Prettier (auto-fix)                       |
| `npm run test`      | Vitest (28 tests)                         |
| `npm run ci`        | Full CI: typecheck + lint + format + test |

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- Recharts
- Vitest + ESLint + Prettier

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via GitHub Actions. Enable it once in repo Settings → Pages → Source → "GitHub Actions".

See `PLAN.md` for architecture decisions and algorithm details.
