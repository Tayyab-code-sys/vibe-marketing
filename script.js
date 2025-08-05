// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenuToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Handling - Emergency Form
    const emergencyForm = document.querySelector('.emergency-form');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Emergency service request submitted! We will contact you immediately.');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Form Handling - Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                    
                    // Remove error styling after user starts typing
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your inquiry! We will contact you within 24 hours.');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Phone Number Formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = `(${value}`;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = formattedValue;
        });
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .testimonial, .stat');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Counter Animation for Statistics
    const stats = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 2000 ? '+' : target === 100 ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 2000 ? '+' : target === 100 ? '%' : '');
            }
        }, 16);
    }
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;
                
                if (text.includes('2000+')) {
                    animateCounter(statElement, 2000);
                } else if (text.includes('24/7')) {
                    statElement.textContent = '24/7';
                } else if (text.includes('100%')) {
                    animateCounter(statElement, 100);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Emergency Service Popup (can be triggered from various buttons)
    function showEmergencyPopup() {
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.innerHTML = `
            <div class="emergency-popup-content">
                <div class="emergency-popup-header">
                    <h3><i class="fas fa-exclamation-triangle"></i> Emergency Service</h3>
                    <button class="close-popup"><i class="fas fa-times"></i></button>
                </div>
                <div class="emergency-popup-body">
                    <p>For immediate emergency assistance, call us now:</p>
                    <a href="tel:888-343-7351" class="emergency-phone-btn">
                        <i class="fas fa-phone"></i> (888) DIESEL-1
                    </a>
                    <p class="emergency-note">Available 24/7 • Average response time: 45 minutes</p>
                </div>
            </div>
        `;
        
        // Add popup styles
        const style = document.createElement('style');
        style.textContent = `
            .emergency-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .emergency-popup-content {
                background: white;
                border-radius: 12px;
                max-width: 400px;
                width: 90%;
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }
            
            .emergency-popup-header {
                background: var(--primary-color);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close-popup {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
            }
            
            .emergency-popup-body {
                padding: 2rem;
                text-align: center;
            }
            
            .emergency-phone-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 1.25rem;
                margin: 1rem 0;
                transition: all 0.3s ease;
            }
            
            .emergency-phone-btn:hover {
                background: #991b1b;
                transform: scale(1.05);
            }
            
            .emergency-note {
                color: var(--text-light);
                font-size: 0.875rem;
                margin: 0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(popup);
        
        // Close popup functionality
        const closeBtn = popup.querySelector('.close-popup');
        closeBtn.addEventListener('click', () => {
            popup.remove();
            style.remove();
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
                style.remove();
            }
        });
    }
    
    // Add emergency popup to emergency buttons
    const emergencyButtons = document.querySelectorAll('.emergency-btn, [href="#emergency"]');
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showEmergencyPopup();
        });
    });
    
    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Testimonial Carousel (if more testimonials are added)
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 3) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i >= index && i < index + 3 ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % (testimonials.length - 2);
            showTestimonial(currentTestimonial);
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
        showTestimonial(0);
    }
    
    // Video Background Fallback
    const heroVideo = document.querySelector('.hero-background video');
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            // If video fails to load, show a background image instead
            const heroBackground = document.querySelector('.hero-background');
            heroBackground.style.backgroundImage = 'url("diesel-truck-bg.jpg")';
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
            heroVideo.style.display = 'none';
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading spinners or overlays
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });
    
    // Console welcome message for developers
    console.log(`
    🚛 Welcome to Call Diesel Dudes Website
    
    Professional Mobile Diesel Repair Services
    Built with modern web technologies
    
    For emergency service: (888) DIESEL-1
    Available 24/7
    `);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu and popups
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
            
            const popup = document.querySelector('.emergency-popup');
            if (popup) {
                popup.remove();
            }
        }
        
        // Enter key on emergency buttons
        if (e.key === 'Enter' && e.target.classList.contains('emergency-btn')) {
            e.preventDefault();
            showEmergencyPopup();
        }
    });
    
    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusable = element.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trapping to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => trapFocus(form));
    
});

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}