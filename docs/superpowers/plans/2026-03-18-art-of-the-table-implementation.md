# Art of the Table — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a stunning "Midnight Garden" themed single-page website for Art of the Table — an event styling & custom gift box business — with Disney-level sparkle animations, deployed to GitHub Pages.

**Architecture:** Pure static site (HTML/CSS/JS) with no build tools. Single `index.html` with anchor navigation across 8 sections. `styles.css` contains the full design system with CSS custom properties, responsive breakpoints, and animation keyframes. `main.js` contains all interactive behavior organized as IIFE modules (particles, sparkles, scroll reveals, nav, portfolio filters, lightbox, 3D tilt).

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, animations), Vanilla JS (Canvas API, IntersectionObserver, requestAnimationFrame), Google Fonts (Playfair Display, Raleway, Dancing Script), Font Awesome 6.5, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-03-18-art-of-the-table-redesign-design.md`

---

## File Structure

```
art-table/
├── index.html          # Single-page site with all 9 sections (nav, hero, services, about, portfolio, shop, blog, contact, footer)
├── 404.html            # Custom 404 page matching Midnight Garden theme
├── styles.css          # Complete design system: variables, base, layout, sections, animations, responsive
├── main.js             # All JS: particles, sparkle trail, scroll reveals, nav, filters, lightbox, 3D tilt, form
├── images/             # All images organized by type
│   ├── annie.jpg       # Annie's profile photo (to be provided)
│   ├── portfolio/      # Event/project photos (placeholders initially)
│   ├── products/       # Etsy product photos (placeholders initially)
│   └── blog/           # Blog post thumbnails (placeholders initially)
├── favicon.svg         # SVG favicon (blush/gold "A" monogram)
├── CLAUDE.md           # Dev instructions for this repo
└── README.md           # Setup instructions
```

---

## Task 1: Project Scaffolding & Git Setup

**Files:**
- Create: `index.html`, `styles.css`, `main.js`, `favicon.svg`, `CLAUDE.md`, `README.md`, `.gitignore`
- Create directories: `images/`, `images/portfolio/`, `images/products/`, `images/blog/`

- [ ] **Step 1: Initialize git repo and create GitHub remote**

```bash
cd /Users/chandrab/art-table
git init
gh repo create art-table --public --source=. --remote=origin
```

- [ ] **Step 2: Create `.gitignore`**

```
.DS_Store
.superpowers/
node_modules/
*.log
```

- [ ] **Step 3: Create `CLAUDE.md`**

Project instructions file describing the static site architecture, how to run locally, color palette CSS variables, file responsibilities, and content management guide (how to update portfolio items, blog links, and Etsy products as described in the spec's "Content Management" section).

- [ ] **Step 4: Create `README.md`**

Brief setup instructions: clone, open `index.html` or run `python3 -m http.server 8000`.

- [ ] **Step 5: Create `favicon.svg`**

An SVG favicon — stylized "A" monogram in blush (#e8b4b8) with gold (#d4a853) accent, on transparent background. Simple, elegant.

- [ ] **Step 6: Create image directories with placeholder `.gitkeep` files**

```bash
mkdir -p images/portfolio images/products images/blog
touch images/portfolio/.gitkeep images/products/.gitkeep images/blog/.gitkeep
```

- [ ] **Step 7: Create empty `styles.css` with CSS custom properties foundation**

Set up `:root` with all color, font, spacing, and transition variables from the design spec. Include base reset, box-sizing, font imports (Google Fonts link will go in HTML), `prefers-reduced-motion` media query stub, and global focus styles for interactive elements (`:focus-visible` with blush outline + gold glow for buttons, links, and form fields).

CSS variables to define:
- Colors: `--deep-night: #0d0d1a`, `--navy: #1a1a2e`, `--midnight: #16213e`, `--blush: #e8b4b8`, `--gold: #d4a853`, `--cream: #f5f0eb`, `--mist: #8899aa`, `--slate: #778899`
- Fonts: `--font-heading`, `--font-body`, `--font-handwritten`
- Transitions: `--transition-fast: 0.2s ease`, `--transition-normal: 0.4s ease`, `--transition-slow: 0.8s ease`

- [ ] **Step 8: Create empty `main.js` with module structure stubs**

