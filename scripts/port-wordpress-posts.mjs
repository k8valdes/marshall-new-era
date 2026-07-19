// Port all archived WordPress posts → src/content/news/*.md with local images.
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const ROOT = '/Users/kvaldes44/Documents/OO_Code_Projects/marshall-new-era';
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'archive/wordpress-2026-07/posts-full.json'), 'utf8'));
const outDir = path.join(ROOT, 'src/content/news');
const imgDir = path.join(outDir, 'images');
fs.mkdirSync(imgDir, { recursive: true });

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
td.remove(['script', 'style']);

const decode = (s) =>
  s
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#038;|&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '…').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

async function download(url, dest) {
  if (fs.existsSync(dest)) return true;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return false;
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return true;
  } catch {
    return false;
  }
}

let ok = 0, failedImgs = [];
for (const post of posts) {
  const slug = post.slug;
  let html = post.content.rendered.replace(/<!--[\s\S]*?-->/g, '');

  // Collect and localize images. Prefer the largest srcset candidate.
  const imgTags = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  let n = 0;
  let featured = null;
  for (const tag of imgTags) {
    const srcset = tag.match(/srcset="([^"]+)"/)?.[1];
    let url = tag.match(/src="([^"]+)"/)?.[1];
    if (srcset) {
      const candidates = srcset.split(',').map((c) => {
        const [u, w] = c.trim().split(/\s+/);
        return { u, w: parseInt(w) || 0 };
      });
      candidates.sort((a, b) => b.w - a.w);
      // cap at ~1600w to keep the repo lean
      url = (candidates.find((c) => c.w <= 1600) ?? candidates[candidates.length - 1]).u;
    }
    if (!url) continue;
    n++;
    const ext = (url.split('.').pop() || 'jpg').split('?')[0].toLowerCase();
    const fname = `${slug}-${n}.${['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) ? ext : 'jpg'}`;
    const good = await download(url, path.join(imgDir, fname));
    if (good) {
      const alt = tag.match(/alt="([^"]*)"/)?.[1] || '';
      html = html.replace(tag, `<img src="./images/${fname}" alt="${alt}">`);
      if (!featured) featured = `./images/${fname}`;
    } else {
      failedImgs.push(url);
      html = html.replace(tag, '');
    }
  }

  const md = td.turndown(html).trim();
  const title = decode(post.title.rendered).replace(/"/g, "'");
  // WP's auto-excerpts fuse words across stripped <br> tags — derive our own
  // from the (space-preserving) stripped content instead.
  let excerpt = stripTags(post.content.rendered).slice(0, 200);
  if (excerpt.length === 200) excerpt = excerpt.slice(0, excerpt.lastIndexOf(' ')) + '…';
  excerpt = excerpt.replace(/"/g, "'");
  const date = post.date.slice(0, 10);

  const fm = [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    excerpt ? `excerpt: "${excerpt}"` : null,
    featured ? `image: ${featured}` : null,
    '---',
  ].filter(Boolean).join('\n');

  fs.writeFileSync(path.join(outDir, `${slug}.md`), `${fm}\n\n${md}\n`);
  ok++;
}
console.log(`ported ${ok}/${posts.length} posts; ${fs.readdirSync(imgDir).length} images; ${failedImgs.length} failed downloads`);
failedImgs.slice(0, 10).forEach((u) => console.log('  FAILED:', u));
