/**
 * Frontend JavaScript for Collection Hero Block
 */
document.addEventListener('DOMContentLoaded', () => {
    // Find all collection hero blocks with the correct class name
    const heroBlocks = document.querySelectorAll('.wp-block-block-development-examples-collection-hero-block');
    
    if (heroBlocks.length === 0) {
        console.log('No collection hero blocks found on page');
        return;
    }
    
    heroBlocks.forEach(block => {
        // Add hover effects to buttons
        const buttons = block.querySelectorAll('.primary-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
                button.style.boxShadow = '';
            });
        });
        
        // Optional: Add lazy loading to images
        const images = block.querySelectorAll('img');
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
        
        // Optional: Add image hover effects
        const smallImages = block.querySelectorAll('.small-image-wrapper img');
        smallImages.forEach(img => {
            const parent = img.parentElement;
            
            parent.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            parent.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });
        });
        
        // Force opacity to 1 to ensure content visibility
        const contentElements = block.querySelectorAll('.collection-label, .collection-title, .collection-description, .button-container');
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Optional: Add animations on scroll
        if (window.IntersectionObserver) {
            const handleIntersection = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Setup the intersection observer
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                threshold: 0.1
            });
            
            // Add fade-in animations to elements
            contentElements.forEach(el => {
                observer.observe(el);
            });
        }
    });
}); 