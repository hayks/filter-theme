document.addEventListener('DOMContentLoaded', function() {
    const newsletterBlocks = document.querySelectorAll('.wp-block-block-development-examples-newsletter-block');
    
    newsletterBlocks.forEach(function(block) {
        const form = block.querySelector('.newsletter-block-form');
        const inputWrapper = block.querySelector('.newsletter-block-input-wrapper');
        const placeholder = block.querySelector('.newsletter-block-placeholder');
        const button = block.querySelector('.newsletter-block-button');
        
        if (!form || !inputWrapper || !placeholder || !button) return;
        
        let input = document.createElement('input');
        input.type = 'email';
        input.className = 'newsletter-block-real-input';
        input.placeholder = placeholder.textContent.trim();
        input.style.width = '100%';
        input.style.height = '100%';
        input.style.border = 'none';
        input.style.background = 'transparent';
        input.style.padding = '0 24px';
        input.style.outline = 'none';
        input.style.fontSize = '16px';
        
        // Replace placeholder with actual input
        inputWrapper.querySelector('.newsletter-block-input').appendChild(input);
        placeholder.style.display = 'none';
        
        // Handle form submission
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (!email || !isValidEmail(email)) {
                input.classList.add('error');
                input.style.animation = 'shake 0.5s';
                input.style.border = '1px solid #ff6b6b';
                
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
                
                return;
            }
            
            // Show loading state
            button.disabled = true;
            button.textContent = 'Subscribing...';
            
            // Simulate API call
            setTimeout(() => {
                // Success state
                block.innerHTML = `
                    <div class="newsletter-block-success">
                        <h2>Thank You!</h2>
                        <p>Your subscription has been confirmed. You've been added to our list and will hear from us soon.</p>
                    </div>
                `;
            }, 1500);
        });
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}); 