# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Art of the Table** — an event styling & custom gift box business. "Midnight Garden" dark luxe theme with blush pink and gold accents on deep navy backgrounds.

No build tools, bundler, or package manager — pure HTML/CSS/JS served directly.

## Development

Open `index.html` in a browser or use any static file server:

```bash
python3 -m http.server 8000
```

No build step, no tests, no linting configured.

## Architecture

Three files make up the entire site:

- **`index.html`** — Single-page layout with 9 sections: Home (hero), Services, About, Portfolio, Shop, Blog, Contact, plus header nav and footer. Uses anchor-based navigation.
- **`styles.css`** — "Midnight Garden" dark luxe design system. CSS custom properties defined in `:root` (color palette, fonts, spacing, transitions). Responsive breakpoints. Scroll-reveal animation classes.
- **`main.js`** — IIFE modules: ParticleCanvas, SparkleTrail, ScrollReveal, Navigation, PortfolioFilter, Lightbox, ProductTilt, ContactForm.

## Color Palette (CSS Variables)

| Variable        | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `--deep-night` | `#0d0d1a` | Primary background           |
| `--navy`       | `#1a1a2e` | Surface / card backgrounds   |
| `--midnight`   | `#16213e` | Elevated surfaces            |
| `--blush`      | `#e8b4b8` | Primary accent (blush pink)  |
| `--gold`       | `#d4a853` | Secondary accent (gold)      |
| `--cream`      | `#f5f0eb` | Body text                    |
| `--mist`       | `#8899aa` | Muted / secondary text       |
| `--slate`      | `#778899` | Borders, subtle elements     |

## Fonts

- **Headings:** Playfair Display (serif) — `--font-heading`
- **Body:** Raleway (sans-serif) — `--font-body`
- **Handwritten accents:** Dancing Script (cursive) — `--font-handwritten`

Loaded via Google Fonts. Font Awesome 6.5 for icons.

## Content Management

### Portfolio Items
Portfolio items in `index.html` use `data-category` attributes for filtering (e.g., `data-category="weddings"`, `data-category="corporate"`, `data-category="gifts"`). Images are stored in `images/portfolio/`.

### Blog Cards
Blog cards link externally to `artofthetable.blog`. Each card has a thumbnail image stored in `images/blog/`.

### Product Cards (Shop)
Product cards link to the Etsy storefront. Product images are stored in `images/products/`.

## Key Conventions

- CSS class `.handwritten` applies the Dancing Script font family.
- All interactive elements have `:focus-visible` styles with blush outline and gold glow.
- Skip-to-content link provided for accessibility.
- Deployed to GitHub Pages.