IIFE module stubs for: ParticleCanvas, SparkleTrail, ScrollReveal, Navigation, PortfolioFilter, Lightbox, ProductTilt, ContactForm. Each as an empty IIFE with a comment describing its responsibility.

- [ ] **Step 9: Create minimal `index.html` skeleton**

Doctype, `<html lang="en">`, `<head>` with meta charset, viewport, title, meta description, Open Graph tags, Google Fonts link (Playfair Display 400/700, Raleway 300/400/500/600, Dancing Script 400/700), Font Awesome CDN, favicon link, stylesheet link. `<body>` with skip-to-content link (`<a href="#main-content" class="skip-link">`), `<main id="main-content">` wrapping all section stubs (just `<section id="home">`, etc.), and script tag. All `<img>` tags throughout the project should use `loading="lazy"` attribute and be structured as `<picture>` elements ready for WebP/JPG swapping. All interactive elements (buttons, links, form controls) must include appropriate ARIA labels (e.g., `aria-label="Toggle navigation menu"` on hamburger, `aria-label="Close lightbox"` on close buttons, etc.).

- [ ] **Step 10: Commit scaffolding**

```bash
git add -A
git commit -m "chore: initial project scaffolding with design system variables"
```

---

## Task 2: Navigation Bar

**Files:**
- Modify: `index.html` (add nav markup)
- Modify: `styles.css` (add nav styles)
- Modify: `main.js` (add Navigation module)

- [ ] **Step 1: Add nav HTML to `index.html`**

Fixed `<header>` with `<nav>` containing: logo text ("Art of the Table" as `<a>`), `<ul>` with 6 nav links (HOME, SERVICES, PORTFOLIO, SHOP, BLOG, CONTACT) each linking to `#section-id`, and a hamburger button (`<button class="nav-toggle">` with 3 `<span>` bars) hidden on desktop.

- [ ] **Step 2: Add nav styles to `styles.css`**

- Fixed position, full width, z-index 1000
- Transparent background initially, transitions to `--navy` with backdrop-filter blur on scroll (class `.nav-scrolled`)
- Logo: Playfair Display, blush color, letter-spacing
- Links: Raleway, small caps, `--mist` color, letter-spacing 2px
- Active link: `--blush` color
- Hover: `::after` pseudo-element underline slides in (width 0 → 100%, `--blush`, 2px height)
- Hamburger button: hidden on desktop, visible below 768px, `aria-label="Toggle navigation menu"`, `aria-expanded="false"`
- Mobile overlay: `<div class="nav-overlay">` — fixed full-screen, `background: rgba(0,0,0,0.6)`, z-index 999, hidden by default, shown when `.nav-open` is on body (separate DOM element for click-to-close handler)
- Mobile drawer: fixed right panel, z-index 1000, slides in from right (`transform: translateX(100%)` → `translateX(0)`), sits above overlay
- Mobile nav links: stacked vertically, larger font, 44px min tap target

- [ ] **Step 3: Add Navigation module to `main.js`**

- Scroll listener (throttled with `requestAnimationFrame`): adds `.nav-scrolled` class when `scrollY > 50`
- Active section tracking: IntersectionObserver on each `<section>`, updates active nav link
- Hamburger toggle: click handler toggles `.nav-open` on body, manages drawer open/close
- Smooth scroll: click handler on nav links does `element.scrollIntoView({ behavior: 'smooth' })`
- Close mobile nav on link click
- Close mobile nav on overlay click
- Escape key closes mobile nav

