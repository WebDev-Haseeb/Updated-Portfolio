/**
 * Portfolio Website Main JavaScript
 * Author: Your Name
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initScrollEvents();
    initMobileMenu();
    initThemeToggle();
    initProjectFilter();
    initTestimonialSlider();
    initContactForm();
    initAnimations();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
        }, 500);
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delay the follower cursor for smooth effect
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .social-link, .dot');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
            cursorFollower.style.borderWidth = '1px';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderWidth = '2px';
        });
    });
}

// Scroll Events
function initScrollEvents() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');
    const skillsSection = document.querySelector('.skills-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        
        // Header effects
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (scrollPos > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Skills animation
        if (skillsSection && isInViewport(skillsSection)) {
            document.querySelectorAll('.skill-progress').forEach(progress => {
                setTimeout(() => {
                    progress.style.width = progress.getAttribute('style').split(':')[1];
                }, 200);
            });
        }
        
        // Active menu based on scroll position
        updateActiveNavOnScroll(scrollPos, sections, navLinks);
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                document.querySelector('.nav-menu').classList.remove('show');
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update active nav on scroll
function updateActiveNavOnScroll(scrollPos, sections, navLinks) {
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('show');
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Also toggle theme based on system preference if no saved preference
    if (!savedTheme) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkMode) {
            body.classList.add('dark-mode');
        }
    }
}

// Project Filter
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const items = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!slider || items.length === 0) return;
    
    let currentIndex = 0;
    
    // Function to move slider
    function moveSlider(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % items.length;
        moveSlider(currentIndex);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        moveSlider(currentIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            moveSlider(i);
        });
    });
    
    // Auto slide (optional)
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        moveSlider(currentIndex);
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            moveSlider(currentIndex);
        }, 5000);
    });
    
    // Touch swipe for mobile
    let startX, endX;
    const threshold = 50; // Minimum swipe distance
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        
        const diff = startX - endX;
        
        if (Math.abs(diff) >= threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                // Swipe right - prev slide
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            
            moveSlider(currentIndex);
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initialize animations
function initAnimations() {
    // Add any additional animation initialization
    // Most animations are handled by CSS and scroll events
    
    // Add animate-skills class initially to prevent animations before scroll trigger
    document.querySelector('.skills-section').classList.add('animate-skills');
}