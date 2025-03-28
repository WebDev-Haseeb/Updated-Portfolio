// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();

  // Initialize smooth scrolling for navigation links
  initSmoothScroll();

  // Initialize contact form validation
  initContactForm();
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
        const headerOffset = 50;
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

      // Prepare form data for EmailJS - ensure template parameters match exactly
      const templateParams = {
        from_name: nameInput.value,
        reply_to: emailInput.value, 
        subject: subjectInput.value,
        message: messageInput.value,
        // Also include the parameters with names matching your template variables
        name: nameInput.value,
        email: emailInput.value
      };

      const formButton = this.querySelector('button[type="submit"]');
      const formStatus = document.createElement('div');
      formStatus.className = 'form-status';

      // Disable button and show loading state
      formButton.disabled = true;
      formButton.innerHTML = '<span class="spinner"></span> Sending...';

      // Send email using EmailJS with correct service and template IDs
      emailjs.send('service_fkdnb1d', 'template_as7niws', templateParams)
        .then(
          function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
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
          },
          function(error) {
            console.log('FAILED...', error);
            
            // Show more detailed error message
            formStatus.className = 'form-status error';
            formStatus.textContent = `Failed to send message: ${error.text || 'Please try again later'}`;
            
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
          }
        );
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