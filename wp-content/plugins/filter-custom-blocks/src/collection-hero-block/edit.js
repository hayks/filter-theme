/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    Button, 
    ColorPicker,
    RangeControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Edit function for Collection Hero Block
 */
export default function Edit({ attributes, setAttributes }) {
    const { 
        mainImage, 
        smallImages, 
        label, 
        title, 
        description, 
        primaryButtonText, 
        primaryButtonUrl, 
        backgroundColor,
        textColor,
        primaryButtonColor,
        borderRadius
    } = attributes;

    const [selectedSmallImageIndex, setSelectedSmallImageIndex] = useState(null);

    const blockProps = useBlockProps();

    /**
     * Handle main image selection
     */
    const onSelectMainImage = (media) => {
        setAttributes({
            mainImage: {
                url: media.url,
                id: media.id,
                alt: media.alt || '',
            },
        });
    };

    /**
     * Remove main image
     */
    const removeMainImage = () => {
        setAttributes({
            mainImage: {
                url: '',
                id: 0,
                alt: '',
            },
        });
    };

    /**
     * Handle small image selection
     */
    const onSelectSmallImage = (index, media) => {
        const newSmallImages = [...smallImages];
        newSmallImages[index] = {
            ...newSmallImages[index],
            url: media.url,
            imageId: media.id,
            alt: media.alt || '',
        };
        setAttributes({ smallImages: newSmallImages });
    };

    /**
     * Remove small image
     */
    const removeSmallImage = (index) => {
        const newSmallImages = [...smallImages];
        newSmallImages[index] = {
            ...newSmallImages[index],
            url: '',
            imageId: 0,
            alt: '',
        };
        setAttributes({ smallImages: newSmallImages });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'block-development-examples')}>
                    <TextControl
                        label={__('Label', 'block-development-examples')}
                        value={label}
                        onChange={(value) => setAttributes({ label: value })}
                    />
                    <TextControl
                        label={__('Title', 'block-development-examples')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextControl
                        label={__('Description', 'block-development-examples')}
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        multiline="true"
                    />
                </PanelBody>

                <PanelBody title={__('Button Settings', 'block-development-examples')}>
                    <TextControl
                        label={__('Primary Button Text', 'block-development-examples')}
                        value={primaryButtonText}
                        onChange={(value) => setAttributes({ primaryButtonText: value })}
                    />
                    <TextControl
                        label={__('Primary Button URL', 'block-development-examples')}
                        value={primaryButtonUrl}
                        onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                    />

                </PanelBody>

                <PanelBody title={__('Main Image', 'block-development-examples')}>
                    <div className="components-base-control">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectMainImage}
                                allowedTypes={['image']}
                                value={mainImage.id}
                                render={({ open }) => (
                                    <div>
                                        {!mainImage.url ? (
                                            <Button 
                                                onClick={open}
                                                variant="primary"
                                                className="editor-post-featured-image__toggle"
                                            >
                                                {__('Select Main Image', 'block-development-examples')}
                                            </Button>
                                        ) : (
                                            <div>
                                                <img
                                                    src={mainImage.url}
                                                    alt={mainImage.alt}
                                                    style={{ maxWidth: '100%', marginBottom: '8px' }}
                                                />
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <Button 
                                                        onClick={open}
                                                        variant="secondary"
                                                    >
                                                        {__('Replace Image', 'block-development-examples')}
                                                    </Button>
                                                    <Button 
                                                        onClick={removeMainImage}
                                                        variant="tertiary"
                                                        isDestructive
                                                    >
                                                        {__('Remove Image', 'block-development-examples')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                </PanelBody>

                {selectedSmallImageIndex !== null && (
                    <PanelBody title={__('Small Image Settings', 'block-development-examples')}>
                        <div className="components-base-control">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => onSelectSmallImage(selectedSmallImageIndex, media)}
                                    allowedTypes={['image']}
                                    value={smallImages[selectedSmallImageIndex].imageId}
                                    render={({ open }) => (
                                        <div>
                                            {!smallImages[selectedSmallImageIndex].url ? (
                                                <Button 
                                                    onClick={open}
                                                    variant="primary"
                                                    className="editor-post-featured-image__toggle"
                                                >
                                                    {__('Select Image', 'block-development-examples')}
                                                </Button>
                                            ) : (
                                                <div>
                                                    <img
                                                        src={smallImages[selectedSmallImageIndex].url}
                                                        alt={smallImages[selectedSmallImageIndex].alt}
                                                        style={{ maxWidth: '100%', marginBottom: '8px' }}
                                                    />
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <Button 
                                                            onClick={open}
                                                            variant="secondary"
                                                        >
                                                            {__('Replace', 'block-development-examples')}
                                                        </Button>
                                                        <Button 
                                                            onClick={() => removeSmallImage(selectedSmallImageIndex)}
                                                            variant="tertiary"
                                                            isDestructive
                                                        >
                                                            {__('Remove', 'block-development-examples')}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </PanelBody>
                )}

                <PanelBody title={__('Style Settings', 'block-development-examples')}>
                    <RangeControl
                        label={__('Border Radius (px)', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <div className="color-picker-control">
                        <span className="color-picker-label">{__('Text Color', 'block-development-examples')}</span>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-picker-control">
                        <span className="color-picker-label">{__('Primary Button Color', 'block-development-examples')}</span>
                        <ColorPicker
                            color={primaryButtonColor}
                            onChange={(value) => setAttributes({ primaryButtonColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="collection-hero-container">
                    <div className="main-image-container" style={{ borderRadius: `${borderRadius}px` }}>
                        {mainImage.url ? (
                            <div className="image-preview">
                                <span 
                                    className="image-remove-button"
                                    onClick={removeMainImage}
                                    role="button"
                                    aria-label={__('Remove image', 'block-development-examples')}
                                >
                                    ✕
                                </span>
                                <img 
                                    src={mainImage.url} 
                                    alt={mainImage.alt} 
                                />
                            </div>
                        ) : (
                            <div 
                                className="image-placeholder main-image-placeholder"
                                onClick={() => {
                                    const mediaButton = document.querySelector('.components-panel .editor-post-featured-image__toggle');
                                    if (mediaButton) {
                                        mediaButton.click();
                                    }
                                }}
                            >
                                <span>{__('Add Main Image', 'block-development-examples')}</span>
                            </div>
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
                            </div>
                        </div>

                        <div className="small-images-container">
                            {smallImages.map((image, index) => (
                                <div 
                                    key={image.id}
                                    className={`small-image-wrapper small-image-selector ${selectedSmallImageIndex === index ? 'is-selected' : ''}`}
                                    style={{ borderRadius: `${borderRadius}px` }}
                                    onClick={() => setSelectedSmallImageIndex(index)}
                                >
                                    {image.url ? (
                                        <div className="image-preview">
                                            <span 
                                                className="image-remove-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeSmallImage(index);
                                                }}
                                                role="button"
                                                aria-label={__('Remove image', 'block-development-examples')}
                                            >
                                                ✕
                                            </span>
                                            <img 
                                                src={image.url} 
                                                alt={image.alt} 
                                            />
                                        </div>
                                    ) : (
                                        <div 
                                            className="image-placeholder small-image-placeholder"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSmallImageIndex(index);
                                                
                                                setTimeout(() => {
                                                    const mediaButton = document.querySelector('.components-panel .editor-post-featured-image__toggle');
                                                    if (mediaButton) {
                                                        mediaButton.click();
                                                    }
                                                }, 100);
                                            }}
                                        >
                                            <span>{__('Add Small Image', 'block-development-examples')}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 