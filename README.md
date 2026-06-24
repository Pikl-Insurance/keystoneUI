# Keystone

Monorepo for the Keystone dashboard, built with Turborepo.

## Get started

```bash
pnpm install        # Install all workspace dependencies
pnpm lefthook install  # Install git hooks
pnpm dev            # Start all apps in dev mode
```

## Packages

| Package | Description |
|---|---|
| `@keystone/web` (`apps/web`) | Next.js 15 dashboard app |
| `@keystone/ui` (`packages/ui`) | Shared component library (UI primitives, widgets, charts) |

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev servers |
| `pnpm build` | Build all packages |
| `pnpm typecheck` | Type-check all packages |
| `pnpm lint` | Run oxlint across workspace |
| `pnpm format` | Auto-format all source files with oxfmt |
| `pnpm format:check` | Check formatting without modifying |
| `pnpm clean` | Remove all build artifacts and caches |

## Tooling

- **Turborepo** — Monorepo orchestration
- **pnpm** — Package manager
- **Next.js 15** — App framework
- **Tailwind CSS v4** — Styling
- **oxlint** — Linting
- **oxfmt** — Formatting
- **lefthook** — Git hooks (pre-commit: format + lint, pre-push: typecheck + build)

## Migrating from the old repo

See [migration.md](./migration.md).
