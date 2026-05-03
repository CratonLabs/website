/**
 * Craton Labs Landing Page Scripts
 * Minimal, accessible, and performant
 */

(function() {
  'use strict';

  // DOM Elements
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const nav = document.getElementById('nav');

  /**
   * Mobile Navigation Toggle
   */
  function initMobileNav() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }

  /**
   * Contact Form Handling
   */
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Basic validation
      if (!data.name || !data.email || !data.company) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate form submission
      // In production, this would send data to a backend
      console.log('Demo request submitted:', data);

      // Show success message
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('active');
      }

      // Optional: Reset form after delay
      setTimeout(function() {
        contactForm.reset();
      }, 100);
    });
  }

  /**
   * Navigation Scroll Effect
   * Add shadow to nav when scrolling
   */
  function initScrollEffect() {
    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add/remove shadow based on scroll position
      if (currentScroll > scrollThreshold) {
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /**
   * Smooth Scroll for Anchor Links
   * Ensure smooth scrolling works across all browsers
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Intersection Observer for Animations
   * Add animation classes when elements come into view
   */
  function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections for fade-in effect
    document.querySelectorAll('section').forEach(function(section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    // Add CSS for in-view state
    const style = document.createElement('style');
    style.textContent = `
      section.in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize All Components
   */
  function init() {
    initMobileNav();
    initContactForm();
    initScrollEffect();
    initSmoothScroll();
    initScrollAnimations();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();