/**
 * Portfolio Website Animations
 * Author: Haseeb Amjad
 * Version: 2.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations when page loads
  initAnimations();
  
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize scroll reveal animations
  initScrollReveal();
  
  // Initialize typing effect
  initTypingEffect();
  
  // Initialize tilt effect
  initTiltEffect();
  
  // Initialize particle background if on hero section
  initParticleBackground();
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
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('show');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
      });
    });
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
  
  // Initialize project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 200);
          } else if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 200);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
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
  
  // Configure ScrollReveal
  const sr = ScrollReveal({
    distance: '60px',
    duration: 1200,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    reset: false
  });
  
  // Reveal animations for different elements
  sr.reveal('.section-header', { 
    origin: 'top',
    delay: 100
  });
  
  sr.reveal('.about-text', { 
    origin: 'left',
    delay: 200
  });
  
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

/**
 * Initialize typing effect
 */
function initTypingEffect() {
  // Check if Typed.js is available
  if (typeof Typed === 'undefined') {
    console.warn('Typed.js library is not loaded');
    return;
  }
  
  // Initialize typing effect
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    new Typed(typingElement, {
      strings: [
        'Frontend Developer',
        'Backend Engineer',
        'UI/UX Designer',
        'Full Stack Developer'
      ],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 1000,
      loop: true
    });
  }
}

/**
 * Initialize tilt effect
 */
function initTiltEffect() {
  // Check if Vanilla Tilt is available
  if (typeof VanillaTilt === 'undefined') {
    console.warn('VanillaTilt library is not loaded');
    return;
  }
  
  // Initialize tilt effect for project cards
  const tiltElements = document.querySelectorAll('.project-card, .certification-item, .contact-card');
  if (tiltElements.length > 0) {
    VanillaTilt.init(tiltElements, {
      max: 5,
      speed: 300,
      glare: true,
      'max-glare': 0.1,
      reverse: true,
      scale: 1.03
    });
  }
}

/**
 * Initialize particle background
 */
function initParticleBackground() {
  // Check if particles.js is available
  if (typeof particlesJS === 'undefined') {
    console.warn('particles.js library is not loaded');
    return;
  }
  
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#4f46e5"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#4f46e5",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
}