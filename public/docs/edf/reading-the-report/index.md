# How to read the report

The report condenses an epic's status into a handful of columns. Here's what each one is telling you — and which numbers actually matter.

## Metrics reference

| Metric | What it tells you |
|---|---|
| **Status** | The current status category of the epic (To Do, In Progress, Done). |
| **SP Done / Left** | The raw volume of work. "SP Left" is the numerator for the forecasting formula. |
| **% Done** | Completion percentage — useful for quick stakeholder updates. |
| **Unestimated** | Child issues without points. Keep this at 0 — a high number hides risk and makes your forecast optimistic. |
| **Sprints Required** | The magic number. `SP Left ÷ Velocity`, measured against your deadline. |

The forecast itself is a single division:

```text
Sprints Required = SP Left ÷ Velocity
```

## Health signals

Two signals tell you when to distrust the headline number:

- **Unestimated work** — if issues under your epic have no story points, they're invisible to the forecast. "Sprints Required" assumes they're zero effort, which they almost never are.
- **Blockers** — linked "blocked by" issues won't move regardless of velocity. A low Sprints Required next to open blockers is a false comfort.

> [!tip] Treat any non-zero "Unestimated" count as a to-do before trusting the date. Estimate the work, then re-read the forecast.
