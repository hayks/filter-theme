/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
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
        heading,
        subheading,
        products,
        displayMode,
        cardBackgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        borderRadius,
        spacing
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'alignfull has-responsive-display'
    });

    return (
        <div {...blockProps}>
            <div className="product-showcase-header" style={{ color: textColor }}>
                <h2 className="product-showcase-heading">{heading}</h2>
                <p className="product-showcase-subheading">{subheading}</p>
            </div>
            
            <div 
                className="product-showcase-grid"
                style={{ 
                    gap: `${spacing}px`,
                }}
            >
                {products.map((product, index) => (
                    <div
                        key={`product-${index}`}
                        className="product-card product-card-responsive"
                        style={{
                            backgroundColor: cardBackgroundColor,
                            borderRadius: `${borderRadius}px`,
                            color: textColor
                        }}
                        data-product-id={product.id}
                    >
                        <div 
                            className="product-image-container"
                            style={{ borderRadius: `${borderRadius}px` }}
                        >
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.imageAlt}
                                    className="product-image"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="product-image-placeholder">
                                    <span>No image available</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="product-details">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">{product.price}</p>
                            <p className="product-description">{product.description}</p>
                            
                            <button 
                                className="product-cart-button add_to_cart_button ajax_add_to_cart"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor,
                                    borderRadius: `${Math.min(72, borderRadius * 3)}px`
                                }}
                                data-product_id={product.id}
                                data-quantity="1"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 