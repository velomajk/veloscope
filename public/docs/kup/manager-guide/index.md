# Manager guide

Managers work from the global **KUP Compliance** page. Open it from the Jira top navigation: **Apps → KUP Compliance**. Managers land on the **Manager Approval** tab by default; there is also a **My Report** tab (your own hours — see the Employee guide) and an **Audit Log** tab.

## Manager Approval tab

![Manager Approval tab](/docs-assets/kup/manager-approval-dark.png)

**Filters (top row):**

- **Month** — the reporting period to review.
- **Status** — *All*, *Pending*, or *Approved*.
- **Jira group** — limit the list to members of a Jira group.
- **My Team** — limit the list to your own custom team.
- **Refresh** — re-fetch after changes.

**Summary cards** show, for the current view: total **Users**, **Approved**, **Pending**, and **Over limit** (the last turns red when anyone exceeds the cap).

The table lists one row per employee:

| Column | Meaning |
|--------|---------|
| **User** | Click the name to expand and see that person's individual issues and per-issue status. |
| **Issues** | Number of issues with KUP hours this month. |
| **KUP Hours** | Total creative hours logged. |
| **Max Hours** | The month's working-hours base. |
| **Absence / Overtime** | The employee's adjustments, if any. |
| **KUP %** | Computed against the effective (adjusted) base. |
| **Status** | *Pending*, *Approved*, or *Mixed*; an **Over limit** lozenge appears if over the cap. |
| **Action** | Approve / Unapprove. |

Below the table you'll also see any **Unassigned Issues** — issues that have KUP hours logged but no assignee, so someone needs to claim them.

## Approving and un-approving

- **Approve** signs off *all* of that employee's pending issues for the month at once. Approval **locks** the employee out of further edits and adjustments for that month.
- **Unapprove** reverses it and re-opens editing.
- If the **limit** is set to **Block approval** and the employee is over the cap, the Approve button is disabled and shows *"Blocked"*. In **Warn only** mode you can still approve, but you'll get a warning and the action is recorded as such.

> [!info] Every approve and un-approve is recorded in the Audit Log.

## My Team

If you don't manage a whole Jira group, you can curate a personal team:

1. Click **Manage my team**.
2. Use the user picker to **Add** members; **Remove** any you don't want.
3. Click **Save Team**.
4. Toggle the **My Team** filter on to restrict the report to just those people.

## Payroll export

Generates a per-employee monthly payroll summary for accounting. It runs in the background so large datasets don't time out.

1. In the **Export Payroll Summary** panel, choose a **format** — Excel (`.xlsx`) or CSV (`.csv`).
2. Click **Generate Export**. A spinner shows while it's processed in the background.
3. When ready, a **Download** button appears — click it to save the file. (CSV uses a UTF-8 BOM so Polish characters render correctly in Excel.)

**Columns:** First/Last name, Manager/Approver, Working Hours, Creative (KUP) Hours, KUP %, and Approval Status — plus **Capped Creative Hours** when a limit is configured, and **Employee ID** / **Cost Center** when your admin has mapped those fields. Only employees with KUP hours > 0 are included.

> [!warning] If an export takes longer than 60 seconds it times out with a message — just try again. Generating a new export for the same month replaces any previous one.

## Audit Log tab

A chronological record of every approval action for the selected month.

![Audit Log tab](/docs-assets/kup/audit-log-dark.png)

- **Stat cards:** Total Actions, Approvals, Unapprovals, Active Managers.
- **Table:** date/time, the **manager** who acted, the action (Approved/Unapproved), the **employee**, and the affected **issues** (clickable links, truncated with "+ N more" when there are many).
- **Export CSV** downloads the month's log for your records.

> [!info] The audit log keeps the most recent 500 actions per month and 50 changes per issue. Older entries roll off rather than being archived.
