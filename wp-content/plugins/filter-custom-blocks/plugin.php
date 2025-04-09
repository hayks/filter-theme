<?php
/**
 * Plugin Name: FILTER Custom Blocks
 * Plugin URI:  
 * Description: Custom Gutenberg blocks for the FILTER WordPress theme.
 * Version:     1.0.0
 * Author:      Hayk Sargsyan
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: filter-custom-blocks
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package filter-custom-blocks
 */

/**
 * Register custom "FILTER blocks" category
 */
function filter_custom_blocks_categories($categories) {
    // Remove the 'FILTER blocks' category if it exists
    $categories = array_filter($categories, function($category) {
        return $category['slug'] !== 'filter-blocks';
    });

    // Add the 'FILTER blocks' category at the beginning
    array_unshift($categories, [
        'slug' => 'filter-blocks',
        'title' => 'FILTER blocks',
        'icon' => 'filter', // WordPress dashicon name
    ]);

    return $categories;
}
add_filter('block_categories_all', 'filter_custom_blocks_categories', 10, 1);

/**
 * Register all custom blocks
 */
function filter_custom_blocks_register_block_types() {
	if ( file_exists( __DIR__ . '/build/' ) ) {
			$block_json_files = glob( __DIR__ . '/build/*/block.json' );
		foreach ( $block_json_files as $filename ) {
				$block_folder = dirname( $filename );
				register_block_type( $block_folder );
		}
	}

		wp_register_script(
			'AlpineJS',
			'https://unpkg.com/alpinejs@3.9.6/dist/cdn.min.js',
			array(),
			'3.9.6',
			true // Load it in the footer.
		);
		
		// Register and enqueue all block styles properly
		register_blocks_css_styles();
}
add_action( 'init', 'filter_custom_blocks_register_block_types' );

/**
 * Register and enqueue all block styles properly from their CSS files
 * instead of using inline CSS in filter functions
 */
function register_blocks_css_styles() {
    // List of blocks with their style file paths
    $blocks = [
        'image-hero-block' => '/build/image-hero-block/style-index.css',
        'card-grid-block' => '/build/card-grid-block/style-index.css',
        'collection-hero-block' => '/build/collection-hero-block/style-index.css',
        'blog-posts-block' => '/build/blog-posts-block/style-index.css',
        'faq-block' => '/build/faq-block/style-index.css',
        'testimonials-slider-block' => '/build/testimonials-slider-block/style-index.css',
        'email-block' => '/build/email-block/style-index.css',
        'newsletter-block' => '/build/newsletter-block/style-index.css',
        'why-choose-us-block' => '/build/why-choose-us-block/style-index.css',
    ];
    
    // Register and enqueue each block's styles
    foreach ($blocks as $block_name => $style_path) {
        $style_url = plugins_url($style_path, __FILE__);
        $style_path = plugin_dir_path(__FILE__) . $style_path;
        
        if (file_exists($style_path)) {
            wp_register_style(
                "filter-custom-blocks-{$block_name}",
                $style_url,
                array(),
                filemtime($style_path)
            );
            wp_enqueue_style("filter-custom-blocks-{$block_name}");
        }
    }
}

/* https://developer.wordpress.org/reference/hooks/render_block_this-name/ */
add_filter(
	'render_block_block-development-examples/counter-jquery-99def1',
	function ( $content ) {
		wp_enqueue_script( 'jquery' );
		return $content;
	}
);

add_filter(
	'render_block_block-development-examples/counter-alpine-99def1',
	function ( $content ) {
		wp_enqueue_script( 'AlpineJS' );
		return $content;
	}
);

// Add specific filter for newsletter block to ensure styles are loaded
add_filter(
	'render_block_block-development-examples/newsletter-block',
	function ( $content ) {
		// Enqueue the style directly from the src directory 
		wp_enqueue_style(
			'filter-custom-blocks-newsletter-block-style',
			plugins_url('/src/newsletter-block/style.css', __FILE__),
			array(),
			filemtime(plugin_dir_path(__FILE__) . '/src/newsletter-block/style.css')
		);
		return $content;
	}
);


