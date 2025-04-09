/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
        items,
        backgroundColor,
        textColor,
        borderRadius,
        itemSpacing,
        showReadMoreButton,
        readMoreButtonText,
        readMoreButtonUrl,
        readMoreButtonColor,
        readMoreButtonTextColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'wp-block-faq-block',
        'data-attributes': JSON.stringify({
            backgroundColor,
            textColor,
            borderRadius,
            itemSpacing,
            readMoreButtonColor,
            readMoreButtonTextColor
        })
    });

    return (
        <div 
            {...blockProps}
            style={{
                color: textColor,
            }}
        >
            <div className="faq-header">
                <RichText.Content
                    tagName="h2"
                    className="faq-title"
                    value={title}
                />
                <RichText.Content
                    tagName="p"
                    className="faq-subtitle"
                    value={subtitle}
                />
            </div>

            {showReadMoreButton && (
                <div className="faq-button-container">
                    <a
                        href={readMoreButtonUrl}
                        className="faq-read-more-button"
                        style={{
                            backgroundColor: readMoreButtonColor,
                            color: readMoreButtonTextColor,
                            borderRadius: `${Math.min(50, borderRadius * 2)}px`,
                        }}
                    >
                        {readMoreButtonText}
                    </a>
                </div>
            )}

            <div 
                className="faq-items-container"
                style={{ 
                    gap: `${itemSpacing}px`
                }}
            >
                {items.map((item) => (
                    <div 
                        key={item.id}
                        className={`faq-item ${item.isOpen ? 'is-open' : ''}`}
                        data-faq-id={item.id}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: `${borderRadius}px`,
                        }}
                    >
                        <div className="faq-item-header">
                            <div className="faq-question-container">
                                <RichText.Content
                                    tagName="h3"
                                    className="faq-question"
                                    value={item.question}
                                />
                            </div>
                            
                            <button 
                                className="faq-toggle-button"
                                aria-expanded={item.isOpen}
                            >
                                <span className="dashicons dashicons-arrow-down-alt2"></span>
                            </button>
                        </div>
                        
                        <div 
                            className="faq-answer-container" 
                            style={{
                                display: item.isOpen ? 'block' : 'none',
                            }}
                        >
                            <RichText.Content
                                tagName="div"
                                className="faq-answer"
                                value={item.answer}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
