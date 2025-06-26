  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

document.querySelectorAll('.nav-links li').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

        // Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Toggle mobile menu
        menuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          navbar.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
          });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          });
        });
        
        // Scroll to top button
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
          } else {
            scrollToTopBtn.classList.remove('show');
          }
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', function() {
          if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        });
      });