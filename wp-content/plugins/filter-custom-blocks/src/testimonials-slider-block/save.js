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
        title,
        subtitle,
        buttonText,
        buttonLink,
        testimonials,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        cardBackgroundColor,
        slideInterval,
        autoplay,
        borderRadius,
        readMoreText,
        readMoreLink
    } = attributes;

    // Store the attributes as a data attribute for the frontend script
    const blockProps = useBlockProps.save({
        className: 'testimonials-full-width-wrapper',
        style: { backgroundColor, color: textColor },
        'data-attributes': JSON.stringify({
            testimonials,
            slideInterval,
            autoplay,
            buttonColor,
            buttonTextColor,
            cardBackgroundColor,
            borderRadius,
            backgroundColor,
            textColor
        })
    });

    // Calculate the number of slides (2 testimonials per slide)
    const slideCount = Math.ceil(testimonials.length / 2);

    return (
        <div {...blockProps}>
            <div className="testimonials-inner-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">{title}</h2>
                    <p className="testimonials-subtitle">{subtitle}</p>
                    {buttonText && (
                    <div className="testimonials-button-container">
                        <a 
                            href={buttonLink}
                            className="testimonials-button"
                            style={{
                                backgroundColor: buttonColor,
                                color: buttonTextColor,
                                borderRadius: '1000px'
                            }}
                        >
                            {buttonText}
                        </a>
                    </div>
                )}
                </div>
                
                <div className="testimonials-container">
                    <div className="testimonials-slider" data-autoplay={autoplay} data-interval={slideInterval}>
                        {Array.from({ length: slideCount }).map((_, slideIndex) => {
                            const slideTestimonials = testimonials.slice(slideIndex * 2, slideIndex * 2 + 2);
                            
                            return (
                                <div 
                                    key={`slide-${slideIndex}`}
                                    className={`testimonial-slide ${slideIndex === 0 ? 'active' : ''}`}
                                >
                                    <div className="testimonial-slide-content">
                                        {slideTestimonials.map((testimonial) => (
                                            <div 
                                                key={testimonial.id}
                                                className="testimonial-card"
                                                style={{ 
                                                    backgroundColor: cardBackgroundColor,
                                                    borderRadius: `${borderRadius}px`
                                                }}
                                            >
                                                <div className="testimonial-content">
                                                    <div className="testimonial-quote">
                                                        <p>{`"${testimonial.quote}"`}</p>
                                                    </div>
                                                    <div className="testimonial-author">
                                                        <p>{testimonial.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="testimonials-controls">
                        <div className="testimonials-navigation">
                            <div className="testimonials-dots">
                                {Array.from({ length: slideCount }).map((_, index) => (
                                    <button
                                        key={`dot-${index}`}
                                        type="button"
                                        className={`testimonial-dot ${index === 0 ? 'active' : ''}`}
                                        data-index={index}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 