# Marshall–New Era Neighborhood Association

The website and brand system for [MNENA](https://marshallnewera.org) — neighbors in Midtown Sacramento. *This is our neighborhood. Let's shape it together.*

## What's in here

| Path | What it is |
| :-- | :-- |
| `src/` | The [Astro](https://astro.build) website (deployed to GitHub Pages) |
| `src/content/events/`, `src/content/news/` | Site content as Markdown — editable via [Pages CMS](https://pagescms.org) (`.pages.yml`) |
| `brand/tokens.json` | **Single source of truth** for the brand: colors, type, spacing, logo rules, voice |
| `brand/SOCIAL-CONTEXT.md` | Paste-into-AI brief for generating on-brand social posts |
| `brand/assets/` | Logo files + original brand guideline PDFs |
| `docs/VOLUNTEER-GUIDE.md` | How non-technical volunteers update the site |
| `docs/CUTOVER-CHECKLIST.md` | Steps to point marshallnewera.org here when the board's ready |
| `archive/wordpress-2026-07/` | Full content archive of the old WordPress site |

## Working on the site

```sh
npm install
npm run dev        # local dev server
npm run build      # regenerates tokens.css from tokens.json, then builds
```

**Changing brand values?** Edit `brand/tokens.json` only — `src/styles/tokens.css` and the public [/brand](https://kvaldes44.github.io/marshall-new-era/brand/) style-guide page are generated from it.

Pushing to `main` auto-deploys via GitHub Actions → GitHub Pages.
