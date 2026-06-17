This directory intentionally exists for Next.js.

The project uses the App Router in the root `app` directory, while FSD page
slices live in `src/pages`. Keeping this root `pages` directory present and
empty prevents Next.js from treating `src/pages` as Pages Router routes.
