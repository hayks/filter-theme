/**
 * Frontend JavaScript for Card Grid Block
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all instances of the card grid block
    const cardGridBlocks = document.querySelectorAll('.wp-block-block-development-examples-card-grid-block');
    
    cardGridBlocks.forEach(block => {
        const isMobile = window.matchMedia('(max-width: 480px)').matches;
        
        // Fix any potential theme interference
        if (isMobile) {
            // Apply to main block container
            block.style.paddingLeft = '16px';
            block.style.paddingRight = '16px';
            block.style.marginLeft = '0';
            block.style.marginRight = '0';
            block.style.width = '100%';
            block.style.boxSizing = 'border-box';
            
            // Apply mobile-specific styles
            ensureMobileStyles(block);
        }
        
        // Handle style1 cards
        const style1Cards = block.querySelectorAll('.card-grid-item');
        style1Cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                
                // Find the image inside the card and add zoom effect
                const image = card.querySelector('.card-image');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                    image.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                // Reset image zoom
                const image = card.querySelector('.card-image');
                if (image) {
                    image.style.transform = '';
                }
            });
            
            // Touch device support
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 200);
            }, { passive: true });
        });
        
        // Handle style2 cards
        const style2Cards = block.querySelectorAll('.card-grid-item-style2');
        style2Cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                
                // Animate the icon image
                const iconImage = card.querySelector('.card-icon-image');
                if (iconImage) {
                    iconImage.style.transform = 'scale(1.1)';
                    iconImage.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                // Reset icon animation
                const iconImage = card.querySelector('.card-icon-image');
                if (iconImage) {
                    iconImage.style.transform = '';
                }
            });
            
            // Touch device support
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 200);
            }, { passive: true });
        });
        
        // Add lazy loading to images if supported
        const images = block.querySelectorAll('img');
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
        
        // Handle window resize events
        window.addEventListener('resize', () => {
            const isMobileNow = window.matchMedia('(max-width: 480px)').matches;
            
            if (isMobileNow) {
                // Apply to main block container
                block.style.paddingLeft = '16px';
                block.style.paddingRight = '16px';
                block.style.marginLeft = '0';
                block.style.marginRight = '0';
                block.style.width = '100%';
                block.style.boxSizing = 'border-box';
                
                ensureMobileStyles(block);
            } else {
                // Reset main block container
                block.style.paddingLeft = '';
                block.style.paddingRight = '';
                block.style.marginLeft = '';
                block.style.marginRight = '';
                block.style.width = '';
                block.style.boxSizing = '';
                
                resetToDesktopStyles(block);
            }
        });
    });
    
    // Function to ensure consistent mobile styles
    function ensureMobileStyles(block) {
        // Set consistent grids
        const style1Grid = block.querySelector('.card-grid');
        const style2Grid = block.querySelector('.card-grid-style2');
        
        if (style1Grid) {
            style1Grid.style.gap = '16px';
            style1Grid.style.width = '100%';
            style1Grid.style.paddingLeft = '0';
            style1Grid.style.paddingRight = '0';
        }
        
        if (style2Grid) {
            style2Grid.style.gap = '16px';
            style2Grid.style.width = '100%';
            style2Grid.style.paddingLeft = '0';
            style2Grid.style.paddingRight = '0';
        }
        
        // Ensure consistent card sizing on mobile
        const allCards = block.querySelectorAll('.card-grid-item, .card-grid-item-style2');
        allCards.forEach(card => {
            card.style.width = '100%';
            card.style.maxWidth = '100%';
            card.style.padding = '16px';
            card.style.marginLeft = '0';
            card.style.marginRight = '0';
            card.style.boxSizing = 'border-box';
            
            // Ensure consistent inner element spacing
            const innerElement = card.querySelector('.card-inner');
            if (innerElement) {
                innerElement.style.width = '100%';
                innerElement.style.boxSizing = 'border-box';
            }
        });
    }
    
    // Function to reset to desktop styles
    function resetToDesktopStyles(block) {
        const style1Grid = block.querySelector('.card-grid');
        const style2Grid = block.querySelector('.card-grid-style2');
        
        if (style1Grid) {
            style1Grid.style.gap = '';
            style1Grid.style.width = '';
            style1Grid.style.paddingLeft = '';
            style1Grid.style.paddingRight = '';
        }
        
        if (style2Grid) {
            style2Grid.style.gap = '';
            style2Grid.style.width = '';
            style2Grid.style.paddingLeft = '';
            style2Grid.style.paddingRight = '';
        }
        
        const allCards = block.querySelectorAll('.card-grid-item, .card-grid-item-style2');
        allCards.forEach(card => {
            card.style.width = '';
            card.style.maxWidth = '';
            card.style.padding = '';
            card.style.marginLeft = '';
            card.style.marginRight = '';
            card.style.boxSizing = '';
            
            const innerElement = card.querySelector('.card-inner');
            if (innerElement) {
                innerElement.style.width = '';
                innerElement.style.boxSizing = '';
            }
        });
    }
}); 