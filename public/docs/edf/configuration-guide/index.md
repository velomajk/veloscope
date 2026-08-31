# Configuration guide

Once you've added the Epic Delivery Forecast gadget to your Jira dashboard, three steps stand between you and a live forecast: scope, velocity, and metrics.

## Add the gadget

On any Jira dashboard, choose **Add gadget** and search for "Veloscope". The gadget opens in configuration mode the first time you add it.

![Configuration view](/assets/scr3dark.png)

## Define scope

- **Project** — select the Jira project containing your roadmap.
- **Fix Version** — choose the specific release or Fix Version you want to track (e.g. "v2.0" or "Q3 Release").

## Define velocity

Epic Delivery Forecast needs to know how fast your team ships to make predictions.

- **Dynamic board velocity (recommended)** — select your team's Scrum board and Veloscope fetches the average of your last 5 completed sprints. Your forecast stays current as team performance fluctuates.
- **Manual velocity** — enter a specific number of story points per sprint (e.g. "30"). Ideal for new teams or scenario planning.

> [!info] If velocity reads 0, check that your Scrum board has completed sprints with defined story points.

## Select metrics

Customize which columns appear in your report:

| Metric | What it shows |
|---|---|
| **Story Points** | "SP Done" vs. "SP Left". |
| **% Done** | Visual progress bar based on points completed. |
| **Unestimated** | Count of child issues with no story points — hidden risk in your roadmap. |
| **Sprints Required** | Predicted sprints to finish remaining work (`SP Left ÷ Velocity`). |
| **Blockers** | Number of linked "blocked by" issues. |
