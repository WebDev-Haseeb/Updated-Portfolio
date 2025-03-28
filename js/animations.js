// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations when page loads
  initAnimations();
  
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize scroll reveal animations
  initScrollReveal();
});

/**
 * Initialize all basic animations
 */
function initAnimations() {
  // Add active class to preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      // Enable scrolling once loaded
      document.body.style.overflow = 'auto';
      
      // Ensure hero section is fully visible
      const heroElements = document.querySelectorAll('#home .headline, #home .subheading, #home .hero-cta, #home .hero-image');
      heroElements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 1000);
  }
  
  // Initialize back to top button
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add scroll class to header on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    // Create menu overlay to close when clicking outside
    let menuOverlay = document.querySelector('.menu-overlay');
    
    if (!menuOverlay) {
      menuOverlay = document.createElement('div');
      menuOverlay.className = 'menu-overlay';
      document.body.appendChild(menuOverlay);
    }
    
    // Toggle menu open/close
    mobileMenuToggle.addEventListener('click', () => {
      toggleMobileMenu();
    });
    
    // Close mobile menu when clicking on the overlay
    menuOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
    
    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        closeMobileMenu();
      }
    });
    
    // Helper function to toggle menu
    function toggleMobileMenu() {
      const isOpen = navMenu.classList.contains('show');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
    
    // Helper function to open menu
    function openMobileMenu() {
      mobileMenuToggle.classList.add('active');
      navMenu.classList.add('show');
      menuOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }
    
    // Helper function to close menu
    function closeMobileMenu() {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('show');
      menuOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.add('active');
        } else {
          document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.remove('active');
        }
      });
    });
  }
  
  // Animate skill bars when in viewport
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = skillsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;
      
      if (sectionPos < screenPos) {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const percentage = bar.getAttribute('data-progress');
          bar.style.width = percentage;
        });
      }
    });
  }
}

/**
 * Initialize custom cursor
 */
function initCustomCursor() {
  // Only initialize custom cursor on screens larger than 992px
  if (window.innerWidth <= 992) {
    // Make sure the default cursor is shown on smaller screens
    document.body.style.cursor = 'auto';
    return;
  }
  
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Add delay to follower for smooth effect
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 50);
    });
    
    // Add hover effect to cursor when hovering over links and buttons
    const links = document.querySelectorAll('a, button, .tech-badge, .filter-btn');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.opacity = '0.5';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '0.7';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
      });
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseout', (e) => {
      if (e.relatedTarget === null) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseover', () => {
      cursor.style.opacity = '0.7';
      cursorFollower.style.opacity = '0.3';
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
  }
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
  // Check if ScrollReveal is available
  if (typeof ScrollReveal === 'undefined') {
    console.warn('ScrollReveal library is not loaded');
    return;
  }
  
  // Check if mobile device for different settings
  const isMobile = window.innerWidth <= 768;
  
  // Configure ScrollReveal - Skip hero section
  const sr = ScrollReveal({
    distance: isMobile ? '30px' : '60px',
    duration: isMobile ? 800 : 1200,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    reset: false,
    mobile: true
  });
  
  // Make hero section immediately visible without animations
  document.querySelectorAll('#home .headline, #home .subheading, #home .hero-cta, #home .hero-image').forEach(el => {
    if (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.animation = 'none';
    }
  });
  
  // Only reveal sections after the hero
  sr.reveal('.section-header', { 
    origin: 'top',
    delay: 100
  });
  
  sr.reveal('.about-text', { 
    origin: 'left',
    delay: 200
  });
  
  // Rest of your reveal statements remain unchanged
  sr.reveal('.about-image', { 
    origin: 'right',
    delay: 300
  });
  
  sr.reveal('.skill-item', { 
    origin: 'bottom',
    interval: 100
  });
  
  sr.reveal('.project-card', { 
    origin: 'bottom',
    interval: 150
  });
  
  sr.reveal('.certification-item', { 
    origin: 'bottom',
    interval: 150
  });
  
  sr.reveal('.contact-card', { 
    origin: 'left',
    interval: 150
  });
  
  sr.reveal('.contact-form-container', { 
    origin: 'right',
    delay: 300
  });
}