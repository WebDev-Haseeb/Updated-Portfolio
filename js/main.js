/**
 * Portfolio Website Main JavaScript
 * Author: Haseeb Amjad
 * Version: 2.0
 * Date: March 26, 2025
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();

  // Initialize smooth scrolling for navigation links
  initSmoothScroll();

  // Initialize contact form validation
  initContactForm();

  // Initialize project modals
  initProjectModals();

  // Initialize analytics
  initAnalytics();

  // Initialize external library integrations
  loadExternalLibraries();
});

/**
 * Initialize theme (light/dark mode)
 */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // Check for saved theme preference or use preferred color scheme
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // Apply saved theme
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Toggle dark mode class
      body.classList.toggle('dark-mode');

      // Save preference to localStorage
      const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);

      // Log theme change
      console.log(`Theme switched to ${theme} mode`);
    });
  }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize contact form with validation and submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    // Form submission
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form inputs
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const subjectInput = this.querySelector('input[name="subject"]');
      const messageInput = this.querySelector('textarea[name="message"]');

      // Validate form fields
      if (!validateName(nameInput.value)) {
        showFormError(nameInput, 'Please enter a valid name');
        return;
      } else {
        clearFormError(nameInput);
      }

      if (!validateEmail(emailInput.value)) {
        showFormError(emailInput, 'Please enter a valid email address');
        return;
      } else {
        clearFormError(emailInput);
      }

      if (!validateRequired(subjectInput.value)) {
        showFormError(subjectInput, 'Please enter a subject');
        return;
      } else {
        clearFormError(subjectInput);
      }

      if (!validateMessage(messageInput.value)) {
        showFormError(messageInput, 'Please enter a message (min 10 characters)');
        return;
      } else {
        clearFormError(messageInput);
      }

      // Submit form data (you can replace this with your own form handling code)
      const formData = new FormData(this);
      const formButton = this.querySelector('button[type="submit"]');
      const formStatus = document.createElement('div');
      formStatus.className = 'form-status';

      // Simulate form submission (replace with actual form submission)
      formButton.disabled = true;
      formButton.innerHTML = '<span class="spinner"></span> Sending...';

      setTimeout(() => {
        // Simulate successful submission (replace with actual API call)
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
        contactForm.reset();

        // Reset button
        formButton.disabled = false;
        const newIcon = document.createElement('i');
        newIcon.className = 'fas fa-paper-plane';

        formButton.innerHTML = 'Send Message';
        formButton.appendChild(newIcon);
        

        // Append status message
        const existingStatus = contactForm.querySelector('.form-status');
        if (existingStatus) {
          existingStatus.remove();
        }
        contactForm.appendChild(formStatus);

        // Remove status message after 5 seconds
        setTimeout(() => {
          formStatus.remove();
        }, 5000);
      }, 1500);
    });

    // Real-time validation for inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function () {
        const inputName = this.getAttribute('name');

        switch (inputName) {
          case 'name':
            if (this.value.length > 0 && !validateName(this.value)) {
              showFormError(this, 'Please enter a valid name');
            } else {
              clearFormError(this);
            }
            break;
          case 'email':
            if (this.value.length > 0 && !validateEmail(this.value)) {
              showFormError(this, 'Please enter a valid email address');
            } else {
              clearFormError(this);
            }
            break;
          case 'message':
            if (this.value.length > 0 && !validateMessage(this.value)) {
              showFormError(this, 'Message must be at least 10 characters');
            } else {
              clearFormError(this);
            }
            break;
        }
      });
    });
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate name (at least 2 characters, letters only)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
function validateName(name) {
  return name.trim().length >= 2;
}

/**
 * Validate message length
 * @param {string} message - Message to validate
 * @returns {boolean} - True if valid
 */
function validateMessage(message) {
  return message.trim().length >= 10;
}

/**
 * Check if required field has a value
 * @param {string} value - Value to check
 * @returns {boolean} - True if valid
 */
