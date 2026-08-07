# Code ownership

Every path in this repository belongs to a review group, and the mapping lives in one 545-line
file: [`.pullapprove.yml`](../../.pullapprove.yml). A pull request needs an approval from each group
whose globs it touches, which makes that file the closest thing the repository has to a
machine-readable map of who understands what.

Measured by [`tools/analyze-ownership.mjs`](./tools/analyze-ownership.mjs), which writes
[`generated/ownership.md`](./generated/ownership.md).

```bash
node docs/codebase-map/tools/analyze-ownership.mjs          # every tracked file
node docs/codebase-map/tools/analyze-ownership.mjs some/new/dir/file.ts   # just these
```

---

## 1. Unowned paths are not a silent gap — they block the PR

Most ownership systems degrade quietly: a file nobody claims simply gets no reviewer. Angular's
config makes it loud, with an override that fails the whole pull request:

```yaml
- if: len(groups.active.exclude("required-minimum-review").exclude("global-*")) == 0
    and len(groups.approved.include("global-*")) == 0
  status: failure
  explanation: 'At least one group must match this PR. Please update an existing review group,
    or create a new group.'
```

So a path outside every glob is a latent blocker: the first pull request that touches it cannot
pass review until somebody edits the ownership config. That is why the analyzer takes optional path
arguments — before adding a new top-level directory, it answers "will this block a PR?" without
opening one.

**Three areas currently match no group** (122 files):

| Area                       | Files | Why                                                                                                                                                                                                                                                                      |
| -------------------------- | ----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/codebase-map`        |   111 | this map — a new top-level `docs/` directory the config has never seen                                                                                                                                                                                                   |
| `tools/bazel`              |     9 | `dev-infra` enumerates `tools/<subdir>/**` one directory at a time and this one was never added; its `.bzl` files are covered by the catch-all `**/*.bzl`, so only `BUILD.bazel`, `node_loader/*.mjs`, `rollup/path-plugin.cjs` and `rules_angular_store/*` fall through |
| `goldens/vscode-extension` |     2 | `dev-infra` claims `goldens/{*,.*}` (top level only) and `public-api` claims `goldens/public-api/**`, leaving this sibling directory uncovered                                                                                                                           |

The `tools/bazel` case is the instructive one: the gap is not a forgotten area but an
**enumeration style**. Listing sibling directories individually means every new sibling is unowned
until someone remembers to add it, and the `**/*.bzl` catch-all hides the omission for exactly the
files people usually edit.

## 2. What the groups own

14 groups match on files, and their shares are very uneven:

| Group                    | Reviewers | Files owned |
| ------------------------ | --------: | ----------: |
| `fw-general`             |        12 |       3,380 |
| `fw-compiler`            |        12 |       3,178 |
| `angular-dev`            |        20 |       2,815 |
| `devtools`               |         9 |         639 |
| `zone-js`                |        12 |         318 |
| `dev-infra`              |         3 |         282 |
| `primitives`             |         5 |          68 |
| `primitives-shared`      |         6 |          67 |
| `public-api`             |        16 |          51 |
| `agent-skills`           |         4 |          42 |
| `fw-security`            |         4 |          27 |
| `size-tracking`          |        10 |           8 |
| `tooling-cli-shared-api` |         3 |           2 |
| `code-ownership`         |         6 |           1 |

The counts overlap — 10,878 assignments across 10,786 files — because a path can belong to several
groups, and each of them must approve.

Two shapes stand out:

- **Small groups guard high-consequence surfaces.** `fw-security` (4 reviewers) owns 27 files —
  the sanitizers, Trusted Types adapters and `tools/tsec.bzl`. `code-ownership` (6) owns exactly
  one: `.pullapprove.yml` itself, so changing who owns what needs its own approval. This is the
  philosophy the file states up front: "A small number of file groups have very limited number of
  reviewers because incorrect changes to the files they guard would have serious consequences."
- **`dev-infra` is the thinnest cover per file**: 3 reviewers for 282 files, spread across 31 globs
  that reach into `.github/`, `.ng-dev/`, `scripts/`, `third_party/` and most of `tools/`. It is
  also the group whose glob list has to be edited whenever the repository grows a new directory.

Three groups never match on files at all — `required-minimum-review` (every PR needs one team
approval, and authors cannot approve themselves), `global-approvers` and `global-docs-approvers`.
They are gates rather than owners, which is why the analyzer excludes them; counting them would
make every path look covered.

## 3. Reading the config

Two details are worth knowing before editing it:

- **Globs are PullApprove's, not git's.** The idiom throughout is
  `'packages/compiler/**/{*,.*}'` — the brace group is what makes it match dotfiles as well as
  ordinary ones. A plain `'goldens/{*,.*}'` matches only the directory's own entries, not anything
  nested, which is exactly how `goldens/vscode-extension` slipped through.
- **Exclusions are expressed on the input, not the pattern**:
  `contains_any_globs(files.exclude('yarn.lock'), […])`. They read like part of the glob list but
  behave the other way round, so a tool reading this file has to distinguish the two — this
  analyzer does.

66 of the reviewer entries carry a `~` prefix. The config never explains it, and it is _not_ the
availability mechanism: `availability.users_unavailable` lists `devversion`, who appears in
`fw-compiler` with no prefix. The generated table reports the prefix counts as observed rather than
interpreting them.

## 4. What this does not tell you

Ownership is not the same as knowledge, and this file measures neither directly. A group with 20
reviewers is not necessarily better covered than one with 3 — `angular-dev` owns the documentation
site, where a wide pool makes sense, while `dev-infra`'s three reviewers own the build system,
where it is a genuine concentration. What the data does support is the narrower question the
analyzer answers on demand: _is this path owned at all, and by whom_ — which is worth asking before
a directory exists rather than after a pull request stalls on it.
