/**
 * Search Functionality for Filter Theme
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchIcon = document.querySelector('.search-icon-wrapper');
    const searchOverlay = document.querySelector('.filter-search-overlay');
    const searchClose = document.querySelector('.filter-search-close');
    const searchInput = document.querySelector('.filter-search-field');
    
    console.log('Search initialization started');
    
    // Debug log elements
    if (searchIcon) {
        console.log('Search Icon found:', searchIcon);
    } else {
        console.error('Search Icon not found! Check your HTML structure for .search-icon-wrapper');
    }
    
    if (searchOverlay) {
        console.log('Search Overlay found:', searchOverlay);
    } else {
        console.error('Search Overlay not found! Check your HTML for .filter-search-overlay');
    }
    
    if (searchClose) {
        console.log('Search Close button found:', searchClose);
    } else {
        console.error('Search Close button not found! Check your HTML for .filter-search-close');
    }
    
    // Proceed only if we have the necessary elements
    if (!searchIcon || !searchOverlay || !searchClose) {
        console.error('Some search elements are missing - the search functionality will not work properly');
        return;
    }
    
    // Toggle search overlay when search icon is clicked
    searchIcon.addEventListener('click', function(e) {
        console.log('Search icon clicked');
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        searchOverlay.style.display = 'flex';
        searchOverlay.classList.add('active');  // Add active class for backup
        document.body.classList.add('search-active');
        
        // Focus on search input
        if (searchInput) {
            setTimeout(function() {
                searchInput.focus();
            }, 100);
        }
    });
    
    // Close search overlay when close button is clicked
    searchClose.addEventListener('click', function() {
        console.log('Search close clicked');
        searchOverlay.style.display = 'none';
        searchOverlay.classList.remove('active');
        document.body.classList.remove('search-active');
    });
    
    // Close search overlay when clicking outside the search container
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            console.log('Clicked outside search container');
            searchOverlay.style.display = 'none';
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-active');
        }
    });
    
    // Close search overlay when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (searchOverlay.style.display === 'flex' || searchOverlay.classList.contains('active'))) {
            console.log('ESC key pressed - closing search');
            searchOverlay.style.display = 'none';
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-active');
        }
    });
    
    console.log('Search initialization completed');
}); 