- [ ] **Step 4: Test nav in browser — verify scroll behavior, mobile drawer, smooth scroll**

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: add fixed navigation with mobile drawer and scroll tracking"
```

---

## Task 3: Hero Section with Particle Canvas

**Files:**
- Modify: `index.html` (add hero markup)
- Modify: `styles.css` (add hero styles + entrance animations)
- Modify: `main.js` (add ParticleCanvas module)

- [ ] **Step 1: Add hero HTML to `index.html`**

`<section id="home" class="hero">` containing:
- `<canvas id="particle-canvas">` (position: fixed, full viewport, z-index 0)
- `<div class="hero-content">` with:
  - `<p class="hero-label">` — "Est. 1999 · Event Styling & Custom Gifts"
  - `<h1>` with `<span class="hero-we-make">We Make</span>` and `<span class="hero-memories">Memories!</span>`
  - `<div class="hero-divider">` — gold gradient line
  - `<p class="hero-subtitle">` — "Distinctive details for life's most beautiful moments"
  - Two CTAs: `<a class="btn btn-outline">EXPLORE OUR WORK</a>` and `<a class="btn btn-solid">BOOK A CONSULTATION</a>`
  - Scroll indicator div with mouse icon SVG

- [ ] **Step 2: Add hero styles to `styles.css`**

- `.hero`: 100vh height, flex center, gradient background (deep-night → navy → midnight), position relative, overflow hidden
- `.hero-content`: z-index 1, text-align center, max-width 800px
- `.hero-label`: 11px, letter-spacing 5px, uppercase, mist color
- `.hero-we-make`: Playfair Display, ~60px, white
- `.hero-memories`: Dancing Script, ~72px, blush
- `.hero-divider`: 60px wide, 1px, gold gradient, margin auto
- `.hero-subtitle`: 14px, mist, letter-spacing 1px
- Buttons: `.btn-outline` (blush border, transparent bg), `.btn-solid` (blush bg, deep-night text). Both: 12px, letter-spacing 2px, uppercase, padding 14px 36px
- Button hover: gold box-shadow glow pulse (`@keyframes glowPulse`)
- Scroll indicator: bounce animation (`@keyframes bounce`)
- Hero entrance animations: define `@keyframes fadeUp`, `@keyframes fadeUpScale`, `@keyframes sparkleIn`
- Each hero element gets animation-delay per the entrance sequence (0.3s, 0.6s, 0.9s, 1.2s, 1.5s)
- Elements start with `opacity: 0` and `animation-fill-mode: forwards`

- [ ] **Step 3: Add ParticleCanvas module to `main.js`**

Full-page canvas (position: fixed, z-index 0) with `requestAnimationFrame` loop:
- Particle class: x, y, size (2-6px), color (random gold or blush), opacity (0.2-0.8), velocityX/Y (slow random), twinkle phase/speed
- Initialize: 50 particles randomly positioned
- Update: drift with sine-wave oscillation, wrap around edges, twinkle opacity via `Math.sin(phase)`
- Draw: filled circles with `globalAlpha`
- Density zones: spawn 50 particles in hero zone (top 100vh) at full opacity; spawn separate set of 15-20 particles below hero at 0.3 opacity
- Occasional larger "star" particles (8-10px) with 4-point twinkle: draw as two crossed thin rectangles that rotate (enhancement beyond spec for extra Disney sparkle)
- Resize handler: update canvas dimensions on window resize
- Mobile (< 768px): reduce to 15 particles in hero, 8 below hero. Below 480px: disable canvas entirely
- Respect `prefers-reduced-motion`: disable animation, show static particles

- [ ] **Step 4: Add Disney sparkle burst for "Memories!" entrance**

In the ParticleCanvas module, add a `sparkBurst(x, y, count)` function:
- Spawns `count` (20-30) temporary particles at given position
- Each particle: random angle, velocity (2-8px/frame), size (1-4px), color (gold/blush/white), lifespan (30-60 frames)
- Particles decelerate and fade out over lifespan
- Triggered once after "Memories!" animation completes (0.9s timeout after page load)
- Calculate burst center from `.hero-memories` element's bounding rect

- [ ] **Step 5: Test hero — verify entrance sequence timing, particle canvas, sparkle burst, scroll indicator**

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: add hero section with particle canvas and Disney sparkle entrance"
```

---

## Task 4: Cursor Sparkle Trail

**Files:**
- Modify: `main.js` (add SparkleTrail module)
- Modify: `styles.css` (add sparkle animation styles)

- [ ] **Step 1: Add SparkleTrail module to `main.js`**

