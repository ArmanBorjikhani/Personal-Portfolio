/* Polished interactions — overwrite js/scripts.js with this file */

/* Utilities */
const headerWrap = document.querySelector('.header-wrap') || document.querySelector('#site-header');
const headerH = () => headerWrap ? headerWrap.getBoundingClientRect().height : 72;
const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

/* Theme toggle (persists to localStorage) */
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
function setTheme(dark){
  if (dark) root.setAttribute('data-theme','dark');
  else root.removeAttribute('data-theme');
  localStorage.setItem('theme-dark', dark ? '1' : '0');
  themeToggle.textContent = dark ? '☀️' : '🌙';
}
(function initTheme(){
  const saved = localStorage.getItem('theme-dark');
  if (saved === null) {
    // prefer dark by default here; change if you want light default
    setTheme(true);
  } else setTheme(saved === '1');
})();
themeToggle && themeToggle.addEventListener('click', ()=> setTheme(!(localStorage.getItem('theme-dark') === '1')));

/* Mobile menu overlay */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
let mobileMenu = null;

function openMobileMenu(){
  if (mobileMenu) return;
  mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = Array.from(navMenu.children).map(li => li.innerHTML).map(html => `<a href="${html.match(/href="([^"]+)"/)[1]}">${html.replace(/<a[^>]*>|<\/a>/g,'')}</a>`).join('');
  document.body.appendChild(mobileMenu);
  navToggle.setAttribute('aria-expanded','true');

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    closeMobileMenu();
    scrollToSection(id);
  }));

  document.addEventListener('keydown', onEsc);
}

function closeMobileMenu(){
  if (!mobileMenu) return;
  mobileMenu.remove();
  mobileMenu = null;
  navToggle.setAttribute('aria-expanded','false');
  document.removeEventListener('keydown', onEsc);
}

function onEsc(e){ if (e.key === 'Escape') closeMobileMenu(); }
navToggle && navToggle.addEventListener('click', ()=> {
  if (mobileMenu) closeMobileMenu(); else openMobileMenu();
});

/* Smooth scroll with sticky header offset */
function scrollToSection(hash){
  if (!hash) return;
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  const offset = headerH() + 14;
  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* Nav link click handlers (desktop) */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    scrollToSection(href);
    closeMobileMenu();
  });
});

/* Scroll spy using IntersectionObserver */
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
if ('IntersectionObserver' in window && sections.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting && entry.intersectionRatio > 0.45){
        navLinks.forEach(l => l.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }, { threshold: [0.45, 0.7] });
  sections.forEach(s => observer.observe(s));
} else {
  // fallback: set active based on scroll
  window.addEventListener('scroll', () => {
    const offset = headerH() + 20;
    const y = window.scrollY + offset;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    navLinks.forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.nav-link[href="#${current.id}"]`);
    if (link) link.classList.add('active');
  }, { passive: true });
}

/* Simple reveal animation for sections (non-essential) */
if ('IntersectionObserver' in window){
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting){
        en.target.classList.add('reveal');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('section').forEach(s => reveal.observe(s));
}

/* Projects rendering (optional) — replace with your real data if desired */
const projects = [
  { title:'NeuroAI-Toolkit', desc:'Spiking neuron simulations & analysis.', github:'https://github.com/arman/neuroai-toolkit', tag:'NeuroAI' },
  { title:'Fast-Thomas-Solver', desc:'High-performance tridiagonal solver.', github:'https://github.com/arman/fast-thomas-solver', tag:'Numerics' },
  { title:'ImageSeg-MLP', desc:'From-scratch MLP segmentation (learning).', github:'https://github.com/arman/imageseg-mlp', tag:'ML' }
];
const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid){
  projectsGrid.innerHTML = '';
  projects.forEach(p => {
    const a = document.createElement('article');
    a.className = 'card';
    a.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="card-meta">
        <a href="${p.github}" target="_blank" rel="noopener">GitHub</a>
        <span class="tag">${p.tag}</span>
      </div>
    `;
    projectsGrid.appendChild(a);
  });
}

/* Close mobile menu if window gets big */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileMenu();
});
