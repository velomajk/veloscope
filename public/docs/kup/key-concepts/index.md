# Key Concepts

## What the app tracks

KUP 50% Compliance for Jira records 50% KUP creative-work hours against individual Jira issues. In the issue context panel, an employee selects the reporting year and month separately and enters the number of eligible creative-work hours for that issue.

## Monthly KUP record

Each KUP record includes:

- Reporting month
- Employee (the issue’s assignee at the time of saving)
- Eligible creative-work hours
- Approval status

These core KUP values are stored on Jira issues and can be used to reconstruct the monthly report.

An assignee is required to save KUP data. Changing the issue’s assignee does not automatically transfer its KUP hours: save again before approval to attribute the data to the new assignee. Approved data must first be unlocked by a manager using **Unapprove**.

## Reporting period

Choose **Year** and **Month** separately. The year list includes the current year, the two preceding years, and the next year, sorted in ascending order. The default is the current month, except on days 1–10 (inclusive), when the previous month is selected. Existing issue records retain their saved reporting period.

## Working-hour baseline and KUP percentage

The app provides working-hour defaults based on the Polish holiday calendar. Administrators can enable an override and change the value for a selected month. The app compares an employee's recorded KUP hours with the applicable baseline to calculate the monthly KUP percentage.

Absence and overtime adjustments can change an employee's effective working-hour base for a reporting month, which changes the percentage calculation.

## Eligibility and configuration

Administrators choose which Jira projects and issue types are eligible for KUP recording. They also configure KUP limits and manager access, and can override monthly working-hour defaults. Available months do not require administrator configuration. See the [Administrator Guide](/documentation.html?product=kup&page=administrator-guide) for setup details.

## Approval workflow

Managers review employees' monthly KUP records and can approve or unapprove records in bulk. Once approved, the relevant KUP entries and monthly adjustments are locked until a manager unapproves those records. See the [Manager Guide](/documentation.html?product=kup&page=manager-guide) for the review workflow.

## Activity and approval history

Issue activity retains the latest **50 changes per issue**. The central approval log retains the latest **500 approval or unapproval actions per month**, with timestamps to support internal review and payroll traceability. Older log entries roll off; these logs are separate from the core KUP data stored on Jira issues and used to reconstruct monthly reports.

## Payroll export

Managers can generate a monthly CSV or XLSX payroll summary containing the configured employee and KUP data needed for the company's payroll workflow.

## Roles at a glance

| Role | Main responsibilities |
| --- | --- |
| Administrator | Configures eligibility, limits, and manager access; can override monthly working-hour defaults |
| Employee | Records KUP creative-work hours on eligible Jira issues and views their monthly report. See the [Employee Guide](/documentation.html?product=kup&page=employee-guide). |
| Manager | Reviews monthly reports, manages adjustments, approves or unapproves records, and exports payroll summaries |
