# Folio v1.2 Design System Audit

## Distyl AI · June 2026

Scope: `fe-distillery`, `distillery`, `distillery-platform`
Method: Parallel subagent audit against the canonical Folio v1.2 token set and hard-rule checklist.

---

## 1. Executive Summary

- **Folio v1.2 is not implemented.** `fe-distillery` defines zero Folio v1.2 tokens. No `--color-background-*`, `--color-text-*`, `--color-border-*`, `--color-feedback-*`, or `--radius-{none,sm,md,lg,xl,full}` exist anywhere. The repo is on the legacy shadcn NewYork HSL-triplet system: `--primary`, `--background`, `--foreground`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--radius`, `--success`, `--warning`.
- **Dark mode is implemented incorrectly.** `fe-distillery` uses Tailwind's `darkMode: ['class']` strategy with a `.dark` selector, not `[data-theme="dark"]` on `<html>`. On top of that, 26 raw `dark:` Tailwind classes are scattered across impl code, bypassing tokens entirely. This is a structural fix.
- **Color and utility drift is at scale.** `fe-distillery` has 344 hardcoded hex literals and 2,061 raw Tailwind palette utilities (`bg-gray-*`, `text-red-*`, etc.), including inside shadcn primitives: `components/ui/badge.tsx` bakes in 30+ raw palette variants and `components/ui/toast.tsx` uses `text-red-300/50`. The system is not being bypassed only by callers; the primitives themselves bypass the token system.
- **`distillery` is out of scope.** It is a Python backend monorepo. The only FE surfaces are a Chrome-extension demo and a Flask eval dashboard, both off-spec and isolated. The expected customer-facing React surface does not live in this repo. Verify where it lives before drawing customer-rollout conclusions.
- **`distillery-platform` is not relevant.** Pure Helm/IaC, no FE code, no token files.
- The codebase is not ready to receive Folio v1.2 token values. The brand purple `#5D4EE7` is already present in `fe-distillery` as `--primary` (`245.88 76.12% 60.59%`), so a rename plus dark-mode reshape preserves brand exactly. But the rename is full-stack: `tailwind.config.js`, every file in `components/ui/`, two parallel token blocks, six parallel MUI theme files, and dozens of consumers.

---

## 2. Dark Mode Status

| Repo                  | Implementation                                                                                                                  | Status                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `fe-distillery`       | `darkMode: ['class']` in `tailwind.config.js:6` + `.dark` selector in `components/ui/base.css:101` and `impls/demos/App.css:48` | **Incorrect** — Folio v1.2 requires `[data-theme="dark"]` on `<html>` |
| `distillery`          | Not implemented                                                                                                                 | N/A (Python repo)                                                         |
| `distillery-platform` | Not applicable                                                                                                                  | N/A (no FE)                                                               |

**`dark:` Tailwind class violations:**

