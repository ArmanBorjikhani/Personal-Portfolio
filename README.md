# Personal-Portfolio

Overview

This repository contains a responsive portfolio website built with HTML, CSS, and JavaScript. The project demonstrates proficiency in front-end fundamentals without relying on frameworks. It highlights clean code structure, responsive UI design, and lightweight interactivity.

Code Structure
1. HTML (index.html)

Sections:

Header & Navbar: Fixed navigation with smooth scrolling.

Home: Introduction block with name, role, and affiliation.

About: Bio + CV download button.

Experience: Skill list with progress indicators.

Projects: Card-based layout linking to repositories.

Contact: Links to GitHub, LinkedIn, email.

Footer: Closing notes.

Uses descriptive classes and IDs for easier styling and script targeting.

1. CSS (style.css)

Defines the visual identity and responsiveness.

Layout: Implemented with flexbox and grid for adaptable structure.

Navigation: Sticky navbar with state changes on scroll.

Typography: Google Fonts (Poppins, Ubuntu) for professional readability.

Responsive Design:

Media queries ensure optimized display for desktop, tablet, and mobile.

Hamburger menu toggles at smaller breakpoints.

Components:

Buttons: Gradient with hover transitions.

Scroll-to-top button: Fixed with fade-in/out.

Skill boxes: Visual representation of proficiencies using bars.

Project cards: Hover animation with box-shadow.

3. JavaScript (script.js)

Adds lightweight interactivity and state management.

Sticky Header: Adds/removes sticky class on scroll >20px.

Scroll-to-top Button:

Appears after user scrolls down.

Smooth scrolls user to top on click.

Mobile Navigation:

Hamburger → opens side nav (adds .active to menu).

Cancel button or nav-link click → closes menu.

Body scroll locked while menu is active.

Uses event listeners (window.onscroll, onclick) for state toggling.

Minimal DOM manipulation for performance.

Key Technical Choices

Vanilla Stack: Showcases raw front-end fundamentals without abstractions.

Clean Separation: Content (HTML), styling (CSS), and behavior (JS) are modular.

Accessibility:

Large clickable areas, hover/focus effects.

Smooth transitions and consistent UI feedback.