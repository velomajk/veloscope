# Key concepts

KUP Compliance Reporter tracks creative-work hours in Jira against a monthly working-hour baseline, runs a manager approval workflow, and produces a payroll-ready monthly summary. If you're new to the scheme, start here.

## Core terms

| Term | Meaning |
|------|---------|
| **KUP** | *Koszty Uzyskania Przychodu* — creative-work hours eligible for the 50% tax-deductible cost (*honorarium autorskie*). |
| **KUP month** | A reporting period, shown as e.g. *"May 2026"*. Hours are logged and approved per month. |
| **Working hours base** | The maximum working hours for a month (set by your admin per month). Your KUP % is measured against this. |
| **Adjustment** | Personal **absence** hours (which *reduce* your base) or **overtime** hours (which *raise* it), giving an **effective base**. |
| **KUP %** | `total KUP hours ÷ effective base × 100`. The headline compliance number. |
| **Limit** | An optional company-wide cap on KUP % set by your admin (e.g. 20%). It can *warn* or *block* approval when exceeded. |
| **Approval** | A manager signs off an employee's hours for a month. Once approved, the employee can no longer edit those hours or adjustments until a manager un-approves. |

## Lifecycle of a month's hours

An employee logs hours on issues, optionally sets absence or overtime, and a manager reviews everything on the global page. The manager approves — which locks edits — and accounting receives the payroll export. A manager can un-approve at any time to re-open edits.

> [!info] Three roles see three different slices of the report: **Administrators** configure the app, **Managers** review and approve, and **Employees** log hours and check their own compliance.