Disney pixie-dust cursor trail (desktop only):
- `mousemove` listener on `document`
- On move: spawn 1-2 sparkle particles at cursor position
- Each sparkle: random size (2-5px), random color from [gold, blush, white, light-gold], random offset (-8 to 8px from cursor), opacity 1.0
- Animation: sparkle drifts downward slightly with gentle spiral (sine wave on X), shrinks to 0, fades to 0, over ~600ms (36 frames at 60fps)
- Pool max: 30 active sparkles, oldest removed when limit hit
- Render on a separate small canvas overlay OR use CSS-created elements (DOM approach: create `<div class="sparkle">` elements, animate with CSS, remove after animation ends)
- DOM approach preferred for simplicity: absolute-positioned divs with CSS `@keyframes sparkleFloat` (translate + scale + opacity)
- Disable on touch devices: check `'ontouchstart' in window` or `navigator.maxTouchPoints > 0`
- Respect `prefers-reduced-motion`: disable entirely

- [ ] **Step 2: Add sparkle CSS to `styles.css`**

```css
.sparkle {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  animation: sparkleFloat 0.6s ease-out forwards;
}
@keyframes sparkleFloat {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--sx), 20px) scale(0); opacity: 0; }
}
```

- [ ] **Step 3: Test sparkle trail — verify it follows cursor, fades nicely, doesn't appear on touch devices**

- [ ] **Step 4: Commit**

```bash
git add main.js styles.css
git commit -m "feat: add Disney pixie-dust cursor sparkle trail"
```

---

## Task 5: Scroll Reveal System

**Files:**
- Modify: `styles.css` (add reveal animation classes)
- Modify: `main.js` (add ScrollReveal module)

- [ ] **Step 1: Add scroll reveal CSS to `styles.css`**

```css
.reveal { opacity: 0; transform: translateY(30px); transition: opacity var(--transition-slow), transform var(--transition-slow); }
.reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity var(--transition-slow), transform var(--transition-slow); }
.reveal-right { opacity: 0; transform: translateX(30px); transition: opacity var(--transition-slow), transform var(--transition-slow); }
.reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: translate(0); }
.shimmer-divider { width: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 0 auto; transition: width 1s ease; }
.shimmer-divider.visible { width: 80px; }
```

Stagger support: `.reveal-delay-1` through `.reveal-delay-4` adding `transition-delay: 0.1s` increments.

- [ ] **Step 2: Add ScrollReveal module to `main.js`**

- `IntersectionObserver` with `threshold: 0.15` and `rootMargin: '0px 0px -50px 0px'`
- Query all `.reveal`, `.reveal-left`, `.reveal-right`, `.shimmer-divider` elements
- On intersection: add `.visible` class
- Unobserve after revealing (one-shot)
- Respect `prefers-reduced-motion`: add `.visible` to all immediately, skip animation

- [ ] **Step 3: Add `.reveal` classes to existing hero CTAs and scroll indicator (they use entrance animation, but elements below hero will use reveal)**

- [ ] **Step 4: Commit**

```bash
git add styles.css main.js
git commit -m "feat: add IntersectionObserver scroll reveal system with shimmer dividers"
```

---

## Task 6: Services Section

**Files:**
- Modify: `index.html` (add services section markup)
- Modify: `styles.css` (add services styles)

- [ ] **Step 1: Add services HTML to `index.html`**

`<section id="services">` with:
- `<div class="shimmer-divider"></div>`
- Gold label `<span class="section-label">OUR SERVICES</span>`
- Heading `<h2>What We Create</h2>`
- Three `.service-card` divs each with: Font Awesome icon (`fa-palette`, `fa-gift`, `fa-store`), `<h3>` title, `<p>` description
- All content elements get `.reveal` class with stagger delays

- [ ] **Step 2: Add services styles to `styles.css`**

- Section padding: 100px vertical, centered content, max-width 1200px
- `.section-label`: 11px, uppercase, letter-spacing 5px, gold, Raleway
- Section `h2`: Playfair Display, ~36px, white, margin-bottom 48px
- `.service-card`: dark glass background (`rgba(255,255,255,0.03)`), blush border (`rgba(232,180,184,0.15)`), border-radius 12px, padding 40px, text-align center
- Service cards grid: 3-column on desktop, 1-column on mobile
- Card icon: 40px, blush color
- Card `h3`: Playfair Display, blush, 20px
- Card `p`: Raleway, mist, 14px, line-height 1.7
- Hover: `translateY(-8px)`, gold box-shadow glow, border-color transitions to gold
- Transition: `var(--transition-normal)`

