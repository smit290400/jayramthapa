/* ============================================================
   Jayaram Thapa — Executive Portfolio
   main.js
   ============================================================ */

/* ── 1. AOS — Animate On Scroll ── */
AOS.init({
  duration : 800,
  easing   : 'ease-out-cubic',
  once     : true,
  offset   : 60,
});

/* ── 2. Navbar shrink on scroll ── */
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── 3. Hamburger / mobile menu ── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

/* Close on outside click */
document.addEventListener('click', (e) => {
  if (!mainNav.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobile();
  }
});

/* ── 4. Mobile menu links close the menu ── */
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobile);
});

/* ── 5. Keyboard accessibility for gallery items ── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const overlay = item.querySelector('.gallery-overlay');
      if (overlay) overlay.style.opacity = '1';
    }
  });

  item.addEventListener('blur', () => {
    const overlay = item.querySelector('.gallery-overlay');
    if (overlay) overlay.style.opacity = '';
  });
});

/* ── 6. Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.style.color = isActive ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
