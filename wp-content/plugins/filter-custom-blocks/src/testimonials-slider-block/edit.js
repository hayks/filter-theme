/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
    RangeControl,
    Button,
    ColorPicker,
    Dashicon
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
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
        borderRadius
    } = attributes;

    const [currentSlide, setCurrentSlide] = useState(0);

    // Get the number of slides based on showing 2 testimonials per slide
    const getSlideCount = () => {
        return Math.ceil(testimonials.length / 2);
    };

    // Move to previous slide
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? getSlideCount() - 1 : currentSlide - 1);
    };

    // Move to next slide
    const nextSlide = () => {
        setCurrentSlide(currentSlide === getSlideCount() - 1 ? 0 : currentSlide + 1);
    };

    // Add a new testimonial
    const addTestimonial = () => {
        const newTestimonial = {
            id: `${Date.now()}`,
            quote: 'Add your testimonial here...',
            author: 'Customer Name'
        };
        
        setAttributes({
            testimonials: [...testimonials, newTestimonial]
        });
        
        // Switch to the slide containing the new testimonial
        setCurrentSlide(Math.floor(testimonials.length / 2));
    };

    // Remove a testimonial
    const removeTestimonial = (index) => {
        const newTestimonials = [...testimonials];
        newTestimonials.splice(index, 1);
        
        setAttributes({
            testimonials: newTestimonials
        });
        
        // Adjust current slide if necessary
        if (Math.floor(index / 2) <= currentSlide && currentSlide > 0 && Math.floor((newTestimonials.length - 1) / 2) < currentSlide) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // Update a testimonial
    const updateTestimonial = (index, property, value) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = {
            ...newTestimonials[index],
            [property]: value
        };
        
        setAttributes({
            testimonials: newTestimonials
        });
    };

    // Get the testimonials for the current slide (2 per slide)
    const getCurrentSlideTestimonials = () => {
        const startIndex = currentSlide * 2;
        return testimonials.slice(startIndex, startIndex + 2);
    };

    // Get the overall testimonial index based on the slide and position
    const getTestimonialIndex = (slideIndex, position) => {
        return slideIndex * 2 + position;
    };

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'block-development-examples')}>
                    <TextControl
                        label={__('Title', 'block-development-examples')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextareaControl
                        label={__('Subtitle', 'block-development-examples')}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                    />
                    <TextControl
                        label={__('Button Text', 'block-development-examples')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <TextControl
                        label={__('Button Link', 'block-development-examples')}
                        value={buttonLink}
                        onChange={(value) => setAttributes({ buttonLink: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Testimonials', 'block-development-examples')}>
                    <div className="testimonial-controls">
                        <Button 
                            isPrimary
                            onClick={addTestimonial}
                        >
                            {__('Add Testimonial', 'block-development-examples')}
                        </Button>
                        
                        {testimonials.length > 0 && (
                            <div className="testimonial-navigation">
                                <p>{__('Navigate Slides:', 'block-development-examples')}</p>
                                <div className="testimonial-navigation-controls">
                                    <Button 
                                        isSecondary
                                        onClick={prevSlide}
                                        disabled={getSlideCount() <= 1}
                                    >
                                        <Dashicon icon="arrow-left-alt2" />
                                    </Button>
                                    <span>
                                        {currentSlide + 1} / {getSlideCount()}
                                    </span>
                                    <Button 
                                        isSecondary
                                        onClick={nextSlide}
                                        disabled={getSlideCount() <= 1}
                                    >
                                        <Dashicon icon="arrow-right-alt2" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {getCurrentSlideTestimonials().map((testimonial, index) => {
                        const testimonialIndex = getTestimonialIndex(currentSlide, index);
                        return (
                            <div key={testimonial.id} className="testimonial-editor">
                                <h3>{__(`Edit Testimonial ${testimonialIndex + 1}`, 'block-development-examples')}</h3>
                                
                                <TextareaControl
                                    label={__('Quote', 'block-development-examples')}
                                    value={testimonial.quote}
                                    onChange={(value) => updateTestimonial(testimonialIndex, 'quote', value)}
                                />
                                
                                <TextControl
                                    label={__('Author', 'block-development-examples')}
                                    value={testimonial.author}
                                    onChange={(value) => updateTestimonial(testimonialIndex, 'author', value)}
                                />
                                
                                <Button 
                                    isDestructive
                                    onClick={() => removeTestimonial(testimonialIndex)}
                                    disabled={testimonials.length <= 1}
                                >
                                    {__('Remove Testimonial', 'block-development-examples')}
                                </Button>
                            </div>
                        );
                    })}
                </PanelBody>

                <PanelBody title={__('Slider Settings', 'block-development-examples')}>
                    <ToggleControl
                        label={__('Auto-play Slides', 'block-development-examples')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />
                    
                    {autoplay && (
                        <RangeControl
                            label={__('Slide Interval (ms)', 'block-development-examples')}
                            value={slideInterval}
                            onChange={(value) => setAttributes({ slideInterval: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    
                    <RangeControl
                        label={__('Border Radius', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                </PanelBody>

                <PanelBody title={__('Style Settings', 'block-development-examples')}>
                    <div className="color-picker-control">
                        <p>{__('Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    
                    <div className="color-picker-control">
                        <p>{__('Card Background Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={cardBackgroundColor}
                            onChange={(value) => setAttributes({ cardBackgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    
                    <div className="color-picker-control">
                        <p>{__('Button Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={buttonColor}
                            onChange={(value) => setAttributes({ buttonColor: value })}
                            enableAlpha
                        />
                    </div>
                    
                    <div className="color-picker-control">
                        <p>{__('Button Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={buttonTextColor}
                            onChange={(value) => setAttributes({ buttonTextColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="testimonials-inner-container">
                    <div className="testimonials-header">
                        <RichText
                            tagName="h2"
                            className="testimonials-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Add testimonials title...', 'block-development-examples')}
                        />
                        
                        <RichText
                            tagName="p"
                            className="testimonials-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Add testimonials subtitle...', 'block-development-examples')}
                        />
                        
                        {buttonText && (
                            <div className="testimonials-button-container">
                                <a 
                                    href={buttonLink || '#'}
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
                        {testimonials.length === 0 ? (
                            <div className="testimonials-placeholder">
                                <p>{__('Add testimonials using the block settings panel.', 'block-development-examples')}</p>
                                <Button
                                    isPrimary
                                    onClick={addTestimonial}
                                >
                                    {__('Add Your First Testimonial', 'block-development-examples')}
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="testimonials-slider">
                                    <div 
                                        className="testimonial-slide active"
                                    >
                                        <div className="testimonial-slide-content">
                                            {getCurrentSlideTestimonials().map((testimonial, index) => {
                                                return (
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
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="testimonials-controls">
                                    <div className="testimonials-navigation">
                                        <div className="testimonials-dots">
                                            {Array.from({ length: getSlideCount() }).map((_, index) => (
                                                <button
                                                    key={`dot-${index}`}
                                                    type="button"
                                                    className={`testimonial-dot ${index === currentSlide ? 'active' : ''}`}
                                                    onClick={() => setCurrentSlide(index)}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 