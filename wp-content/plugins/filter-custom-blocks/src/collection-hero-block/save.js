/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function for Collection Hero Block
 */
export default function save({ attributes }) {
    const { 
        mainImage, 
        smallImages, 
        label, 
        title, 
        description, 
        primaryButtonText, 
        primaryButtonUrl, 
        textColor,
        primaryButtonColor,
        borderRadius
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="collection-hero-container">
                <div className="main-image-container" style={{ borderRadius: `${borderRadius}px` }}>
                    {mainImage.url && (
                        <img 
                            src={mainImage.url} 
                            alt={mainImage.alt || ''} 
                        />
                    )}
                </div>

                <div className="content-container">
                    <div className="text-content">
                        <div className="collection-label" style={{ color: textColor }}>
                            {label}
                        </div>
                        <h2 className="collection-title" style={{ color: textColor }}>
                            {title}
                        </h2>
                        <p className="collection-description" style={{ color: textColor }}>
                            {description}
                        </p>
                        <div className="button-container">
                            {primaryButtonText && (
                                <a 
                                    href={primaryButtonUrl} 
                                    className="primary-button"
                                    style={{ 
                                        backgroundColor: primaryButtonColor, 
                                        color: '#FFFFFF' 
                                    }}
                                >
                                    {primaryButtonText}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="small-images-container">
                        {smallImages.map((image) => (
                            image.url && (
                                <div 
                                    key={image.id}
                                    className="small-image-wrapper"
                                    style={{ borderRadius: `${borderRadius}px` }}
                                >
                                    <img 
                                        src={image.url} 
                                        alt={image.alt || ''} 
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 