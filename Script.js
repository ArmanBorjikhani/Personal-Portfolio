const headerWrap=document.querySelector('.header-wrap');
const headerH=()=>headerWrap.getBoundingClientRect().height;
document.getElementById('year').textContent=new Date().getFullYear();

/* Mobile menu toggle */
const navToggle=document.getElementById('nav-toggle'),navMenu=document.getElementById('nav-menu');
let mobileMenu=null;
function openMobileMenu(){if(mobileMenu)return;
  mobileMenu=document.createElement('div');mobileMenu.className='mobile-menu';
  mobileMenu.innerHTML=Array.from(navMenu.children).map(li=>li.innerHTML).map(html=>`<a href="${html.match(/href="([^"]+)"/)[1]}">${html.replace(/<a[^>]*>|<\/a>/g,'')}</a>`).join('');
  document.body.appendChild(mobileMenu);navToggle.setAttribute('aria-expanded','true');
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();scrollToSection(a.getAttribute('href'));closeMobileMenu()}));
  document.addEventListener('keydown',onEsc);
}
function closeMobileMenu(){if(!mobileMenu)return;mobileMenu.remove();mobileMenu=null;navToggle.setAttribute('aria-expanded','false');document.removeEventListener('keydown',onEsc);}
function onEsc(e){if(e.key==='Escape')closeMobileMenu()}
navToggle.addEventListener('click',()=>mobileMenu?closeMobileMenu():openMobileMenu());

/* Smooth scroll */
function scrollToSection(hash){const el=document.getElementById(hash.replace('#',''));if(!el)return;
  const top=window.scrollY+el.getBoundingClientRect().top-headerH()-14;
  window.scrollTo({top,behavior:'smooth'});
}
document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();scrollToSection(link.getAttribute('href'));closeMobileMenu();}));

/* Scroll spy */
const sections=Array.from(document.querySelectorAll('main section[id]')),navLinks=Array.from(document.querySelectorAll('.nav-link'));
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{const link=document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
if(entry.isIntersecting && entry.intersectionRatio>0.4){navLinks.forEach(l=>l.classList.remove('active'));link&&link.classList.add('active');}})}, {threshold:[0.4,0.7]});
sections.forEach(s=>observer.observe(s));
}else{window.addEventListener('scroll',()=>{const offset=headerH()+20;let current=sections[0];sections.forEach(s=>{if(s.offsetTop<=window.scrollY+offset)current=s});navLinks.forEach(l=>l.classList.remove('active'));document.querySelector(`.nav-link[href="#${current.id}"]`)?.classList.add('active');},{passive:true});}

/* Render project cards */
const projectsGrid=document.getElementById('projects-grid');
const projects=[{title:'NeuroAI-Toolkit',desc:'Spiking neuron simulations & analysis.',github:'https://github.com/arman/neuroai-toolkit',tag:'NeuroAI'},{title:'Fast-Thomas-Solver',desc:'High-performance tridiagonal solver.',github:'https://github.com/arman/fast-thomas-solver',tag:'Numerics'},{title:'ImageSeg-MLP',desc:'From-scratch MLP segmentation.',github:'https://github.com/arman/imageseg-mlp',tag:'ML'}];
projectsGrid.innerHTML='';projects.forEach(p=>{const a=document.createElement('article');a.className='card';
a.innerHTML=`<h3>${p.title}</h3><p>${p.desc}</p><div class="card-meta"><a href="${p.github}" target="_blank">GitHub</a><span class="tag">${p.tag}</span></div>`;projectsGrid.appendChild(a);});
