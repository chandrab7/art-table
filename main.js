'use strict';

/* ==========================================================================
   Art of the Table — JavaScript Modules
   ========================================================================== */

/**
 * ParticleCanvas
 * Renders ambient floating particles on a background <canvas> element.
 * Creates a subtle, dreamy atmosphere with soft blush and gold particles.
 */
(function ParticleCanvas() {
  // TODO: implement canvas particle animation
})();

/**
 * SparkleTrail
 * Adds a sparkle/glitter trail effect that follows the cursor on hover
 * over designated hero or decorative sections.
 */
(function SparkleTrail() {
  // TODO: implement sparkle trail cursor effect
})();

/**
 * ScrollReveal
 * Uses IntersectionObserver to add `.visible` class to `.reveal` elements
 * as they scroll into the viewport, triggering CSS animations.
 */
(function ScrollReveal() {
  // TODO: implement scroll-reveal with IntersectionObserver
})();

/**
 * Navigation
 * Handles sticky header scroll state, active nav link highlighting,
 * mobile hamburger menu toggle, and smooth scroll to anchor sections.
 */
(function Navigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!header) return;

  // --- Scroll state: add/remove .nav-scrolled ---
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 50) {
          header.classList.add('nav-scrolled');
        } else {
          header.classList.remove('nav-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Active section tracking ---
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Mobile menu helpers ---
  function openMobileNav() {
    document.body.classList.add('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  // Hamburger toggle
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (document.body.classList.contains('nav-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  // Smooth scroll + close mobile nav on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      closeMobileNav();
    });
  });

  // Escape key closes mobile nav
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeMobileNav();
    }
  });
})();

/**
 * PortfolioFilter
 * Filters portfolio grid items by category using data-category attributes.
 * Provides animated transitions when filtering.
 */
(function PortfolioFilter() {
  // TODO: implement portfolio category filtering
})();

/**
 * Lightbox
 * Opens a fullscreen overlay to display portfolio images at full size
 * with prev/next navigation and keyboard controls.
 */
(function Lightbox() {
  // TODO: implement image lightbox
})();

/**
 * ProductTilt
 * Adds a subtle 3D tilt/parallax effect to product cards on mouse hover
 * for an interactive, tactile feel.
 */
(function ProductTilt() {
  // TODO: implement product card tilt effect
})();

/**
 * ContactForm
 * Handles contact form validation, submission (via Formspree or similar),
 * success/error messaging, and input field animations.
 */
(function ContactForm() {
  // TODO: implement contact form handling
})();
