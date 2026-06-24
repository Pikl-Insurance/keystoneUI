# Migration Guide: Single Vite App → Turborepo Monorepo + Next.js

## What Changed

The project has been restructured from a single Vite + React SPA into a **Turborepo monorepo** with:

- **@keystone/web** (`apps/web/`) — Next.js 15 App Router application (replaces Vite)
- **@keystone/ui** (`packages/ui/`) — Shared component library (primitives, widgets, charts, utilities)
- **pnpm** as package manager (replaces npm)
- **Turborepo** for orchestrated builds, dev, linting, and typechecking
- **oxfmt** for formatting (replaces Prettier)
- **oxlint** for linting (replaces ESLint)
- **lefthook** for pre-commit and pre-push git hooks

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10 (`npm install -g pnpm` or follow [pnpm installation docs](https://pnpm.io/installation))
- Clone the updated repo

## One-Time Setup

```bash
# Install all workspace dependencies
pnpm install

# Install git hooks (pre-commit: format + lint, pre-push: typecheck + build)
pnpm lefthook install
```

## Breaking Changes

### Import paths

All imports for shared components and utilities have changed. Use the following mappings:

| Old path | New path |
|---|---|
| `@/components/ui/button` | `@keystone/ui/primitives/button` |
| `@/components/ui/card` | `@keystone/ui/primitives/card` |
| `@/components/ui/input` | `@keystone/ui/primitives/input` |
| `@/components/ui/label` | `@keystone/ui/primitives/label` |
| `@/components/ui/select` | `@keystone/ui/primitives/select` |
| `@/components/ui/separator` | `@keystone/ui/primitives/separator` |
| `@/components/ui/table` | `@keystone/ui/primitives/table` |
| `@/components/ui/tabs` | `@keystone/ui/primitives/tabs` |
| `@/components/ui/tooltip` | `@keystone/ui/primitives/tooltip` |
| `@/components/ui/dropdown-menu` | `@keystone/ui/primitives/dropdown-menu` |
| `@/components/ui/breadcrumb` | `@keystone/ui/primitives/breadcrumb` |
| `@/components/widgets/*` | `@keystone/ui/widgets/*` |
| `@/components/charts/*` | `@keystone/ui/charts/*` |
| `@/components/report-section` | `@keystone/ui/widgets/report-section` |
| `@/components/export-snapshot-button` | `@keystone/ui/widgets/export-snapshot-button` |
| `@/lib/utils` (cn) | `@keystone/ui/lib/utils` |
| `@/lib/figure-styles` | `@keystone/ui/lib/figure-styles` |
| `@/lib/chart-styles` | `@keystone/ui/lib/chart-styles` |
| `@/lib/card-layout` | `@keystone/ui/lib/card-layout` |
| `@/lib/insights-widget-labels` | `@keystone/ui/lib/insights-widget-labels` |
| `@/lib/chart-data` | `@keystone/ui/lib/chart-data` |
| `@/lib/export-snapshot` | `@keystone/ui/lib/export-snapshot` |

### App routing

The old SPA used state-based section switching. Routes are now file-based:

| Old section | New route |
|---|---|
| Login (unauthenticated) | `/login` |
| Booking engine | `/booking-engine` |
| Insights | `/insights` |
| Admin | `/admin` |
| Design system | `/components` |
| Root | `/` → redirects to `/insights` |

### Routing approach

The old single-page app with `useState`-based section switching has been replaced with Next.js App Router. Each section is now its own route page. The shared layout (sidebar, breadcrumb, dark mode toggle) is in `apps/web/src/app/layout.tsx`.

### ESLint → oxlint

ESLint has been removed. Use `pnpm lint` (which runs oxlint via turbo) instead of `npm run lint`.

### Formatting

There is no Prettier config. Use `pnpm format` to auto-format or `pnpm format:check` to verify.

### Commands

| Old command | New command |
|---|---|
| `npm run dev` | `pnpm dev` |
| `npm run build` | `pnpm build` |
| `npm run lint` | `pnpm lint` |
| `npm run preview` | `pnpm start` (from `apps/web`) |
| — | `pnpm typecheck` |
| — | `pnpm format` |
| — | `pnpm format:check` |
| — | `pnpm clean` |

## Directory Structure Map

```
Old                              →  New
─────────────────────────────────────────────────────
src/components/ui/               →  packages/ui/src/primitives/
src/components/widgets/          →  packages/ui/src/widgets/
src/components/charts/           →  packages/ui/src/charts/
src/lib/utils.ts                 →  packages/ui/src/lib/utils.ts
src/lib/figure-styles.ts         →  packages/ui/src/lib/figure-styles.ts
src/lib/chart-styles.ts          →  packages/ui/src/lib/chart-styles.ts
src/lib/card-layout.ts           →  packages/ui/src/lib/card-layout.ts
src/lib/insights-widget-labels.ts→  packages/ui/src/lib/insights-widget-labels.ts
src/lib/chart-data.ts            →  packages/ui/src/lib/chart-data.ts
src/lib/export-snapshot.ts       →  packages/ui/src/lib/export-snapshot.ts
src/components/report-section.tsx→  packages/ui/src/widgets/report-section.tsx
src/components/export-snapshot-*.tsx→ packages/ui/src/widgets/export-snapshot-button.tsx
src/index.css (design tokens)    →  packages/ui/src/styles/tokens.css

src/App.tsx                      →  apps/web/src/app/layout.tsx (shared shell)
src/main.tsx                     →  (removed — Next.js entry point)
src/App.css                      →  (removed — unused boilerplate)
index.html                       →  (removed — Next.js handles HTML)

src/components/login-page.tsx    →  apps/web/src/app/login/page.tsx (wrapper)
  + apps/web/src/components/login-page.tsx (component)
src/components/booking-engine-*.tsx → apps/web/src/app/booking-engine/page.tsx (wrapper)
  + apps/web/src/components/* (components)
src/components/insights-report-*.tsx→ apps/web/src/app/insights/page.tsx
  + apps/web/src/components/* (components)
src/components/components-page.tsx  → apps/web/src/app/components/page.tsx
  + apps/web/src/components/* (components)

Page-level components (non-reusable):
  apps/web/src/components/
  ├── login-page.tsx
  ├── booking-engine-page.tsx
  ├── booking-engine/ (9 files)
  ├── insights-report-page.tsx
  ├── insights-dashboard-page.tsx
  ├── bookings-snapshot.tsx
  ├── average-booking-value-*.tsx
  ├── cal-financials.tsx
  ├── timing-snapshot.tsx
  ├── timing-breakdown.tsx
  ├── partner-breakdown.tsx
  ├── dual-data-widget.tsx
  ├── filter-sidebar.tsx
  ├── dashboard-filter-bar.tsx
  ├── section-nav.tsx
  ├── compare-page.tsx
  ├── compare/ (3 files)
  ├── components-page.tsx
  ├── components-doc/ (3 files)
  └── design-system-nav-sidebar.tsx

App-specific data:
  apps/web/src/lib/
  ├── booking-engine-data.ts
  ├── compare-data.ts
  ├── properties-list-data.ts
  ├── property-data.ts
  ├── property-details-data.ts
  ├── property-insights-data.ts
  ├── components-catalog.ts
  ├── components-catalog-extra.ts
  ├── component-code-snippets.ts
  └── design-foundations.ts

Root configs (new):
  ├── package.json           → workspace root
  ├── pnpm-workspace.yaml    → workspace definition
  ├── pnpm-lock.yaml         → lock file (replaces package-lock.json)
  ├── .npmrc                 → pnpm settings
  ├── turbo.json             → Turborepo pipeline
  ├── lefthook.yml           → git hooks config
  ├── oxfmt.json             → formatter config
  ├── oxlintrc.json          → linter config
  └── tsconfig.json          → shared base tsconfig
```

## Common Issues

### "Cannot find module @keystone/ui/*"
Run `pnpm install` from the root. Ensure the workspace symlinks are set up properly.

### "pnpm: command not found"
Install pnpm: `npm install -g pnpm` or via Homebrew: `brew install pnpm`.

### Lefthook hooks not running
Run `pnpm lefthook install` from the project root to install git hooks.

### Tailwind styles not working
The app's CSS entry is `apps/web/src/styles/globals.css`. It imports tokens from `@keystone/ui/styles/tokens.css`. Ensure `postcss.config.mjs` is present in `apps/web/`.

### Build cache issues
Run `pnpm clean` to clear all build artifacts and Turbo cache.
