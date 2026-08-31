# Administrator guide

Administrators set up which work counts as KUP, the working-hour baselines, who the managers are, the optional compliance limit, and the payroll-export column mappings.

## Opening the configuration page

1. Go to the Jira **Settings** (⚙ gear icon, top-right) → **Apps**.
2. In the left sidebar, select **KUP 50% Configuration**.

> [!info] You need Jira administrator rights to see this page. The page is admin-only by virtue of being a Jira admin page — that is also what keeps configuration secure from regular users.

Make your changes and click **Save** at the bottom. The page tracks unsaved changes and confirms on a successful save; if a value is rejected it shows an error instead.

![Administration configuration page](/docs-assets/kup/admin-config-dark.png)

## Eligible projects & issue types

Controls **where the KUP panel appears** and which issues can carry KUP hours.

- **Enable for all projects & issue types** — the simplest setup. When on, the KUP panel appears on every issue.
- To scope it down, turn that off and pick specific **projects**. Optionally, per project, restrict to specific **issue types** (leave issue types empty to allow all types in that project).

## Available months

The list of KUP months that appear in every month dropdown across the app.

- Toggle individual months on/off in the table.
- If you never configure this, the app defaults to all twelve months of the **current calendar year**.

## Working hours per month

The **maximum working hours** baseline for each month — the denominator for everyone's KUP %.

- The app ships with a sensible Polish working-calendar default for each month (2025–2030).
- Override any month with your organisation's own figure. Employees' absence/overtime adjust *their own* effective base on top of this.

## Managers

Defines who can see the **Manager Approval** and **Audit Log** tabs and approve hours. You can grant the manager role two ways, and either is sufficient:

- **Manager users** — pick specific people.
- **Manager groups** — pick Jira groups; every member of a selected group is treated as a manager.

## KUP percentage limit

An optional company-wide cap on KUP %.

- **Limit (%)** — leave blank for no limit, or set a cap (e.g. `20`).
- **Enforcement:**
  - **Warn only** — employees and managers see a warning when over the limit, but approval is still allowed.
  - **Block approval** — managers cannot approve an employee who is over the limit; the Approve button shows *"Blocked"* until the hours are brought back under the cap.

## Payroll export field mappings

Optional. Adds extra columns to the payroll export by mapping them to existing Jira **custom fields**.

- **Employee ID** — map to the custom field that holds each person's payroll/HR identifier.
- **Cost Center** — map to the custom field that holds the cost-centre / supervisory org.

Leave either unmapped to omit that column from the export. Values are read from each employee's most recent KUP issue for the month.
