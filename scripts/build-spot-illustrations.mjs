// Generates the three "get involved" spot illustrations as windows onto ONE
// continuous 2400x600 panorama — side by side on the page, the skyline,
// canopy, ground, and path flow across all three cards. Each card adds its
// own foreground subject. Run: node scripts/build-spot-illustrations.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = path.join(ROOT, 'public/illustrations');

// ---------- shared panorama background (0..2400 x 0..600) ----------
// Palette matched to the final hero artwork: warm cream sky (no clouds),
// muted teal downtown silhouette, layered deep teal-green canopy, olive
// accent trees, gold landmarks.
const SKY = '#FBF8ED';
const SKYLINE = '#4E9B91';
const CANOPY = '#0A5750';
const CANOPY_INK = '#014543';
const OLIVE = '#74831E';
const GRASS = '#3E7A4A';
const GRASS_EDGE = '#2E5D45';

const PANORAMA = `
  <rect width="2400" height="600" fill="${SKY}"/>
  <!-- gold bridge tower anchors the far left -->
  <g fill="#F3CB4A">
    <rect x="42" y="140" width="16" height="245"/>
    <rect x="84" y="140" width="16" height="245"/>
    <rect x="42" y="140" width="58" height="14"/>
    <rect x="42" y="216" width="58" height="12"/>
    <path d="M46 228 L96 300 M96 228 L46 300" stroke="#F3CB4A" stroke-width="9"/>
    <rect x="42" y="300" width="58" height="12"/>
  </g>
  <!-- continuous downtown silhouette: varied building forms, capitol as silhouette -->
  <g fill="${SKYLINE}">
    <rect x="150" y="210" width="70" height="180"/>
    <path d="M242 390 v-200 h40 l15 -30 15 30 v200 Z"/>
    <rect x="560" y="190" width="60" height="200"/>
    <path d="M700 390 v-140 h60 v-18 h15 v18 h10 v140 Z"/>
    <rect x="900" y="175" width="65" height="215"/>
    <path d="M1012 390 v-230 h36 l16 -26 16 26 v230 Z"/>
    <path d="M1108 390 v-90 h24 v-32 a36 36 0 0 1 34 -36 v-14 a7 7 0 0 1 14 0 v14 a36 36 0 0 1 34 36 v32 h24 v90 Z"/>
    <rect x="1310" y="200" width="60" height="190"/>
    <rect x="1422" y="165" width="58" height="225"/>
    <path d="M1700 390 v-185 h50 v-20 h12 v20 h12 v185 Z"/>
    <rect x="1812" y="150" width="50" height="240"/>
    <path d="M2120 390 v-175 h44 l14 -24 14 24 v175 Z"/>
    <rect x="2232" y="228" width="72" height="162"/>
  </g>
  <!-- layered deep canopy: lumpy blob clusters like the hero art -->
  <g fill="${CANOPY}">
    <path d="M-40 460 q-4 -70 60 -78 q10 -44 62 -42 q46 2 56 40 q58 -6 66 46 q40 2 40 44 v50 h-284 Z"/>
    <path d="M240 470 q0 -62 56 -70 q12 -40 58 -38 q44 2 54 36 q52 -4 60 42 q36 4 36 40 v40 h-264 Z"/>
    <path d="M540 464 q-2 -66 58 -74 q10 -42 60 -40 q46 2 56 38 q54 -4 62 44 q38 2 38 42 v46 h-274 Z"/>
    <path d="M840 470 q0 -60 54 -68 q12 -38 56 -36 q42 2 52 34 q50 -4 58 40 q34 4 34 38 v42 h-254 Z"/>
    <path d="M1120 464 q-2 -64 56 -72 q10 -40 58 -38 q44 2 54 36 q52 -4 60 42 q36 2 36 40 v42 h-264 Z"/>
    <path d="M1410 470 q0 -62 56 -70 q12 -40 58 -38 q44 2 54 36 q52 -4 60 42 q36 4 36 40 v40 h-264 Z"/>
    <path d="M1700 464 q-2 -66 58 -74 q10 -42 60 -40 q46 2 56 38 q54 -4 62 44 q38 2 38 42 v46 h-274 Z"/>
    <path d="M2000 470 q0 -60 54 -68 q12 -38 56 -36 q42 2 52 34 q50 -4 58 40 q34 4 34 38 v42 h-254 Z"/>
    <path d="M2280 464 q-2 -64 56 -72 q10 -40 58 -38 q44 2 54 36 l-8 74 h-160 Z"/>
  </g>
  <!-- olive accent trees with trunks, in front of the canopy -->
  <g>
    <rect x="332" y="420" width="9" height="50" fill="${CANOPY_INK}"/>
    <circle cx="336" cy="404" r="38" fill="${OLIVE}"/>
    <rect x="1052" y="426" width="9" height="46" fill="${CANOPY_INK}"/>
    <ellipse cx="1056" cy="408" rx="34" ry="38" fill="${OLIVE}"/>
    <rect x="1852" y="422" width="9" height="48" fill="${CANOPY_INK}"/>
    <circle cx="1856" cy="404" r="36" fill="${OLIVE}"/>
  </g>
  <!-- ground -->
  <rect y="452" width="2400" height="148" fill="${GRASS}"/>
  <rect y="452" width="2400" height="12" fill="${GRASS_EDGE}"/>
  <!-- one sand path winding through all three scenes -->
  <path d="M0 566 C 300 522 500 596 800 552 C 1100 508 1300 592 1600 550 C 1900 508 2150 588 2400 540 L2400 600 L0 600 Z" fill="#FBDD9F"/>
  <!-- dark foreground bushes, hero-art style -->
  <g fill="${CANOPY_INK}">
    <path d="M-30 600 q6 -52 58 -54 q40 -2 52 30 q44 -4 52 34 l0 -10 v0 Z M-30 600 h164 v0 h-164 Z"/>
    <ellipse cx="120" cy="596" rx="90" ry="34"/>
    <ellipse cx="740" cy="600" rx="80" ry="30"/>
    <ellipse cx="1240" cy="596" rx="86" ry="32"/>
    <ellipse cx="1720" cy="600" rx="78" ry="30"/>
    <ellipse cx="2320" cy="596" rx="88" ry="34"/>
  </g>
`;

