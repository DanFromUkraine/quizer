# Repository Guidelines

## Project Overview

kava-quizer is an offline-first flashcard and quiz app built with Next.js, React, TypeScript, Tailwind CSS, Jotai, and IndexedDB. The app stores user data locally in the browser and supports book/card editing, plain-text card editing, story generation, study flows, and history views.

## Project Structure

- `app/`: Next.js App Router route entries, loading states, and error boundaries.
- `src/pages/`: feature page modules used by the App Router.
- `src/components/`: reusable and feature-specific React components.
- `src/jotai/`: Jotai atoms and state families.
- `src/utils/`: IndexedDB helpers, card text parsing, story creation, list utilities, and shared callbacks.
- `src/hooks/`: reusable hooks and page-specific state/update hooks.
- `src/constants/`: app constants, test IDs, DB names, defaults, and parser settings.
- `src/types/`: shared TypeScript declaration files.
- `src/styles/`: global CSS, variables, and animations.
- `tests/end-to-end/`: Playwright E2E specs, selectors, steps, constants, and helpers.
- `stories/` and `.storybook/`: Storybook examples and configuration.
- `public/`: static icons and web manifest.

## Commands

Use `pnpm` for project scripts.

- `pnpm dev`: start the Next.js dev server with Turbopack.
- `pnpm build`: build the production app.
- `pnpm start`: start the production server after a build.
- `pnpm es-lint`: run ESLint.
- `pnpm format`: format supported source and docs files with Prettier.
- `pnpm playwright-test`: run Playwright E2E tests.
- `pnpm playwright-ui`: open the Playwright test UI.
- `pnpm storybook`: start Storybook on port 6006.
- `pnpm build-storybook`: build Storybook.
- `pnpm count-size`: run the project size counter.

Note: `package.json` contains an `es-fix` script that currently calls `esling --fix`; verify or fix that script before relying on it.

## Development Notes

- Keep changes aligned with the existing feature-folder style. Prefer colocated `description.tsx`, `client.tsx`, `UI.tsx`, selectors, steps, and constants where that pattern already exists.
- Preserve the offline-first model. Browser persistence is handled through IndexedDB utilities under `src/utils/idb` and Jotai-derived state under `src/utils/jotai`.
- Treat `src/constants/testIds.ts` and the selectors under `tests/end-to-end/**/selectors.ts` as the stable E2E contract. Update tests when changing user-visible flows or test IDs.
- Prefer existing generic components from `src/components/general` before adding new primitives.
- Keep client-only logic in `client.tsx` files or components with the appropriate client boundary.
- Follow the existing Prettier settings: 4-space indentation, semicolons, single quotes, JSX single quotes, trailing commas disabled.
- Avoid committing generated or local output such as `.next/`, `playwright-report/`, `tests/playwright-output/`, `tsconfig.tsbuildinfo`, and IDE state unless explicitly requested.

## Testing Guidance

- For UI behavior changes, run the relevant Playwright spec when possible, or `pnpm playwright-test` for broad coverage.
- For build or routing changes, run `pnpm build`.
- For formatting-only changes, `pnpm format` is sufficient, but avoid broad formatting churn unrelated to the task.
- When changing IndexedDB schema, atom derivation, card parsing, or story generation, add or update focused tests and manually consider existing persisted user data.

## Agent Workflow

- Read existing code before editing; match local patterns over introducing new architecture.
- Keep edits narrowly scoped to the requested behavior.
- Do not overwrite user changes in a dirty worktree. Inspect `git status --short` before large edits.
- Prefer structured parsing and existing helpers over ad hoc string manipulation for cards, IDs, dates, and IndexedDB records.
- Verify with the smallest meaningful command set and report any command that could not be run.
