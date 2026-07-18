# Volunteer Guide — updating the MNENA website

You don't need to know how to code. Two ways to update the site, pick your comfort level.

## Option A: Pages CMS (recommended — feels like a normal editor)

One-time setup (a repo admin does this once): go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and open the `marshall-new-era` repo. Then invite editors by GitHub username.

Day to day:

1. Go to app.pagescms.org and sign in
2. Pick **Events** or **News** in the sidebar
3. Click an entry to edit, or **Add entry** for a new one
4. Fill in the fields (title, date, location…) and write the details
5. Hit **Save** — the site rebuilds and publishes itself in about 2 minutes

That's it. Every save is tracked, so nothing can be permanently broken.

## Option B: GitHub web editor (fine for quick text fixes)

1. Open the repo on github.com and navigate to `src/content/events/` or `src/content/news/`
2. Click a file, then the ✏️ pencil icon
3. Edit the text (the part between `---` lines is structured info — keep the format)
4. Click **Commit changes** — the site republishes automatically

## Adding an event (what the fields mean)

```
---
title: Fall Cleanup            ← event name
date: 2026-10-10               ← YYYY-MM-DD
time: "8:30 AM"                ← optional
location: Sutter's Landing     ← optional
recurring: Every quarter       ← optional, shows a "Repeats:" note
---
Meet at the parking lot. We bring coffee, bagels, gloves, and pickers.
```

Past events automatically drop off the "Coming up" list — no need to delete them.

## House rules

- Follow the [brand guide](https://kvaldes44.github.io/marshall-new-era/brand/) for anything visual
- Event graphics and social posts: see `brand/SOCIAL-CONTEXT.md`
- Stuck? Something looks broken? Email Kate, or open an "Issue" on the GitHub repo
