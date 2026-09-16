# PixelPerfect — Design System

Ultra-luxury single-page portfolio site for **Kerollos Mikhaeel**, Founder of **PixelPerfect** — a studio crafting ultra-high-end educational decks & visual brand identities. Web only. Feel: Apple keynote meets Rolex boutique — obsidian, gold, glass, real-time WebGL. No generic agency tropes (no rounded card grids, no purple gradients, no stock "team" photos).

## Brand & Colors

Sourced from the client's own logo/business-card system (navy + metallic gold), tuned to the brief.

| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#0B1220` | Page background base (deep obsidian navy) |
| `--canvas-2` | `#0F172A` | Section background, gradient stop |
| `--canvas-3` | `#14223B` | Section background, gradient stop / card base |
| `--charcoal` | `#1A2438` | Card surfaces, matte grey-navy undertone |
| `--gold` | `#C5A059` | Primary metallic accent — borders, active states, CTAs |
| `--gold-bright` | `#E4C989` | Gold highlight / hover / specular |
| `--gold-dim` | `#8A6F3C` | Gold shadow / depth side of 3D forms |
| `--cream` | `#F3EBDD` | Rare high-contrast text on gold, pen paper |
| `--ivory-text` | `#EDEFF4` | Primary text on dark |
| `--muted-text` | `#8C97AE` | Secondary text, captions |
| `--hairline` | `rgba(197,160,89,0.22)` | 1px geometric borders |

Site is dark-mode only (no light theme) — it's the entire point of the brand. Backgrounds always a subtle navy→charcoal vertical gradient, never flat.

## Typography

- **Display / Headers**: `Playfair Display` (serif), weights 500–800, wide letter-spacing on eyebrows/labels (`tracking: 0.2–0.35em`, uppercase, small size), tight-normal tracking on large display headlines. Editorial, exclusive.
- **Body / UI / Nav**: `Montserrat` (geometric sans), weights 300–500, generous line-height (1.6–1.8), letter-spacing 0.01–0.04em for labels.
- Scale: hero H1 ~clamp(2.75rem, 6vw, 6rem); section H2 ~clamp(2rem, 4vw, 3.25rem); body ~1.05rem.
- Loaded via Google Fonts `<link>` in `index.html` (Playfair Display + Montserrat).

## Logo & Assets

Client-provided logo (hexagon + isometric cube monogram, navy/gold) lives in `packages/web/public/images/`:
- `logo-navy-gold.jpg` — full lockup (icon + wordmark), for footer.
- `logomark-icon.png` — cropped hexagon/cube mark only, transparent-feeling on matching navy, used in nav bar next to wordmark text and as favicon.
- `business-card-navy.png` — reference only, not displayed on site.

The hero 3D wireframe cube echoes this exact hexagon/isometric-cube geometry in real-time WebGL (not a static image).

## Layout & Spacing

- Max content width 1280–1400px, generous side padding (min 6vw on desktop).
- Section vertical rhythm: 160–220px padding top/bottom on desktop, 96px mobile.
- Asymmetric grids for showcase (not uniform 3-col cards) — mixed 7/5 and 5/7 column spans, staggered vertical offsets.
- 1px hairline borders (`--hairline`) everywhere instead of shadows/rounded corners for structure — sharp geometric precision, minimal border-radius (0–4px), never pill-shaped except the magnetic CTA.

## Sections (single page, `pages/index.tsx`)

