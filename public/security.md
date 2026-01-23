# Security Policy (Veloscope — Epic Delivery Forecast)

Last updated: 2026-01-22

Veloscope (“we”, “our”) is committed to protecting customer data and responding quickly to security issues affecting the Veloscope Marketplace app (“the App”).

## 1) Supported versions
We support the latest published version of the App running on Atlassian Cloud.  
Security fixes are delivered via Marketplace releases.

## 2) Reporting a vulnerability
If you believe you have found a security vulnerability, please report it responsibly:

- **Email:** majk@veloscope.me  
- **Subject:** `Security vulnerability report – Veloscope`
- **Include:** steps to reproduce, impact assessment, affected tenant/site (if relevant), screenshots/logs (redact secrets), and any suggested fix.

If you report via Atlassian’s channels, you may also be contacted through **Atlassian Marketplace Security (AMS)** tickets. We maintain at least one **designated security contact** for AMS notifications. :contentReference[oaicite:1]{index=1}


## 3) Our response process
After receiving a report, we aim to:
1. **Acknowledge** receipt within **3 business days**.
2. **Triage** severity and scope.
3. **Provide remediation** (or mitigation guidance) as quickly as possible.
4. **Communicate** status updates until closure.

For vulnerabilities tracked by Atlassian in **AMS**, we will respond and maintain communication as required by Atlassian’s bug-fix workflow. :contentReference[oaicite:2]{index=2}

## 4) Coordinated disclosure
Please do not publicly disclose the vulnerability until:
- we have released a fix or mitigation, or
- we have agreed on a disclosure date together.

We will credit reporters upon request (unless you prefer to remain anonymous).

## 5) Data security and access controls
### Principle of least privilege
The App requests only the permissions required to provide its functionality.

### Data handling
- The App processes Jira data necessary to calculate epic forecasts (e.g., issue and estimation data).
- We do not sell End-User Data.
- Any configuration data is limited to what is needed to operate the App.


### Authentication & authorization
- Access to the App is governed by Atlassian’s authentication and product permission model.
- Internal access to operational systems (if any) is restricted to authorized maintainers.

## 6) Encryption and secrets management
- Sensitive secrets (API tokens, keys) are never hard-coded in source code or shipped artifacts.
- Data stored within Forge hosted storage is protected according to Forge’s shared responsibility model (including encryption at rest and tenant isolation as provided by the platform). :contentReference[oaicite:3]{index=3}

## 7) Secure development practices
We follow secure engineering practices, including:
- code review for security-sensitive changes,
- dependency and vulnerability scanning where feasible,
- secure defaults (read-only behavior unless explicitly required),
- prompt patching of known vulnerabilities.

Atlassian also publishes security guidelines and requirements for Marketplace partners/apps, which we use as a baseline. :contentReference[oaicite:4]{index=4}

## 8) Incident response
If we confirm a security incident affecting customer data:
- we will investigate, contain, and remediate,
- notify impacted customers and/or Atlassian as appropriate,
- provide post-incident communication describing impact and corrective actions.

## 9) Security contact
Primary security contact:
- **Name/Role:** Security Team
- **Email:** majk@veloscope.me

## 10) Changes to this policy
We may update this policy periodically. The “Last updated” date will reflect the latest revision.