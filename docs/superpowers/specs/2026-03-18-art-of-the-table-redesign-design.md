# Art of the Table — Website Redesign Design Spec

## Overview

A full redesign of the "Art of the Table" website — an event styling and custom gift box business founded in 1999. The new site replaces the existing artofthetable.blog with a modern, interactive, visually stunning experience.

**Motto/Tagline:** "We Make Memories!"
**Design Direction:** "Midnight Garden" — dark, dramatic, luxurious with blush pink and gold accents
**Site Type:** Full service hub — portfolio, booking, blog/inspiration, and featured Etsy products
**Tech Stack:** Pure HTML/CSS/JS, no build tools, deployed to GitHub Pages (`art-table` repo)

## Target Audience

- Brides and wedding planners looking for event styling and personalized details
- Anyone seeking custom gift boxes (proposals, thank-you, corporate)
- Craft/artisan shoppers browsing for handmade goods (via Etsy link)

## Color Palette

| Name       | Hex       | Usage                                  |
|------------|-----------|----------------------------------------|
| Deep Night | `#0d0d1a` | Primary background                     |
| Navy       | `#1a1a2e` | Section alternating background         |
| Midnight   | `#16213e` | Gradient accents, card backgrounds     |
| Blush      | `#e8b4b8` | Primary accent, headings, CTAs         |
| Gold       | `#d4a853` | Secondary accent, labels, particles    |
| Cream      | `#f5f0eb` | Body text, card text                   |
| Mist       | `#8899aa` | Secondary text, descriptions           |
| Slate      | `#778899` | Tertiary text, captions (WCAG AA compliant on dark) |

## Typography

- **Headings:** Playfair Display (serif) — elegant, editorial feel
- **Body:** Raleway (sans-serif, weights 300/400/500/600) — clean, modern readability
- **Handwritten:** Dancing Script (cursive, weights 400/700) — warm, personal, crafted feel
  - Used on: "We Make Memories!" motto, section subtitle accents, pull quotes, "Est. 1999" bio accent
  - NOT used on: nav links, body text, labels, buttons, form fields
- **Accents:** Letter-spacing on labels/nav for luxe feel
- Loaded via Google Fonts

## Site Structure (Single Page with Anchor Navigation)

### 1. Navigation Bar (Fixed)
- Logo text "Art of the Table" left-aligned in Playfair Display, blush color
- Nav links: HOME | SERVICES | PORTFOLIO | SHOP | BLOG | CONTACT (matches page section order)
- Links use small caps with letter-spacing
- Active section highlighted in blush, others in mist
- Blush underline slides in on hover
- Mobile: hamburger icon triggers slide-in drawer from right with dark overlay
- Nav background transitions from transparent to dark on scroll

### 2. Hero Section (Full Viewport)
- Full-viewport height with deep gradient background
- **Gold dust particle canvas animation** — floating, twinkling gold specks across the background
- "Est. 1999 · Event Styling & Custom Gifts" — small caps label, mist color
- "We Make" — large Playfair Display, white, fades up on load
- "Memories!" — larger Dancing Script, blush, fades up 0.3s after with subtle scale
- Gold gradient divider line
- Subtitle: "Distinctive details for life's most beautiful moments"
- Two CTAs side by side:
  - "EXPLORE OUR WORK" — outlined in blush
  - "BOOK A CONSULTATION" — solid blush background
- Scroll indicator at bottom: mouse icon with bounce animation

### 3. Services Section — "What We Create"
- Gold label "OUR SERVICES" + heading "What We Create"
- Three service cards in a row (stacks on mobile):
  - **Event Styling** — tablescapes, florals, favors & personalized details
  - **Custom Gift Boxes** — proposal boxes, thank-you gifts & corporate packages
  - **Artisan Shop** — handcrafted arts & crafts on Etsy store
- Each card: Font Awesome icon, blush title, mist description
- Cards have subtle dark glass background with blush border
- **Hover:** cards lift (translateY), gold glow border pulse

### 4. Portfolio Section — "Memories We've Made"
- Gold label "OUR WORK" + heading "Memories We've Made"
- **Filter tabs:** ALL | WEDDINGS | SHOWERS | GIFT BOXES | CORPORATE
  - Active tab: blush border pill. Inactive: mist border
  - Switching filters triggers smooth shuffle/rearrange animation
- **CSS Grid layout** with uniform card sizes (simpler, more reliable than true masonry without a library)
- **Hover:** smooth zoom on image, blush-pink semi-transparent overlay fades in showing event name and type
- **Click:** opens lightbox modal with:
  - Large image view
  - Swipe/arrow navigation between images
  - Event name and description
  - Close button (X) and click-outside-to-close
