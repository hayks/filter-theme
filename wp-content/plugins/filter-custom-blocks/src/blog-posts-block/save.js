/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
    const {
        title,
        subtitle,
        postsToShow,
        columns,
        categories,
        tags,
        order,
        orderBy,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        cardBackgroundColor,
        borderRadius
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'wp-block-block-development-examples-blog-posts-block',
        'data-attributes': JSON.stringify(attributes),
        style: backgroundColor ? { backgroundColor } : {}
    });

    return (
        <div {...blockProps}>
            <div className="blog-posts-header" style={{ color: textColor }}>
                <h2 className="blog-posts-title">{title}</h2>
                <p className="blog-posts-subtitle">{subtitle}</p>
            </div>
            
            <div 
                className="blog-posts-grid" 
                style={{ 
                    gridTemplateColumns: `repeat(${columns}, 1fr)` 
                }}
            >
                {/* Content will be populated on the frontend via PHP/JS */}
                <div className="blog-posts-loading">
                    <div className="blog-posts-spinner"></div>
                </div>
            </div>
        </div>
    );
}