| Repo                  | Count  | Notable locations                                                                                                                                                                                                                                                                                    |
| --------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fe-distillery`       | **26** | `components/ui/alert.tsx`, `components/ui/tabs.tsx`, `impls/platform/components/Chat/FilePreviewModal.tsx` (7 classes), `impls/platform/components/Chat/MessageBubble.tsx`, `impls/eagle/.../ConsistencyAnalysis/`, `impls/tower/.../AgentCredentialsSetup.tsx`, `impls/spear/ExecutionSelector.tsx` |
| `distillery`          | 0      | —                                                                                                                                                                                                                                                                                                    |
| `distillery-platform` | 0      | —                                                                                                                                                                                                                                                                                                    |

**Required changes before the brand refresh:**

1. Switch `tailwind.config.js` from `darkMode: ['class']` to a custom variant matching `[data-theme="dark"]`.
2. Replace `.dark { ... }` blocks in `components/ui/base.css` and `impls/demos/App.css` with `[data-theme="dark"] { ... }`.
3. Update the theme provider or app shell to set `document.documentElement.dataset.theme = "dark"` instead of toggling a `.dark` class.
4. Remove all 26 raw `dark:` utility classes. They become unreachable once tokens carry dark values.
5. Fix `components/ui/alert.tsx` and `components/ui/tabs.tsx` first. They are shadcn primitives and propagate to all consumers.

---

## 3. Token Inventory

### Folio v1.2 tokens correctly defined and in use

**None.** Zero canonical tokens (`--color-*-*`, `--radius-{none,sm,md,lg,xl,full}`) are defined in any of the three repos.

### Missing (all of them, in `fe-distillery`)

All 32 canonical tokens are absent: 9 `--color-background-*`, 8 `--color-text-*`, 6 `--color-border-*`, 4 `--color-feedback-*`, 6 `--radius-*`.

### Legacy variables still in active use

**`fe-distillery`** — defined in two places and bridged through Tailwind:

| Variable                                                                                                                                                                                                                    | Defined at                                                                                                                          | Notes                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--success`, `--warning`, `--border`, `--input`, `--radius`                                                             | `components/ui/base.css:37–72` (light), `components/ui/base.css:102–125` (dark, under `.dark`)                                      | Canonical legacy set. HSL-triplet form. Brand `--primary` is `245.88 76.12% 60.59%` which resolves to `#5D4EE7` — matches Folio's intended brand. |
| Same set, again                                                                                                                                                                                                             | `impls/demos/App.css:21–66`                                                                                                         | Duplicate purple-themed token block. Diverges slightly from `base.css`. Two sources of truth.                                                         |
| `var(--primary)`, `var(--background)`, `var(--foreground)`, `var(--secondary)`, `var(--muted)`, `var(--accent)`, `var(--destructive)`, `var(--success)`, `var(--warning)`, `var(--border)`, `var(--input)`, `var(--radius)` | `tailwind.config.js:39–103`                                                                                                         | Composed via `hsl(var(--*))` into `theme.extend.colors`.                                                                                              |
| `var(--primary)` with opacity                                                                                                                                                                                               | `impls/eagle/.../summaryConstants.ts:2–4`, `impls/eagle/.../ExecutionFlowChart.tsx:374`, `impls/platform/.../transformData.tsx:153` | Consumers read tokens directly past Tailwind.                                                                                                         |

