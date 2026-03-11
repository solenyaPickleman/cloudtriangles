# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cloudtriangles is a web-based Cracker Barrel peg solitaire solver. Vue 3 frontend with a Cloudflare Pages Functions serverless backend that runs the solver algorithm.

## Commands

```bash
# Development server (runs Cloudflare Pages dev + Vite)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Architecture

- **`src/`** — Vue 3 frontend
  - `App.vue` — Root component with banner/title
  - `components/TriangleGame.vue` — Main game component: renders the 15-peg triangle board, handles peg selection, and calls the solver API
- **`functions/`** — Cloudflare Pages Functions (serverless API)
  - `api/solver.js` — POST endpoint implementing depth-first search with backtracking to solve the peg game. Receives board state as a boolean array, returns move sequence.
- The frontend uses axios to POST the current board state to `/api/solver`, which returns the solution steps.
- Peg state is a 15-element boolean array (5-row triangle). The `moveset` defines all valid peg-jump triplets.