- [ ] **Step 3: Test services section — verify cards, hover effects, scroll reveal stagger**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add services section with hover glow cards"
```

---

## Task 7: About Section — "Meet Annie"

**Files:**
- Modify: `index.html` (add about section)
- Modify: `styles.css` (add about styles)

- [ ] **Step 1: Add about HTML to `index.html`**

`<section id="about">` with:
- Shimmer divider
- Two-column layout: `.about-grid`
  - Left: `.about-image` — `<img>` of Annie (placeholder `src` for now) in a circular container
  - Right: `.about-text` — gold label "ABOUT US", heading "Meet Annie", bio paragraphs, pull quote in Dancing Script ("We Make Memories!"), "Verified on The Knot & WeddingWire" line
- `.reveal-left` on image, `.reveal-right` on text

- [ ] **Step 2: Add about styles to `styles.css`**

- `.about-grid`: 2-column grid (1fr 1fr), gap 60px, align-items center
- `.about-image img`: circular crop (`border-radius: 50%`), 300px x 300px, `object-fit: cover`, blush border ring (4px solid blush), gold box-shadow (`0 0 30px rgba(212,168,83,0.2)`)
- `.about-text h2`: Playfair Display, white
- `.about-text p`: Raleway 300, cream, 15px, line-height 1.8
- Pull quote: Dancing Script, 28px, blush, with decorative gold quotes (::before/::after)
- Responsive: single column on mobile, image centered above text

- [ ] **Step 3: Test about section — verify layout, image styling, reveal animations**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add about section with Annie's profile"
```

---

## Task 8: Portfolio Section with Filters & Lightbox

**Files:**
- Modify: `index.html` (add portfolio section)
- Modify: `styles.css` (add portfolio + lightbox styles)
- Modify: `main.js` (add PortfolioFilter + Lightbox modules)

- [ ] **Step 1: Add portfolio HTML to `index.html`**

`<section id="portfolio">` with:
- Shimmer divider, label "OUR WORK", heading "Memories We've Made"
- Filter tabs: `<div class="filter-tabs">` with `<button data-filter="all" class="active">ALL</button>`, and buttons for WEDDINGS, SHOWERS, GIFT BOXES, CORPORATE
- Portfolio grid: `<div class="portfolio-grid">` with 8-9 `.portfolio-item` divs, each having `data-category="weddings"` (etc.), containing:
  - Placeholder image div (gradient background simulating a photo, with dimensions matching 4:3 aspect ratio)
  - `.portfolio-overlay`: absolute positioned, blush semi-transparent, with event name + type
- Lightbox markup: `<div class="lightbox" id="lightbox">` with close button, image container, prev/next arrows, caption area

- [ ] **Step 2: Add portfolio styles to `styles.css`**

- Filter tabs: flex row, gap 12px, centered. Each button: pill shape (border-radius 20px), 11px uppercase, letter-spacing 1px, mist border. Active: blush border + blush text. Hover: transition border color.
- `.portfolio-grid`: CSS Grid, 3 columns on desktop, 2 on tablet, 1 on mobile, gap 16px
- `.portfolio-item`: aspect-ratio 4/3, border-radius 8px, overflow hidden, cursor pointer, position relative
- `.portfolio-item img` / placeholder: width 100%, height 100%, object-fit cover
- `.portfolio-overlay`: absolute inset 0, background rgba(232,180,184,0.85), opacity 0, flex center, transition opacity 0.3s
- `.portfolio-item:hover .portfolio-overlay`: opacity 1
- `.portfolio-item img`: on hover `transform: scale(1.05)`, transition 0.4s
- Filter animation: items not matching get `opacity: 0; transform: scale(0.8); pointer-events: none; position: absolute;` and matching items get `opacity: 1; transform: scale(1);` with transitions
- Lightbox: fixed inset 0, z-index 2000, black overlay (rgba(0,0,0,0.9)), flex center, hidden by default (`.lightbox.active` shows it)
- Lightbox image: max-width 90vw, max-height 80vh, object-fit contain
- Lightbox arrows: positioned left/right, blush color, 40px, hover glow
- Lightbox close: top-right, blush, 32px

- [ ] **Step 3: Add PortfolioFilter module to `main.js`**

- Click handlers on filter buttons: toggle `.active` class, filter grid items
- Filter logic: on button click, get `data-filter` value. If "all", show all items. Otherwise, hide items where `data-category` doesn't match.
- Show/hide via adding/removing `.filtered-out` class (CSS handles the animation)
- Grid reflow: after hiding/showing, visible items re-layout naturally via CSS Grid

