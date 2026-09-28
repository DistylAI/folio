# Changelog conventions

How changelog entries in this repo are authored. Every change to the Folio
design system gets an entry — an intentional alteration with a receipt.

Entries live one-per-file under `changelog/entries/`. Each is a Markdown file
with a YAML frontmatter block and (optionally) freeform body notes below it.

## File naming

```
changelog/entries/YYYY-MM-DD-slug.md
```

- `YYYY-MM-DD` — the entry date (see the `date` rule below).
- `slug` — a short, kebab-case description, e.g. `alert-icon-offset`.

The date in the filename **must** match the `date` frontmatter field.

## Required frontmatter fields

Every entry declares all seven fields — none are optional:

| Field       | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `date`      | When the entry was authored/merged (see rule below). `YYYY-MM-DD`. |
| `type`      | Semver-style impact. Controlled vocabulary (below).                |
| `category`  | The kind of change. Controlled vocabulary (below).                 |
| `component` | Affected component name (e.g. `Alert`), or `system` for repo-wide. |
| `summary`   | One-line human summary of the change.                              |
| `rationale` | Why the change was made. Flat single-line string (see rule below). |
| `pr`        | The PR that landed it, e.g. `"#27"`. Backfilled once the PR opens. |

There is also a `version` field, but it is **not** authored by hand and is **not**
one of the seven above — it is written by the cut script when a batch of entries
is rolled into a version. An entry has no `version` until then. See
[Versioning and the cut lifecycle](#versioning-and-the-cut-lifecycle).

## Controlled vocabulary

```
type:     patch | minor | major
category: component | token | pattern | docs
```

- **type** — `patch` (fix / non-breaking tweak), `minor` (additive, backward
  compatible), `major` (breaking).
- **category** — `component` (component behavior/markup), `token` (design
  tokens / theme values), `pattern` (cross-component conventions/recipes),
  `docs` (documentation, comments, changelog infrastructure).

## Rules

1. **`rationale` must be a flat single-line string.** Folded / multi-line YAML
   values are banned — they are fragile under strict parsing (one bad
   continuation indent silently drops or mangles the field). Keep the whole
   rationale on one line, however long.

2. **`date` reflects when the entry was authored/merged**, not necessarily the
   date of the change being described. If you document a past deviation today,
   `date` is today.

3. **Cross-referenced values exist in multiple places by design** — filenames,
   frontmatter fields, and inline code comments may all repeat a date or a
   token value. When you correct one, `grep` for all the others before
   considering the fix complete. (In PR A / #27 we hit this twice: a stale
   `top-3` → `top-2.5` value, then a stale date across three locations —
   filename, `date:`, and the inline `see changelog …` comment.)

## Versioning and the cut lifecycle

Entries accumulate unversioned. Periodically they are **cut** into a version — a
manual, on-demand step run with `node scripts/cut-changelog-version.mjs` (dry-run
by default; `--apply` to write). Cutting is never automatic — not per-PR, not in CI.

A cut does three things:

1. **Stamps `version: vX.X.X`** into every entry that lacks one (the "uncut
   batch"). This field is written by the cut script, never by hand — an entry has
   no `version` until it is cut.
2. **Derives the version number** by taking the highest-severity `type` in the
   batch and bumping the last cut version, standard three-part semver:
   - `major` → `(X+1).0.0`
   - `minor` → `X.(Y+1).0`
   - `patch` → `X.Y.(Z+1)`

   So a single `major` entry makes the whole cut a major bump. The first cut
   baselines off the latest legacy version, `v1.3.0`.
3. **Creates `changelog/versions/vX.X.X.md`** holding the `version`, the cut
   `date`, and an empty `blurb: ""` — the manual release narrative, written by
   hand afterward (never auto-generated).

The `/status/changelog` page renders generated versions (v1.4.0+) from
`changelog/versions/`, newest-first, pairing each version's manual `blurb` with
bullets rolled up from its entries' `summary` fields (in entry-date order).
Legacy versions v1.0–v1.3 remain hardcoded on that page; the newest version
overall — generated or legacy — is labeled Current.

## Automated validation (planned, not yet built)

A CI gate that validates every entry against this schema — required fields,
controlled vocabulary, flat `rationale`, filename/`date` agreement, and a
filled-in `pr` — is **planned but not yet implemented**.

In the meantime a manual checker exists: `node scripts/check-changelog.mjs`
validates `type`, `category`, flat `rationale`, and `version` format (vX.X.X,
when present) across every entry (run it before opening a PR). It does not yet
cover the remaining rules above
(filename/`date` agreement, filled-in `pr`), which stay enforced by author
discipline and review. This is a documented interim state, not an oversight.

## Scope: Folio only

Entries in this changelog apply to **Folio (this repo)** only. If a change
to the toolkit design system (`@distylai/toolkit-ui`) is ever logged here, it
**must be explicitly labeled toolkit-scoped** — never assume an entry applies
to both systems. The two are separate systems with separate components (e.g.
both have an `Alert`); an unlabeled entry means Folio.

## Example

```markdown
---
date: 2026-07-22
type: patch
category: docs
component: Alert
summary: "Documented intentional top-2.5 deviation inline in code"
rationale: "Added a code comment pointing to this changelog entry so the top-2.5 offset can't be silently reverted to shadcn's top-4 default during a future re-sync or cleanup."
pr: "#27"
---
```
