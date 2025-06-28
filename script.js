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

document.addEventListener('DOMContentLoaded', function() {
  // Initialize swipe functionality for each portfolio section
  initSwipeSections();
  
  function initSwipeSections() {
    const portfolioSections = document.querySelectorAll('#portfolio h3');
    
    portfolioSections.forEach(section => {
      const sectionType = section.textContent.trim().toLowerCase();
      const originalGrid = section.nextElementSibling;
      
      // Skip if not one of our target sections
      if (!['posters', 'reels', 'stories'].includes(sectionType)) return;
      
      // Create swipe container
      const swipeContainer = document.createElement('div');
      swipeContainer.className = 'portfolio-swipe-container';
      
      // Create track
      const swipeTrack = document.createElement('div');
      swipeTrack.className = 'portfolio-swipe-track';
      
      // Clone items from original grid
      const items = originalGrid.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        const clone = item.cloneNode(true);
        swipeTrack.appendChild(clone);
      });
      
      // Add track to container
      swipeContainer.appendChild(swipeTrack);
      
      // Create dots navigation
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'swipe-dots';
      
      for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'swipe-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
      }
      
      // Add dots to container
      swipeContainer.appendChild(dotsContainer);
      
      // Insert swipe container after the section heading
      section.parentNode.insertBefore(swipeContainer, originalGrid);
      
      // Initialize swipe functionality
      setupSwipe(swipeTrack, dotsContainer);
    });
  }
  
  function setupSwipe(track, dotsContainer) {
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let isDragging = false;
    const dots = dotsContainer.querySelectorAll('.swipe-dot');
    const itemCount = track.children.length;
    
    // Touch events
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);
    
    // Mouse events for testing on desktop
    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mousemove', touchMove);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    
    // Dot click events
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const targetIndex = parseInt(this.dataset.index);
        goToIndex(targetIndex);
      });
    });
    
    function touchStart(e) {
      if (e.type === 'mousedown') {
        startX = e.clientX;
      } else {
        startX = e.touches[0].clientX;
      }
      
      isDragging = true;
      track.style.transition = 'none';
    }
    
    function touchMove(e) {
      if (!isDragging) return;
      
      let currentX;
      if (e.type === 'mousemove') {
        currentX = e.clientX;
      } else {
        currentX = e.touches[0].clientX;
      }
      
      const diff = currentX - startX;
      currentTranslate = prevTranslate + diff;
      
      // Apply the translation
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      
      // Calculate movement direction and distance
      const movedBy = currentTranslate - prevTranslate;
      
      // Only move to next/prev if moved enough (threshold of 50px)
      if (Math.abs(movedBy) > 50) {
        if (movedBy < 0 && currentIndex < itemCount - 1) {
          currentIndex++;
        } else if (movedBy > 0 && currentIndex > 0) {
          currentIndex--;
        }
      }
      
      // Update position
      goToIndex(currentIndex);
    }
    
    function goToIndex(index) {
      currentIndex = index;
      prevTranslate = -(currentIndex * 100);
      track.style.transition = 'transform 0.3s ease-out';
      track.style.transform = `translateX(${prevTranslate}%)`;
      
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      goToIndex(currentIndex);
    });
  }
});