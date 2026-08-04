<!--
  GENERATED FILE — do not edit by hand.
  Regenerate with: node docs/codebase-map/tools/analyze-ownership.mjs
-->

# Code ownership

10780 tracked files matched against 14 file-matching review groups
from `.pullapprove.yml`. See [`../24-ownership.md`](../24-ownership.md).

## Groups

| Group | Reviewers | `~`-prefixed | Files owned | Globs |
| --- | ---: | ---: | ---: | ---: |
| `fw-general` | 12 | 7 | 3380 | 22 |
| `fw-compiler` | 12 | 7 | 3178 | 4 |
| `angular-dev` | 20 | 11 | 2815 | 3 |
| `devtools` | 9 | 3 | 639 | 1 |
| `zone-js` | 12 | 8 | 318 | 1 |
| `dev-infra` | 3 | 0 | 282 | 31 |
| `primitives` | 5 | 4 | 68 | 1 |
| `primitives-shared` | 6 | 0 | 67 | 1 |
| `public-api` | 16 | 11 | 51 | 1 |
| `agent-skills` | 4 | 2 | 42 | 2 |
| `fw-security` | 4 | 2 | 27 | 9 |
| `size-tracking` | 10 | 7 | 8 | 1 |
| `tooling-cli-shared-api` | 3 | 0 | 2 | 2 |
| `code-ownership` | 6 | 3 | 1 | 1 |

## Repository-wide groups

| Group | Reviewers |
| --- | ---: |
| `global-approvers` | 2 |
| `required-minimum-review` | 1 |

## Paths no group owns (116 files)

A pull request touching only these fails PullApprove with "At least one group must match this
PR", so they have to be adopted by a group before they can be changed.

| Area | Files |
| --- | ---: |
| `docs/codebase-map` | 105 |
| `tools/bazel` | 9 |
| `goldens/vscode-extension` | 2 |
