# Troubleshooting

Fixes for the issues teams hit most often when a forecast doesn't look right.

## Common issues

- **"Sprints Req." shows "–"** — make sure you've set a valid velocity in the configuration and that "SP Left" is greater than 0. With no velocity or no remaining work, there's nothing to divide.
- **Velocity is 0** — if you're using dynamic velocity, check that your Scrum board has completed sprints with defined story points. A board with no closed sprints, or sprints without points, produces a zero average.
- **Issues seem missing** — confirm the epic's child issues belong to the selected project and Fix Version. Work outside the tracked version isn't counted.

> [!warning] A forecast is only as honest as its inputs. If velocity is artificially high or unestimated work is hiding, "Sprints Required" will read optimistically.
