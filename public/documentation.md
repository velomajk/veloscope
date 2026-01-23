# Veloscope User Guide

## Overview
**Veloscope** is a Jira Dashboard Gadget that helps teams forecast delivery dates with confidence. It combines your real-time Jira data (Epics & Stories) with your team's historical velocity to predict when work will be completed.

## Key Features
*   **Epic-Level Visibility**: See all Epics in a specific Fix Version at a glance.
*   **Data-Driven Forecasts**: Automatically calculates "Sprints Required" based on remaining Story Points.
*   **Dynamic Velocity**: Connects to your Scrum Board to use real 5-sprint average velocity, or allows manual overrides.
*   **Health Signals**: clear indicators for unestimated work and blocking issues.

---

## Configuration Guide

Once you have added the Veloscope gadget to your Jira Dashboard, you need to configure it:

### 1. Define Scope
*   **Project**: Select the Jira Project containing your roadmap.
*   **Fix Version**: Choose the specific Release or Fix Version you want to track (e.g., "v2.0" or "Q3 Release").

### 2. Define Speed (Velocity)
Veloscope needs to know how fast your team ships to make predictions.
*   **Dynamic Board Velocity (Recommended)**: Select your team's Scrum Board. Veloscope will automatically fetch the average velocity from your last 5 completed sprints. This ensures your forecast stays up-to-date as team performance fluctuates.
*   **Manual Velocity**: If you are a new team or want to scenario plan, enter a specific number of Story Points per Sprint (e.g., "30").

### 3. Select Metrics
Customize which columns appear in your report:
*   **Story Points**: Shows "SP Done" vs. "SP Left".
*   **% Done**: Visual progress bar based on points completed.
*   **Unestimated**: **Critical Metric!** Shows the count of child issues that have no Story Points. These represent hidden risk in your roadmap.
*   **Sprints Required**: The predicted number of sprints needed to finish the remaining work (`SP Left / Velocity`).
*   **Blockers**: Number of linked "blocked by" issues.

---

## How to Read the Report

| Metric | What it tells you |
| :--- | :--- |
| **Status** | The current status category of the Epic (To Do, In Progress, Done). |
| **SP Done / Left** | The raw volume of work. "SP Left" is the numerator for our forecasting formula. |
| **% Done** | Completion percentage. Useful for quick stakeholder updates. |
| **Unestimated** | **Keep this at 0!** If this number is high, your "Sprints Required" forecast is likely optimistic because it ignores the unpointed work. |
| **Sprints Required** | The "Magic Number". If this is `2.5` and you only have 2 sprints left until the deadline, you are at risk. |

### Troubleshooting
*   **"Sprints Req." says "-":** Ensure you have set a valid Velocity in the configuration and that "SP Left" is greater than 0.
*   **Velocity is 0:** If using Dynamic Velocity, check that your Scrum Board has completed sprints with defined Story Points.
