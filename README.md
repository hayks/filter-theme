# 🎨 FILTER TEST TASK – WordPress Block Theme with Custom Gutenberg Blocks

This project includes a custom WordPress block theme and a separate custom plugin that provides all Gutenberg blocks used on the homepage. The theme handles the layout, templates, and styling, while the plugin registers and manages reusable dynamic blocks built with the WordPress Block API and React.

## Theme Overview


### Header Functionality

The theme includes a fully functional header with:

- Custom logo support with appropriate sizing
- Responsive navigation menu
- WooCommerce mini-cart integration
- Search functionality with overlay
- Mobile-friendly design with responsive breakpoints

All elements are functional and can be customized through the WordPress customizer or block editor.

## Technical Details

- Built with WordPress Block API v3 and modern React.js
- Each block uses the standard block.json configuration
- Frontend styling with SCSS compiled to optimized CSS
- JavaScript interactions for dynamic elements
- Server-side rendering for content-driven blocks (Blog Posts, Products)
- Block editor integration with custom controls
- Responsive design

## Available Blocks

The plugin includes the following blocks, all of which are highly customizable with various attributes that can be modified directly in the block editor:

- **Image Hero Block**: A full-width hero section with an image background, heading, and call-to-action buttons.
- **Card Grid Block**: A responsive grid of cards for showcasing content, features, or products.
- **Collection Hero Block**: A specialized hero section designed for product collection or category displays.
- **Product Showcase Block**: A block for featuring specific woocommerce products with details and visual presentation.
- **Blog Posts Block**: A dynamic block that displays recent blog posts with filtering options.
- **FAQ Block**: An accordion-style block for displaying frequently asked questions with expandable/collapsible sections.
- **Testimonials Slider Block**: A slider block for showcasing customer testimonials with navigation controls.
- **Newsletter Block**: A subscription form block for email signups with customizable styling.
- **Why Choose Us Block**: A block for highlighting company benefits, features, or selling points.


## Development

This project was developed following WordPress coding standards and best practices. The custom blocks are built using the WordPress block API and modern JavaScript.

For local development, the project uses:
- Node.js and npm for dependencies
- webpack for asset compilation
- SCSS for styles
- ESLint for code quality
- WordPress coding standards