- [ ] **Step 4: Add Lightbox module to `main.js`**

- Click handler on `.portfolio-item`: open lightbox with that item's image/details
- Store array of visible (filtered) portfolio items for navigation
- Prev/Next buttons: cycle through array, update lightbox image + caption
- Close: click X, click overlay, press Escape
- Keyboard: left/right arrows for prev/next
- Touch swipe: track `touchstart`/`touchend` X positions, swipe threshold 50px
- Body scroll lock: add `overflow: hidden` to body when lightbox open
- Focus trap: on open, focus the close button; intercept Tab/Shift+Tab to cycle within lightbox focusable elements (close, prev, next); on close, return focus to the portfolio item that triggered it

- [ ] **Step 5: Test portfolio — verify filters animate, grid reflows, lightbox opens/closes, keyboard nav, swipe works**

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: add portfolio section with category filters and lightbox"
```

---

## Task 9: Etsy Shop Section with 3D Tilt

**Files:**
- Modify: `index.html` (add shop section)
- Modify: `styles.css` (add shop styles)
- Modify: `main.js` (add ProductTilt module)

- [ ] **Step 1: Add shop HTML to `index.html`**

`<section id="shop">` with:
- Shimmer divider, label "SHOP OUR CREATIONS", heading "Handcrafted With Love", subtitle
- `.product-grid`: 4 `.product-card` divs each with:
  - `.product-image`: placeholder div (1:1 aspect ratio, gradient background)
  - `.product-info`: product name (`<h3>`), price (`<span class="product-price">`)
  - Entire card wrapped in `<a href="#">` (Etsy link placeholder)
- CTA: `<a class="btn btn-outline-gold">VISIT OUR ETSY SHOP →</a>`

- [ ] **Step 2: Add shop styles to `styles.css`**

- `.product-grid`: 4 columns desktop, 2 tablet, horizontal scroll on mobile (`display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px;` on mobile)
- `.product-card`: gold border (`rgba(212,168,83,0.2)`), border-radius 12px, overflow hidden, background dark glass, `perspective: 1000px` on container
- `.product-image`: aspect-ratio 1/1, gradient placeholder
- `.product-info`: padding 16px
- Product name: Raleway, cream, 14px
- `.product-price`: Dancing Script, gold, 18px
- Hover: gold border brightens, subtle 3D tilt transform
- `.btn-outline-gold`: gold border, gold text, same button styling as blush variant
- Mobile scroll: each card `min-width: 260px; scroll-snap-align: start;`
- Scroll indicators (dots) below carousel on mobile via CSS `::after` or JS

- [ ] **Step 3: Add ProductTilt module to `main.js`**

- For each `.product-card`: `mousemove` listener
- Calculate mouse position relative to card center
- Apply `transform: rotateY(Xdeg) rotateX(Ydeg)` where degrees = position * 8 (max 8 degree tilt)
- `mouseleave`: reset to `transform: rotateY(0) rotateX(0)` with transition
- Desktop only: skip on touch devices

- [ ] **Step 4: Test shop section — verify 3D tilt, mobile carousel scroll snap, Etsy CTA**

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: add Etsy shop section with 3D tilt product cards"
```

---

## Task 10: Blog Section

**Files:**
- Modify: `index.html` (add blog section)
- Modify: `styles.css` (add blog styles)

- [ ] **Step 1: Add blog HTML to `index.html`**

`<section id="blog">` with:
- Shimmer divider, label "INSPIRATION", heading "From Our Journal"
- `.blog-grid`: 3 `.blog-card` `<a>` elements (linking to artofthetable.blog), each with:
  - `.blog-image`: placeholder div (16:9 aspect ratio)
  - `.blog-content`: category tag (`<span class="blog-tag">`), title (`<h3>`), date (`<span class="blog-date">`)
- All cards get `.reveal` with stagger delays

- [ ] **Step 2: Add blog styles to `styles.css`**

