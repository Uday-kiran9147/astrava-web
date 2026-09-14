# Incident: Next.js Build / Compilation Failure

## Purpose

Recovery guide when `npm run build` fails and the production site cannot be deployed.

## Impact

- New changes cannot be shipped to production
- If the currently deployed version is still live, users are unaffected until the next deploy is required

## Symptoms

- `npm run build` exits with a non-zero code
- TypeScript compilation errors in terminal output
- Tailwind CSS / PostCSS processing errors
- `next build` reports module-not-found or import resolution failures
- CI/CD pipeline (if configured) shows a red/failed build step

## Severity

**P1** — Blocks all deployments. Existing production remains live until the hosting cache/build expires.

## Immediate Actions

1. **Do NOT force-deploy a broken build.** The current live version remains safe.
2. Read the **full terminal output** — the first error is usually the root cause; subsequent errors are often cascading.
3. Identify whether the failure is in:
   - TypeScript (`tsc`) — type errors in `.tsx` / `.ts` files
   - PostCSS / Tailwind v4 — CSS processing in `globals.css`
   - Module resolution — missing or renamed imports

## Diagnosis

### Step 1 — Reproduce locally

```bash
npm run build
```

### Step 2 — Check TypeScript errors

```bash
npx tsc --noEmit
```

Look for errors in:
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/articles/[slug]/page.tsx`
- Any file in `src/components/`
- `src/lib/articles.ts`, `src/lib/utils.ts`

### Step 3 — Check for missing dependencies

```bash
npm ls --all 2>&1 | findstr "UNMET"
```

Key dependencies to verify are present and resolvable:
- `next` (16.0.10)
- `react` / `react-dom` (19.2.0)
- `framer-motion` (^12.23.24)
- `lucide-react` (^0.554.0)
- `clsx`, `tailwind-merge`
- `@tailwindcss/postcss` (^4), `tailwindcss` (^4)

### Step 4 — Check import path aliases

The project uses the `@/` path alias. Verify `tsconfig.json` contains:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Step 5 — Check CSS / Tailwind v4

Tailwind v4 uses `@import "tailwindcss"` in `src/app/globals.css` and the `@theme` directive. If PostCSS fails:

- Verify `postcss.config.mjs` exports `@tailwindcss/postcss` as a plugin
- Verify `@tailwindcss/postcss` is installed in `node_modules`

### Step 6 — Check static generation of articles

`src/app/articles/[slug]/page.tsx` uses `generateStaticParams()` reading from `src/lib/articles.ts`. If articles data is malformed (missing `slug`, `sections`, etc.), the build will fail during static page generation.

## Recovery

### Option A — Fix the code error

Address the specific TypeScript / import / CSS error reported in the build output. Run `npm run build` again.

### Option B — Clean build

```bash
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

### Option C — Lock to last known working state

```bash
git stash
npm run build
```

If the build succeeds, the recent changes introduced the failure. Review the stashed changes with `git stash show -p`.

## Validation

- `npm run build` completes with exit code 0
- `npm run start` serves the site on `http://localhost:3000`
- Homepage loads with all sections (LoadingScreen → Navbar → Hero → Problem → Features → DiscoveryNetwork → AudienceBenefits → FeaturedInsights → Vision → Newsletter → SubmitProduct → Footer)
- Article pages load at `/articles/<slug>` for all slugs defined in `src/lib/articles.ts`

## Rollback

```bash
git log --oneline -5
git revert <commit-hash>
npm run build
```

If the failure was introduced by a dependency upgrade:

```bash
git checkout <last-working-commit> -- package.json package-lock.json
npm install
npm run build
```

## Escalation

- If the build failure is caused by a bug in `next@16.0.10`, `react@19.2.0`, or `@tailwindcss/postcss@4` — check the respective GitHub issue trackers before escalating.
- If the failure persists after a clean install and git revert, escalate to the project maintainer.

## Do Not

- Do not skip TypeScript checks (`--no-lint` or `ignoreBuildErrors`) to force a deploy
- Do not delete `package-lock.json` without understanding the dependency resolution impact
- Do not downgrade `next` or `react` without verifying component compatibility

## Root Cause Follow-Up

- Add the failing scenario to local development checks (e.g., run `npm run build` before pushing)
- Consider adding a CI pipeline (GitHub Actions) to catch build failures before merge
