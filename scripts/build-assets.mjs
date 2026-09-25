// Builds the profile header and project cards as light/dark SVGs.
// Run: node scripts/build-assets.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const SANS =
  'ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

// Marker colors of the portfolio (genta-ameku.com) themes.
const MARKER = { yellow: "#fff100", pink: "#ff96f8", blue: "#8ce5ff", green: "#96ff7e" };

const THEMES = {
  light: {
    ink: "#0a0a0a",
    body: "#3d444d",
    muted: "#6e7781",
    card: "#ffffff",
    border: "#d1d9e0",
    markerOpacity: 1,
    // Highlighter behind the lower half of the role text.
    markerRect: { y: 197, height: 16 },
  },
  dark: {
    ink: "#f0f6fc",
    body: "#d1d7e0",
    muted: "#9198a1",
    card: "#151b23",
    border: "#3d444d",
    markerOpacity: 0.9,
    // A thin underline: a highlight behind light text turns muddy on dark.
    markerRect: { y: 217, height: 5 },
  },
};

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const markerCycle = `@keyframes hue{0%,20%{fill:${MARKER.yellow}}25%,45%{fill:${MARKER.pink}}50%,70%{fill:${MARKER.blue}}75%,95%{fill:${MARKER.green}}100%{fill:${MARKER.yellow}}}`;

const header = (t) => `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="250" viewBox="0 0 900 250" role="img" aria-labelledby="title desc">
<title id="title">Genta Ameku</title>
<desc id="desc">AI Enablement Engineer and Front-end Tech Lead. G.A Design &amp; Code.</desc>
<style>
.label{font:600 16px ${MONO};letter-spacing:4px;fill:${t.muted}}
.name{font:700 76px ${SANS};fill:${t.ink}}
.role{font:500 30px ${SANS};fill:${t.body}}
.caret{fill:${MARKER.yellow};animation:blink 1.1s steps(1) infinite,hue 16s 1.3s linear infinite}
.marker{fill:${MARKER.yellow};fill-opacity:${t.markerOpacity};transform-box:fill-box;transform-origin:left center;transform:scaleX(0);animation:draw .9s .4s cubic-bezier(.2,.7,.2,1) forwards,hue 16s 1.3s linear infinite}
@keyframes draw{to{transform:scaleX(1)}}
@keyframes blink{50%{opacity:0}}
${markerCycle}
@media (prefers-reduced-motion:reduce){.marker{animation:none;transform:none}.caret{animation:none}}
</style>
<text class="label" x="450" y="66" text-anchor="middle">G.A DESIGN &amp; CODE</text>
<text class="name" x="450" y="150" text-anchor="middle" textLength="520" lengthAdjust="spacing">Genta Ameku<tspan class="caret">_</tspan></text>
<rect class="marker" x="140" y="${t.markerRect.y}" width="620" height="${t.markerRect.height}" rx="2.5"/>
<text class="role" x="450" y="208" text-anchor="middle" textLength="610" lengthAdjust="spacing">AI Enablement Engineer · Front-end Tech Lead</text>
</svg>
`;

const CARDS = [
  {
    slug: "ai-handout-studio",
    label: "AI TOOLING",
    title: "ai-handout-studio",
    body: ["Turn a Claude Code / Codex conversation into", "slides, HTML docs and question sheets."],
    tags: ["TypeScript", "Agent Skills", "PDF / PPTX"],
    marker: MARKER.yellow,
  },
  {
    slug: "oncue",
    label: "MACOS APP",
    title: "OnCue",
    body: ["Menu bar reminders from Google Calendar,", "with a full-screen cue and one-click join."],
    tags: ["Swift", "SwiftUI", "Google Calendar"],
    marker: MARKER.pink,
  },
  {
    slug: "meetingrecorder",
    label: "ON-DEVICE AI",
    title: "MeetingRecorder",
    body: ["Records meetings and transcribes them with", "speaker labels, entirely on your Mac."],
    tags: ["Swift", "MLX Whisper", "sherpa-onnx"],
    marker: MARKER.blue,
  },
  {
    slug: "gemma4-irodori-voice-chat",
    label: "LOCAL LLM",
    title: "gemma4-irodori-voice-chat",
    body: ["Voice chat with an AI character in Japanese", "on a local LLM, kept entirely on your LAN."],
    tags: ["Gemma", "Irodori-TTS", "Svelte", "Tauri"],
    marker: MARKER.green,
  },
  {
    slug: "dashboard-three-stacks",
    label: "FRONT-END",
    title: "One dashboard, three stacks",
    body: ["The same dashboard built with Next.js,", "TanStack Start and Rust + htmx."],
    tags: ["Next.js", "TanStack Start", "Rust", "htmx"],
    marker: MARKER.yellow,
  },
  {
    slug: "ga-design-code",
    label: "PORTFOLIO",
    title: "ga-design-code",
    body: ["The source of my portfolio site,", "built with Next.js, TypeScript and Tailwind CSS."],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    marker: MARKER.pink,
  },
];

const card = (t, c) => `<svg xmlns="http://www.w3.org/2000/svg" width="370" height="150" viewBox="0 0 370 150" role="img" aria-labelledby="title desc">
<title id="title">${escape(c.title)}</title>
<desc id="desc">${escape(c.body.join(" "))}</desc>
<style>
.label{font:600 10.5px ${MONO};letter-spacing:2px;fill:${t.muted}}
.title{font:700 20px ${SANS};fill:${t.ink}}
.body{font:400 13px ${SANS};fill:${t.body}}
.tags{font:500 11px ${MONO};fill:${t.muted}}
.arrow{font:600 16px ${SANS};fill:${t.muted}}
</style>
<rect x=".5" y=".5" width="369" height="149" rx="10" fill="${t.card}" stroke="${t.border}"/>
<rect x="20" y="24" width="28" height="6" rx="3" fill="${c.marker}" fill-opacity="${t.markerOpacity}"/>
<text class="label" x="58" y="31">${escape(c.label)}</text>
<text class="arrow" x="350" y="34" text-anchor="end">↗</text>
<text class="title" x="20" y="64">${escape(c.title)}</text>
${c.body.map((line, i) => `<text class="body" x="20" y="${90 + i * 18}">${escape(line)}</text>`).join("\n")}
<text class="tags" x="20" y="134">${escape(c.tags.join("  ·  "))}</text>
</svg>
`;

mkdirSync("assets", { recursive: true });
for (const [name, theme] of Object.entries(THEMES)) {
  writeFileSync(`assets/header-${name}.svg`, header(theme));
  for (const c of CARDS) writeFileSync(`assets/card-${c.slug}-${name}.svg`, card(theme, c));
}
console.log(`wrote ${2 + CARDS.length * 2} files to assets/`);
