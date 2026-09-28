---
date: 2026-09-25
type: minor
category: token
component: system
summary: "Moved the site to Tailwind v3 and aligned the tokens with @distylai/toolkit-ui"
rationale: "Folio is the source that toolkit-ui ports, so the two must agree. Toolkit-ui builds on Tailwind v3, so the site now uses Tailwind v3 with tailwind.config.ts. Color, radius, and space values were copied one time from the toolkit-ui Distyl Light and Distyl Dark themes (toolkit@df5dfcda89). New tokens: background.primary-subtle, border.warning, border.info, chart-6 to chart-10. Changed values: background.accent is now a neutral hover surface (#F3F4F6 light, #1E1B4B dark), and the brand tint moved to background.primary-subtle; dark background.warning is #451A03; chart tokens are the same in light and dark."
pr: "#34"
---

- `content/folio-tokens.css` is now the one token file. `app/globals.css`
  imports it.
- Every brand-tinted surface now uses `bg-primary-subtle`, so those surfaces
  look the same.
- Class names are now the same as the semantic names in the toolkit-ui
  tokens preset: `bg-background`, `bg-muted`, `text-foreground`,
  `text-muted-foreground`, `border-border`, and so on. The old names
  (`bg-background-default`, `text-text-subtle`) are gone.
- Radius classes follow toolkit-ui, where `rounded-lg` is 8px. To keep the
  same look, `rounded-lg` → `rounded-xl`, `rounded-md` → `rounded-lg`, and
  `rounded-xl` → `rounded-2xl`.
- Tailwind v4-only classes were rewritten: `shadow-xs` → `shadow-sm`,
  `shadow-sm` → `shadow`, `aria-invalid:` → `aria-[invalid=true]:`,
  `field-sizing-content` → `[field-sizing:content]`.
- Arbitrary values such as `w-[--sidebar-width]` now resolve to `var(...)`.
  Tailwind v4 did not read that syntax, so the Sidebar demo now has its
  intended width.
- The design system is renamed from Cognition to Folio in all site text. The
  token file is now `content/folio-tokens.css` and the spec is
  `content/folio-spec.md`. The repo is now `DistylAI/folio`. The site still
  serves from `cognition.distyl.net` until `folio.distyl.net` is added in Vercel.
- Personal contact links and "Questions?" lines are removed from the site.
  Demo data no longer uses a real person's name.
- Component code now matches `@distylai/toolkit-ui` main. Each component in
  `components/shadcn/<name>/index.tsx` has the toolkit-ui API, parts,
  `React.forwardRef`, and file layout, and uses the Folio class recipes, so the
  site looks the same. Folio-only components live in `components/folio/`.
  `contexts/`, `hooks/`, and `lib/utils.ts` match toolkit-ui's paths.
- `tsconfig.json` uses the toolkit-ui strictness (`noUncheckedIndexedAccess`,
  `verbatimModuleSyntax`). `tailwind.config.ts` loads the same plugins as
  toolkit-ui (`tailwindcss-animate`, `@tailwindcss/container-queries`).
- Files that use React hooks or context start with `'use client'`, because
  Next.js needs it. Toolkit-ui can take the same line with no effect on Vite.
