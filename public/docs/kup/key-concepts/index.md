# Key Concepts

## What the app tracks

KUP 50% Compliance for Jira records 50% KUP creative-work hours against individual Jira issues. In the issue context panel, an employee selects the reporting month and enters the number of eligible creative-work hours for that issue.

## Monthly KUP record

Each KUP record includes:

- Reporting month
- Eligible creative-work hours
- Approval status

These values are stored with the Jira issue. The app uses them to create monthly employee and manager reports.

## Working-hour baseline and KUP percentage

Administrators configure a working-hour baseline for each reporting month. The app compares an employee's recorded KUP hours with the applicable baseline to calculate the monthly KUP percentage.

Absence and overtime adjustments can change an employee's effective working-hour base for a reporting month, which changes the percentage calculation.

## Eligibility and configuration

Administrators choose which Jira projects and issue types are eligible for KUP recording. They also configure available reporting months, working-hour baselines, KUP limits, and manager access. See the [Administrator Guide](/documentation.html?product=kup&page=administrator-guide) for setup details.

## Approval workflow

Managers review employees' monthly KUP records and can approve or unapprove records in bulk. Once approved, the relevant KUP entries and monthly adjustments are locked until a manager unapproves those records. See the [Manager Guide](/documentation.html?product=kup&page=manager-guide) for the review workflow.

## Audit trail

The app records KUP changes and manager approval actions with timestamps to support internal review and payroll traceability.

## Payroll export

Managers can generate a monthly CSV or XLSX payroll summary containing the configured employee and KUP data needed for the company's payroll workflow.

## Roles at a glance

| Role | Main responsibilities |
| --- | --- |
| Administrator | Configures eligibility, months, baselines, limits, and manager access |
| Employee | Records KUP creative-work hours on eligible Jira issues and views their monthly report. See the [Employee Guide](/documentation.html?product=kup&page=employee-guide). |
| Manager | Reviews monthly reports, manages adjustments, approves or unapproves records, and exports payroll summaries |
