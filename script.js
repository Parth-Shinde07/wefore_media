document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Elements
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a"); // Changed to target links inside nav-links


  // Close menu when clicking on a nav link
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
  }

  // Header scroll effect
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const icon = toggleButton.querySelector('i');

  // Function to toggle menu
  function toggleMenu() {
    navbar.classList.toggle('active');
    if (navbar.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  }

  // Toggle menu on button click
  toggleButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !toggleButton.contains(e.target)) {
      if (navbar.classList.contains('active')) {
        toggleMenu();
      }
    }
  });

  // Close menu on resize if screen gets larger
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navbar.classList.contains('active')) {
      toggleMenu();
    }
  });
});