/**
 * Portfolio Website Animations
 * Author: Your Name
 * Version: 1.0
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollReveal();
    initParallaxEffects();
    initHoverAnimations();
    initTypewriterEffect();
    initCounterAnimations();
});

// Scroll Reveal Animations
function initScrollReveal() {
    // Select all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll(
        '.about-content, .project-card, .skills-category, ' +
        '.certification-item, .contact-card, .testimonial-content'
    );
    
    // Observer options
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate-in');
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Start observing each element
    animatedElements.forEach(element => {
        // Add initial styles (invisible and translated)
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        // Define the animation through CSS class
        const style = document.createElement('style');
        style.innerHTML = `
            .animate-in {
                animation: fadeInUp 0.8s ease forwards;
            }
        `;
        document.head.appendChild(style);
        
        // Start observing
        observer.observe(element);
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Apply parallax effect to hero section background shapes
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            // Each shape moves at a different rate for dynamic effect
            const shiftX = (mouseX - 0.5) * (index + 1) * 15;
            const shiftY = (mouseY - 0.5) * (index + 1) * 15;
            
            // Apply the transformation
            shape.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });
    });
    
    // Scroll parallax for other elements
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Hero section parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            
            // Opposite direction for background elements
            const heroBackground = heroSection.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${-scrollPosition * 0.05}px)`;
            }
        }
    });
}

// Hover Animations
function initHoverAnimations() {
    // Project card hover effects - already handled in CSS, here we add extra effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle shadow pulse animation
            this.style.animation = 'shadowPulse 2s infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove animation
            this.style.animation = 'none';
        });
    });
    
    // Define the shadow pulse animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shadowPulse {
            0% {
                box-shadow: var(--shadow-md);
            }
            50% {
                box-shadow: var(--shadow-xl);
            }
            100% {
                box-shadow: var(--shadow-md);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add subtle scale animation
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            // Remove transform
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Typewriter Effect
function initTypewriterEffect() {
    const headlineElement = document.querySelector('.headline');
    
    if (!headlineElement) return;
    
    // Save original text and clear the element
    const originalText = headlineElement.innerText;
    const gradientSpan = headlineElement.querySelector('.gradient-text');
    
    if (gradientSpan) {
        // If there's a gradient text span, handle it specially
        const regularText = originalText.replace(gradientSpan.innerText, '');
        const gradientText = gradientSpan.innerText;
        
        // Clear element
        headlineElement.innerHTML = '';
        
        // Type regular text first
        typeWriter(headlineElement, regularText, 0, 50, () => {
            // Then add gradient text with its span
            const span = document.createElement('span');
            span.className = 'gradient-text';
            headlineElement.appendChild(span);
            
            // Type gradient text inside the span
            typeWriter(span, gradientText, 0, 50);
        });
    } else {
        // For regular text, just type it out
        headlineElement.innerText = '';
        typeWriter(headlineElement, originalText, 0, 50);
    }
}

// Helper function for typewriter effect
function typeWriter(element, text, index, speed, callback) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index, speed, callback), speed);
    } else if (callback) {
        callback();
    }
}

// Counter Animations
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Create observer to trigger when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the target number from the text
                const targetNumber = parseInt(entry.target.innerText.replace(/\D/g, ''));
                
                // Animate the counter
                animateCounter(entry.target, 0, targetNumber, 2000);
                
                // Unobserve once animation starts
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat numbers
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Helper function for counter animation
function animateCounter(element, start, end, duration) {
    // Save the original format (e.g., "5+" for years of experience)
    const format = element.innerText.replace(/[0-9]/g, '');
    
    // Calculate step
    const step = Math.ceil((end - start) / (duration / 16));
    
    let current = start;
    const timer = setInterval(() => {
        current += step;
        
        if (current >= end) {
            element.innerText = end + format;
            clearInterval(timer);
        } else {
            element.innerText = current + format;
        }
    }, 16);
}