// Modern minimal scripts.js
// Replace your existing js/scripts.js with this file.

/* Helper: get header height (accounts for sticky header) */
const header = document.querySelector('.header-wrap') || document.querySelector('#site-header');
function headerHeight() {
  return header ? header.getBoundingClientRect().height : 0;
}

/* NAV elements */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
let mobileMenuEl = null;

/* Open mobile menu: create accessible overlay menu */
function openMobileMenu() {
  if (mobileMenuEl) return;
  mobileMenuEl = document.createElement('div');
  mobileMenuEl.className = 'mobile-menu';
  // Clone nav items into mobile menu
  mobileMenuEl.innerHTML = Array.from(navMenu.children).map(li => li.outerHTML).join('');
  document.body.appendChild(mobileMenuEl);
  navToggle.setAttribute('aria-expanded', 'true');
  // attach click handlers for mobile links
  mobileMenuEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      closeMobileMenu();
      scrollToSection(id);
    });
  });
  // Escape to close
  document.addEventListener('keydown', escHandler);
}

/* Close mobile menu */
function closeMobileMenu() {
  if (!mobileMenuEl) return;
  mobileMenuEl.remove();
  mobileMenuEl = null;
  navToggle.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', escHandler);
}

/* Toggle mobile menu */
navToggle && navToggle.addEventListener('click', (e) => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  if (expanded) closeMobileMenu();
  else openMobileMenu();
});

/* Close on ESC */
function escHandler(e) {
  if (e.key === 'Escape') closeMobileMenu();
}

/* Smooth scroll with offset for sticky header */
function scrollToSection(hash) {
  if (!hash) return;
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  const offset = headerHeight() + 12; // small breathing room
  const rect = el.getBoundingClientRect();
  const targetY = window.scrollY + rect.top - offset;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}

/* Link click handlers (desktop nav) */
document.querySelectorAll('#nav-menu a').forEach(a => {
  a.addEventListener('click', function (ev) {
    ev.preventDefault();
    const href = this.getAttribute('href');
    // If mobile overlay exists, close it
    closeMobileMenu();
    scrollToSection(href);
  });
});

/* Active link highlighting while scrolling:
   Use IntersectionObserver for robust behavior
*/
const sections = Array.from(document.querySelectorAll('main > section[id]'));
const navLinks = Array.from(document.querySelectorAll('#nav-menu a'));

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`#nav-menu a[href="#${id}"]`);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
        // set active
        navLinks.forEach(l => l.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: [0.45, 0.7]
  });
  sections.forEach(s => observer.observe(s));
} else {
  /* Fallback: highlight based on scroll position */
  window.addEventListener('scroll', () => {
    const offset = headerHeight() + 20;
    const y = window.scrollY + offset;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(`#nav-menu a[href="#${current.id}"]`);
    if (active) active.classList.add('active');
  }, { passive: true });
}

/* Close mobile menu when resizing to large screens */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileMenu();
});

/* Year filler (same as before) */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
