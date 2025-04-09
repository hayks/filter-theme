/**
 * Blog Posts Block Frontend Script
 * 
 * This script handles loading posts and rendering them
 * in the Blog Posts Block on the frontend.
 */

document.addEventListener('DOMContentLoaded', function() {
    const blogPostsBlocks = document.querySelectorAll('.wp-block-block-development-examples-blog-posts-block');
    
    if (!blogPostsBlocks.length) return;
    
    // Ensure proper viewport meta tag exists for responsive design
    ensureViewportMetaTag();
    
    // Get WordPress REST API root URL 
    const wpApiSettings = window.wpApiSettings || {};
    const restRoot = wpApiSettings.root || '/wp-json/';
    
    // Check if device is mobile for responsive adjustments
    const isMobile = window.innerWidth < 768;
    
    blogPostsBlocks.forEach(function(block) {
        // Parse the attributes from the data attribute
        let attributes;
        try {
            attributes = JSON.parse(block.dataset.attributes || '{}');
        } catch (error) {
            console.error('Error parsing block attributes:', error);
            return;
        }
        
        // Get the grid container
        const gridContainer = block.querySelector('.blog-posts-grid');
        if (!gridContainer) return;
        
        // Ensure grid container has proper styles
        gridContainer.style.display = 'grid';
        gridContainer.style.width = '100%';
        
        // Set grid columns based on screen width
        if (window.innerWidth < 480) {
            gridContainer.style.gridTemplateColumns = '1fr';
            gridContainer.style.gap = '16px';
        } else if (window.innerWidth < 992) {
            gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            gridContainer.style.gap = '20px';
        } else if (window.innerWidth < 1200) {
            gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            gridContainer.style.gap = '24px';
        } else {
            gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
            gridContainer.style.gap = '24px';
        }
        
        // Remove loading spinner if it exists
        const loadingElement = block.querySelector('.blog-posts-loading');
        if (loadingElement) {
            loadingElement.remove();
        }
        
        // Fetch posts from the WordPress REST API
        fetchPosts(attributes, gridContainer);
    });
    
    // Handle window resize events for responsive behavior
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        
        // Update grid template columns on resize
        blogPostsBlocks.forEach(function(block) {
            const gridContainer = block.querySelector('.blog-posts-grid');
            if (!gridContainer) return;
            
            if (window.innerWidth < 480) {
                gridContainer.style.gridTemplateColumns = '1fr';
                gridContainer.style.gap = '16px';
            } else if (window.innerWidth < 992) {
                gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                gridContainer.style.gap = '20px';
            } else if (window.innerWidth < 1200) {
                gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
                gridContainer.style.gap = '24px';
            } else {
                gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
                gridContainer.style.gap = '24px';
            }
        });
        
        if (newIsMobile !== isMobile) {
            // Reload content if switching between mobile and desktop view
            location.reload();
        }
    });
    
    /**
     * Ensure viewport meta tag exists for responsive design
     */
    function ensureViewportMetaTag() {
        if (!document.querySelector('meta[name="viewport"]')) {
            const metaTag = document.createElement('meta');
            metaTag.name = 'viewport';
            metaTag.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(metaTag);
        }
    }
    
    /**
     * Fetch posts from the WordPress REST API
     * 
     * @param {Object} attributes - Block attributes
     * @param {HTMLElement} container - Grid container element
     */
    function fetchPosts(attributes, container) {
        const {
            postsToShow,
            categories,
            tags,
            order,
            orderBy,
            buttonColor,
            buttonTextColor,
            cardBackgroundColor,
            textColor,
            borderRadius
        } = attributes;
        
        // Build the REST API URL
        let apiBase = restRoot;
        if (!apiBase.endsWith('/')) {
            apiBase += '/';
        }
        
        let url = `${apiBase}wp/v2/posts?_embed&per_page=${postsToShow || 4}&order=${order || 'desc'}&orderby=${orderBy || 'date'}`;
        
        if (categories && categories.length > 0) {
            url += `&categories=${categories.join(',')}`;
        }
        
        if (tags && tags.length > 0) {
            url += `&tags=${tags.join(',')}`;
        }
        
        // Fetch posts
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(posts => {
                if (!posts || !posts.length) {
                    renderEmptyMessage(container);
                    return;
                }
                
                renderPosts(posts, container, attributes);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                renderErrorMessage(container);
            });
    }
    
    /**
     * Render posts in the grid container
     * 
     * @param {Array} posts - Array of post objects
     * @param {HTMLElement} container - Grid container element
     * @param {Object} attributes - Block attributes
     */
    function renderPosts(posts, container, attributes) {
        // Clear the container
        container.innerHTML = '';
        
        const {
            buttonColor,
            buttonTextColor,
            cardBackgroundColor,
            textColor,
            borderRadius
        } = attributes;
        
        // Responsive adjustments
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? '16px' : '24px';
        const titleFontSize = isMobile ? '1.25rem' : '1.5rem';
        const excerptFontSize = isMobile ? '0.9rem' : '1rem';
        const buttonPadding = isMobile ? '8px 24px' : '10px 40px';
        const buttonFontSize = isMobile ? '0.9rem' : '1rem';
        
        // Create and append post cards
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'blog-post-card';
            postCard.style.backgroundColor = cardBackgroundColor;
            postCard.style.borderRadius = `${borderRadius}px`;
            postCard.style.color = textColor;
            postCard.style.overflow = 'hidden';
            postCard.style.width = '100%';
            postCard.style.height = '100%';
            postCard.style.display = 'flex';
            postCard.style.flexDirection = 'column';
            
            // Get the featured image URL if available
            let featuredImageUrl = '';
            if (post._embedded && 
                post._embedded['wp:featuredmedia'] && 
                post._embedded['wp:featuredmedia'][0] &&
                post._embedded['wp:featuredmedia'][0].source_url) {
                featuredImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }
            
            // Get excerpt
            let excerpt = '';
            if (post.excerpt && post.excerpt.rendered) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.excerpt.rendered;
                excerpt = tempDiv.textContent || tempDiv.innerText;
                excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
            }
            
            // Create HTML content
            postCard.innerHTML = `
                <div class="blog-post-image-container" style="
                    border-radius: ${borderRadius}px; 
                    overflow: hidden; 
                    background-color: #4D5A5E;
                    position: relative;
                    padding-top: ${isMobile ? '75%' : '65%'};
                ">
                    ${featuredImageUrl ? 
                        `<img src="${featuredImageUrl}" alt="${post.title.rendered}" class="blog-post-image" style="
                            border-radius: ${borderRadius}px; 
                            object-fit: cover; 
                            width: 100%; 
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                        ">` :
                        `<div class="blog-post-image-placeholder" style="
                            border-radius: ${borderRadius}px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "><span>No featured image</span></div>`
                    }
                </div>
                <div class="blog-post-content" style="
                    padding: ${padding}; 
                    display: flex; 
                    flex-direction: column; 
                    gap: ${isMobile ? '8px' : '10px'};
                    flex-grow: 1;
                ">
                    <h3 class="blog-post-title" style="
                        font-size: ${titleFontSize}; 
                        font-weight: 600; 
                        line-height: 1.3; 
                        margin: 0; 
                        color: ${textColor};
                    ">${post.title.rendered}</h3>
                    <p class="blog-post-excerpt" style="
                        font-size: ${excerptFontSize}; 
                        line-height: 1.6; 
                        margin: ${isMobile ? '8px 0' : '10px 0'}; 
                        color: ${textColor};
                        flex-grow: 1;
                    ">${excerpt}</p>
                    <a 
                        href="${post.link}" 
                        class="blog-post-read-more"
                        style="
                            background-color: ${buttonColor};
                            color: ${buttonTextColor};
                            border-radius: 72px;
                            padding: ${buttonPadding};
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            text-decoration: none;
                            font-weight: 500;
                            margin-top: ${isMobile ? '8px' : '10px'};
                            width: fit-content;
                            font-size: ${buttonFontSize};
                        "
                    >
                        Read More
                    </a>
                </div>
            `;
            
            container.appendChild(postCard);
        });
    }
    
    /**
     * Render empty message when no posts are found
     * 
     * @param {HTMLElement} container - Grid container element
     */
    function renderEmptyMessage(container) {
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? '1.5rem' : '2rem';
        const fontSize = isMobile ? '0.9rem' : '1rem';
        
        container.style.gridTemplateColumns = '1fr';
        
        container.innerHTML = `
            <div class="blog-posts-empty" style="
                padding: ${padding};
                text-align: center;
                background-color: #f9f9f9;
                border-radius: 8px;
                width: 100%;
                grid-column: 1 / -1;
            ">
                <p style="font-size: ${fontSize};">No posts found matching your criteria.</p>
            </div>
        `;
    }
    
    /**
     * Render error message when posts can't be fetched
     * 
     * @param {HTMLElement} container - Grid container element
     */
    function renderErrorMessage(container) {
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? '1.5rem' : '2rem';
        const fontSize = isMobile ? '0.9rem' : '1rem';
        
        container.style.gridTemplateColumns = '1fr';
        
        container.innerHTML = `
            <div class="blog-posts-error" style="
                padding: ${padding};
                text-align: center;
                background-color: #f9f9f9;
                border-radius: 8px;
                width: 100%;
                grid-column: 1 / -1;
            ">
                <p style="font-size: ${fontSize};">Error loading posts. Please try again later.</p>
            </div>
        `;
    }
});