- Scroll-triggered: cards fade up in staggered sequence

### 5. Etsy Shop Section — "Handcrafted With Love"
- Gold label "SHOP OUR CREATIONS" + heading "Handcrafted With Love"
- Subtitle: "Featured items from our Etsy store"
- 3-4 product cards in a row:
  - Product image placeholder (easy to swap)
  - Product name in cream
  - Price in gold
  - Gold border on hover with slight 3D tilt effect
- "VISIT OUR ETSY SHOP →" CTA button, gold outlined
- Products are hardcoded (not fetched from Etsy API) — easy to update manually

### 6. Blog Section — "From Our Journal"
- Gold label "INSPIRATION" + heading "From Our Journal"
- 2-3 blog post preview cards:
  - Image thumbnail
  - Category tag in gold (WEDDING TIPS, GIFT IDEAS, etc.)
  - Post title in cream
  - Date in slate
- Cards link externally to the existing artofthetable.blog posts (no internal blog pages needed)
- Hover: subtle lift and border glow

### 7. Contact Section — "Let's Create Something Beautiful"
- Split layout:
  - **Left side:** heading, descriptive text, email, location, social media icons (Facebook, Instagram, Pinterest) in blush circle outlines
  - **Right side:** inquiry form with fields:
    - Your Name
    - Email
    - Event Type (dropdown or text)
    - "Tell Us Your Vision" (textarea)
    - "SEND MESSAGE" submit button in solid blush
