# kava-quizer

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](#) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)

## Project overview

**kava-quizer** is a lightweight, fully offline flashcard app built for learning and self-testing. It relies on IndexedDB for all data storage (no backend required) and lets users create, edit and study flashcards. Cards can be edited as plain text which enables easy integration with AI workflows for generating tests and study material.

Designed for privacy and speed, kava-quizer works entirely in the browser, keeps your data local, and supports several Quizlet‑style study modes.

---

## Key features

* **Offline-first** — All data stored in the browser via **IndexedDB**. No server or internet connection required to use the app.
* **Plain-text card editing** — Author and edit flashcards as raw text. This textual format makes it straightforward to generate tests or prompts for AI-assisted workflows.
* **Multiple study modes (Quizlet-like)**

  * Term → definition flashcards
  * Multiple-choice (4 options) generated from term-definition pairs
  * True/False (correct/incorrect) questions
  * Free-text input (type the term yourself)
* **Smart story system** — From a single book (a collection of cards) generate an unlimited number of story variations to practice vocabulary and contextual recall.
* **Playwright tests** — The project is already ~50% covered by Playwright end-to-end tests; test coverage is actively being expanded.
* **Planned: Statistics page** — Upcoming feature to visualize user progress and show which cards the user is currently practicing.

---

## Why use kava-quizer?

* You want full control over your study data — it never leaves your device.
* You need a simple, fast flashcard app with powerful text-based editing for AI-assisted test generation.
* You prefer a lightweight app that supports multiple study formats (multiple choice, T/F, fill-in).

---

## Tech stack

* Frontend: Modern web stack (Next.js, TypeScript, Tailwindcss, Jotai)
* Storage: **IndexedDB** (offline persistent storage)
* Testing: **Playwright** for E2E tests
* Build & tooling: pnpm, bundler - turbopack

---

## Getting started

> These commands are generic — adapt them to the actual scripts in the repository.

```bash
# install dependencies
pnpm install

# start dev server
pnpm dev

# build for production
pnpm build

# run Playwright tests
pnpm playwright-test

# Lint with ESLint
pnpm es-lint

# Fix with ESLint
pnpm es-fix

# Count project size
pnpm count-size
```

If your repository uses Yarn or pnpm, substitute the package manager commands accordingly.

---

## Data model (high level)

* **Book** — A collection of cards (e.g. a chapter, textbook, or topic).
* **Card** — A single item with a *term* and one or more *definitions* or *contexts*.
* **Story** — An AI‑assisted or procedurally generated narrative that uses card content to create practice scenarios.

All of the above are stored in IndexedDB and can be exported/imported as JSON if you want backups or offline transfers.

---

## AI & automation

kava-quizer intentionally stores cards in a plain-text friendly format so you can:

* Feed card content into AI prompts (locally or via API) to generate multiple-choice questions, distractors, or practice stories.
* Use text-based editors or scripts to batch-edit cards, transform formats, or create automated test sets.

> Note: kava-quizer itself does not require an external AI service to function; any AI integration is optional and depends on how you choose to process the plain-text card data.

---

## Testing

Playwright is used to cover end-to-end flows (creating books/cards, studying, switching modes). Current coverage is around 50% and growing — contributions to increase test coverage are welcome.

Suggested test commands (adjust to repo):

```bash
# run playwright tests
pnpm playwright-test

# open playwright UI for debugging
pnpm playwright-ui
```

---

## Roadmap

* [x] Core offline flashcard CRUD
* [x] Plain-text card editing
* [x] Multiple study modes (MC / T/F / input)
* [x] Smart story generation system
* [x] Playwright test suite (partial)
* [ ] **Statistics page** (visualize which cards a user is currently practicing)
* [ ] Expand Playwright coverage to reach full E2E stability
* [ ] Optional: import/export improvements, progressive web app (PWA) support, and improved accessibility

---

## Contributing

Contributions are very welcome! Please open issues for feature requests or bugs and submit PRs for fixes and features. A few ways to help:

* Add or improve Playwright tests
* Implement the statistics page and UX for progress analytics
* Improve accessibility and keyboard navigation for study flows
* Add export/import or backup options

Please follow the repository's code style and add tests where appropriate.

---

## License

This project is released under the **MIT License**. See the `LICENSE` file for details.

---

## Contact

If you have questions or want to collaborate, open an issue or reach out in the repo comments.

---

*Happy studying!*