// ---------- per-card foregrounds (local 0..800 coordinates) ----------
const FG_MEETING = `
  <path d="M340 600 L385 454 H415 L460 600 Z" fill="#F3CB4A"/>
  <g>
    <rect x="250" y="250" width="300" height="204" fill="#004447"/>
    <rect x="250" y="250" width="300" height="14" fill="#01332F"/>
    <path d="M235 250 H565 L541 212 H259 Z" fill="#01332F"/>
    <path d="M400 118 a62 62 0 0 1 62 62 v14 h-124 v-14 a62 62 0 0 1 62 -62 Z" fill="#004447"/>
    <path d="M400 132 a48 48 0 0 1 48 48 v8 h-96 v-8 a48 48 0 0 1 48 -48 Z" fill="#F7ECCC"/>
    <g stroke="#004447" stroke-width="7">
      <line x1="400" y1="188" x2="400" y2="136"/>
      <line x1="400" y1="188" x2="368" y2="150"/>
      <line x1="400" y1="188" x2="432" y2="150"/>
    </g>
    <rect x="335" y="194" width="130" height="18" fill="#01332F"/>
    <rect x="368" y="358" width="64" height="96" rx="4" fill="#F3CB4A"/>
    <rect x="396" y="358" width="8" height="96" fill="#004447"/>
    <g fill="#7CD1E8">
      <rect x="278" y="290" width="52" height="66" rx="3"/>
      <rect x="470" y="290" width="52" height="66" rx="3"/>
      <rect x="278" y="380" width="52" height="60" rx="3"/>
      <rect x="470" y="380" width="52" height="60" rx="3"/>
    </g>
    <g fill="#004447">
      <rect x="300" y="290" width="7" height="66"/><rect x="492" y="290" width="7" height="66"/>
      <rect x="300" y="380" width="7" height="60"/><rect x="492" y="380" width="7" height="60"/>
    </g>
  </g>
  <g>
    <rect x="176" y="120" width="150" height="84" rx="22" fill="#F3CB4A"/>
    <path d="M232 200 l16 30 22-30 Z" fill="#F3CB4A"/>
    <circle cx="226" cy="162" r="9" fill="#004447"/><circle cx="256" cy="162" r="9" fill="#004447"/><circle cx="286" cy="162" r="9" fill="#004447"/>
    <rect x="486" y="96" width="150" height="84" rx="22" fill="#F7ECCC"/>
    <path d="M568 176 l14 28 22-28 Z" fill="#F7ECCC"/>
    <rect x="512" y="124" width="98" height="10" rx="5" fill="#004447"/>
    <rect x="512" y="146" width="70" height="10" rx="5" fill="#479FB3"/>
  </g>
`;

