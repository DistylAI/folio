# Folio: Distyl's design foundation.

Folio is Distyl's Product Experience Platform. It captures the reusable decisions that define how every product surface looks, behaves, and evolves.
Built with Next.js (App Router) and Tailwind CSS v3. The site dogfoods the Folio token system itself: every surface is styled with semantic tokens, and dark mode is driven entirely by `[data-theme="dark"]` on `<html>`. No `dark:` classes anywhere.

## Folio is the design lab for toolkit-ui

The frontend team designs the component library here first, then ports each change to `@distylai/toolkit-ui`. To make the port a copy and paste, Folio keeps implementation parity with toolkit-ui:

- The same component code: `components/shadcn/<name>/index.tsx` has the same API, parts, and file layout as `shared/ui/src/components/shadcn/<name>/index.tsx` in toolkit-ui.
- The same supporting paths: `contexts/`, `hooks/`, and `lib/utils.ts` match toolkit-ui's `src/` paths, so imports do not change.
- The same class names: `tailwind.config.ts` uses the semantic names from the toolkit-ui tokens preset.
- The same tokens: `content/folio-tokens.css` holds the canonical `--color-*`, radius, and space tokens.

What Folio owns is the design: the class strings inside each component, the token values, and new components. Components that toolkit-ui does not have yet live in `components/folio/`.

To port a change, copy the changed files to the same paths in toolkit-ui, and copy any token change to toolkit-ui's token source.

## Dark mode as compliance test

Every surface on the docs site uses Folio semantic tokens exclusively. When you toggle dark mode, the token layer remaps automatically. If any element fails to adapt — wrong background, hardcoded color, broken contrast — it is a token violation, not a dark mode bug. The toggle is a live audit tool.

If it reads correctly in dark mode, the system is working. If it doesn't, something bypassed the tokens.

## Contents

- **Introduction** (`/`) — overview and principles
- **Tokens** (`/tokens`) — live swatches for color, radius, spacing, typography
- **Guidelines** (`/guidelines`) — component semantics + the full Folio spec
- **Codebase Audit** (`/audit`) — Folio v1.2 audit of the Distyl repos

## Source content

| File | Source |
|------|--------|
| `content/design-system-audit.md` | `audit-output/design-system-audit.md` |
| `content/folio-spec.md` | Folio v1.2 rules document |
| `content/folio-tokens.css` | Canonical token values (the token contract that `@distylai/toolkit-ui` ports) |

`lib/tokens.ts` mirrors `folio-tokens.css` as structured data so the Tokens
page renders directly from the spec. `tailwind.config.ts` maps each token to a
utility (`bg-background`, `text-muted-foreground`). `npm run build` runs
`scripts/check-tokens.mjs`, which fails when the three files drift.

## Develop

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for Conversational UI
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## Deploy

Deployed on Vercel (project `design-dot-distyl`, team `distyl`) from `DistylAI/folio`. Pushes to main ship to
production; pull requests get preview URLs.

Public URL: https://cognition.distyl.net/ (`folio.distyl.net` points at Vercel, but the domain is not added to the Vercel project yet.)

---

Folio v1.2 · June 2026
