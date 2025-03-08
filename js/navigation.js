/**
 * Mobile Navigation Toggle
 * Handles mobile menu functionality for the Swing Trading Guide website
 */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      // Toggle mobile menu when the hamburger button is clicked
      mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Add animation to the hamburger icon
        const bars = this.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
        
        // Accessibility
        const expanded = navLinks.classList.contains('active');
        this.setAttribute('aria-expanded', expanded);
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('menu-open', expanded);
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || mobileMenuToggle.contains(event.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Reset hamburger icon
          const bars = mobileMenuToggle.querySelectorAll('.bar');
          bars.forEach(bar => bar.classList.remove('active'));
          
          // Reset accessibility attribute
          mobileMenuToggle.setAttribute('aria-expanded', false);
          
          // Re-enable scrolling
          document.body.classList.remove('menu-open');
        }
      });
      
      // Close mobile menu when window is resized above mobile breakpoint
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Reset hamburger icon
          const bars = mobileMenuToggle.querySelectorAll('.bar');
          bars.forEach(bar => bar.classList.remove('active'));
          
          // Reset accessibility attribute
          mobileMenuToggle.setAttribute('aria-expanded', false);
          
          // Re-enable scrolling
          document.body.classList.remove('menu-open');
        }
      });
      
      // Add active state to current page in navigation
      const currentPage = window.location.pathname.split('/').pop();
      const navItems = navLinks.querySelectorAll('a');
      
      navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          item.classList.add('active');
        }
      });
    }
    
    // Add CSS for active hamburger icon if not in the main stylesheet
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu-toggle .bar.active:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      .mobile-menu-toggle .bar.active:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle .bar.active:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
      
      body.menu-open {
        overflow: hidden;
      }
      
      .nav-links a.active {
        color: var(--color-primary);
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
            mobileMenuToggle.setAttribute('aria-expanded', false);
            document.body.classList.remove('menu-open');
          }
          
          // Scroll to the target element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  });