**`distillery`** — independent legacy-style variables (not Folio's legacy set):

| Variable                                                                                                                                                                        | File                                                 | Line |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---- |
| `--primary-color: #e20074` (T-Mobile magenta), `--secondary-color`, `--light-color`, `--dark-color`, `--border-color`, `--success-color`, `--error-color`, `--background-color` | `impls/tower/tower/evaluation/web/static/styles.css` | 2–9  |

These are scoped to a Flask eval dashboard, not React and not Folio-aware. The naming pattern (`--primary-color`) is one rename away from colliding with a Folio migration.

**`distillery-platform`** — none.

---

## 4. Violations Summary

| Violation type                                                 |                       `fe-distillery` |            `distillery` | `distillery-platform` |
| -------------------------------------------------------------- | ------------------------------------: | ----------------------: | --------------------: |
| Hardcoded colors (hex / rgb / hsl)                             |                               **344** |                     184 |                     0 |
| Raw Tailwind color utilities                                   |                             **2,061** |                       0 |                     0 |
| `dark:` Tailwind classes                                       |                                **26** |                       0 |                     0 |
| Direct `@radix-ui/*` imports outside `components/ui/`          |                                     4 |                       0 |                     0 |
| Spacing (off-4px-scale inline px)                              |                                   15+ |                      4+ |                     0 |
| Typography (non-Geist / non-Geist-Mono)                        |              13 distinct declarations | 7 distinct declarations |                     0 |
| Legacy Folio variables (`--primary`, `--background`, etc.) | 50+ definitions/usages across 3 files |                       0 |                     0 |

**Notable callouts:**

Hardcoded colors in `fe-distillery` are concentrated in `impls/eagle/legacySrc/`, `impls/apprentice/`, `impls/pennycai/`, `impls/eagle/EaglePlatform.tsx:738` (a multi-color status palette on one line), and `tailwind.config.js:45–47` (three hex values in the config itself).

Raw Tailwind utilities appear inside the primitives. `components/ui/badge.tsx` has 30+ raw color variants (`bg-gray-700`, `bg-orange-600`, `bg-amber-600`, `bg-red-100`, `bg-green-100`) and `components/ui/toast.tsx` uses `group-[.destructive]:text-red-300`. Fixing callers is wasted effort until the primitives are corrected.

Radix violations in `fe-distillery`: `@radix-ui/react-collapsible` in `impls/platform/components/Traces/components/SpanCardToggle.tsx` and `SpanCard/SpanCard.tsx`; `@radix-ui/react-tabs` in `impls/platform/components/OutlinedTabs/OutlinedTabs.tsx`; `@radix-ui/react-context-menu` in `impls/eagle/platformComponents/GenCreate/shared/ActionCard.tsx`.

Typography: `fe-distillery` declares Geist in `components/ui/base.css:7–12` and `tailwind.config.js:17`, and Geist Mono at `tailwind.config.js:18`, but the `:root` body font is Inter (`components/ui/base.css:26`). Geist is loaded and not applied as the base. Six parallel MUI theme files also use Inter. `AlliancePlatt-Bold` is registered as a Tailwind font family (`tailwind.config.js:16`) and used as a monospace fallback in demo files. Other font violations: Fira Code (penny SQLCard, genedit DiffText), Roboto (coffey CallTimeline.css), Consolas/Monaco (prism-scoped-theme.css), Arial (tower EmailPreview email HTML).

Spacing: recurring `margin: '6px 0'` in three `ReactMarkdownOverrides.tsx` files (penny and coffey), `width: '500px'` in `impls/genedit/.../LoginForm.tsx`, `height: '18px'` in `impls/coffey/.../DrawerHyperlink.tsx`.

`distillery` hardcoded colors: `#e20074` (T-Mobile magenta) in the tower eval dashboard CSS. The Chrome extension demo uses a `#667eea` to `#764ba2` purple gradient that does not match Folio's `#5D4EE7`. If this extension is shown to customers as a demo, it presents a different brand purple.

---

## 5. Component Inventory

### `fe-distillery/components/ui/` (shadcn primitives — 52 components)

`accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button-group`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `combobox`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `dynamic-textarea`, `empty-state`, `expanding-textarea`, `form`, `hover-card`, `input-otp`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle-group`, `toggle`, `tooltip`.

Distyl wrappers: `distyl/centered-loading`, `distyl/collapsible-card`, `distyl/copy-content`, `distyl/expandable-text`, `distyl/index-navigator`, `distyl/label-with-info/`, `distyl/multi-select-dropdown`, `distyl/search-input/`, `distyl/status-alert/`, `distyl/warning-banner/`.

Third-party: `shadcn-io/tags/index.tsx` — not authored under Distyl conventions and not exported as the canonical `Tag`.

### `fe-distillery` shared / legacy

No `components/shared/` directory exists. The closest equivalents:

- `components/src/` — providers and contexts: `EnvironmentBadge`, `Chat/`, `Feature/`, `AgentRunnerShellProvider/`, `Auth0InstanceProvider/`, `MsalInstanceProvider/`, `OktaAuthInstanceProvider/`, `MicrofrontendPropsContext/`, `ToolkitContextProviders/`, `useAuth/`, `useAuthStore/`, `utils/`.
- `components/legacy/` — MUI-era components: `AlertSnackbar`, `AvatarMenu`, `ButtonCard`, `CoffeyNavigation`, `CompactPageHeading`, `ContainedIconButton`, `FeedbackButtons`, `InputLabel`, `MarkdownBlock`, `PageHeading`, `SecondaryNavigation`, `SimpleModal`, `StatCard`, `TableEmptyState`, `theme/`, `ThreadList`, `UpperNavBar`, `UserInputField`.

### Duplicates / divergences inside `fe-distillery`

1. **Two token systems coexist.** `components/ui/base.css` (canonical legacy shadcn) and `impls/demos/App.css` (an independent purple-themed shadcn copy with its own `--primary`, `--background`, `--radius`, and `.dark` block). Both load; both compete for the same variables.
2. **Pill and tag patterns spread across four mechanisms.** Raw `<span>` with `rounded-full` (`impls/spear/ExecutionSelector.tsx`), `ActionPill` wrapping `<Button>` (`impls/tower`), `Badge` variants, and `shadcn-io/tags`. No single canonical Tag or Chip primitive.
3. **Six parallel MUI theme.ts files.** `components/legacy/theme/theme.ts`, `impls/genedit/src/app/theme/theme.ts`, `impls/tower/src/app/theme/theme.ts`, `impls/penny/src/app/theme/theme.ts`, `impls/eagle/legacySrc/app/theme/theme.ts`, `impls/coffey/src/app/theme/theme.ts`. Each defines its own palette and typography alongside shadcn tokens. MUI is effectively a second design system running in parallel.
4. **Multiple `ReactMarkdownOverrides.tsx` files.** `impls/penny` and `impls/coffey` re-implement the same markdown styling with inline px styles.

### `distillery` local components

No design-system-relevant components. The CSS is bootstrap-flavored styling for a Chrome extension and a Flask dashboard.

---

## 6. Component Semantic Violations

**`fe-distillery` import counts:**

| Component | Imports |
| --------- | ------: |
| `Button`  |     489 |
| `Badge`   |     121 |
| `Chip`    |       9 |
| `Tag`     |   **0** |

Tag adoption is 0%. There is no canonical `Tag` primitive. The third-party `shadcn-io/tags` exists but is not imported under that name. A canonical `Tag` component must be built or promoted before Folio Tag semantics can be enforced.

**Button-as-label misuse:**

1. `impls/tower/src/app/components/Pages/Agent/ActionPill.tsx:9` — `<Button variant='outline' size='sm' className='rounded-full'>` used as a decorative pill. Should be a Tag.
2. `impls/spear/ExecutionSelector.tsx:129` — pill-shaped `<span>` with `rounded-full bg-[#f7f4c8]` used as a status label. Should be a Badge.
3. `components/ui/badge.tsx:8–185` — the Badge primitive bakes in 30+ raw Tailwind palette utilities for color variants instead of mapping to semantic tokens. Every Badge consumer inherits the wrong palette.

`distillery` and `distillery-platform`: no React components, no semantic violations.

---

## 7. Drift Map

**Inside `fe-distillery`:**

- `impls/demos/App.css` defines a second, divergent token block with its own purple-themed `--primary`, `--background`, `--radius`, and `.dark` selector. This must be reconciled or deleted before Folio v1.2 lands.
- Six MUI theme files in `components/legacy/theme/` and `impls/{penny,tower,coffey,eagle,genedit}/theme/` run a Material UI palette and typography stack in parallel to shadcn. Inter as base font, separate color palettes, separate component overrides. This is the largest invisible drift surface.
- `impls/eagle/legacySrc/` is the largest source of hardcoded values. Multiple CaseReview files (`CaseHeader.tsx`, `CaseBody.tsx`, `ToolResultsBody.tsx`, `index.tsx`) carry hardcoded hex literals (`#FAFAF9`, `#6366f1`, `#DFDCF8`, `#f3f2f1`, `#ffffff`) and a parallel theme file (`impls/eagle/legacySrc/app/theme/theme.ts:22`) hardcodes `#5D4EE7`. This directory contributes a large share of violation totals.
- `tailwind.config.js:45–47` has three hardcoded hex literals (`#cde4f5`, `#3d76a0`, `#205c8d`) in `theme.extend.colors`. These are unnamed brand colors injected at config level and should be tokens.
- `shadcn-io/tags` is a third-party primitive in `components/ui/` that is not authored under Distyl conventions and not exported as the canonical `Tag`. Promote it to `Tag` or replace it.

**Inside `distillery`:**

- T-Mobile magenta `#e20074` is hardcoded in the tower eval dashboard CSS.
- The Chrome extension demo uses a `#667eea` to `#764ba2` gradient that does not match Folio's `#5D4EE7`.

**Inside `distillery-platform`:** No drift. No FE.

**Patterns invented locally that should be shared:** Nothing reusable originates in `distillery`. Inside `fe-distillery`, `ActionPill`, `ReactMarkdownOverrides`, and the MUI theme files duplicated per impl are the primary cases. These belong in shared primitives.

---

## 8. Debt Priority

Ranked by rebrand blocker status, then by reduction in token surface area, then by developer ergonomics. Effort is engineer-weeks of focused work.

| #   | Item                                                                                                                                                                                                             | Repo            | Effort                | Blocks rebrand?                                   |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------- | ------------------------------------------------- |
| 1   | Switch dark mode from Tailwind `.dark` class strategy to `[data-theme="dark"]` on `<html>` (config + `base.css` selector + theme provider).                                                                      | `fe-distillery` | **S** (1–2 days)      | **Yes**                                           |
| 2   | Introduce the full Folio v1.2 token set in `components/ui/base.css` under `:root` and `[data-theme="dark"]`. Keep legacy `--primary` etc. as aliases pointing at the new tokens during the migration window. | `fe-distillery` | **M** (1 week)        | **Yes**                                           |
| 3   | Update `tailwind.config.js` to expose Folio tokens as semantic Tailwind colors (`bg-background-primary`, `text-text-subtle`, `border-border-default`, etc.).                                                 | `fe-distillery` | **S** (2–3 days)      | **Yes**                                           |
| 4   | Delete or merge `impls/demos/App.css` duplicate token block. One source.                                                                                                                                         | `fe-distillery` | **S** (1 day)         | **Yes**                                           |
| 5   | Rewrite `components/ui/badge.tsx` and `components/ui/toast.tsx` to use semantic tokens instead of raw Tailwind palette utilities. Fixing the primitives propagates to all 121 Badge consumers.                   | `fe-distillery` | **M** (3–5 days)      | **Yes** (silently breaks dark mode)               |
| 6   | Remove all 26 `dark:` Tailwind classes from impl code.                                                                                                                                                           | `fe-distillery` | **M** (3–5 days)      | **Yes**                                           |
| 7   | Introduce a canonical `Tag` primitive (promote `shadcn-io/tags` or author new). Migrate `ActionPill` and `<span>` + `rounded-full` patterns to it.                                                               | `fe-distillery` | **M** (1 week)        | No                                                |
| 8   | Replace 2,061 raw Tailwind palette utilities across impl code with semantic tokens. Codemod-able.                                                                                                                | `fe-distillery` | **L** (2–3 weeks)     | No (but undermines tokens)                        |
| 9   | Replace 344 hardcoded hex literals with token references. Concentrated in `impls/eagle/legacySrc/`, `impls/apprentice/`, `impls/pennycai/`.                                                                      | `fe-distillery` | **L** (2 weeks)       | No                                                |
| 10  | Move 4 direct `@radix-ui/*` imports onto shadcn wrappers.                                                                                                                                                        | `fe-distillery` | **S** (1 day)         | No                                                |
| 11  | Set Geist as the actual `:root` body font in `components/ui/base.css:26` (currently Inter).                                                                                                                      | `fe-distillery` | **S** (hours)         | No (but brand typography is silently wrong today) |
| 12  | Decide the fate of the six MUI theme.ts files. Either retire MUI from `impls/{penny,tower,coffey,eagle,genedit}` and `components/legacy/`, or extend Folio tokens into MUI's theme.                          | `fe-distillery` | **L** (multi-quarter) | No (but largest invisible drift surface)          |
| 13  | Replace hex literals in `impls/tower/.../web/static/styles.css` and `demos/peer/chrome-extension/*.css`.                                                                                                         | `distillery`    | **S** (1 day)         | No (isolated tooling)                             |
| 14  | Standardize spacing in `impls/penny` and `impls/coffey` `ReactMarkdownOverrides.tsx` files.                                                                                                                      | `fe-distillery` | **S** (hours)         | No                                                |

**Recommended sequence:** 1 → 4 → 2 → 3 → 5 → 6 ships a working Folio v1.2 token system with correct dark mode. Items 7 through 14 can proceed on a rolling basis after the rebrand lands.

---

## 9. Rebrand Readiness

| Repo                  | Ready?              | Blockers                                                                                                                                                                                                                                                                                             |
| --------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fe-distillery`       | **No**              | 1. No Folio tokens exist (items 2, 3, 4 in section 8). 2. Dark mode uses the wrong implementation strategy (item 1). 3. Shadcn primitives `badge.tsx` and `toast.tsx` bypass the token system (item 5). 4. 26 `dark:` Tailwind classes will silently break under `[data-theme="dark"]` (item 6). |
| `distillery`          | **N/A**             | Not a React FE consumer of `fe-distillery`. Has brand-color-divergent CSS in two isolated places, but those are not on the Folio path.                                                                                                                                                           |
| `distillery-platform` | **Yes** (vacuously) | No FE surface.                                                                                                                                                                                                                                                                                       |

**Minimum work before a brand refresh can land correctly in `fe-distillery`:**

Land items 1 through 6 from section 8 in order. Estimated 3 to 4 engineer-weeks at focused pace, one engineer. Specifically: dark-mode strategy flip, canonical token definition, Tailwind config rewire, token-block dedupe, primitive rewrite (`badge`, `toast`), dark-class purge. After that, swapping the actual brand color values is a single-CSS-file change in `:root` and `[data-theme="dark"]`.

**Risk flags:**

The six MUI theme files will not pick up new Folio values automatically. Inventory which impl pages still render through MUI before declaring the refresh complete.

The 2,061 raw Tailwind palette utilities and 344 hardcoded hex literals will also not pick up new values. Most are in `impls/eagle/legacySrc/` and similar paths. If those surfaces are user-visible, they must be in scope for the rebrand.

`impls/demos/App.css` currently overrides `base.css` for demos. If demos are part of any external-facing surface, the brand refresh will diverge there until the duplicate block is merged.

---

_Audit run: 2026-06-04 · Three-subagent parallel sweep · Raw JSON in `audit-output/agent-{1,2,3}-_.json`\*
