# Cloudtriangles

A web-based [Cracker Barrel peg solitaire](https://en.wikipedia.org/wiki/Peg_solitaire) solver. Click a peg to set the starting empty position, hit Solve, and step through the solution.

Live at [cloudtriangles.pages.dev](https://cloudtriangles.pages.dev)

## Tech stack

- **Frontend:** Vue 3, Vite 7
- **Backend:** Cloudflare Pages Functions (serverless)
- **Solver:** Depth-first search with backtracking (`functions/api/solver.js`)

## Prerequisites

- Node.js 20+ (see `.nvmrc`)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:8788` (Wrangler proxies Vite and serves the Pages Functions).

## Scripts

| Command          | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `npm run dev`    | Start local dev server (Vite + Wrangler)             |
| `npm run build`  | Production build to `dist/`                          |
| `npm run preview`| Preview production build locally with Wrangler       |
| `npm run lint`   | Lint with ESLint                                     |
| `npm run deploy` | Build and deploy to Cloudflare Pages via Wrangler CLI|

## Deployment

### Option 1: CLI deploy (recommended for quick deploys)

```bash
npm run deploy
```

This builds locally and uploads directly to Cloudflare Pages. No build image is involved.

### Option 2: Git integration (automatic deploys on push)

The project is connected to Cloudflare Pages via git. Pushing to `main` triggers a build and deploy.

After the Vite migration, update your Cloudflare Pages build settings in the dashboard:

1. Go to **Cloudflare Dashboard > Pages > cloudtriangles > Settings > Build & deployments**
2. Set **Build image version** to **v3** (v1 is deprecated Sept 2026)
3. Set **Build command** to `npm run build`
4. Set **Build output directory** to `dist`
5. Under **Environment variables**, set `NODE_VERSION` to `20`

## Project structure

```
src/
  App.vue                   Root component (banner + game)
  components/
    TriangleGame.vue        Game board, peg interaction, solver UI
  assets/
    red-circle.png          Peg (filled)
    white-circle.png        Peg (empty)
functions/
  api/
    solver.js               POST /api/solver — DFS peg game solver
```

## How it works

The board is a 15-peg triangle (5 rows). State is a 15-element boolean array. The solver uses depth-first search with randomized move ordering to find a sequence of jumps that leaves exactly one peg.

The frontend POSTs the current board state to `/api/solver`, which returns the full solution as an array of board states. The UI then lets you step through each move.