- `.blog-grid`: 3 columns desktop, 2 tablet, 1 mobile, gap 24px
- `.blog-card`: dark glass background, blush border, border-radius 12px, overflow hidden, text-decoration none
- `.blog-image`: aspect-ratio 16/9, gradient placeholder
- `.blog-tag`: gold, 10px, uppercase, letter-spacing 1px
- `.blog-card h3`: Playfair Display, cream, 16px, line-height 1.4
- `.blog-date`: slate, 12px
- Hover: translateY(-4px), border glow, image slight zoom

- [ ] **Step 3: Test blog section — verify card layout, hover effects, links**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add blog/inspiration section with journal cards"
```

---

## Task 11: Contact Section & Form

**Files:**
- Modify: `index.html` (add contact section)
- Modify: `styles.css` (add contact styles)
- Modify: `main.js` (add ContactForm module)

- [ ] **Step 1: Add contact HTML to `index.html`**

`<section id="contact">` with:
- Shimmer divider, split layout `.contact-grid`:
  - Left `.contact-info`: label "GET IN TOUCH", heading "Let's Create Something Beautiful" (Playfair), descriptive paragraph, email link, location text, social icons (Font Awesome: `fa-facebook-f`, `fa-instagram`, `fa-pinterest-p`) in blush circle links
  - Right `.contact-form`: `<form id="contact-form">` with fields: name (text input), email (email input), event type (select dropdown with options: Wedding, Baby Shower, Birthday, Corporate Event, Gift Boxes, Other), vision (textarea), submit button. Plus `.form-success` and `.form-error` hidden message divs.

- [ ] **Step 2: Add contact styles to `styles.css`**

- `.contact-grid`: 2-column (1fr 1fr), gap 60px. Mobile: single column, info first.
- `.contact-info h2`: Playfair Display, white, 32px
- `.contact-info p`: Raleway 300, mist, 14px, line-height 1.8
- Email/location: blush color, flex with icon
- Social icons: 36px circles, blush border, flex center, blush icon. Hover: filled blush bg, deep-night icon
- Form inputs/textarea/select: width 100%, dark glass bg (`rgba(255,255,255,0.05)`), blush border (15% opacity default, full on focus), cream text, padding 14px, border-radius 6px, Raleway. Focus: gold box-shadow glow.
- Labels: mist, 10px uppercase, letter-spacing 1px, margin-bottom 6px
- Submit button: `.btn-solid` styles (blush bg, dark text), full width
- `.invalid` state: red-tinted border (`#e85a5a`), with `::after` error text on the label
- `.form-success`: hidden, green-tinted blush message. `.form-error`: hidden, with retry link.

- [ ] **Step 3: Add ContactForm module to `main.js`**

- Form submit handler: `preventDefault`, validate fields (name required, email format, event type required, message required)
- On valid: POST to Formspree URL (placeholder `https://formspree.io/f/YOUR_ID` — user will configure later)
- On success (200 response): hide form, show `.form-success` message
- On error: show `.form-error` message with retry button
- Retry button: hide error, show form again
- Basic client-side validation: add `.invalid` class to empty required fields on submit attempt, remove on input

- [ ] **Step 4: Test contact section — verify form validation, layout, social icons, mobile stack**

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: add contact section with inquiry form and social links"
```

---

## Task 12: Footer

**Files:**
- Modify: `index.html` (add footer)
- Modify: `styles.css` (add footer styles)

- [ ] **Step 1: Add footer HTML to `index.html`**

`<footer>` with:
- "Art of the Table" in Playfair Display
- "We Make Memories!" in Dancing Script
- Gold divider
- "Verified on The Knot & WeddingWire · Est. 1999"
- Copyright: "© 2026 Art of the Table. All rights reserved."

- [ ] **Step 2: Add footer styles to `styles.css`**

- Background: darkest (`#0a0a14`)
- Text-align center, padding 48px
- Logo text: Playfair Display, blush, 14px, letter-spacing 4px
- Motto: Dancing Script, white, 20px
- Gold divider: 40px wide, 1px, gold, margin auto
- Credentials: slate, 11px
- Copyright: `#3a4455`, 10px

