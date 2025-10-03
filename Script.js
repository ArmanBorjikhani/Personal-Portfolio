// basic script
document.getElementById('year').textContent = new Date().getFullYear();

// basic utilities
document.getElementById('year').textContent = new Date().getFullYear();


// navbar toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', ()=>{
const expanded = navToggle.getAttribute('aria-expanded') === 'true';
navToggle.setAttribute('aria-expanded', String(!expanded));
navMenu.classList.toggle('show');
});


// close menu when a link is clicked (mobile)
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
if(navMenu.classList.contains('show')){
navMenu.classList.remove('show');
navToggle.setAttribute('aria-expanded','false');
}
}));