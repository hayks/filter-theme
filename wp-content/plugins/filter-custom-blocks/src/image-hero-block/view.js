document.addEventListener('DOMContentLoaded', () => {
    const heroBlocks = document.querySelectorAll('.wp-block-block-development-examples-image-hero-block');
    
    heroBlocks.forEach(block => {
        const primaryButton = block.querySelector('.image-hero-block-primary-button');
        const secondaryButton = block.querySelector('.image-hero-block-secondary-button');
        
        // Apply max-width to description elements but with !important to ensure it takes precedence
        const descriptions = block.querySelectorAll('.image-hero-block-description');
        descriptions.forEach(desc => {
            // Force the max-width with !important
            desc.style.setProperty('max-width', '700px', 'important');
            desc.style.setProperty('width', 'auto', 'important');
            desc.style.setProperty('min-width', '0', 'important');
            desc.style.setProperty('font-size', '16px', 'important');
            desc.style.setProperty('line-height', '1.6', 'important');
            desc.style.setProperty('margin-bottom', '20px', 'important');
        });
        
        if (primaryButton) {
            primaryButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Primary button click event
                // You can customize this to navigate to specific pages or trigger other actions
                console.log('Primary button clicked');
                
                // Example: Scroll to a section of the page
                const targetSection = document.querySelector('#featured-products');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // If no target section, just navigate to a URL
                    window.location.href = primaryButton.getAttribute('href') || '#';
                }
            });
        }
        
        if (secondaryButton) {
            secondaryButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Secondary button click event
                // You can customize this to navigate to specific pages or trigger other actions
                console.log('Secondary button clicked');
                
                // Example: Navigate to shop page
                window.location.href = secondaryButton.getAttribute('href') || '/shop';
            });
        }
        
        // Get buttons
        const buttons = block.querySelectorAll('.image-hero-block-button');
        
        // Add hover effects to buttons
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Enhance hover effect
                button.style.transform = 'translateY(-2px)';
                
                // Add appropriate box shadow based on button type
                if (button.classList.contains('image-hero-block-primary-button')) {
                    button.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.08)';
                    button.style.backgroundColor = '#FFFFFF';
                } else if (button.classList.contains('image-hero-block-secondary-button')) {
                    button.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.12)';
                    button.style.backgroundColor = '#3A454A';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                // Remove hover effect
                button.style.transform = '';
                button.style.boxShadow = '';
                
                // Reset background color
                if (button.classList.contains('image-hero-block-primary-button')) {
                    button.style.backgroundColor = '#F2F2F2';
                } else if (button.classList.contains('image-hero-block-secondary-button')) {
                    button.style.backgroundColor = '#4D5A5E';
                }
            });
            
            // Reset any theme styles that might be interfering
            button.style.display = 'inline-flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.textDecoration = 'none';
            
            // Ensure proper button styles are applied
            if (button.classList.contains('image-hero-block-primary-button')) {
                button.style.backgroundColor = '#F2F2F2';
                button.style.color = '#4D5A5E';
            } else if (button.classList.contains('image-hero-block-secondary-button')) {
                button.style.backgroundColor = '#4D5A5E';
                button.style.color = '#FFFFFF';
            }
        });
        
        // Get image for lazy loading
        const image = block.querySelector('.image-hero-block-image');
        if (image && 'loading' in HTMLImageElement.prototype) {
            image.loading = 'lazy';
        }
    });
}); 