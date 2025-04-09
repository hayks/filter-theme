import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        title,
        description,
        placeholderText,
        buttonText,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor
    } = attributes;

    const blockStyle = {
        backgroundColor: backgroundColor || '#4D5A5E',
        color: textColor || '#FFFFFF',
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        height: '205px'
    };

    return (
        <div {...useBlockProps.save({ style: blockStyle })}>
            <div className="newsletter-block-container">
                <h2 className="newsletter-block-title" style={{ color: textColor || '#FFFFFF' }}>
                    {title}
                </h2>
                <p className="newsletter-block-description" style={{ color: textColor || '#FFFFFF' }}>
                    {description}
                </p>
                <div className="newsletter-block-form">
                    <div className="newsletter-block-input-wrapper">
                        <div className="newsletter-block-input" style={{ backgroundColor: buttonColor || '#FFFFFF' }}>
                            <span className="newsletter-block-placeholder" style={{ color: 'rgba(0,0,0,0.5)' }}>
                                {placeholderText}
                            </span>
                        </div>
                    </div>
                    <button
                        className="newsletter-block-button"
                        style={{
                            backgroundColor: buttonColor || '#FFFFFF',
                            color: buttonTextColor || '#4D5A5E'
                        }}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            <div className="newsletter-block-background-circles">
                <div className="newsletter-block-circle newsletter-block-circle-1"></div>
                <div className="newsletter-block-circle newsletter-block-circle-2"></div>
            </div>
        </div>
    );
};

export default Save; 