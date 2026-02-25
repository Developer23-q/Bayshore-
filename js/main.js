/* js/main.js */

(function() {
  'use strict';

  // ===== HEADER & NAVIGATION =====
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    if (!hamburger || !nav) return;
    
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    if (!hamburger || !nav) return;
    
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function handleEscape(e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
      closeMenu();
    }
  }

  function handleClickOutside(e) {
    if (!nav || !hamburger) return;
    
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  }

  // ===== PRODUCT GALLERY (Only runs on product.html) =====
  function initProductGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Only run if we're on a product page with gallery elements
    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Get the source from the clicked thumbnail's image
        const newSrc = this.querySelector('img').src;
        
        // Smooth fade transition
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 150);
      });
    });
  }

  // ===== INITIALIZE ALL =====
  function init() {
    // Header scroll effects
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mobile menu
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }
    
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    
    // Product gallery (only activates on product.html)
    initProductGallery();
    
    // Initial scroll check
    handleScroll();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();