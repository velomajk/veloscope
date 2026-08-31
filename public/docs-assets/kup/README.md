# KUP documentation screenshots

Drop the KUP Compliance screenshots here. The docs renderer auto-swaps the
dark/light variant with the site theme, so each screen needs **both** files,
named exactly as below (same base name, ending in `dark.png` / `light.png`):

| Screen | Dark theme file | Light theme file |
|--------|-----------------|------------------|
| Administration config page (Administrator guide) | `admin-config-dark.png` | `admin-config-light.png` |
| My Report (Employee guide) | `my-report-dark.png` | `my-report-light.png` |
| Manager Approval (Manager guide) | `manager-approval-dark.png` | `manager-approval-light.png` |
| Audit Log (Manager guide) | `audit-log-dark.png` | `audit-log-light.png` |

A markdown reference only points at the `…dark.png` file; the matching
`…light.png` is derived automatically. Served at `/docs-assets/kup/<file>`.
