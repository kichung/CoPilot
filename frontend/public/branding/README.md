# Brand assets

Place deployment-specific brand assets in this directory and point the `VITE_BRAND_LOGO_*`
variables at them. Keeping custom assets under `public/branding` avoids changing application
components when the upstream CoPilot source is upgraded.

Recommended assets:
- `logo-horizontal-light.svg` and `logo-horizontal-dark.svg`
- `logo-mark-light.svg` and `logo-mark-dark.svg`
- `logo-default-light.svg` and `logo-default-dark.svg`

Do not remove the repository LICENSE or upstream copyright/license notices when distributing a
modified build.
