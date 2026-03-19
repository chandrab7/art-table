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
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // Configuration
  var isMobile = window.innerWidth < 768;
  var isSmallMobile = window.innerWidth < 480;
  if (isSmallMobile) return; // disable entirely on small screens

  var heroParticleCount = isMobile ? 15 : 50;
  var bgParticleCount = isMobile ? 8 : 18;
  var colors = ['#d4a853', '#e8b4b8', '#d4a853', '#f5f0eb']; // gold, blush, gold, cream

  var particles = [];
  var burstParticles = [];
  var width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight * 3; // extend below viewport
  }

  // Particle class
  function Particle(zone) {
    this.zone = zone; // 'hero' or 'bg'
    var heroH = window.innerHeight;
    this.x = Math.random() * width;
    this.y = zone === 'hero' ? Math.random() * heroH : heroH + Math.random() * heroH * 2;
    this.size = 2 + Math.random() * 4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.baseOpacity = zone === 'hero' ? 0.3 + Math.random() * 0.5 : 0.1 + Math.random() * 0.2;
    this.opacity = this.baseOpacity;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = 0.01 + Math.random() * 0.02;
    this.isStar = !isMobile && Math.random() < 0.08; // 8% chance of being a star particle
    if (this.isStar) this.size = 6 + Math.random() * 4;
    this.rotation = 0;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  Particle.prototype.update = function () {
    this.x += this.vx + Math.sin(this.twinklePhase * 0.5) * 0.1;
    this.y += this.vy;
    this.twinklePhase += this.twinkleSpeed;
    this.opacity = this.baseOpacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    this.rotation += this.rotationSpeed;

    // Wrap around
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    var maxY = this.zone === 'hero' ? window.innerHeight : window.innerHeight * 3;
    var minY = this.zone === 'hero' ? 0 : window.innerHeight;
    if (this.y < minY - 10) this.y = maxY;
    if (this.y > maxY + 10) this.y = minY;
  };

  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    if (this.isStar) {
      // Draw 4-point star
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -1, this.size, 2);
      ctx.fillRect(-1, -this.size / 2, 2, this.size);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.restore();
  };

  // Burst particle for "Memories!" entrance
  function BurstParticle(x, y) {
    this.x = x;
    this.y = y;
    var angle = Math.random() * Math.PI * 2;
    var speed = 2 + Math.random() * 6;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = 1 + Math.random() * 3;
    this.color = ['#d4a853', '#e8b4b8', '#ffffff', '#f5f0eb'][Math.floor(Math.random() * 4)];
    this.life = 30 + Math.random() * 30;
    this.maxLife = this.life;
  }

  BurstParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96; // decelerate
    this.vy *= 0.96;
    this.life--;
  };

  BurstParticle.prototype.draw = function () {
    var progress = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };

  function sparkBurst(x, y, count) {
    for (var i = 0; i < count; i++) {
      burstParticles.push(new BurstParticle(x, y));
    }
  }

  function init() {
    resize();
    for (var i = 0; i < heroParticleCount; i++) particles.push(new Particle('hero'));
    for (var i = 0; i < bgParticleCount; i++) particles.push(new Particle('bg'));

    // Trigger sparkle burst on "Memories!" text after entrance animation
    if (!prefersReducedMotion) {
      setTimeout(function () {
        var memoriesEl = document.querySelector('.hero-memories');
        if (memoriesEl) {
          var rect = memoriesEl.getBoundingClientRect();
          sparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
        }
      }, 1700); // after the 0.9s delay + 0.8s animation
    }
  }

  var frameCount = 0;
  function animate() {
    frameCount++;
    // Skip every other frame on mobile for performance
    if (isMobile && frameCount % 2 !== 0) {
      requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    if (!prefersReducedMotion) {
      particles.forEach(function (p) { p.update(); p.draw(); });
      burstParticles.forEach(function (p) { p.update(); p.draw(); });
      burstParticles = burstParticles.filter(function (p) { return p.life > 0; });
    } else {
      // Static draw for reduced motion
      particles.forEach(function (p) { p.draw(); });
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
  if (!prefersReducedMotion) {
    animate();
  } else {
    particles.forEach(function (p) { p.draw(); }); // static single draw
  }

  // Expose sparkBurst for other modules
  window.particleSparkBurst = sparkBurst;
})();

/**
 * SparkleTrail
 * Adds a sparkle/glitter trail effect that follows the cursor on hover
 * over designated hero or decorative sections.
 */
(function SparkleTrail() {
  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var POOL_MAX = 30;
  var THROTTLE_MS = 30;
  var COLORS = ['#d4a853', '#e8b4b8', '#ffffff', '#f5f0eb']; // gold, blush, white, cream
  var activeSparkles = [];
  var lastSpawnTime = 0;

  function spawnSparkle(x, y) {
    var count = 1 + Math.floor(Math.random() * 2); // 1-2 sparkles
    for (var i = 0; i < count; i++) {
      // Remove oldest if at pool limit
      if (activeSparkles.length >= POOL_MAX) {
        var oldest = activeSparkles.shift();
        if (oldest && oldest.parentNode) oldest.parentNode.removeChild(oldest);
      }

      var el = document.createElement('div');
      el.className = 'sparkle';
      var size = 2 + Math.random() * 3; // 2-5px
      var offsetX = (Math.random() - 0.5) * 16; // -8 to 8
      var offsetY = (Math.random() - 0.5) * 16;
      var color = COLORS[Math.floor(Math.random() * COLORS.length)];
      var driftX = (Math.random() - 0.5) * 20; // horizontal drift

      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = (x + offsetX) + 'px';
      el.style.top = (y + offsetY) + 'px';
      el.style.background = color;
      el.style.setProperty('--sx', driftX + 'px');

      document.body.appendChild(el);
      activeSparkles.push(el);

      el.addEventListener('animationend', function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        var idx = activeSparkles.indexOf(el);
        if (idx > -1) activeSparkles.splice(idx, 1);
      });
    }
  }

  document.addEventListener('mousemove', function (e) {
    var now = Date.now();
    if (now - lastSpawnTime < THROTTLE_MS) return;
    lastSpawnTime = now;
    spawnSparkle(e.clientX, e.clientY);
  });
})();

