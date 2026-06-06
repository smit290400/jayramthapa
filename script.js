// --- MOBILE NAVIGATION TOGGLE ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

// Toggle open/closed state of responsive navigation menu 
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Auto collapse mobile layout when any navigation anchor link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
