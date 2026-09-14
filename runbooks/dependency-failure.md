# Incident: Dependency Resolution / npm Install Failure

## Purpose

Recovery guide when `npm install` fails or produces a broken `node_modules` tree, preventing local development and production builds.

## Impact

- Cannot install dependencies — blocks all development and deployment
- May cause cascading build failures (see `build-failure.md`)

## Symptoms

- `npm install` exits with errors (`ERESOLVE`, `ENOENT`, `ETARGET`, `EACCES`)
- `npm run dev` or `npm run build` fails with "Cannot find module" errors
- `package-lock.json` has merge conflicts after a git merge/rebase
- A dependency published a breaking change under a `^` semver range

## Severity

**P2** — Blocks development workflow. Production remains on the last successful deploy.

## Immediate Actions

1. Read the **full npm error output** — the root cause is usually stated clearly.
2. Do not delete `package-lock.json` as a first resort — it pins exact versions and protects against upstream breakage.

## Diagnosis

### Step 1 — Identify the failing package

The npm error output will name the package and version causing the conflict. Common culprits in this project:

| Package | Pinned Version | Risk |
|---------|---------------|------|
| `next` | `16.0.10` (exact) | Low — exact pin |
| `react` / `react-dom` | `19.2.0` (exact) | Low — exact pin |
| `framer-motion` | `^12.23.24` | Medium — allows minor/patch updates |
| `lucide-react` | `^0.554.0` | Medium — allows minor/patch updates |
| `clsx` | `^2.1.1` | Low |
| `tailwind-merge` | `^3.4.0` | Medium |
| `@tailwindcss/postcss` | `^4` | High — allows major-range updates within v4 |
| `tailwindcss` | `^4` | High — allows major-range updates within v4 |

### Step 2 — Check for peer dependency conflicts

```bash
npm ls 2>&1 | findstr "peer dep\|UNMET\|invalid"
```

Next.js 16 requires React 19. If any dependency pulls in a conflicting React version, peer dependency errors will occur.

### Step 3 — Check Node.js version

The project requires Node.js v18.x or later (per README).

```bash
node --version
```

If the Node.js version is too old, some dependencies (especially `next@16`) may fail to install.

### Step 4 — Check for lockfile conflicts

```bash
git status package-lock.json
```

If `package-lock.json` shows merge conflicts, resolve them by regenerating:

```bash
git checkout --theirs package-lock.json
npm install
```

Or if that fails:

```bash
Remove-Item package-lock.json
npm install
```

## Recovery

### Option A — Clean install from lockfile

```bash
Remove-Item -Recurse -Force node_modules
npm ci
```

`npm ci` installs exactly what `package-lock.json` specifies — faster and more deterministic than `npm install`.

### Option B — Full clean reinstall

```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

> ⚠️ This regenerates the lockfile and may pull in newer dependency versions. Run `npm run build` immediately after to verify nothing broke.

### Option C — Pin a broken dependency

If a specific package published a breaking update under its `^` range:

```bash
npm install <package>@<last-known-working-version> --save-exact
```

## Validation

- `npm ci` or `npm install` completes with exit code 0
- `npm run build` succeeds
- `npm run dev` starts the dev server at `http://localhost:3000`
- All pages render correctly (homepage + article pages)

## Rollback

If a dependency upgrade caused the failure:

```bash
git checkout <last-working-commit> -- package.json package-lock.json
Remove-Item -Recurse -Force node_modules
npm ci
```

## Escalation

- If the failure is caused by a bug in a published npm package — check the package's GitHub issues.
- If `npm ci` consistently fails with network errors — check npm registry status at [status.npmjs.org](https://status.npmjs.org).

## Do Not

- Do not use `--force` or `--legacy-peer-deps` without understanding the consequences — these flags hide real conflicts
- Do not upgrade `next` or `react` without testing all components (especially Framer Motion animations and the canvas-based `DiscoveryNetwork` component)
- Do not commit a `package-lock.json` generated on a significantly different Node.js version than the team uses

## Root Cause Follow-Up

- Consider pinning high-risk dependencies to exact versions instead of `^` ranges
- Add a `.nvmrc` or `engines` field in `package.json` to enforce Node.js version consistency
- Set up Dependabot or Renovate for controlled, tested dependency upgrades