/**
 * ScrollReveal
 * Uses IntersectionObserver to add `.visible` class to `.reveal` elements
 * as they scroll into the viewport, triggering CSS animations.
 */
(function ScrollReveal() {
  var selectors = '.reveal, .reveal-left, .reveal-right, .shimmer-divider';
  var elements = document.querySelectorAll(selectors);
  if (!elements.length) return;

  // Respect prefers-reduced-motion: make everything visible immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // one-shot
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
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
  var buttons = document.querySelectorAll('.filter-tabs button');
  var items = document.querySelectorAll('.portfolio-item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      items.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('filtered-out');
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });
})();

/**
 * Lightbox
 * Opens a fullscreen overlay to display portfolio images at full size
 * with prev/next navigation and keyboard controls.
 */
(function Lightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var imageContainer = lightbox.querySelector('.lightbox-image');
  var caption = lightbox.querySelector('.lightbox-caption');

  var currentIndex = 0;
  var triggerElement = null;
  var touchStartX = 0;

  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.portfolio-item:not(.filtered-out)'));
  }

  function showItem(index) {
    var items = getVisibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    var item = items[currentIndex];
    var placeholder = item.querySelector('.placeholder-img');
    var overlay = item.querySelector('.portfolio-overlay');
    var titleEl = overlay ? overlay.querySelector('span') : null;

    imageContainer.innerHTML = '';
    var clone = placeholder.cloneNode(true);
    imageContainer.appendChild(clone);
    caption.textContent = titleEl ? titleEl.textContent : '';
  }

  function openLightbox(item) {
    triggerElement = item;
    var items = getVisibleItems();
    currentIndex = items.indexOf(item);
    showItem(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  }

  // Open on portfolio item click
  document.querySelectorAll('.portfolio-item').forEach(function (item) {
    item.addEventListener('click', function () { openLightbox(item); });
  });

  // Close
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Nav
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showItem(currentIndex - 1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showItem(currentIndex + 1); });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showItem(currentIndex - 1);
    if (e.key === 'ArrowRight') showItem(currentIndex + 1);

    // Focus trap
    if (e.key === 'Tab') {
      var focusable = [closeBtn, prevBtn, nextBtn];
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });

  // Touch swipe
  lightbox.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    var diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showItem(currentIndex - 1);
      else showItem(currentIndex + 1);
    }
  });
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
