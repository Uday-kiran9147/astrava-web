# Incident: Production Site Completely Unavailable

## Purpose

Recovery guide when `astrava.club` (or the deployed URL) returns errors, times out, or is unreachable.

## Impact

- All visitors see an error page or timeout
- No landing page, no articles, no newsletter signup — complete loss of public presence
- SEO indexing may be affected if downtime is prolonged

## Symptoms

- Browser returns HTTP 5xx, 502 Bad Gateway, or connection timeout
- `curl https://astrava.club` fails or returns an error body
- Social media links to the site are broken
- Google Search Console reports increased crawl errors

## Severity

**P0** — Complete production outage. All public-facing functionality is down.

## Immediate Actions

1. **Confirm the outage is real** — test from multiple networks (mobile data, VPN, different browser) to rule out local DNS cache or ISP issues.
2. **Check the hosting provider's status page** (e.g., Vercel Status, Netlify Status, or whichever platform is in use).
3. **Check if the domain and DNS are resolving**:
   ```bash
   nslookup astrava.club
   ```
4. **Check SSL certificate validity**:
   ```bash
   curl -vI https://astrava.club 2>&1 | findstr "expire\|SSL\|certificate"
   ```

## Diagnosis

### Step 1 — Is the hosting platform up?

Check the status page of the hosting provider. If the platform itself is experiencing an incident, recovery depends on them.

> **NOT VERIFIED**: The specific hosting/deployment platform for this project could not be determined from the repository. No `vercel.json`, `netlify.toml`, Dockerfile, or deployment configuration was found.

### Step 2 — Was there a recent deployment?

Check the hosting provider's deployment dashboard for:
- The last successful deploy timestamp
- Whether a recent deploy failed or is stuck
- Whether the build logs show errors (see `build-failure.md`)

### Step 3 — DNS resolution

```bash
nslookup astrava.club
```

Verify the returned IP / CNAME matches the expected hosting provider target. If DNS is misconfigured:
- Check the domain registrar's DNS settings
- Verify nameservers point to the correct provider
- DNS propagation can take up to 48 hours after changes

### Step 4 — SSL / TLS certificate

If visitors see "Your connection is not private" or `ERR_CERT_*`:
- Check if the SSL certificate has expired
- Check if the certificate covers the correct domain (`astrava.club` and `www.astrava.club`)
- Most hosting platforms auto-renew SSL via Let's Encrypt — check if auto-renewal failed

### Step 5 — Is the issue specific to a route?

Test multiple paths:
- `/` (homepage)
- `/articles/why-most-saas-products-never-get-discovered` (article page)
- A non-existent path like `/does-not-exist` (should show Next.js 404)

If only specific routes fail, the issue may be in static generation rather than the hosting platform.

## Recovery

### If hosting platform is down
- Wait for the platform to recover. Monitor their status page.
- If prolonged (>1 hour), consider redeploying to an alternative platform as a temporary measure.

### If DNS is misconfigured
- Correct DNS records in the domain registrar dashboard.
- Wait for propagation (use `nslookup` or [dnschecker.org](https://dnschecker.org) to verify).

### If SSL certificate expired
- Trigger certificate renewal in the hosting provider dashboard.
- If using a custom certificate, obtain a new one and upload it.

### If a bad deploy caused the outage
- Roll back to the previous deployment in the hosting provider dashboard (most platforms support one-click rollback).
- Alternatively, redeploy from the last known working commit:
  ```bash
  git log --oneline -5
  git checkout <last-working-commit>
  npm run build
  # Deploy using your platform's CLI or dashboard
  ```

## Validation

- `curl -sI https://astrava.club` returns `HTTP/2 200`
- Homepage loads fully in a browser with all sections rendering
- Article pages load at `/articles/<slug>`
- SSL certificate shows valid expiry in the future
- `nslookup astrava.club` resolves correctly

## Rollback

Most hosting platforms (Vercel, Netlify, Cloudflare Pages) offer instant rollback to a previous deployment via their dashboard.

> **NOT VERIFIED**: No deployment configuration or rollback mechanism was found in the repository. Rollback depends on the hosting provider's capabilities.

## Escalation

- If the hosting platform is down and their status page acknowledges it — wait and monitor.
- If DNS is correct, SSL is valid, and the platform is healthy but the site is still down — contact the hosting provider's support.
- If the issue involves the domain registrar (expired domain, DNS hijacking) — this is a **P0 security incident**. Immediately contact the registrar.

## Do Not

- Do not change DNS records without understanding the current configuration
- Do not delete and recreate the hosting project — this will lose deployment history
- Do not switch hosting platforms in a panic without a tested migration plan
- Do not share hosting/registrar credentials over unencrypted channels

## Root Cause Follow-Up

- Document the hosting provider and deployment process in the project README
- Set up uptime monitoring (e.g., UptimeRobot, Checkly, or the hosting provider's built-in monitoring)
- Add a `vercel.json`, `netlify.toml`, or equivalent deployment config to the repository
- Configure SSL certificate expiry alerts
- Consider adding a deployment section to the README with exact commands
