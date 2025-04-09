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
    RangeControl,
    SelectControl,
    TextareaControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Editor styles
 */
import './editor.scss';

// SVG icons for the style2 cards
const cardIcons = {
    'calendar-star': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6V40H42V6H6ZM38 36H10V16H38V36ZM38 12H10V10H38V12ZM14 20H20V26H14V20ZM14 30H20V36H14V30ZM24 20H30V26H24V20ZM24 30H30V36H24V30ZM36 20H34V22H36V20ZM36 26H34V28H36V26ZM36 32H34V34H36V32Z" fill="currentColor"/>
        </svg>,
    'truck-delivery': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 18H42V8H2V34H6C6 35.6 6.6 37 7.8 38.2C9 39.4 10.4 40 12 40C13.6 40 15 39.4 16.2 38.2C17.4 37 18 35.6 18 34H30C30 35.6 30.6 37 31.8 38.2C33 39.4 34.4 40 36 40C37.6 40 39 39.4 40.2 38.2C41.4 37 42 35.6 42 34H46V26L46 18ZM12 36C11.2 36 10.5 35.7 10 35.2C9.5 34.7 9.2 34 9.2 33.2C9.2 32.4 9.5 31.7 10 31.2C10.5 30.7 11.2 30.4 12 30.4C12.8 30.4 13.5 30.7 14 31.2C14.5 31.7 14.8 32.4 14.8 33.2C14.8 34 14.5 34.7 14 35.2C13.5 35.7 12.8 36 12 36ZM38 22V26H42V30H41.8C41.6 29.2 41.2 28.4 40.4 27.8C39.6 27.2 38.8 26.8 37.8 26.8C36.8 26.8 36 27.2 35.2 27.8C34.4 28.4 34 29.2 33.8 30H30V12H38V22ZM36 36C35.2 36 34.5 35.7 34 35.2C33.5 34.7 33.2 34 33.2 33.2C33.2 32.4 33.5 31.7 34 31.2C34.5 30.7 35.2 30.4 36 30.4C36.8 30.4 37.5 30.7 38 31.2C38.5 31.7 38.8 32.4 38.8 33.2C38.8 34 38.5 34.7 38 35.2C37.5 35.7 36.8 36 36 36Z" fill="currentColor"/>
        </svg>,
    'creation': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2C12 2 2 12 2 24C2 36 12 46 24 46C36 46 46 36 46 24C46 12 36 2 24 2ZM24 6C27.9 6 31.5 7.4 34.4 9.6L9.6 34.4C7.4 31.5 6 27.9 6 24C6 14.1 14.1 6 24 6ZM24 42C20.1 42 16.5 40.6 13.6 38.4L38.4 13.6C40.6 16.5 42 20.1 42 24C42 33.9 33.9 42 24 42Z" fill="currentColor"/>
        </svg>,
    'sprout': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 44H28V31.9C34.3 31.4 39.5 26.7 40 21V12H30V10H26V21.2C26 24.8 24.1 28.3 20.9 30.3L16 33.4V18H12C8.4 18 4.9 19.9 2.9 23.1L0 28V44H4V36H20V44H24ZM36 16V21C36 22.9 35.2 24.6 33.9 25.9C32.6 27.2 30.9 28 29 28C27.1 28 25.4 27.2 24.1 25.9C23.8 25.6 23.6 25.3 23.4 24.9C26.5 23.6 28.9 20.7 29.7 17H36V16ZM4 32V30.3L5.4 28C6.6 26.1 8.8 25 11.1 25H12V30.6L8.8 28.1L5.9 32H4Z" fill="currentColor"/>
        </svg>,
    'brightness-percent': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 26C15.1046 26 16 25.1046 16 24C16 22.8954 15.1046 22 14 22C12.8954 22 12 22.8954 12 24C12 25.1046 12.8954 26 14 26Z" fill="currentColor"/>
            <path d="M34 22C32.8954 22 32 22.8954 32 24C32 25.1046 32.8954 26 34 26C35.1046 26 36 25.1046 36 24C36 22.8954 35.1046 22 34 22Z" fill="currentColor"/>
            <path d="M24 4V12H28V4H24Z" fill="currentColor"/>
            <path d="M36 12.34L41.66 6.68L38.82 3.84L33.16 9.5L36 12.34Z" fill="currentColor"/>
            <path d="M44 24V20H36V24H44Z" fill="currentColor"/>
            <path d="M38.82 44.16L41.66 41.32L36 35.66L33.16 38.5L38.82 44.16Z" fill="currentColor"/>
            <path d="M24 36V44H28V36H24Z" fill="currentColor"/>
            <path d="M12 36.16L6.34 41.82L9.18 44.66L14.84 39L12 36.16Z" fill="currentColor"/>
            <path d="M12 20H4V24H12V20Z" fill="currentColor"/>
            <path d="M9.18 3.34L6.34 6.18L12 11.84L14.84 9L9.18 3.34Z" fill="currentColor"/>
            <path d="M20.9 29.1L29.1 20.9C29.6 20.4 29.6 19.6 29.1 19.1C28.6 18.6 27.8 18.6 27.3 19.1L19.1 27.3C18.6 27.8 18.6 28.6 19.1 29.1C19.6 29.6 20.4 29.6 20.9 29.1Z" fill="currentColor"/>
        </svg>,
    'clipboard-arrow-left': 
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 34H30V30H18V34Z" fill="currentColor"/>
            <path d="M16 6H14C12.9 6 12 6.9 12 8V40C12 41.1 12.9 42 14 42H34C35.1 42 36 41.1 36 40V8C36 6.9 35.1 6 34 6H32V10H16V6ZM16 2H24H32C32 3.1 31.1 4 30 4H18C16.9 4 16 3.1 16 2Z" fill="currentColor"/>
            <path d="M18 26H30V22H18V26Z" fill="currentColor"/>
            <path d="M27.2 13.2L23.4 9.4L16.8 16L23.4 22.6L27.2 18.8L24.4 16L27.2 13.2Z" fill="currentColor"/>
        </svg>
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { 
        cards, 
        cardBackgroundColor, 
        cardTextColor, 
        borderRadius,
        cardStyle,
        style2Cards
    } = attributes;

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(0);

    const blockProps = useBlockProps();

    const handleCardChange = (index, property, value) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], [property]: value };
        setAttributes({ cards: newCards });
        setForceUpdate(prev => prev + 1);
    };

    const handleStyle2CardChange = (index, property, value) => {
        const newCards = JSON.parse(JSON.stringify(style2Cards));
        newCards[index] = { ...newCards[index], [property]: value };
        setAttributes({ style2Cards: newCards });
        setForceUpdate(prev => prev + 1);
    };

    const handleSelectImage = (index, media) => {
        if (!media || !media.url) {
            return;
        }
        
        handleCardChange(index, 'imageUrl', media.url);
        handleCardChange(index, 'imageId', media.id);
        handleCardChange(index, 'imageAlt', media.alt || '');
        
        const newCards = [...cards];
        newCards[index] = { 
            ...newCards[index], 
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt || ''
        };
        setAttributes({ cards: newCards });
        setForceUpdate(prev => prev + 1);
    };

    const handleRemoveImage = (index) => {
        handleCardChange(index, 'imageUrl', '');
        handleCardChange(index, 'imageId', 0);
        handleCardChange(index, 'imageAlt', '');
        setForceUpdate(prev => prev + 1);
    };

    const handleSelectStyle2Image = (index, media) => {
        if (!media || !media.url) {
            return;
        }

        const newCards = [...style2Cards];
        newCards[index] = {
            ...newCards[index],
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt || ''
        };
        setAttributes({ style2Cards: newCards });
        setForceUpdate(prev => prev + 1);
    };

    const handleRemoveStyle2Image = (index) => {
        const newCards = [...style2Cards];
        newCards[index] = {
            ...newCards[index],
            imageUrl: '',
            imageId: 0,
            imageAlt: ''
        };
        setAttributes({ style2Cards: newCards });
        setForceUpdate(prev => prev + 1);
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Card Grid Settings', 'block-development-examples')}>
                    <SelectControl
                        label={__('Card Style', 'block-development-examples')}
                        value={cardStyle}
                        options={[
                            { label: 'Style 1 (Image Cards)', value: 'style1' },
                            { label: 'Style 2 (Icon Cards)', value: 'style2' },
                        ]}
                        onChange={(value) => setAttributes({ cardStyle: value })}
                    />
                    
                    <RangeControl
                        label={__('Border Radius', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    
                    <div className="color-picker-control">
                        <p>{__('Card Background Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={cardBackgroundColor}
                            onChange={(value) => setAttributes({ cardBackgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    
                    <div className="color-picker-control">
                        <p>{__('Card Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={cardTextColor}
                            onChange={(value) => setAttributes({ cardTextColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>

                {cardStyle === 'style1' && selectedCardIndex !== null && (
                    <PanelBody title={__('Card Settings', 'block-development-examples')}>
                        <TextControl
                            label={__('Title', 'block-development-examples')}
                            value={cards[selectedCardIndex].title}
                            onChange={(value) => handleCardChange(selectedCardIndex, 'title', value)}
                        />
                        
                        <TextareaControl
                            label={__('Description', 'block-development-examples')}
                            value={cards[selectedCardIndex].description}
                            onChange={(value) => handleCardChange(selectedCardIndex, 'description', value)}
                        />
                        
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Image', 'block-development-examples')}
                            </label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => handleSelectImage(selectedCardIndex, media)}
                                    allowedTypes={['image']}
                                    value={cards[selectedCardIndex].imageId}
                                    render={({ open }) => (
                                        <div>
                                            {!cards[selectedCardIndex].imageUrl ? (
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
                                                        src={cards[selectedCardIndex].imageUrl}
                                                        alt={cards[selectedCardIndex].imageAlt || ''}
                                                        className="edit-card-image-preview"
                                                    />
                                                    <div className="edit-card-image-buttons">
                                                        <Button
                                                            onClick={open}
                                                            variant="secondary"
                                                            className="edit-card-replace-image"
                                                        >
                                                            {__('Replace Image', 'block-development-examples')}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleRemoveImage(selectedCardIndex)}
                                                            variant="tertiary"
                                                            className="edit-card-remove-image"
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
                )}

                {cardStyle === 'style2' && selectedCardIndex !== null && (
                    <PanelBody title={__('Icon Card Settings', 'block-development-examples')}>
                        <TextControl
                            label={__('Title', 'block-development-examples')}
                            value={style2Cards[selectedCardIndex].title}
                            onChange={(value) => handleStyle2CardChange(selectedCardIndex, 'title', value)}
                        />
                        
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Icon Image', 'block-development-examples')}
                            </label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => handleSelectStyle2Image(selectedCardIndex, media)}
                                    allowedTypes={['image']}
                                    value={style2Cards[selectedCardIndex].imageId}
                                    render={({ open }) => (
                                        <div>
                                            {!style2Cards[selectedCardIndex].imageUrl ? (
                                                <Button
                                                    onClick={open}
                                                    variant="primary"
                                                    className="editor-post-featured-image__toggle"
                                                >
                                                    {__('Select Icon Image', 'block-development-examples')}
                                                </Button>
                                            ) : (
                                                <div>
                                                    <img
                                                        src={style2Cards[selectedCardIndex].imageUrl}
                                                        alt={style2Cards[selectedCardIndex].imageAlt || ''}
                                                        className="edit-card-image-preview edit-icon-image-preview"
                                                    />
                                                    <div className="edit-card-image-buttons">
                                                        <Button
                                                            onClick={open}
                                                            variant="secondary"
                                                            className="edit-card-replace-image"
                                                        >
                                                            {__('Replace Icon', 'block-development-examples')}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleRemoveStyle2Image(selectedCardIndex)}
                                                            variant="tertiary"
                                                            className="edit-card-remove-image"
                                                        >
                                                            {__('Remove Icon', 'block-development-examples')}
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
            </InspectorControls>

            <div {...blockProps}>
                {cardStyle === 'style1' ? (
                    <div className="card-grid">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`card-grid-item ${selectedCardIndex === index ? 'is-selected' : ''}`}
                                style={{
                                    backgroundColor: cardBackgroundColor,
                                    borderRadius: `${borderRadius}px`,
                                }}
                                onClick={() => setSelectedCardIndex(index)}
                            >
                                <div className="card-inner">
                                    {card.imageUrl ? (
                                        <div 
                                            className="card-image-container"
                                            style={{ borderRadius: `${borderRadius / 8}px` }}
                                        >
                                            <img
                                                src={card.imageUrl}
                                                alt={card.imageAlt || ''}
                                                className="card-image"
                                            />
                                        </div>
                                    ) : (
                                        <div 
                                            className="card-image-placeholder"
                                            style={{ borderRadius: `${borderRadius / 8}px` }}
                                        >
                                            <span>{__('Select an image', 'block-development-examples')}</span>
                                        </div>
                                    )}
                                    <h3 
                                        className="card-title"
                                        style={{ color: cardTextColor }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p 
                                        className="card-description"
                                        style={{ color: cardTextColor }}
                                    >
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card-grid-style2">
                        {style2Cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`card-grid-item-style2 ${selectedCardIndex === index ? 'is-selected' : ''}`}
                                data-id={card.id}
                                style={{
                                    backgroundColor: cardBackgroundColor,
                                    borderRadius: `${borderRadius}px`,
                                }}
                                onClick={() => setSelectedCardIndex(index)}
                            >
                                <div className="card-icon">
                                    {card.imageUrl ? (
                                        <img
                                            src={card.imageUrl}
                                            alt={card.imageAlt || ''}
                                            className="card-icon-image"
                                        />
                                    ) : cardIcons[Object.keys(cardIcons)[index % Object.keys(cardIcons).length]] || (
                                        <div className="card-icon-placeholder"></div>
                                    )}
                                </div>
                                <h3 
                                    className="card-title-style2"
                                    style={{ color: cardTextColor }}
                                >
                                    {card.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 