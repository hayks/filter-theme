# FILTER - WordPress Block Theme with Custom Gutenberg Blocks

This project is a custom WordPress implementation based on a Figma design, featuring a modern block theme and highly customizable Gutenberg blocks. The project showcases a responsive homepage built with a collection of custom blocks that can be fully customized through the WordPress block editor.

## Theme Overview


### Header Functionality

The theme includes a fully functional header with:

- Custom logo support with appropriate sizing
- Responsive navigation menu
- WooCommerce mini-cart integration
- Search functionality with overlay
- Mobile-friendly design with responsive breakpoints

All elements are functional and can be customized through the WordPress customizer or block editor.

## Custom Blocks Plugin: filter-custom-blocks

The project includes a custom plugin that provides a collection of Gutenberg blocks specifically designed for this project. Each block is highly customizable with various attributes that can be modified directly in the block editor.

### Custom Block Features

- Blocks are organized in a custom "FILTER blocks" category in the block editor
- All blocks support full-width alignment
- Responsive design built into each block
- Custom attributes for extensive customization
- Interactive elements with frontend JavaScript functionality
- Consistent styling that matches the Figma design

## Available Custom Blocks

### Image Hero Block

A full-width hero section with an image background, heading, and call-to-action buttons.

**Attributes:**
- `imageUrl`: Background image URL (default: placeholder image)
- `title`: Main heading text
- `description`: Subheading or description text
- `primaryButtonText`: Text for primary CTA button
- `secondaryButtonText`: Text for secondary CTA button
- `primaryButtonLink`: URL for primary button
- `secondaryButtonLink`: URL for secondary button
- `textColor`: Color for text elements
- `cornerRadius`: Border radius for buttons and elements

### Card Grid Block

A flexible grid of cards for showcasing content, features, or products.

**Attributes:**
- `cards`: Array of card objects with title, description, image, and link
- `columns`: Number of columns (1-4)
- `showImages`: Toggle to show/hide card images
- `showTitles`: Toggle to show/hide card titles
- `showDescriptions`: Toggle to show/hide card descriptions
- `showButtons`: Toggle to show/hide card buttons
- `buttonText`: Default text for card buttons
- `cardStyle`: Visual style for cards (standard, outline, minimal)
- `cornerRadius`: Border radius for cards

### Collection Hero Block

A hero section specifically designed for product collection displays.

**Attributes:**
- `title`: Collection title
- `description`: Collection description
- `imageUrl`: Background image for the collection
- `buttonText`: Text for the CTA button
- `buttonLink`: URL for the CTA button
- `overlayOpacity`: Opacity level for the image overlay
- `textAlignment`: Alignment of text (left, center, right)
- `height`: Height of the hero section

### Product Showcase Block

A block for featuring specific products with details and purchase options.

**Attributes:**
- `products`: Array of product objects with images, titles, prices, and links
- `layout`: Display layout (grid, slider, featured)
- `showPrices`: Toggle to show/hide product prices
- `showRatings`: Toggle to show/hide product ratings
- `showAddToCart`: Toggle to show/hide add to cart buttons
- `itemsPerRow`: Number of products to display per row
- `autoplay`: Toggle for slider autoplay (when layout is slider)
- `autoplaySpeed`: Speed for slider autoplay

### Blog Posts Block

A dynamic block for displaying recent blog posts with various layout options.

**Attributes:**
- `postsToShow`: Number of posts to display
- `categories`: Array of category IDs to filter posts
- `order`: Order of posts (latest, oldest, most popular)
- `layout`: Layout style (grid, list, featured)
- `showFeaturedImage`: Toggle to show/hide featured images
- `showExcerpt`: Toggle to show/hide post excerpts
- `showDate`: Toggle to show/hide post dates
- `showAuthor`: Toggle to show/hide post authors
- `showReadMore`: Toggle to show/hide read more links
- `excerptLength`: Length of post excerpts

### FAQ Block

An accordion-style block for displaying frequently asked questions.

**Attributes:**
- `questions`: Array of question/answer pairs
- `style`: Visual style for the FAQ (bordered, minimal, separated)
- `showAllOpen`: Toggle to show all questions open by default
- `titleTag`: HTML tag for question titles (h2, h3, h4, etc.)
- `allowMultiple`: Toggle to allow multiple questions open simultaneously
- `iconPosition`: Position of the toggle icon (right, left)

### Testimonials Slider Block

A slider block for showcasing customer testimonials.

**Attributes:**
- `testimonials`: Array of testimonial objects with text, author, rating, and image
- `showImages`: Toggle to show/hide testimonial author images
- `showRatings`: Toggle to show/hide testimonial ratings
- `autoplay`: Toggle for slider autoplay
- `autoplaySpeed`: Speed for slider autoplay
- `navigation`: Navigation style (dots, arrows, both, none)
- `textAlignment`: Alignment of testimonial text

### Newsletter Block

A subscription form block for newsletter signups.

**Attributes:**
- `title`: Block heading
- `description`: Block description text
- `buttonText`: Text for the submit button
- `placeholderText`: Placeholder text for the email input
- `backgroundColor`: Background color for the form
- `textColor`: Text color for the form
- `successMessage`: Message displayed after successful signup
- `formLayout`: Layout style (horizontal, stacked)

### Why Choose Us Block

A block for highlighting company benefits or selling points.

**Attributes:**
- `title`: Section title
- `description`: Section description
- `items`: Array of feature items with icons, titles, and descriptions
- `columns`: Number of columns for items (1-4)
- `showIcons`: Toggle to show/hide feature icons
- `iconSize`: Size of feature icons
- `iconColor`: Color for feature icons
- `layout`: Layout style (grid, list, cards)

## Technical Implementation

The project is built using:

- WordPress (latest version)
- PHP 7.4+
- Block editor (Gutenberg) with full FSE support
- Custom JavaScript for interactive elements
- SCSS for styling components
- WooCommerce integration
- Responsive design principles

All custom blocks are registered using the WordPress block API and follow modern WordPress development practices.


## Development

This project was developed following WordPress coding standards and best practices. The custom blocks are built using the WordPress block API and modern JavaScript.

For local development, the project uses:
- Node.js and npm for dependencies
- webpack for asset compilation
- SCSS for styles
- ESLint for code quality
- WordPress coding standards