- [ ] **Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add footer with brand and credentials"
```

---

## Task 13: Button Sparkle Hover Effects

**Files:**
- Modify: `main.js` (enhance SparkleTrail or add ButtonSparkle)
- Modify: `styles.css` (add button sparkle styles)

- [ ] **Step 1: Add button hover sparkle to `main.js`**

For all `.btn` elements:
- On `mouseenter`: spawn 6-10 tiny sparkle particles along the button edges
- Particles: gold/blush/white, random positions along the border, animate outward and fade
- Reuse the sparkle DOM approach from SparkleTrail
- Desktop only

- [ ] **Step 2: Test button sparkles — verify they emit on hover, don't obstruct clicks**

- [ ] **Step 3: Commit**

```bash
git add main.js styles.css
git commit -m "feat: add sparkle particle effects on button hover"
```

---

## Task 14: Parallax Effects

**Files:**
- Modify: `main.js` (add Parallax module)

- [ ] **Step 1: Add parallax scroll to `main.js`**

- Scroll listener (throttled via `requestAnimationFrame`):
  - Hero section background gradient: subtle vertical shift at 0.3x scroll speed via CSS transform
  - Particle canvas: apply `transform: translateY(scrollY * 0.3)` to simulate 0.7x scroll speed (canvas is fixed, so 1.0 - 0.3 = 0.7x effective speed)
  - Section background elements (if any decorative ones added): shift at 0.5x
- Performance: use `transform: translateY()` only (composited, no layout)
- Disable on mobile (< 768px) and when `prefers-reduced-motion` active
- Use `will-change: transform` on parallax elements

- [ ] **Step 2: Test parallax — verify smooth scrolling, no jank, disabled on mobile**

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add parallax scroll effects on hero and sections"
```

---

## Task 15: 404 Page

**Files:**
- Create: `404.html`

- [ ] **Step 1: Create `404.html`**

Standalone HTML page with:
- Same Google Fonts and color scheme as main site
- Centered content: "Art of the Table" logo text, "Oops! This page doesn't exist" heading, "Let's get you back to making memories" subtitle in Dancing Script, "BACK TO HOME" button linking to `index.html`
- Dark gradient background matching hero
- Inline CSS (no external stylesheet dependency for fast load)
- Minimal: no particles or heavy JS

- [ ] **Step 2: Commit**

```bash
git add 404.html
git commit -m "feat: add custom 404 page matching Midnight Garden theme"
```

---

## Task 16: Responsive Polish & Final QA

**Files:**
- Modify: `styles.css` (responsive refinements)
- Modify: `main.js` (mobile behavior adjustments)

- [ ] **Step 1: Audit all sections at each breakpoint (1024px, 768px, 480px)**

Check every section at all 4 breakpoints. Fix any layout issues:
- Nav: hamburger appears at 768px, drawer works
- Hero: text scales down gracefully, buttons stack on small mobile
- Services: cards stack single-column on mobile
- About: stacks vertically on mobile, image centered
- Portfolio: 2-col tablet, 1-col mobile, filter tabs wrap
- Shop: horizontal scroll on mobile, scroll-snap works
- Blog: 2-col tablet, 1-col mobile
- Contact: stacks vertically on mobile
- Footer: spacing adjustments

- [ ] **Step 2: Add `prefers-reduced-motion` full implementation**

In `styles.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .reveal-left, .reveal-right { opacity: 1; transform: none; }
}
```

In `main.js`: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before initializing particles, sparkles, parallax.

- [ ] **Step 3: Final CSS audit — verify all hover states, focus styles, transitions**

- [ ] **Step 4: Commit**

```bash
git add styles.css main.js
git commit -m "fix: responsive polish and reduced-motion accessibility"
```

---

## Task 17: Deploy to GitHub Pages

**Files:**
- No file changes — deployment steps

- [ ] **Step 1: Push all code to GitHub**

```bash
git push -u origin main
```

- [ ] **Step 2: Enable GitHub Pages**

```bash
gh api repos/{owner}/art-table/pages -X POST -f source.branch=main -f source.path=/
```

Or if already exists:
```bash
gh api repos/{owner}/art-table/pages -X PUT -f source.branch=main -f source.path=/
```

- [ ] **Step 3: Verify site is live at `<username>.github.io/art-table`**

- [ ] **Step 4: Download Annie's photo and add to repo**

Download Annie's provided LinkedIn photo, save as `images/annie.jpg`, update the `<img>` src in the about section, commit and push.

```bash
git add images/annie.jpg index.html
git commit -m "feat: add Annie's profile photo to about section"
git push
```
