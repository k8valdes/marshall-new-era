// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project-site defaults. When the custom domain
// (marshallnewera.org) is connected later, set SITE_URL to the domain and
// BASE_PATH to "/" — see docs/CUTOVER-CHECKLIST.md.
const site = process.env.SITE_URL ?? 'https://k8valdes.github.io';
const base = process.env.BASE_PATH ?? '/marshall-new-era';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
});