const FG_SURVEY = `
  <g transform="translate(96 220) rotate(-4)">
    <rect x="-18" y="-18" width="260" height="240" rx="14" fill="#F7ECCC"/>
    <g>
      <rect x="0" y="0" width="48" height="48" rx="6" fill="#5DA145"/>
      <rect x="58" y="0" width="48" height="48" rx="6" fill="#479FB3"/>
      <rect x="116" y="0" width="48" height="48" rx="6" fill="#F3CB4A"/>
      <rect x="174" y="0" width="48" height="48" rx="6" fill="#004447"/>
      <rect x="0" y="58" width="48" height="48" rx="6" fill="#EC8A1F"/>
      <rect x="58" y="58" width="48" height="48" rx="6" fill="#004447"/>
      <rect x="116" y="58" width="48" height="48" rx="6" fill="#7CD1E8"/>
      <rect x="174" y="58" width="48" height="48" rx="6" fill="#5DA145"/>
      <rect x="0" y="116" width="48" height="48" rx="6" fill="#479FB3"/>
      <rect x="58" y="116" width="48" height="48" rx="6" fill="#F3CB4A"/>
      <rect x="116" y="116" width="48" height="48" rx="6" fill="#368A59"/>
      <rect x="174" y="116" width="48" height="48" rx="6" fill="#EC8A1F"/>
      <rect x="0" y="174" width="48" height="30" rx="6" fill="#004447"/>
      <rect x="58" y="174" width="48" height="30" rx="6" fill="#7CD1E8"/>
      <rect x="116" y="174" width="48" height="30" rx="6" fill="#5DA145"/>
      <rect x="174" y="174" width="48" height="30" rx="6" fill="#479FB3"/>
    </g>
    <path d="M198 -6 l7.6 15.4 17 2.5 -12.3 12 2.9 16.9 -15.2 -8 -15.2 8 2.9 -16.9 -12.3 -12 17 -2.5 Z" fill="#EC8A1F" stroke="#F7ECCC" stroke-width="5"/>
  </g>
  <g transform="translate(430 130) rotate(3)">
    <rect x="0" y="0" width="250" height="360" rx="18" fill="#004447"/>
    <rect x="16" y="34" width="218" height="308" rx="10" fill="#F7ECCC"/>
    <rect x="86" y="-16" width="78" height="44" rx="10" fill="#479FB3"/>
    <rect x="106" y="-4" width="38" height="18" rx="8" fill="#F7ECCC"/>
    <g>
      <rect x="38" y="62" width="30" height="30" rx="7" fill="#5DA145"/>
      <path d="M45 77 l8 9 14-16" stroke="#F7ECCC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <rect x="82" y="70" width="130" height="12" rx="6" fill="#004447"/>
      <rect x="38" y="118" width="30" height="30" rx="7" fill="#5DA145"/>
      <path d="M45 133 l8 9 14-16" stroke="#F7ECCC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <rect x="82" y="126" width="106" height="12" rx="6" fill="#479FB3"/>
      <rect x="38" y="174" width="30" height="30" rx="7" fill="#F3CB4A"/>
      <rect x="82" y="182" width="130" height="12" rx="6" fill="#004447"/>
      <rect x="38" y="230" width="30" height="30" rx="7" fill="#F3CB4A"/>
      <rect x="82" y="238" width="88" height="12" rx="6" fill="#479FB3"/>
      <rect x="38" y="292" width="174" height="12" rx="6" fill="#7CD1E8"/>
    </g>
  </g>
  <g transform="translate(388 470) rotate(-18)">
    <rect x="0" y="0" width="190" height="34" rx="6" fill="#EC8A1F"/>
    <rect x="150" y="0" width="40" height="34" rx="6" fill="#479FB3"/>
    <path d="M0 0 L-34 17 L0 34 Z" fill="#F7ECCC"/>
    <path d="M-34 17 L-16 8 L-16 26 Z" fill="#004447"/>
  </g>
`;

