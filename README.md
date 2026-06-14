# Plate Pursuit

A client-only web app for tracking progress in **Plate Pursuit** — a passive license-plate spotting game played in real life. The app remembers what you need to find next across multiple game variants. All data stays in your browser (`localStorage`); there is no backend.

## Game variants

| Variant | Match rule | Sequence | End |
|---------|------------|----------|-----|
| Classic Plate Spotting | Last 3 digits of plate | 001 → 999 | Complete at 999 |
| Unanchored Decimal | Anywhere on plate | 1, 2, 3, … | Open-ended |
| Unanchored Hexadecimal | Anywhere on plate | 1…F, 10, 11, … | Open-ended |
| Unanchored Binary | Anywhere on plate | 1, 10, 11, 100, … | Open-ended |
| Elements | Symbol anywhere (case-insensitive) | H, He, Li, … Og (118) | Complete at Og |
| Pi | 3-digit window anywhere | 314, 141, 415, 159, … | Open-ended |

Progress uses an **honor system**: the user taps **Found it!** when they believe they spotted the target. The app does not validate plate text.

## Tech stack

- React 18 + TypeScript + Vite
- React Router (client-side routing)
- React Context + `localStorage` for state
- CSS Modules (mobile-first UI)

## Commands

```bash
npm install      # install dependencies (requires Node.js locally)
npm run dev      # start dev server
npm run build    # typecheck + production build → dist/
npm run preview  # serve dist/ locally
npm run lint     # ESLint
```

## Project structure

```
src/
├── games/              # Variant definitions and sequence generators
│   ├── types.ts        # VariantId, AppState, ProgressEntry, etc.
│   ├── registry.ts     # All 6 variants — metadata + getTarget/isComplete
│   ├── format.ts       # Display helpers
│   └── sequences/      # classic, counting, elements, pi
├── storage/
│   └── progressStore.ts   # Pure localStorage load/save/normalize
├── context/
│   └── ProgressContext.tsx  # recordFind, undoLast, React state
├── pages/              # Dashboard, VariantDetail, Rules
└── components/       # Layout, VariantCard, FoundItForm, ProgressHistory
```

## Architecture notes

- **One progress track per variant** — variants are independent.
- **Next target** is derived: `entries.length` indexes into the variant's sequence.
- **Persistence key:** `plate-pursuit:v1` in `localStorage`.
- **Pi variant:** sliding 3-digit windows over precomputed π digits (no decimal point). Step *n* uses digits at index *n−1*..*n+1*.

## Deployment

Build output is static files in `dist/`. This project is set up for **GitHub Pages** at [plates.locehilios.com](https://plates.locehilios.com) (repo: [TheLocehiliosan/plates](https://github.com/TheLocehiliosan/plates)).

### First-time GitHub setup

1. Create a public repo `TheLocehiliosan/plates` and push the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.
3. **Settings → Pages → Custom domain** → enter `plates.locehilios.com` → Save.
4. At your DNS host for `locehilios.com`, add:
   - **Type:** `CNAME`
   - **Name:** `plates`
   - **Target:** `TheLocehiliosan.github.io`
5. Wait for DNS and GitHub’s certificate (often minutes, sometimes up to a day).
6. Enable **Enforce HTTPS** when it appears.

Pushes to `main` run `.github/workflows/deploy.yml` (build, SPA `404.html` fallback, deploy). SSL is free via GitHub/Let’s Encrypt — no certificate purchase needed.

### Local build

```bash
npm run build   # → dist/
npm run preview # smoke-test production build locally
```

Client-side routes (`/rules`, `/variant/classic`, etc.) rely on `404.html` (a copy of `index.html`) so deep links work on GitHub Pages.

## Development with Cursor

Project-specific AI guidance lives in [`.cursor/rules/`](.cursor/rules/). See those files for conventions when adding variants, changing storage, or editing UI.