function validateRequired(value) {
  return value.trim().length > 0;
}

/**
 * Show form error message
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showFormError(input, message) {
  // Clear any existing error
  clearFormError(input);

  // Create and append error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;

  // Insert error after input
  input.parentNode.insertBefore(errorElement, input.nextSibling);
  input.classList.add('error');
}

/**
 * Clear form error message
 * @param {HTMLElement} input - Input element
 */
function clearFormError(input) {
  const errorElement = input.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  input.classList.remove('error');
}

/**
 * Initialize project modals
 */
function initProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modals = document.querySelectorAll('.project-modal');

  if (projectCards.length > 0 && modalOverlay) {
    projectCards.forEach(card => {
      card.addEventListener('click', function () {
        const projectId = this.getAttribute('data-project-id');
        const modal = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);

        if (modal) {
          // Show modal and overlay
          modal.classList.add('active');
          modalOverlay.classList.add('active');

          // Disable scrolling on body
          document.body.classList.add('no-scroll');
        }
      });
    });

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function () {
      closeAllModals();
    });

    // Close modal when clicking close button
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        closeAllModals();
      });
    });

    // Close modal with escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }
}

/**
 * Close all open modals
 */
function closeAllModals() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modals = document.querySelectorAll('.project-modal.active');

  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }

  modals.forEach(modal => {
    modal.classList.remove('active');
  });

  // Re-enable scrolling on body
  document.body.classList.remove('no-scroll');
}

/**
 * Initialize analytics
 */
function initAnalytics() {
  // Only initialize in production mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Analytics disabled in development environment');
    return;
  }

  // Track page views
  logPageView();

  // Track outbound link clicks
  trackOutboundLinks();

  // Track scroll depth
  trackScrollDepth();
}

/**
 * Log page view for analytics
 */
function logPageView() {
  // Check if Google Analytics is available
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
}

/**
 * Track outbound links
 */
function trackOutboundLinks() {
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const currentHost = window.location.hostname;

      // Check if link is external
      if (href.indexOf(currentHost) === -1) {
        // Track outbound link click if Google Analytics is available
        if (typeof gtag === 'function') {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: href
          });
        }
      }
    });
  });
}

/**
 * Track scroll depth
 */
function trackScrollDepth() {
  let scrollDepthTriggered = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
  };

  window.addEventListener('scroll', function () {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

    if (scrollPercent >= 25 && !scrollDepthTriggered['25']) {
      triggerScrollEvent('25%');
      scrollDepthTriggered['25'] = true;
    }

    if (scrollPercent >= 50 && !scrollDepthTriggered['50']) {
      triggerScrollEvent('50%');
      scrollDepthTriggered['50'] = true;
    }

    if (scrollPercent >= 75 && !scrollDepthTriggered['75']) {
      triggerScrollEvent('75%');
      scrollDepthTriggered['75'] = true;
    }

    if (scrollPercent >= 90 && !scrollDepthTriggered['100']) {
      triggerScrollEvent('100%');
      scrollDepthTriggered['100'] = true;
    }
  });
}

/**
 * Trigger scroll depth analytics event
 * @param {string} depth - Scroll depth percentage
 */
function triggerScrollEvent(depth) {
  if (typeof gtag === 'function') {
    gtag('event', 'scroll_depth', {
      event_category: 'scroll',
      event_label: depth
    });
  }
}

/**
 * Load external libraries as needed
 */
function loadExternalLibraries() {
  // Function to load external script
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback || function () { };
    document.head.appendChild(script);
  }

  // Check if required libraries are already loaded (may be included in HTML)
  if (typeof ScrollReveal === 'undefined') {
    loadScript('https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js');
  }

  if (typeof Typed === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.0.12/lib/typed.min.js');
  }

  if (typeof VanillaTilt === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js');
  }

  if (typeof particlesJS === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js');
  }
}