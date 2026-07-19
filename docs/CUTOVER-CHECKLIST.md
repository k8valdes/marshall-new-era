# Cutover Checklist — marshallnewera.org → new site

The new site runs at `https://k8valdes.github.io/marshall-new-era/` until the board is ready. Nothing below has been done yet; the WordPress site is untouched.

## Before cutover

- [ ] Board sees the new site and gives a 👍
- [ ] **Newsletter form:** the old site's Mailchimp form posts through WordPress and can't be reused. In Mailchimp: *Audience → Signup forms → Form builder → copy the hosted form URL*, then replace the `mailto:` signup links on the homepage (`src/pages/index.astro`) and join page with that URL.
- [ ] Confirm the PayPal renewal link and membership-application Google Drive link are still current (they were copied from the old site)
- [ ] Add any missing blog posts worth keeping (all 61 old posts are archived in `archive/wordpress-2026-07/posts-full.json`)
- [ ] Transfer the GitHub repo to an MNENA-owned org (Settings → Transfer) so the association owns its site — GitHub Pages and Pages CMS keep working after transfer (re-connect the repo in Pages CMS)

## DNS cutover (needs access to the domain registrar)

- [ ] In the repo: Settings → Pages → Custom domain → `marshallnewera.org` (GitHub creates a CNAME file)
- [ ] At the registrar: point the apex A records to GitHub Pages (`185.199.108.153`, `.109.`, `.110.`, `.111.`) and `www` CNAME to `<owner>.github.io`
- [ ] In the repo's GitHub Actions settings, set env vars `SITE_URL=https://marshallnewera.org` and `BASE_PATH=/` (see `astro.config.mjs`), or edit the defaults in `astro.config.mjs`
- [ ] Wait for HTTPS certificate (automatic, ~1 hr), check "Enforce HTTPS"
- [ ] Verify every page + images load on the domain

## After cutover

- [ ] Update Instagram bio link + Facebook page link
- [ ] Update the QR code on lawn signs / flyers if it pointed at a WordPress URL
- [ ] Export any WordPress media worth keeping (`archive/wordpress-2026-07/media-list.json` has all URLs), then let the WordPress hosting lapse
- [ ] Keep the WordPress export/archive folder in this repo forever — it's tiny
