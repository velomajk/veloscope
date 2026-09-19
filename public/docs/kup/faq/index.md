# Frequently asked questions

Quick answers to the questions teams ask most, plus what to check when something looks off.

## Common questions

**Why don't I see the KUP panel on an issue?**
The issue's project or issue type isn't enabled for KUP. Ask your admin to enable it in *KUP 50% Configuration → eligible projects & issue types*.

**Why can't I edit my hours?**
They've been approved for that month. A manager must un-approve before you can edit.

**Why is my KUP % higher than the raw hours suggest?**
KUP % is measured against your **effective base** (working hours − absence + overtime), not the raw monthly maximum. Absence lowers the base and therefore raises the percentage.

**I'm a manager but I don't see the Manager Approval tab.**
Your account isn't listed as a manager. Ask your admin to add you as a *Manager user* or to a *Manager group*.

**Why is the previous month selected by default?**
The period picker uses the previous month on days 1–10 (inclusive), and the current month after that. Choose **Year** and **Month** separately to change it. Years are listed in ascending order: the two preceding years, the current year, and the next year. Administrators do not configure available months.

**Where do the working-hour defaults come from?**
They are based on the Polish holiday calendar. An administrator can enable an override and change the value for a selected month in **Manage overrides**.

**Who owns the hours after an issue is reassigned?**
KUP hours belong to the assignee at the time of saving. Reassigning the issue alone does not transfer them. Save the KUP data again before approval to assign it to the new assignee. If it is approved, a manager must **Unapprove** it first. KUP data cannot be saved without an assignee.

**Does the status filter change an employee’s monthly hours?**
No. It filters employees while preserving their full monthly totals. **Pending** includes pending and mixed employees; **Approved** includes only employees whose entries are all approved.

**How much history is retained?**
Issue activity retains the latest **50 changes per issue**, and the central approval log retains the latest **500 actions per month**. Older log entries roll off. Core KUP data remains on Jira issues and can be used to reconstruct the monthly report.

## Exports & accounts

**The export shows "Former user" as an approver.**
That person's Jira account has been deactivated or removed. The app stores only account IDs and resolves names live, so departed accounts show as *Former user*.

**Do export files linger in storage?**
No. A downloaded export is deleted immediately, and any un-downloaded one is auto-removed after one hour.
