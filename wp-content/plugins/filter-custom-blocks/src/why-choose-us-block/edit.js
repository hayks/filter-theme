/**
 * WordPress dependencies
 */
import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    PanelColorSettings,
    __experimentalLinkControl as LinkControl,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    RangeControl,
    SelectControl,
    __experimentalNumberControl as NumberControl,
    BaseControl,
    ToggleControl,
    Icon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

// Custom SVG icon component
const CheckmarkIcon = () => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.815918C4.5 0.815918 0 5.31592 0 10.8159C0 16.3159 4.5 20.8159 10 20.8159C15.5 20.8159 20 16.3159 20 10.8159C20 5.31592 15.5 0.815918 10 0.815918ZM8 15.8159L3 10.8159L4.41 9.40592L8 12.9859L15.59 5.39592L17 6.81592L8 15.8159Z" fill="currentColor" />
    </svg>
);

/**
 * Edit component for the Why Choose Us block
 */
function Edit({ attributes, setAttributes }) {
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
        imageId,
        imageAlt,
        benefits,
        borderRadius,
    } = attributes;

    // Use block props to ensure proper block attributes
    const blockProps = useBlockProps({
        className: 'why-choose-us-block',
        style: {
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadius}px`,
            color: textColor
        }
    });

    /**
     * Updates a benefit text
     */
    const updateBenefitText = (text, index) => {
        const newBenefits = [...benefits];
        newBenefits[index].text = text;
        setAttributes({ benefits: newBenefits });
    };

    /**
     * Adds a new benefit
     */
    const addBenefit = () => {
        const newBenefits = [
            ...benefits,
            {
                id: benefits.length > 0 ? Math.max(...benefits.map(b => b.id)) + 1 : 1,
                text: 'New benefit item'
            }
        ];
        setAttributes({ benefits: newBenefits });
    };

    /**
     * Removes a benefit
     */
    const removeBenefit = (index) => {
        const newBenefits = [...benefits];
        newBenefits.splice(index, 1);
        setAttributes({ benefits: newBenefits });
    };

    /**
     * Moves a benefit up in the list
     */
    const moveBenefitUp = (index) => {
        if (index === 0) return;
        const newBenefits = [...benefits];
        const temp = newBenefits[index];
        newBenefits[index] = newBenefits[index - 1];
        newBenefits[index - 1] = temp;
        setAttributes({ benefits: newBenefits });
    };

    /**
     * Moves a benefit down in the list
     */
    const moveBenefitDown = (index) => {
        if (index === benefits.length - 1) return;
        const newBenefits = [...benefits];
        const temp = newBenefits[index];
        newBenefits[index] = newBenefits[index + 1];
        newBenefits[index + 1] = temp;
        setAttributes({ benefits: newBenefits });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Image Settings', 'block-development-examples')} initialOpen={true}>
                    <div className="editor-image-select">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id,
                                        imageAlt: media.alt || '',
                                    });
                                }}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <>
                                        {!imageUrl ? (
                                            <Button
                                                variant="primary"
                                                onClick={open}
                                                icon="upload"
                                            >
                                                {__('Upload Image', 'block-development-examples')}
                                            </Button>
                                        ) : (
                                            <div className="image-preview-wrapper">
                                                <img
                                                    src={imageUrl}
                                                    alt={imageAlt}
                                                    style={{ width: '100%', height: 'auto' }}
                                                />
                                                <div className="image-actions">
                                                    <Button
                                                        isSecondary
                                                        onClick={open}
                                                    >
                                                        {__('Replace Image', 'block-development-examples')}
                                                    </Button>
                                                    <Button
                                                        isDestructive
                                                        onClick={() => {
                                                            setAttributes({
                                                                imageUrl: '',
                                                                imageId: 0,
                                                                imageAlt: '',
                                                            });
                                                        }}
                                                    >
                                                        {__('Remove Image', 'block-development-examples')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </MediaUploadCheck>
                        {imageUrl && (
                            <TextControl
                                label={__('Alt Text', 'block-development-examples')}
                                value={imageAlt}
                                onChange={(value) => setAttributes({ imageAlt: value })}
                                help={__('Alternative text for screen readers', 'block-development-examples')}
                            />
                        )}
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Benefits', 'block-development-examples')} initialOpen={false}>
                    {benefits.map((benefit, index) => (
                        <div key={benefit.id} className="benefit-item-editor">
                            <TextControl
                                label={__(`Benefit ${index + 1}`, 'block-development-examples')}
                                value={benefit.text}
                                onChange={(value) => updateBenefitText(value, index)}
                            />
                            <div className="benefit-actions">
                                <Button 
                                    isSmall 
                                    icon="arrow-up-alt2" 
                                    onClick={() => moveBenefitUp(index)}
                                    disabled={index === 0}
                                />
                                <Button 
                                    isSmall 
                                    icon="arrow-down-alt2" 
                                    onClick={() => moveBenefitDown(index)}
                                    disabled={index === benefits.length - 1}
                                />
                                <Button 
                                    isSmall 
                                    isDestructive 
                                    icon="trash" 
                                    onClick={() => removeBenefit(index)}
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addBenefit}
                        className="add-benefit-button"
                        icon="plus"
                    >
                        {__('Add Benefit', 'block-development-examples')}
                    </Button>
                </PanelBody>
                
                <PanelBody title={__('Button Settings', 'block-development-examples')} initialOpen={false}>
                    <TextControl
                        label={__('Button Text', 'block-development-examples')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <BaseControl
                        label={__('Button Link', 'block-development-examples')}
                        className="linkcontrol-wrapper"
                    >
                        <div className="customlink-control-wrapper">
                            <TextControl
                                value={buttonUrl}
                                onChange={(value) => setAttributes({ buttonUrl: value })}
                                placeholder="https://"
                            />
                        </div>
                    </BaseControl>
                </PanelBody>
                
                <PanelBody title={__('Style Settings', 'block-development-examples')} initialOpen={false}>
                    <RangeControl
                        label={__('Border Radius (px)', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                </PanelBody>
                
                <PanelColorSettings
                    title={__('Color Settings', 'block-development-examples')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Background Color', 'block-development-examples'),
                        },
                        {
                            value: textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                            label: __('Text Color', 'block-development-examples'),
                        },
                        {
                            value: buttonColor,
                            onChange: (color) => setAttributes({ buttonColor: color }),
                            label: __('Button Color', 'block-development-examples'),
                        },
                        {
                            value: buttonTextColor,
                            onChange: (color) => setAttributes({ buttonTextColor: color }),
                            label: __('Button Text Color', 'block-development-examples'),
                        },
                    ]}
                />
            </InspectorControls>

            <div {...blockProps}>
                <div className="why-choose-us-image">
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt={imageAlt}
                            className="featured-image"
                        />
                    ) : (
                        <div className="image-placeholder">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        setAttributes({
                                            imageUrl: media.url,
                                            imageId: media.id,
                                            imageAlt: media.alt || '',
                                        });
                                    }}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <Button
                                            isPrimary
                                            onClick={open}
                                            icon="format-image"
                                        >
                                            {__('Select Image', 'block-development-examples')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    )}
                </div>
                
                <div className="why-choose-us-content">
                    <RichText
                        tagName="h2"
                        className="why-choose-us-title"
                        value={title}
                        onChange={(content) => setAttributes({ title: content })}
                        placeholder={__('Why Choose Us?', 'block-development-examples')}
                        style={{ color: textColor }}
                    />
                    
                    <RichText
                        tagName="p"
                        className="why-choose-us-description"
                        value={description}
                        onChange={(content) => setAttributes({ description: content })}
                        placeholder={__('Enter description here...', 'block-development-examples')}
                        style={{ color: textColor }}
                    />
                    
                    <div className="why-choose-us-benefits">
                        {benefits.map((benefit, index) => (
                            <div key={benefit.id} className="why-choose-us-benefit-item">
                                <span className="benefit-icon" style={{ color: textColor }}>
                                    <CheckmarkIcon />
                                </span>
                                <RichText
                                    tagName="span"
                                    className="benefit-text"
                                    value={benefit.text}
                                    onChange={(content) => updateBenefitText(content, index)}
                                    placeholder={__('Enter benefit text...', 'block-development-examples')}
                                    style={{ color: textColor }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="why-choose-us-button-wrapper">
                        <RichText
                            tagName="span"
                            className="why-choose-us-button"
                            value={buttonText}
                            onChange={(content) => setAttributes({ buttonText: content })}
                            placeholder={__('Button text', 'block-development-examples')}
                            style={{ 
                                backgroundColor: buttonColor,
                                color: buttonTextColor,
                                borderRadius: '10000px',
                                padding: '10px 20px',
                                display: 'inline-block'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit; 