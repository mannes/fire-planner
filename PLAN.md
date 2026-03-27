# FIRE Planner — Implementation Notes

## What this is

Browser-only FIRE (Financial Independence, Retire Early) calculator. No backend, no API calls, no external requests — everything runs client-side. Built with React 19 + TypeScript + Vite 8 + Recharts + Tailwind CSS v4.

**Requires Node 24** (`.nvmrc` is set). Run `nvm use 24` before working on this project.

---

## File structure

```
src/
├── App.tsx                          # Root: GlobalInputs state + layout
├── main.tsx                         # Mounts App, wraps with I18nProvider
├── index.css                        # @import "tailwindcss" — Tailwind v4 syntax
│
├── lib/                             # Pure TS functions, zero React deps
│   ├── types.ts                     # All shared interfaces
│   ├── format.ts                    # Shared Intl formatters (EUR, en-IE locale)
│   ├── fireNumber.ts
│   ├── yearsToFire.ts
│   ├── swrExplorer.ts
│   └── monteCarlo.ts
│
├── i18n/
│   ├── translations.ts              # All UI strings, nl (default) + en
│   ├── I18nContext.tsx              # Provider + useI18n hook
│   └── useI18n.ts                   # Re-export to satisfy react-refresh rule
│
├── hooks/
│   └── useDebounce.ts
│
└── components/
    ├── layout/SectionCard.tsx
    ├── inputs/
    │   ├── SliderInput.tsx
    │   └── InputPanel.tsx
    └── sections/
        ├── FireNumberSection.tsx
        ├── YearsToFireSection.tsx
        ├── SwrExplorerSection.tsx
        ├── MonteCarloSection.tsx
        └── InfoSection.tsx
    └── charts/
        ├── PortfolioGrowthChart.tsx
        ├── SwrSensitivityChart.tsx
        └── MonteCarloChart.tsx      # MonteCarloFanChart + DepletionHistogram
```

---

## Key design decisions

### Calculation architecture

All calculation logic lives in `src/lib/` as pure TypeScript functions with no React dependencies. Components only call these functions via `useMemo` and render the results. This keeps the logic testable in isolation.

### State management

A single `GlobalInputs` object in `App.tsx` useState is passed down to all sections. No context, no external store — the scope doesn't justify it.

### Tailwind CSS v4 setup

v4 does **not** use `tailwind.config.js` or a CLI binary. Instead:

- Install `@tailwindcss/vite` and add it as a Vite plugin
- In `index.css`: `@import "tailwindcss"` (not the three `@tailwind` directives)

### Internationalisation

Dutch is the default language. The `I18nContext` exports both `I18nProvider` (a component) and `useI18n` (a hook) from the same file. ESLint's `react-refresh/only-export-components` flags this — suppressed with a targeted `// eslint-disable-next-line` comment on `useI18n`. A re-export file `useI18n.ts` exists but the real implementation stays in `I18nContext.tsx` to share the private `I18nContext` variable.

### Currency formatting

`src/lib/format.ts` uses `en-IE` locale with `currency: 'EUR'`. This gives `€40,000` formatting. All components import from here — no inline `Intl.NumberFormat` calls in components.

### Guidance UX

The calculator now includes two explanation patterns for non-expert users:

- Inline click-to-open `?` popups on important inputs
- Collapsible explainer boxes at the bottom of result cards

The popups are dismissible via close button, outside click, or `Escape`. Copy should avoid jargon where possible and explain outputs in terms of **today's money** rather than assuming users understand real-vs-nominal returns.

Expenses and savings are now entered as **monthly** amounts in the UI, with the derived yearly amount shown alongside. The calculation layer still uses annual values internally, so `InputPanel` converts monthly input back to annual numbers before passing state into `src/lib/`.

### Slider ranges

Money sliders are capped at realistic values for a European retail user:

| Slider | Min | Max |
| --- | --- | --- |
| Monthly expenses | €800 | €10,000 |
| Current portfolio | €0 | €2,000,000 |
| Monthly savings | €0 | €10,000 |
| Expected real return | 1% | 15% |
| Withdrawal rate | 2% | 6% |

