<?php

/**
 * Enqueue theme styles.
 */
if ( ! function_exists( 'filter_enqueue_custom_styles' ) ) :
	/**
	 * Enqueue custom theme styles
	 *
	 * @since Filter 1.0
	 * @return void
	 */
	function filter_enqueue_custom_styles() {
		// Custom header styles
		wp_enqueue_style(
			'filter-custom-header',
			get_template_directory_uri() . '/assets/css/custom-header.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);
        
        // Custom footer styles
        wp_enqueue_style(
            'filter-custom-footer',
            get_template_directory_uri() . '/assets/css/custom-footer.css',
            array(),
            wp_get_theme()->get( 'Version' )
        );
        
        // Responsive styles
        wp_enqueue_style(
            'filter-responsive',
            get_template_directory_uri() . '/assets/css/responsive.css',
            array(),
            wp_get_theme()->get( 'Version' )
        );
	}
endif;

add_action( 'wp_enqueue_scripts', 'filter_enqueue_custom_styles' );


/**
 * Make sure inline SVGs render properly in the footer
 */
function filter_footer_svg_support() {
    add_filter('wp_kses_allowed_html', function($allowed, $context) {
        if ($context === 'post') {
            $allowed['svg'] = [
                'xmlns' => true,
                'width' => true,
                'height' => true,
                'viewbox' => true,
                'fill' => true,
                'class' => true,
                'style' => true,
            ];
            
            $allowed['path'] = [
                'd' => true,
                'fill' => true,
            ];
            
            $allowed['symbol'] = [
                'id' => true,
                'viewbox' => true,
            ];
            
            $allowed['use'] = [
                'xlink:href' => true,
            ];
        }
        return $allowed;
    }, 10, 2);
}
add_action('init', 'filter_footer_svg_support');


/**
 * Add theme support for custom logo
 */
function filter_theme_setup() {
	// Add support for custom logo
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 46,
			'width'       => 131,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'filter_theme_setup' );

/**
 * Enqueue scripts for search functionality
 */
function filter_search_scripts() {
    wp_enqueue_script(
        'filter-search',
        get_template_directory_uri() . '/assets/js/search.js',
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'filter_search_scripts' );

/**
 * Ensure search icon is present in the header by injecting it if missing
 */
function filter_ensure_search_icon() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Check if search icon exists
        if (!document.querySelector('.search-icon-wrapper')) {
            
            // Find the mini-cart element which we'll insert after
            const miniCart = document.querySelector('.wc-block-mini-cart');
            
            if (miniCart && miniCart.parentNode) {
                // Create the search icon wrapper
                const searchIconWrapper = document.createElement('div');
                searchIconWrapper.className = 'search-icon-wrapper';
                searchIconWrapper.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L20 21.49L21.49 20L15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3ZM9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5Z" fill="#4D5A5E"/>
                    </svg>
                `;
                
                // Insert after the mini-cart
                if (miniCart.nextSibling) {
                    miniCart.parentNode.insertBefore(searchIconWrapper, miniCart.nextSibling);
                } else {
                    miniCart.parentNode.appendChild(searchIconWrapper);
                }
                
                // Add event listener to the newly created search icon
                searchIconWrapper.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const searchOverlay = document.querySelector('.filter-search-overlay');
                    if (searchOverlay) {
                        searchOverlay.style.display = 'flex';
                        searchOverlay.classList.add('active');
                        document.body.classList.add('search-active');
                        
                        // Focus on search input
                        const searchInput = document.querySelector('.filter-search-field');
                        if (searchInput) {
                            setTimeout(function() {
                                searchInput.focus();
                            }, 100);
                        }
                    }
                });
                
            }
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'filter_ensure_search_icon');

/**
 * Add search form HTML to the footer
 */
function filter_add_search_form() {
    ?>
    <div class="filter-search-overlay" style="display: none;">
        <div class="filter-search-container">
            <form role="search" method="get" class="filter-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                <input type="search" class="filter-search-field" placeholder="Search..." value="<?php echo get_search_query(); ?>" name="s" />
                <button type="submit" class="filter-search-submit">Search</button>
            </form>
            <button class="filter-search-close">×</button>
        </div>
    </div>
    <style>
        /* Ensure search overlay is visible when active */
        .filter-search-overlay.active {
            display: flex !important;
        }
        
        /* Improved search styling */
        .filter-search-container {
            width: 80%;
            max-width: 800px;
            background: white;
            padding: 30px;
            border-radius: 8px;
            position: relative;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        
        .filter-search-field {
            width: 100%;
            padding: 15px 20px;
            font-size: 18px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .filter-search-submit {
            margin-top: 15px;
            padding: 12px 25px;
            background-color: var(--header-text-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        
        .filter-search-submit:hover {
            background-color: #3d494c;
        }
        
        .filter-search-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            padding: 5px;
        }
    </style>
    <?php
}
add_action( 'wp_footer', 'filter_add_search_form' );

/**
 * Completely replace the footer with a custom HTML version
 * This bypasses WordPress block system entirely for the footer
 */
function filter_custom_footer_replacement() {
    // Only do this on the frontend, not in admin or customizer
    if (is_admin() || is_customize_preview()) {
        return;
    }
    
    // Include the custom footer template
    include_once(get_template_directory() . '/template-parts/footer/custom-footer.php');
}
add_action('wp_footer', 'filter_custom_footer_replacement', 999); 



/**
 * Filter block rendering to remove global padding class
 *
 * @param string $block_content The block content.
 * @param array  $block         The full block, including name and attributes.
 * @return string Filtered block content.
 */
function filter_remove_global_padding_class($block_content, $block) {
    if (!empty($block['blockName']) && $block['blockName'] === 'core/group') {
        $block_content = str_replace('has-global-padding', '', $block_content);
    }
    
    return $block_content;
}
add_filter('render_block', 'filter_remove_global_padding_class', 10, 2);
