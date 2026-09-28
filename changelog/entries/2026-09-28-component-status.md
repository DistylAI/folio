---
date: 2026-09-28
type: minor
category: docs
component: system
summary: "Added the component status page and replaced the roadmap page"
rationale: "The team needs one place that shows, for each component, whether design approved it in Folio, whether it is released in toolkit-ui, and whether a pilot app used it. content/component-status.json holds one row for each component page, lib/component-status.ts checks the rows against the nav at build time, and /status/components shows them. The earlier design feedback on each component is linked as input. The roadmap page described the fe-distillery work for Cognition v1.3 and is out of date, so this page replaces it."
pr: ""
---