const FG_GARDEN = `
  <g>
    <g transform="translate(90 445)">
      <rect x="0" y="0" width="270" height="76" rx="10" fill="#004447"/>
      <rect x="12" y="-16" width="246" height="26" rx="7" fill="#01332F"/>
      <g stroke="#368A59" stroke-width="9" stroke-linecap="round">
        <line x1="55" y1="-16" x2="55" y2="-88"/><line x1="135" y1="-16" x2="135" y2="-100"/><line x1="215" y1="-16" x2="215" y2="-84"/>
      </g>
      <circle cx="55" cy="-98" r="23" fill="#5DA145"/><circle cx="135" cy="-112" r="26" fill="#5DA145"/><circle cx="215" cy="-94" r="22" fill="#5DA145"/>
      <circle cx="42" cy="-84" r="10" fill="#EC8A1F"/><circle cx="148" cy="-98" r="11" fill="#EC8A1F"/><circle cx="226" cy="-80" r="9" fill="#EC8A1F"/>
      <circle cx="68" cy="-108" r="8" fill="#F3CB4A"/><circle cx="122" cy="-124" r="8" fill="#F3CB4A"/>
    </g>
    <g transform="translate(410 470)">
      <rect x="0" y="0" width="230" height="66" rx="10" fill="#004447"/>
      <rect x="12" y="-15" width="206" height="24" rx="7" fill="#01332F"/>
      <g fill="#5DA145">
        <path d="M45 -15 c-18 -22 -18 -38 0 -50 c18 12 18 28 0 50 Z"/>
        <path d="M115 -15 c-18 -22 -18 -38 0 -50 c18 12 18 28 0 50 Z"/>
        <path d="M185 -15 c-18 -22 -18 -38 0 -50 c18 12 18 28 0 50 Z"/>
      </g>
    </g>
  </g>
  <g>
    <g stroke="#368A59" stroke-width="10" stroke-linecap="round">
      <line x1="700" y1="470" x2="700" y2="330"/>
      <line x1="740" y1="480" x2="740" y2="360"/>
    </g>
    <path d="M700 380 C678 370 668 350 670 332 C690 340 700 356 700 380 Z" fill="#5DA145"/>
    <path d="M700 420 C722 410 732 390 730 372 C710 380 700 396 700 420 Z" fill="#5DA145"/>
    <path d="M740 410 C718 400 710 382 712 366 C730 373 740 388 740 410 Z" fill="#5DA145"/>
    <ellipse cx="700" cy="322" rx="12" ry="24" fill="#F3CB4A"/>
    <ellipse cx="740" cy="352" rx="10" ry="20" fill="#F3CB4A"/>
  </g>
  <g transform="translate(500 400)">
    <rect x="20" y="0" width="16" height="92" fill="#01332F"/>
    <rect x="104" y="0" width="16" height="92" fill="#01332F"/>
    <rect x="-10" y="-64" width="160" height="74" rx="12" fill="#F7ECCC"/>
    <rect x="8" y="-46" width="124" height="12" rx="6" fill="#004447"/>
    <rect x="24" y="-24" width="92" height="12" rx="6" fill="#5DA145"/>
  </g>
  <g transform="translate(300 540)">
    <rect x="0" y="0" width="56" height="40" rx="8" fill="#479FB3"/>
    <path d="M0 10 L-30 -6 L-26 4 L0 20 Z" fill="#479FB3"/>
    <circle cx="-30" cy="-4" r="8" fill="#479FB3"/>
    <path d="M56 8 a20 20 0 0 1 0 24" stroke="#479FB3" stroke-width="8" fill="none"/>
    <g stroke="#7CD1E8" stroke-width="5" stroke-linecap="round">
      <line x1="-40" y1="4" x2="-46" y2="16"/><line x1="-32" y1="8" x2="-36" y2="20"/>
    </g>
  </g>
`;

const cards = [
  { file: 'spot-meeting.svg', offset: 0, fg: FG_MEETING, label: 'Flat vector illustration of a neighborhood meeting hall with a fanlight window and speech bubbles, downtown Sacramento skyline behind' },
  { file: 'spot-survey.svg', offset: 800, fg: FG_SURVEY, label: 'Flat vector illustration of a survey clipboard with checkmarks and a colorful map of neighborhood blocks, Capitol dome in the skyline behind' },
  { file: 'spot-garden.svg', offset: 1600, fg: FG_GARDEN, label: 'Flat vector illustration of raised community garden beds with tomatoes, sprouts, and corn, downtown skyline behind' },
];

fs.mkdirSync(OUT, { recursive: true });
for (const c of cards) {
  const svg = `<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${c.label}">
<g transform="translate(${-c.offset} 0)">${PANORAMA}</g>
${c.fg}
</svg>
`;
  fs.writeFileSync(path.join(OUT, c.file), svg);
}
console.log('spot illustrations written (continuous panorama, offsets 0/800/1600)');