1. **Nav** — fixed, transparent→glass on scroll, logomark + wordmark left, anchor links + "Initiate Project" ghost-gold button right.
2. **Hero** — eyebrow label, big Playfair headline ("Precision in Every Pixel..."), subcopy, dual CTA. Right/behind: real-time R3F wireframe gold cube-in-hexagon, floating + auto-rotating + mouse-tilt parallax, ray-marched-feel gold rim light. Ambient ultra-ambient ambient ambient — floating gold polyhedra particles drift behind everything (fixed full-page canvas), reacting to scroll velocity.
3. **Marquee strip** — thin gold-hairline-bound ticker: "EDUCATIONAL DECKS — BRAND SYSTEMS — INVESTOR NARRATIVES — VISUAL IDENTITY —" looping.
4. **Showcase** — "Selected Work" asymmetric grid of case-study cards (Educational Decks & Brand Systems, placeholder content — user will swap in real projects later). Each card: image/gradient panel, 3D depth-parallax tilt on hover, gold foil border sweep, glass overlay revealing title/tags/"View Case Study". Click opens a lightweight in-page state showing an animated "deck" (CSS/R3F pages unfolding) — kept as a hover/expand micro-interaction, not a full router page.
5. **Metrics / Client Impact** — 3-column stat block (4 Years of Experience / 50+ Projects Delivered / Client Satisfaction — placeholder numbers, editable later) with a 3D animated gold constellation (R3F points + connecting lines) behind/behind connecting the numbers as you scroll into view.
6. **About / Founder** — short founder statement from Kerollos, portrait placeholder (initials monogram in gold hexagon if no photo), signature-style pull quote.
7. **Contact / Initiate Project** — split layout: left = form (Name, Email, Project Type, Message) posting to backend which stores the inquiry + surfaces mailto/WhatsApp fallback to `mr.perfect.pixel@gmail.com` / `+20 127 697 4731`; right = 3D metallic gold fountain pen resting above the form that animates a signature-stroke pulse on successful submit. Magnetic "Initiate Project" button.
8. **Footer** — logo lockup, socials (Instagram/Facebook `the_perfect_pixelist`), email, mobile, back-to-top.

## 3D / WebGL System (Three.js via @react-three/fiber + drei)

- One shared `<Canvas>` per heavy section rather than one giant canvas, for performance; `dpr` capped at 2, `frameloop="demand"` fallback considered but kept `always` with visibility-based pausing (IntersectionObserver pauses off-screen canvases).
- **HeroCube**: `IcosahedronGeometry`-free — a custom hexagon-cube wireframe (`EdgesGeometry` over a `BoxGeometry` + hex ring via `TorusGeometry`/custom line loop) in gold `MeshStandardMaterial`/`LineBasicMaterial`, `Environment` (drei) for reflections, floats via sine offset, tilts toward pointer via lerped rotation.
- **AmbientField**: instanced low-poly gold polyhedra (`Icosahedron`/`Octahedron`, wireframe + solid mix), drifting via per-instance noise offsets, position.y nudged by scroll velocity (Lenis `onScroll` velocity feed).
- **Constellation**: `Points` + dynamically drawn `Line` segments connecting 3 metric nodes, opacity/line-draw driven by scroll-triggered progress (IntersectionObserver → animate `drawRange`).
- **ContactPen**: stylized procedural pen (thin `CylinderGeometry` body/cap + cone nib) in gold metal material, resting at an angle above the form; on submit success, an SVG/Canvas "signature" path draws itself with a gold glow pulse (CSS/SVG stroke-dashoffset animation cheaper & crisper than 3D ink — pen itself is the 3D asset, the signature reveal is a 2D SVG stroke synced beneath the pen tip for reliability).
- Respect `prefers-reduced-motion`: auto-rotation continues gently but disable parallax/tilt and heavy particle counts.

## Micro-interactions

- **Smooth scroll**: `lenis` wrapping the page, exposing scroll velocity to 3D layers.
- **Custom cursor**: small gold dot + trailing ring, liquid-scale on hover, magnetic snap (translate toward center) over buttons/cards/nav links. Hidden on touch devices.
- **Magnetic CTA**: primary buttons shift toward cursor within a radius (`framer-motion` spring transform).
- **Reveal animation**: staggered fade/rise on section entry (`framer-motion` `whileInView`), one orchestrated timeline on load for the hero only.
- **Ambient glow**: radial gold gradient blurred blobs (CSS, `filter: blur`) behind headlines/3D objects, very low opacity.

## Architecture

- Static single page (`packages/web/src/web/pages/index.tsx`) composed of section components under `src/web/components/sections/`.
- 3D layers isolated in `src/web/components/three/`.
- Contact form: oRPC mutation → `inquiries` table (Drizzle) storing name/email/projectType/message; success triggers the pen/signature animation. No auth needed (public form).
- No other pages/routes needed for v1.