### Branding

The product name is **FIRE Planner**. Browser title, header branding, README/PLAN naming, and favicon should stay aligned with that brand. Current visual branding uses a fire motif.

---

## Algorithms

### FIRE Number

```
fireNumber = annualExpenses / withdrawalRate
```

Classic formula. The 4% rule gives `25× annual expenses`.

### Years to FIRE

Year-by-year accumulation loop (end-of-year contribution model):

```
portfolio[t] = portfolio[t-1] * (1 + realReturn) + annualSavings
```

Stops when `portfolio ≥ fireNumber`. Returns `null` if not reached within 100 years. Returns `0` if already at FIRE. The projection data continues 5 years past the FIRE year for chart context.

### SWR Explorer

Runs FIRE number + years-to-FIRE + portfolio longevity for each SWR in `[3%, 3.5%, 4%, 4.5%, 5%]`. Longevity uses a deterministic drawdown loop at the user's expected real return.

### Monte Carlo

Uses **log-normal** returns (not normal) — this ensures returns are bounded at −100% and compounding is correctly modelled.

Convert arithmetic mean/stddev to log-normal parameters:

```
sigma_ln = sqrt(ln(1 + (stddev / (1 + mean))^2))
mu_ln    = ln(1 + mean) - 0.5 * sigma_ln^2
r_year   = exp(mu_ln + sigma_ln * Z) - 1     // Z ~ N(0,1) via Box-Muller
```

Box-Muller for standard normal samples (no external dependency):

```
Z = sqrt(-2 * ln(u1)) * cos(2π * u2)   // u1, u2 ~ Uniform(0,1)
```

**Rendering**: never pass all N simulation paths to Recharts — that would create thousands of SVG elements and freeze the browser. Only the 5 percentile bands (p10/p25/p50/p75/p90) are rendered as `<Area>` fills. Raw paths are computed but discarded after percentile extraction.

**Performance**: Monte Carlo is wrapped in `useMemo` with `useDebounce(state, 300ms)` to avoid re-running on every slider tick. At 1000 sims × 30 years it takes ~5ms on Node 24, so no Web Workers needed.

**Sanity check**: At 7% mean / 15% stddev / 30-year horizon / 4% SWR, expect ~85–95% success rate (consistent with historical studies).

---

## Tooling

| Command                 | What it does                           |
| ----------------------- | -------------------------------------- |
| `npm run dev`           | Start Vite dev server                  |
| `npm run build`         | `tsc -b && vite build`                 |
| `npm run typecheck`     | `tsc --noEmit`                         |
| `npm run lint`          | ESLint                                 |
| `npm run format`        | Prettier (auto-fix)                    |
| `npm run format:check`  | Prettier (CI check)                    |
| `npm run test`          | Vitest (28 tests)                      |
| `npm run test:coverage` | Vitest + v8 coverage                   |
| `npm run ci`            | typecheck + lint + format:check + test |

### Vitest notes

- Test environment is `node` (not `jsdom`) because all tests are pure unit tests for `src/lib/` functions.
- If component tests are added later, annotate them with `// @vitest-environment jsdom`.
- Vitest v4 requires Node ≥ 20.19 / ≥ 22.12 due to the `rolldown` bundler. On Node 24 it works without workarounds.

### ESLint

`eslint-config-prettier` is included to disable ESLint rules that conflict with Prettier formatting.

---

## GitHub Actions

- **`ci.yml`**: runs on push/PR to `main` — typecheck, lint, format check, tests. Uses Node 24.
- **`deploy.yml`**: runs on push to `main` — builds and deploys to GitHub Pages. Vite `base` is set to `/firecalc/` in `vite.config.ts`.

To enable GitHub Pages: go to repo Settings → Pages → Source → "GitHub Actions".

---

## Sanity checks

After `npm run dev`:

- `€40,000 expenses / 4% SWR` → FIRE number = `€1,000,000`
- `€0 portfolio, €50k savings, 7% return` → ~18 years to `€1,250,000`
- Monte Carlo at `7% / 15% / 30yr / 4% SWR` → ~85–95% success rate
- DevTools Network tab should show **zero** external requests
