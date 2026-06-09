/* =============================================
   JAYARAM THAPA — Website JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR: scroll shadow + active link highlight ──
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Add scrolled class for shadow
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Highlight active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 80;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  // ── 2. MOBILE NAV TOGGLE ──
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });


  // ── 3. INTERSECTION OBSERVER: scroll-in animations ──
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within cards-grid or similar containers
        const delay = getStaggerDelay(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));

  // Timeline items also need animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineItems.forEach(el => tlObserver.observe(el));

  function getStaggerDelay(el) {
    const siblings = Array.from(el.parentElement.querySelectorAll('[data-animate]'));
    const idx = siblings.indexOf(el);
    return idx * 100;
  }


  // ── 4. TABS (Sector involvements) ──
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Toggle buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${target}`) panel.classList.add('active');
      });
    });
  });


  // ── 5. SMOOTH SCROLL for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── 6. ACTIVE NAV LINK STYLE (CSS injection) ──
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: var(--gold-lt) !important; }`;
  document.head.appendChild(style);


  // ── 7. HERO: subtle parallax on background text ──
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
    }, { passive: true });
  }


  // ── 8. TRAINING ITEMS: staggered reveal ──
  const trainingItems = document.querySelectorAll('.training-item');
  const trainObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        trainObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  trainingItems.forEach(el => trainObserver.observe(el));


  // ── 9. YEAR display in footer ──
  const footerYear = document.querySelector('.footer p');
  if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace(
      /\d{4}/, new Date().getFullYear()
    );
  }

  // ── 10. SCROLL TO TOP BUTTON ──
  const topButton = document.getElementById('topButton');
  if (topButton) {
    window.addEventListener('scroll', () => {
      topButton.classList.toggle('show', window.scrollY > 420);
    }, { passive: true });

    topButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});