- Form fields: dark glass background with blush border on focus, gold glow
- Form submission: uses Formspree (action URL to be configured)
- On submit: inline success message replaces form ("Thank you! We'll be in touch soon.")
- On error: inline error message with retry option
- Social media links: TBD (placeholders with # hrefs, easy to update)

### 8. Footer
- "Art of the Table" in Playfair Display
- "We Make Memories!" in Dancing Script
- Gold divider
- "Verified on The Knot & WeddingWire · Est. 1999"
- Copyright line

## Animation & Interactivity Spec

### Gold Dust Particles (Canvas)
- Single full-page HTML5 canvas (position: fixed, z-index: 0) behind all content
- Hero zone: 40-60 particles of varying sizes (2-6px), full opacity
- Below hero: particle count drops to 15-20, opacity reduced to 0.3
- Colors: mix of gold (#d4a853) and blush (#e8b4b8) at varying opacities
- Movement: slow random drift with gentle sine-wave oscillation
- Twinkle: opacity pulses on random intervals
- Mobile (< 768px): reduced to 15 particles hero, 8 below; disabled entirely below 480px

### Cursor Sparkle Trail
- Small gold/blush dots spawn at cursor position on mousemove
- Each dot fades out and shrinks over ~600ms
- Limited to 20-30 active particles to keep performance smooth
- Desktop only (disabled on touch devices)

### Scroll Animations
- **IntersectionObserver-based** reveal system
- Elements start with `opacity: 0` and slight transform (translateY or translateX)
- On intersection: transition to full opacity and position over 0.6-0.8s
- Staggered delays for grouped elements (cards appear one after another)
- Each section has a gold shimmer divider that "draws" itself (width animates from 0 to full)

### Parallax
- Background gradient layers shift at 0.3-0.5x scroll speed
- Hero particles layer scrolls at 0.7x speed
- Implemented via CSS `transform: translateY()` on scroll (no heavy libraries)

### Hover Effects
- **Service cards:** `transform: translateY(-8px)` + `box-shadow` with gold/blush glow
- **Portfolio images:** `transform: scale(1.05)` + blush overlay fade-in
- **Product cards:** JS `mousemove` tracking + CSS `perspective` + `rotateY/rotateX` for subtle 3D tilt
- **Buttons:** gold `box-shadow` glow pulse animation
- **Nav links:** `::after` pseudo-element width transition for underline slide

### Hero Entrance Sequence
1. Background gradient renders immediately
2. Particle canvas starts
3. 0.3s: "Est. 1999..." label fades in
4. 0.6s: "We Make" fades up from below
5. 0.9s: "Memories!" fades up with scale(0.95 → 1) + sparkle burst
6. 1.2s: Subtitle and divider fade in
7. 1.5s: CTA buttons fade in
8. 2.0s: Scroll indicator begins bounce loop

### Portfolio Filter Animation
- Active filter pill: blush border + blush text, smooth transition
- Grid items: CSS transitions on opacity + transform
- Items not matching filter: fade out + scale down
- Matching items: fade in to grid positions

## Responsive Design

### Breakpoints
- **Desktop:** > 1024px — full layout as designed
- **Tablet:** 768px - 1024px — 2-column grids, slightly smaller typography
- **Mobile:** < 768px — single column, hamburger nav, stacked sections
- **Small mobile:** < 480px — further typography/spacing adjustments

### Mobile-Specific Behavior
- Hamburger menu with slide-in drawer (right side, dark overlay)
- Touch-friendly: larger tap targets (min 44px), no hover-dependent features
- Cursor sparkle trail disabled on touch devices
- Portfolio grid: 2 columns on tablet, 1-2 on mobile
- Product cards: horizontal scroll carousel on mobile
- Parallax reduced/disabled on mobile for performance
- All animations respect `prefers-reduced-motion` media query

## About Section (between Services and Portfolio)

### 3.5. About — "Meet Annie"
- Two-column layout: Annie's photo on left, bio text on right
- Annie's photo: circular crop with blush border ring and gold shadow
- Bio text: warm, personal tone about founding Art of the Table in 1999
- Pull quote: "We Make Memories!" in large Dancing Script
- "Verified on The Knot & WeddingWire" badges/mentions
- Mobile: photo above text, centered

## SEO & Meta

- `<title>`: "Art of the Table — We Make Memories! | Event Styling & Custom Gifts"
- Meta description summarizing services
- Open Graph tags (og:title, og:description, og:image) for social sharing
- Favicon: small blush/gold icon or stylized "A" monogram
- Custom `404.html` matching the Midnight Garden theme with link back to home

## Image Specifications

- **Portfolio cards:** 4:3 aspect ratio, `object-fit: cover`, min 600x450px recommended
- **Product cards:** 1:1 square aspect ratio, min 400x400px recommended
- **Blog thumbnails:** 16:9 aspect ratio, min 600x338px recommended
- **Annie's photo:** 1:1 square, min 400x400px recommended
- All containers use fixed aspect ratios via CSS `aspect-ratio` to prevent layout shift
- Responsive images: use `srcset` with 1x and 2x variants where available
- Format: WebP preferred with JPG fallback via `<picture>` element

## Content Management

Portfolio items, blog links, and Etsy products are hardcoded in `index.html`. To update:
- **Portfolio:** add/remove `<div class="portfolio-item">` blocks with appropriate `data-category` attributes
- **Products:** update product cards in the shop section with new images, names, prices, and Etsy links
- **Blog:** update card links to point to new blog posts on artofthetable.blog

## File Structure

```
art-table/
├── index.html          # Single-page site with all sections
├── 404.html            # Custom 404 page in Midnight Garden theme
├── styles.css          # Full design system + responsive + animations
├── main.js             # Particles, scroll reveals, nav, filters, lightbox, sparkles
├── images/             # Directory for photos (easy to swap)
│   ├── annie.jpg       # Annie's profile photo
│   ├── portfolio/      # Event/project photos
│   ├── products/       # Etsy product photos
│   └── blog/           # Blog post thumbnails
└── README.md           # Setup instructions
```

## Deployment

- GitHub repo: `art-table` under user's GitHub account
- GitHub Pages enabled on `main` branch
- Initially accessible at `<username>.github.io/art-table`
- Domain can be switched later via CNAME

## Image Strategy

- Site designed with placeholder images (gradient blocks matching the color scheme)
- All image references use simple `<img>` tags with descriptive alt text
- Images organized in `images/` subdirectories by type
- Swapping: replace files in the directories, keep same filenames, or update `src` attributes
- Placeholder styling ensures the site looks polished even before real photos are added

## Performance Considerations

- No external JS libraries — all vanilla JS
- Canvas particle system uses `requestAnimationFrame` with frame throttling
- Images: lazy loading via `loading="lazy"` attribute
- CSS animations use `transform` and `opacity` only (GPU-accelerated, no layout thrashing)
- Reduced motion: all animations disabled when `prefers-reduced-motion: reduce` is set
- Intersection Observer for scroll reveals (no scroll event listeners)

## Accessibility

- Semantic HTML5 elements (header, nav, main, section, footer)
- ARIA labels on interactive elements
- Keyboard navigation support for lightbox and mobile menu
- Color contrast: cream/blush on dark backgrounds meets WCAG AA
- Focus styles on form fields and interactive elements
- Skip-to-content link
