/**
 * Technical Indicators JavaScript Functionality
 * 
 * File locations:
 * - /js/indicators.js
 * - Linked from /technical/indicators.html
 */

document.addEventListener('DOMContentLoaded', function() {
    // Table of Contents functionality
    initTableOfContents();
    
    // Handle missing images
    handleMissingImages();
});

/**
 * Initializes the Table of Contents highlighting and smooth scrolling
 */
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    const sections = document.querySelectorAll('.indicator-category, .indicator, .next-steps');
    
    // Function to update active TOC link based on scroll position
    function updateActiveTocLink() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        // Find the current section
        let currentSection = '';
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && 
                section.offsetTop + section.offsetHeight > scrollPosition) {
                currentSection = section.id;
            }
        });
        
        // Update TOC links
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call and event listener
    updateActiveTocLink();
    window.addEventListener('scroll', updateActiveTocLink);
    
    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Creates placeholders for missing images
 */
function handleMissingImages() {
    const charts = document.querySelectorAll('.indicator-chart, .combo-chart-img');
    charts.forEach(chart => {
        chart.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'chart-placeholder';
            placeholder.innerHTML = `
                <div style="height: 250px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; color: #6c757d; border: 1px dashed #dee2e6; font-size: 14px; text-align: center; padding: 1rem;">
                    Chart illustration will be available soon.<br>
                    This visual will demonstrate the ${this.alt.toLowerCase()}.
                </div>
            `;
            this.parentNode.appendChild(placeholder);
        });
    });
}

/**
 * Interactive indicator comparison feature (placeholder for future implementation)
 */
function initIndicatorComparison() {
    // This will be implemented in a future phase
    // The comparison tool would allow users to select different indicators
    // and see how they would have performed on the same chart
}

/**
 * Interactive indicator parameter tester (placeholder for future implementation)
 */
function initIndicatorTester() {
    // This will be implemented in a future phase
    // The tool would allow users to adjust indicator parameters
    // (like periods for moving averages) and see the results
}