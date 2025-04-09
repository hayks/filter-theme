/**
 * Testimonials Slider Block Frontend Script
 * 
 * This script handles the testimonial slider functionality on the frontend,
 * including autoplay, pagination, and navigation controls.
 */

document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.wp-block-block-development-examples-testimonials-slider-block');
    
    if (!sliders.length) return;
    
    // Handle full-width calculations
    function setFullWidth() {
        sliders.forEach(function(slider) {
            // Add the JS-based full-width class as a fallback
            slider.classList.add('js-full-width');
            
            // Calculate and set the true viewport width
            const vw = document.documentElement.clientWidth / 100;
            document.documentElement.style.setProperty('--vw', `${vw}px`);
            
            // Apply mobile-specific class for styling hooks
            if (window.innerWidth <= 480) {
                slider.classList.add('is-mobile-view');
            } else {
                slider.classList.remove('is-mobile-view');
            }
        });
    }
    
    // Run on load
    setFullWidth();
    
    // Run on resize to handle viewport changes
    window.addEventListener('resize', function() {
        setFullWidth();
    });
    
    sliders.forEach(function(slider) {
        // Parse the attributes from the data attribute
        let attributes;
        try {
            attributes = JSON.parse(slider.dataset.attributes || '{}');
        } catch (error) {
            console.error('Error parsing testimonials slider attributes:', error);
            return;
        }

        const sliderContainer = slider.querySelector('.testimonials-slider');
        if (!sliderContainer) return;
        
        const slides = slider.querySelectorAll('.testimonial-slide');
        const dots = slider.querySelectorAll('.testimonial-dot');
        const dotsContainer = slider.querySelector('.testimonials-dots');
        
        if (!slides.length) return;
        
        // Make dots more touch-friendly on mobile
        if (dotsContainer) {
            adjustDotsForMobile();
            
            // Adjust dot sizes when window resizes
            window.addEventListener('resize', function() {
                adjustDotsForMobile();
            });
        }
        
        // Set up slider variables
        let currentSlide = 0;
        let slideInterval = attributes.slideInterval || 5000;
        let isAutoplay = attributes.autoplay || false;
        let autoplayTimer = null;
        let slideCount = slides.length;
        
        // Set up the slider for initial view
        updateSlider();
        
        // Set up autoplay if enabled
        if (isAutoplay) {
            startAutoplay();
            
            // Pause autoplay on hover
            slider.addEventListener('mouseenter', function() {
                stopAutoplay();
            });
            
            // Resume autoplay on mouse leave
            slider.addEventListener('mouseleave', function() {
                startAutoplay();
            });
            
            // Stop autoplay on touch (for mobile devices)
            slider.addEventListener('touchstart', function() {
                stopAutoplay();
            }, { passive: true });
        }
        
        // Add event listeners for pagination dots
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
            
            // Add proper ARIA attributes for accessibility
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('role', 'button');
            
            // Add touch-specific handling for mobile
            dot.addEventListener('touchstart', function(e) {
                // Increase the touch target size on mobile
                if (window.innerWidth <= 480) {
                    // Prevent touch events from triggering unwanted behavior
                    e.stopPropagation();
                }
            }, { passive: true });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Only handle keyboard events if this slider is in the viewport
            if (isElementInViewport(slider)) {
                if (e.key === 'ArrowLeft') {
                    goToPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    goToNextSlide();
                }
            }
        });
        
        // Functions for slider functionality
        function updateSlider() {
            // Update slides
            slides.forEach(function(slide, index) {
                if (index === currentSlide) {
                    slide.classList.add('active');
                    slide.setAttribute('aria-hidden', 'false');
                } else {
                    slide.classList.remove('active');
                    slide.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Update pagination dots
            dots.forEach(function(dot, index) {
                if (index === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-current', 'false');
                }
            });
        }
        
        function adjustDotsForMobile() {
            const isMobile = window.innerWidth <= 480;
            const isTablet = window.innerWidth <= 767 && window.innerWidth > 480;
            
            dots.forEach(function(dot) {
                // Apply additional spacing for better touch targets
                if (isMobile) {
                    dot.style.margin = '0 4px';
                    // Increase touch target size by adding transparent tap area
                    dot.style.position = 'relative';
                    // Add touch event handling to prevent slider swipe when tapping dots
                    dot.addEventListener('touchstart', function(e) {
                        e.stopPropagation(); // Prevent event bubbling to slider
                    }, { passive: true });
                } else if (isTablet) {
                    dot.style.margin = '0 3px';
                } else {
                    dot.style.margin = '0';
                }
            });
            
            // Add swipe indicator on mobile
            if (isMobile && sliderContainer) {
                sliderContainer.classList.add('has-swipe-indicator');
            } else if (sliderContainer) {
                sliderContainer.classList.remove('has-swipe-indicator');
            }
        }
        
        function goToSlide(index) {
            // Reset autoplay timer when manually changing slides
            if (isAutoplay) {
                stopAutoplay();
                startAutoplay();
            }
            
            // Update current slide
            currentSlide = index;
            
            // Handle bounds
            if (currentSlide < 0) {
                currentSlide = slideCount - 1;
            } else if (currentSlide >= slideCount) {
                currentSlide = 0;
            }
            
            // Update slider display
            updateSlider();
        }
        
        function goToNextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function goToPrevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        function startAutoplay() {
            if (isAutoplay && slideCount > 1) {
                stopAutoplay(); // Clear any existing timer first
                autoplayTimer = setInterval(function() {
                    goToNextSlide();
                }, slideInterval);
            }
        }
        
        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }
        
        // Helper function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Add swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50; // Minimum distance for swipe
            
            if (touchEndX < touchStartX - threshold) {
                // Swipe left, go to next slide
                goToNextSlide();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right, go to previous slide
                goToPrevSlide();
            }
        }
        
        // Ensure slider is visible if it's the first slide or if coming back to page
        if (slides.length > 0) {
            slides[0].classList.add('active');
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }
        }
    });
}); 