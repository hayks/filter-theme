/**
 * Product Showcase Block Frontend Script
 * 
 * Handles the WooCommerce Add to Cart functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all product showcase blocks
    const showcaseBlocks = document.querySelectorAll('.wp-block-block-development-examples-product-showcase-block');
    
    if (!showcaseBlocks.length) return;
    
    // Process each block
    showcaseBlocks.forEach(function(block) {
        // Apply responsive paddings to grid
        const productShowcaseGrid = block.querySelector('.product-showcase-grid');
        if (productShowcaseGrid) {
            if (window.matchMedia('(max-width: 480px)').matches) {
                // Additional mobile padding adjustments if needed
                productShowcaseGrid.style.paddingBottom = '1rem';
            }
        }
        
        // Apply responsive paddings to header
        const productShowcaseHeader = block.querySelector('.product-showcase-header');
        if (productShowcaseHeader) {
            if (window.matchMedia('(max-width: 480px)').matches) {
                productShowcaseHeader.style.paddingLeft = 'var(--wp--style--root--padding-left, 16px)';
                productShowcaseHeader.style.paddingRight = 'var(--wp--style--root--padding-right, 16px)';
            }
        }
        
        // Fix price display - convert HTML string to actual HTML and simplify
        const priceElements = block.querySelectorAll('.product-price');
        priceElements.forEach(function(priceEl) {
            // Skip if this is already fixed or doesn't contain HTML tags
            if (priceEl.querySelector('*') || !priceEl.textContent.includes('<')) {
                return;
            }
            
            // Get the HTML string and set it as innerHTML
            const htmlContent = priceEl.textContent;
            priceEl.textContent = '';
            priceEl.innerHTML = htmlContent;
            
            // Simplify the price display - keep only the current price
            // Check if this is a sale price (has both del and ins elements)
            const delElement = priceEl.querySelector('del');
            const insElement = priceEl.querySelector('ins');
            
            if (delElement && insElement) {
                // This is a sale price - keep only the sale price (ins element)
                // First, remove all screen reader text
                const screenReaderTexts = priceEl.querySelectorAll('.screen-reader-text');
                screenReaderTexts.forEach(text => text.remove());
                
                // Keep only the ins element (sale price)
                delElement.remove();
                
                // Clean up any whitespace/line breaks
                priceEl.innerHTML = priceEl.innerHTML.trim();
            }
        });
        
        // Add lazy loading to images
        const images = block.querySelectorAll('img');
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                img.loading = 'lazy';
                
                // Add better error handling for images
                img.onerror = function() {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'product-image-placeholder';
                    placeholder.innerHTML = '<span>Image not found</span>';
                    img.parentNode.replaceChild(placeholder, img);
                };
            });
        }
        
        // Handle responsive card behavior
        const productCards = block.querySelectorAll('.product-card');
        const isMobile = window.matchMedia('(max-width: 480px)').matches;
        const isTablet = window.matchMedia('(max-width: 768px)').matches;

        productCards.forEach(card => {
            // Apply responsive sizing and transitions
            if (isMobile) {
                card.style.width = '100%';
                // Adjust title size for better mobile display
                const title = card.querySelector('.product-title');
                if (title) {
                    title.style.fontSize = '22px';
                    title.style.lineHeight = '120%';
                }
                
                // Make description text more readable on mobile
                const description = card.querySelector('.product-description');
                if (description) {
                    description.style.fontSize = '14px';
                    description.style.lineHeight = '140%';
                }
            } else if (isTablet) {
                // Tablet-specific adjustments
                const title = card.querySelector('.product-title');
                if (title) {
                    title.style.fontSize = '28px';
                }
            }
            
            // Add hover effects that work on touch devices
            card.addEventListener('mouseenter', () => {
                if (!isMobile) { // Full hover effect only on desktop
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
            
            // For touch devices, add tap effect
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.08)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 200);
            }, { passive: true });
        });
        
        // Handle window resize events for responsive behavior
        window.addEventListener('resize', () => {
            const isMobileNow = window.matchMedia('(max-width: 480px)').matches;
            const isTabletNow = window.matchMedia('(max-width: 768px)').matches;
            
            // Update grid paddings
            const productShowcaseGrid = block.querySelector('.product-showcase-grid');
            if (productShowcaseGrid) {
                if (isMobileNow) {
                    productShowcaseGrid.style.paddingLeft = 'var(--wp--style--root--padding-left, 16px)';
                    productShowcaseGrid.style.paddingRight = 'var(--wp--style--root--padding-right, 16px)';
                    productShowcaseGrid.style.paddingBottom = '1rem';
                } else if (isTabletNow) {
                    productShowcaseGrid.style.paddingLeft = 'var(--wp--style--root--padding-left, 20px)';
                    productShowcaseGrid.style.paddingRight = 'var(--wp--style--root--padding-right, 20px)';
                    productShowcaseGrid.style.paddingBottom = '';
                } else {
                    productShowcaseGrid.style.paddingLeft = '';
                    productShowcaseGrid.style.paddingRight = '';
                    productShowcaseGrid.style.paddingBottom = '';
                }
            }
            
            // Update header paddings
            const productShowcaseHeader = block.querySelector('.product-showcase-header');
            if (productShowcaseHeader) {
                if (isMobileNow) {
                    productShowcaseHeader.style.paddingLeft = 'var(--wp--style--root--padding-left, 16px)';
                    productShowcaseHeader.style.paddingRight = 'var(--wp--style--root--padding-right, 16px)';
                } else if (isTabletNow) {
                    productShowcaseHeader.style.paddingLeft = 'var(--wp--style--root--padding-left, 20px)';
                    productShowcaseHeader.style.paddingRight = 'var(--wp--style--root--padding-right, 20px)';
                } else {
                    productShowcaseHeader.style.paddingLeft = '';
                    productShowcaseHeader.style.paddingRight = '';
                }
            }
            
            productCards.forEach(card => {
                // Mobile adjustments
                if (isMobileNow) {
                    card.style.width = '100%';
                    
                    const title = card.querySelector('.product-title');
                    if (title) {
                        title.style.fontSize = '22px';
                        title.style.lineHeight = '120%';
                    }
                    
                    const description = card.querySelector('.product-description');
                    if (description) {
                        description.style.fontSize = '14px';
                        description.style.lineHeight = '140%';
                    }
                } 
                // Tablet adjustments
                else if (isTabletNow) {
                    card.style.width = '';
                    
                    const title = card.querySelector('.product-title');
                    if (title) {
                        title.style.fontSize = '28px';
                        title.style.lineHeight = '';
                    }
                    
                    const description = card.querySelector('.product-description');
                    if (description) {
                        description.style.fontSize = '16px';
                        description.style.lineHeight = '1.5';
                    }
                } 
                // Desktop adjustments
                else {
                    card.style.width = '';
                    
                    const title = card.querySelector('.product-title');
                    if (title) {
                        title.style.fontSize = '';
                        title.style.lineHeight = '';
                    }
                    
                    const description = card.querySelector('.product-description');
                    if (description) {
                        description.style.fontSize = '';
                        description.style.lineHeight = '';
                    }
                }
            });
        });
        
        const addToCartButtons = block.querySelectorAll('.product-cart-button');
        
        // Add click event listeners to Add to Cart buttons
        addToCartButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productId = this.getAttribute('data-product-id');
                if (!productId) return;
                
                // Create loading state
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = 'Adding...';
                
                // Use the WooCommerce AJAX add to cart functionality
                addProductToCart(productId, 1, this, originalText);
            });
        });
    });
    
    /**
     * Add a product to the cart using WooCommerce AJAX
     * 
     * @param {number} productId - The ID of the product to add
     * @param {number} quantity - The quantity to add
     * @param {HTMLElement} button - The button element that was clicked
     * @param {string} originalText - The original button text
     */
    function addProductToCart(productId, quantity, button, originalText) {
        // Use the jQuery AJAX method if jQuery with WooCommerce is available
        if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.jquery) {
            jQuery.ajax({
                type: 'POST',
                url: wc_add_to_cart_params ? wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart') : '/wp-admin/admin-ajax.php',
                data: {
                    action: 'add_to_cart',
                    product_id: productId,
                    quantity: quantity
                },
                success: function(response) {
                    button.classList.remove('loading');
                    button.textContent = originalText;
                    
                    if (response.error) {
                        // Show error
                        showNotice('error', response.error);
                    } else {
                        // Show success message
                        showNotice('success', 'Product added to cart');
                        
                        // Update cart fragments
                        if (response.fragments) {
                            updateCartFragments(response.fragments);
                        }
                    }
                },
                error: function(error) {
                    button.classList.remove('loading');
                    button.textContent = originalText;
                    console.error('Error adding to cart:', error);
                    showNotice('error', 'Error adding to cart. Please try again.');
                }
            });
        } else {
            // Fallback to regular form submission if jQuery is not available
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = window.location.href;
            
            const hiddenInput1 = document.createElement('input');
            hiddenInput1.type = 'hidden';
            hiddenInput1.name = 'add-to-cart';
            hiddenInput1.value = productId;
            form.appendChild(hiddenInput1);
            
            const hiddenInput2 = document.createElement('input');
            hiddenInput2.type = 'hidden';
            hiddenInput2.name = 'quantity';
            hiddenInput2.value = quantity;
            form.appendChild(hiddenInput2);
            
            document.body.appendChild(form);
            form.submit();
        }
    }
    
    /**
     * Display a notice to the user
     * 
     * @param {string} type - The notice type (success, error)
     * @param {string} message - The message to display
     */
    function showNotice(type, message) {
        // Use WooCommerce's notice system if jQuery is available
        if (typeof jQuery !== 'undefined' && typeof wc_add_to_cart_params !== 'undefined') {
            const $noticeWrapper = jQuery('.woocommerce-notices-wrapper').first();
            
            if ($noticeWrapper.length) {
                $noticeWrapper.html('<div class="woocommerce-message" role="alert">' + message + '</div>');
            } else {
                // Create a custom notification if WooCommerce notice wrapper is not available
                createCustomNotice(type, message);
            }
        } else {
            // Create custom notification when WooCommerce/jQuery not available
            createCustomNotice(type, message);
        }
    }
    
    /**
     * Create a custom notice element
     * 
     * @param {string} type - The notice type (success, error)
     * @param {string} message - The message to display 
     */
    function createCustomNotice(type, message) {
        const noticeContainer = document.createElement('div');
        noticeContainer.className = 'product-showcase-notice ' + type;
        noticeContainer.textContent = message;
        
        document.body.appendChild(noticeContainer);
        
        // Base styles for the notice
        noticeContainer.style.position = 'fixed';
        noticeContainer.style.padding = '12px 20px';
        noticeContainer.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
        noticeContainer.style.color = 'white';
        noticeContainer.style.borderRadius = '4px';
        noticeContainer.style.zIndex = '9999';
        noticeContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        noticeContainer.style.fontSize = '14px';
        noticeContainer.style.fontWeight = '500';
        noticeContainer.style.transition = 'opacity 0.5s ease';
        
        // Responsive styling based on screen size
        if (window.matchMedia('(max-width: 480px)').matches) {
            // Mobile styles
            noticeContainer.style.bottom = '20px';
            noticeContainer.style.left = '20px';
            noticeContainer.style.right = '20px';
            noticeContainer.style.top = 'auto';
            noticeContainer.style.textAlign = 'center';
            noticeContainer.style.fontSize = '13px';
            noticeContainer.style.padding = '10px 16px';
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            // Tablet styles
            noticeContainer.style.bottom = '20px';
            noticeContainer.style.right = '20px';
            noticeContainer.style.top = 'auto';
            noticeContainer.style.maxWidth = '300px';
        } else {
            // Desktop styles
            noticeContainer.style.top = '20px';
            noticeContainer.style.right = '20px';
            noticeContainer.style.maxWidth = '350px';
        }
        
        // Add event listener for window resize to adjust position
        const resizeHandler = () => {
            if (window.matchMedia('(max-width: 480px)').matches) {
                noticeContainer.style.bottom = '20px';
                noticeContainer.style.left = '20px';
                noticeContainer.style.right = '20px';
                noticeContainer.style.top = 'auto';
                noticeContainer.style.textAlign = 'center';
                noticeContainer.style.fontSize = '13px';
            } else if (window.matchMedia('(max-width: 768px)').matches) {
                noticeContainer.style.bottom = '20px';
                noticeContainer.style.right = '20px';
                noticeContainer.style.left = 'auto';
                noticeContainer.style.top = 'auto';
                noticeContainer.style.textAlign = 'left';
                noticeContainer.style.fontSize = '14px';
                noticeContainer.style.maxWidth = '300px';
            } else {
                noticeContainer.style.top = '20px';
                noticeContainer.style.right = '20px';
                noticeContainer.style.bottom = 'auto';
                noticeContainer.style.left = 'auto';
                noticeContainer.style.textAlign = 'left';
                noticeContainer.style.fontSize = '14px';
                noticeContainer.style.maxWidth = '350px';
            }
        };
        
        window.addEventListener('resize', resizeHandler);
        
        // Remove the notice after 3 seconds
        setTimeout(function() {
            noticeContainer.style.opacity = '0';
            
            setTimeout(function() {
                if (noticeContainer.parentNode) {
                    noticeContainer.parentNode.removeChild(noticeContainer);
                    // Clean up event listener
                    window.removeEventListener('resize', resizeHandler);
                }
            }, 500);
        }, 3000);
    }
    
    /**
     * Update cart fragments
     * 
     * @param {Object} fragments - The fragments to update
     */
    function updateCartFragments(fragments) {
        if (typeof jQuery !== 'undefined') {
            jQuery.each(fragments, function(key, value) {
                jQuery(key).replaceWith(value);
            });
        }
    }
}); 