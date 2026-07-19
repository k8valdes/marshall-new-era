// Generates src/styles/tokens.css from brand/tokens.json.
// Run: node scripts/build-tokens.mjs  (also wired into `npm run build`)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'brand/tokens.json'), 'utf8'));

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const lines = [];

for (const [group, colors] of Object.entries(tokens.color)) {
  if (!['primary', 'secondary', 'illustrationPalette', 'semantic'].includes(group)) continue;
  for (const [name, def] of Object.entries(colors)) {
    if (name === 'note') continue;
    const value = def.resolved ?? def.value;
    // emit hex values and CSS-value strings (e.g. gradients), skip token refs
    if (typeof value === 'string' && !value.startsWith('{')) {
      lines.push(`  --color-${kebab(name)}: ${value};`);
    }
  }
}

for (const [name, def] of Object.entries(tokens.typography.fonts)) {
  // Fontsource variable packages register as "<Family> Variable"; list both
  // so the tokens stay human-readable and self-hosted fonts still resolve.
  lines.push(`  --font-${kebab(name)}: '${def.family} Variable', '${def.family}', ${def.fallback};`);
}
for (const [name, def] of Object.entries(tokens.typography.scale)) {
  lines.push(`  --text-${kebab(name)}: ${def.size};`);
}

for (const [name, value] of Object.entries(tokens.spacing.scale)) {
  lines.push(`  --space-${name}: ${value};`);
}
for (const [name, value] of Object.entries(tokens.radius)) {
  if (name === 'note') continue;
  lines.push(`  --radius-${name}: ${value};`);
}
for (const [name, value] of Object.entries(tokens.shadow)) {
  lines.push(`  --shadow-${name}: ${value};`);
}

const css = `/* GENERATED from brand/tokens.json — do not edit by hand. */
:root {
${lines.join('\n')}
}
`;

fs.writeFileSync(path.join(root, 'src/styles/tokens.css'), css);
console.log(`tokens.css written (${lines.length} custom properties)`);
