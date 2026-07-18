# Copilot Instructions for Guitar Study Kit

## Project Overview

A static site implementation of a guitar study kit (Método Antônio Lugão) using vanilla HTML, CSS, and JavaScript—no build step, no dependencies, no frameworks. Deployed via GitHub Pages.

**Core purpose**: Personal practice material with interactive diagrams and reference guides covering music theory, weekly schedule, and chord variations.

## Architecture

### Pages & Roles

| File | Purpose | Interactive Elements |
|------|---------|----------------------|
| `login.html` | Authentication gate with localStorage (90-day validity) | Form submission, theme toggle, SHA-256 hashing for client-side auth verification |
| `index.html` | Hub—menu with links to study components | Menu navigation, logout, theme toggle |
| `cronograma.html` | Weekly practice schedule (5 blocks: construction, pentas, modes, arpegio application, coverage checklist) | Likely contains phase tracking, checklist interactions |
| `fundamentos.html` | Music theory reference in C: arpejos, pentatonics, tetrachords, modal derivation | Possibly interactive theory diagrams or reference lookups |
| `diagramas.html` | **Main interactive component**: Horizontal fretboard diagram with dynamic note filtering | SVG-based grid, control panels for study type/root/CAGED position selection, note rendering with role-based coloring |
| `acordes.html` | 12 C chord variations (triad, 7ths, 6ths, extensions, dim, half-dim) in vertical diagrams | SVG vertical fretboard, suggested fingerings, role-based coloring (root, 3rd/5th, 7th, 6th/9th) |

### Shared Infrastructure

- **`style.css`**: Master design token library (colors, typography, spacing, shadows) + reusable component styles (topbar, theme toggle, buttons, form inputs). All CSS custom properties grouped by function: `--paper`, `--ink`, `--brass` (accent), `--line` (borders), `--focus` (keyboard nav), `--shadow`.
- **Theme system**: Light/dark modes via `data-theme` attribute on `<html>`. System preference (`prefers-color-scheme`) is default; user selection stored in `localStorage` with key `npml-guitar-theme`.
- **Auth pattern**: Simple IIFE on every protected page that redirects to `login.html` if token missing or expired. Token stored as JSON with `ok` flag and timestamp in `localStorage` with key `npml-guitar-auth`.

### Key Conventions

1. **CSS organization**: Global tokens + shared components in `style.css`; page-specific styles in each HTML file's `<style>` tag (layout + extra tokens like zone colors for diagrams).
2. **Inline scripts (IIFE pattern)**: Auth check and theme initialization are silent—wrapped in try/catch, run before DOM—to avoid flash of unstyled content or redirect jank.
3. **SVG diagrams**: Used for fretboard grids (horizontal in diagramas.html, vertical in acordes.html). Grid lines, fret markers, note circles all styled via CSS classes for theming.
4. **Note semantics**: Role-based coloring applies to both diagram types:
   - `.n-root` — tonic (brass/bright)
   - `.n-core` — 3rd/5th (dark ink)
   - `.n-sev` — 7th (outlined)
   - `.n-ext` — extensions (focus color)
   - CAGED zones (C, A, G, E, D) use separate palette for fretboard position teaching.
5. **Accessibility**: Focus styles use `--focus` color with 2px outline + 2px offset; buttons and inputs get explicit `:focus-visible` rules; toggle buttons have `aria-label`.
6. **Portuguese UI**: All visible text is in Brazilian Portuguese; comments and code can be in English.

## Running Locally

No build step. Serve with any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node (if http-server installed)
npx http-server

# Then open http://localhost:8000
```

Direct file:// access works for most pages, but theme/auth localStorage requires same-origin, so a server is preferred.

## Making Changes

### Adding a new study page

1. Create `<page>.html` with the auth check + theme init IIFEs at top of `<head>`.
2. Add shared `<link rel="stylesheet" href="style.css">`.
3. Define page-specific `<style>` if needed (layout, extra color tokens).
4. Include topbar for navigation: `<div class="topbar"><div class="topbar-inner">…</div></div>`.
5. Add link from `index.html` menu with `.item` card styling.

### Modifying design tokens

- Edit color/font/shadow vars in `style.css` `:root` block for light mode.
- Update `@media (prefers-color-scheme: dark)` section for dark mode.
- If adding page-specific colors (like zone colors in diagramas.html), define them in the page's `<style>` under `:root` plus both theme media/attribute selectors.

### SVG fretboard patterns

- `diagramas.html`: Horizontal 6-string, 24-fret grid. Notes rendered as `<g class="note n-{role} zone-{CAGED}">` with circles + text.
- `acordes.html`: Vertical 6-string, shorter fret range. Same styling logic.
- Update SVG generation logic in page's `<script>` to render / filter / highlight based on control inputs.

### Authentication

- Login hash verification uses SHA-256 (`crypto.subtle.digest`). Hash is embedded as `AUTH_HASH` in `login.html`.
- To change credentials: hash the new `"user:pass"` string via `crypto.subtle.digest("SHA-256", ...)` and update `AUTH_HASH`.
- Session data: `{ ok: true, ts: Date.now() }` stored as JSON. Validity checked: `(Date.now() - ts) < MAX_AGE_MS` (90 days).

## No Linting, No Tests, No Build

This project deliberately avoids tooling:
- No prettier/eslint (hand-format code; keep it simple).
- No jest/vitest (interactive diagrams tested in browser).
- No rollup/webpack (all files served as-is).
- No package.json / node_modules (no dependencies).

Validate changes by:
1. Running locally with `python3 -m http.server 8000`.
2. Testing in both light and dark themes (toggle via button on pages).
3. Testing auth flow: delete `localStorage` items manually or use DevTools, verify redirect behavior.
4. For SVG changes, check rendering across browsers/zoom levels.

## Diagram Data & Logic

- **Arpejos** (diagramas.html): Define note patterns (root, 3rd, 5th, 7th, extensions) per study type (maior, menor, pentatônica, tétrades). Filter notes to display based on selection; color by role.
- **CAGED zones**: Map fret positions to zones (C, A, G, E, D) for learning different grip shapes across the neck.
- **Acordes** (acordes.html): Pre-defined 12 variations of C chord. Each has a fret/string layout + role (root, 3rd, 5th, 7th, 6th, 9th). Render as vertical diagram with optional barre visualization.

## Deployment

Commits to `main` auto-deploy via GitHub Pages to `npmlguitar.github.io` (or configured custom domain). No action needed beyond pushing.

---

For detailed study content, refer to README.md.
