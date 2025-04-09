/**
 * FAQ Block Frontend Script
 * 
 * This script handles toggling FAQ items open and closed
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find all FAQ blocks on the page
    const faqBlocks = document.querySelectorAll('.wp-block-block-development-examples-faq-block');
    
    if (!faqBlocks.length) return;
    
    faqBlocks.forEach(function(block) {
        initFaqBlock(block);
    });
    
    /**
     * Initialize a FAQ block with accordion functionality
     * 
     * @param {HTMLElement} block - The FAQ block element
     */
    function initFaqBlock(block) {
        // Find all toggle buttons within this block
        const toggleButtons = block.querySelectorAll('.faq-toggle-button');
        
        toggleButtons.forEach(function(button) {
            // Add click event listener to each toggle button
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the FAQ item containing this button
                const faqItem = button.closest('.faq-item');
                
                // Toggle the is-open class
                faqItem.classList.toggle('is-open');
                
                // Update the aria-expanded attribute
                const isOpen = faqItem.classList.contains('is-open');
                button.setAttribute('aria-expanded', isOpen);
                
                // Find and toggle the answer container
                const answerContainer = faqItem.querySelector('.faq-answer-container');
                
                if (isOpen) {
                    // Open the answer with a slide down animation
                    answerContainer.style.display = 'block';
                    const answerHeight = answerContainer.scrollHeight;
                    
                    // Initial setup for animation
                    answerContainer.style.height = '0';
                    answerContainer.style.overflow = 'hidden';
                    answerContainer.style.transition = 'height 0.3s ease-out';
                    
                    // Trigger animation
                    setTimeout(function() {
                        answerContainer.style.height = answerHeight + 'px';
                    }, 10);
                    
                    // Cleanup after animation
                    answerContainer.addEventListener('transitionend', function handler() {
                        answerContainer.style.height = '';
                        answerContainer.style.overflow = '';
                        answerContainer.style.transition = '';
                        answerContainer.removeEventListener('transitionend', handler);
                    }, { once: true });
                } else {
                    // Close the answer with a slide up animation
                    const answerHeight = answerContainer.scrollHeight;
                    
                    // Initial setup for animation
                    answerContainer.style.height = answerHeight + 'px';
                    answerContainer.style.overflow = 'hidden';
                    answerContainer.style.transition = 'height 0.3s ease-out';
                    
                    // Trigger animation
                    setTimeout(function() {
                        answerContainer.style.height = '0';
                    }, 10);
                    
                    // Cleanup after animation
                    answerContainer.addEventListener('transitionend', function handler() {
                        answerContainer.style.display = 'none';
                        answerContainer.style.height = '';
                        answerContainer.style.overflow = '';
                        answerContainer.style.transition = '';
                        answerContainer.removeEventListener('transitionend', handler);
                    }, { once: true });
                }
                
                // Add arrow rotation
                const arrow = button.querySelector('.dashicons');
                if (isOpen) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        });
        
        // Add keyboard accessibility
        block.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.classList.contains('faq-toggle-button')) {
                    activeElement.click();
                    e.preventDefault();
                }
            }
        });
    }
});
