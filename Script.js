const toggleButton = document.querySelector('.toggle-button');
const navLinks = document.querySelector('header nav');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
