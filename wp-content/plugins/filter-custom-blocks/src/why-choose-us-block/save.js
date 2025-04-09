/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Save component for the Why Choose Us block
 */
function save({ attributes }) {
    const {
        title,
        description,
        backgroundColor,
        textColor,
        buttonText,
        buttonColor,
        buttonTextColor,
        buttonUrl,
        imageUrl,
        imageAlt,
        benefits,
        borderRadius,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'why-choose-us-block',
        style: {
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadius}px`,
            color: textColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="why-choose-us-image">
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt={imageAlt || ''}
                        className="featured-image"
                    />
                )}
            </div>
            
            <div className="why-choose-us-content">
                <RichText.Content
                    tagName="h2"
                    className="why-choose-us-title"
                    value={title}
                    style={{ color: textColor }}
                />
                
                <RichText.Content
                    tagName="p"
                    className="why-choose-us-description"
                    value={description}
                    style={{ color: textColor }}
                />
                
                <div className="why-choose-us-benefits">
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className="why-choose-us-benefit-item">
                            <span className="benefit-icon" style={{ color: textColor }}>
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0.815918C4.5 0.815918 0 5.31592 0 10.8159C0 16.3159 4.5 20.8159 10 20.8159C15.5 20.8159 20 16.3159 20 10.8159C20 5.31592 15.5 0.815918 10 0.815918ZM8 15.8159L3 10.8159L4.41 9.40592L8 12.9859L15.59 5.39592L17 6.81592L8 15.8159Z" fill="currentColor" />
                                </svg>
                            </span>
                            <RichText.Content
                                tagName="span"
                                className="benefit-text"
                                value={benefit.text}
                                style={{ color: textColor }}
                            />
                        </div>
                    ))}
                </div>
                
                {buttonText && (
                    <div className="why-choose-us-button-wrapper">
                        <a 
                            href={buttonUrl || '#'}
                            className="why-choose-us-button"
                            style={{ 
                                backgroundColor: buttonColor,
                                color: buttonTextColor,
                                borderRadius: '10000px',
                                padding: '10px 20px',
                                display: 'inline-block',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}
                        >
                            <RichText.Content
                                tagName="span"
                                value={buttonText}
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default save; 