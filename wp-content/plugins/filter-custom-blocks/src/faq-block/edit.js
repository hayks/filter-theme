/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    ColorPicker,
    RangeControl,
    TextControl,
    TextareaControl,
    ToggleControl,
    Button,
    IconButton
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, chevronUp, chevronDown } from '@wordpress/icons';

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
export default function Edit({ attributes, setAttributes }) {
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

    // Create a copy of items that we can modify in state
    const [faqItems, setFaqItems] = useState(items);

    // Function to update the items attribute when state changes
    const updateItems = (newItems) => {
        setFaqItems(newItems);
        setAttributes({ items: newItems });
    };

    // Toggle FAQ item open/close state
    const toggleItem = (id) => {
        const newItems = faqItems.map(item => 
            item.id === id ? { ...item, isOpen: !item.isOpen } : item
        );
        updateItems(newItems);
    };

    // Add a new FAQ item
    const addItem = () => {
        const newItem = {
            id: `${Date.now()}`,
            question: 'New FAQ Question',
            answer: 'Your answer goes here...',
            isOpen: false
        };
        updateItems([...faqItems, newItem]);
    };

    // Remove an FAQ item
    const removeItem = (id) => {
        const newItems = faqItems.filter(item => item.id !== id);
        updateItems(newItems);
    };

    // Update FAQ item content
    const updateItemContent = (id, field, value) => {
        const newItems = faqItems.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        );
        updateItems(newItems);
    };

    // Move item up in the list
    const moveItemUp = (index) => {
        if (index === 0) return;
        const newItems = [...faqItems];
        const temp = newItems[index];
        newItems[index] = newItems[index - 1];
        newItems[index - 1] = temp;
        updateItems(newItems);
    };

    // Move item down in the list
    const moveItemDown = (index) => {
        if (index === faqItems.length - 1) return;
        const newItems = [...faqItems];
        const temp = newItems[index];
        newItems[index] = newItems[index + 1];
        newItems[index + 1] = temp;
        updateItems(newItems);
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
                </PanelBody>

                <PanelBody title={__('Style Settings', 'block-development-examples')}>
                    <div className="color-picker-control">
                        <p>{__('Background Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-picker-control">
                        <p>{__('Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    <RangeControl
                        label={__('Border Radius', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Item Spacing', 'block-development-examples')}
                        value={itemSpacing}
                        onChange={(value) => setAttributes({ itemSpacing: value })}
                        min={5}
                        max={50}
                    />
                </PanelBody>

                <PanelBody title={__('Read More Button', 'block-development-examples')}>
                    <ToggleControl
                        label={__('Show Read More Button', 'block-development-examples')}
                        checked={showReadMoreButton}
                        onChange={(value) => setAttributes({ showReadMoreButton: value })}
                    />
                    {showReadMoreButton && (
                        <>
                            <TextControl
                                label={__('Button Text', 'block-development-examples')}
                                value={readMoreButtonText}
                                onChange={(value) => setAttributes({ readMoreButtonText: value })}
                            />
                            <TextControl
                                label={__('Button URL', 'block-development-examples')}
                                value={readMoreButtonUrl}
                                onChange={(value) => setAttributes({ readMoreButtonUrl: value })}
                            />
                            <div className="color-picker-control">
                                <p>{__('Button Color', 'block-development-examples')}</p>
                                <ColorPicker
                                    color={readMoreButtonColor}
                                    onChange={(value) => setAttributes({ readMoreButtonColor: value })}
                                    enableAlpha
                                />
                            </div>
                            <div className="color-picker-control">
                                <p>{__('Button Text Color', 'block-development-examples')}</p>
                                <ColorPicker
                                    color={readMoreButtonTextColor}
                                    onChange={(value) => setAttributes({ readMoreButtonTextColor: value })}
                                    enableAlpha
                                />
                            </div>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div
                {...blockProps}
                style={{
                    color: textColor,
                }}
            >
                <div className="faq-header">
                    <RichText
                        tagName="h2"
                        className="faq-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('FAQs', 'block-development-examples')}
                    />
                    <RichText
                        tagName="p"
                        className="faq-subtitle"
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Add a subtitle here...', 'block-development-examples')}
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
                    {faqItems.map((item, index) => (
                        <div 
                            key={item.id}
                            className={`faq-item ${item.isOpen ? 'is-open' : ''}`}
                            style={{
                                backgroundColor: backgroundColor,
                                borderRadius: `${borderRadius}px`,
                            }}
                        >
                            <div className="faq-item-header">
                                <div className="faq-question-container">
                                    <RichText
                                        tagName="h3"
                                        className="faq-question"
                                        value={item.question}
                                        onChange={(value) => updateItemContent(item.id, 'question', value)}
                                        placeholder={__('Question here...', 'block-development-examples')}
                                    />
                                </div>
                                
                                <div className="faq-item-controls">
                                    <IconButton
                                        icon={chevronUp}
                                        label={__('Move Up', 'block-development-examples')}
                                        onClick={() => moveItemUp(index)}
                                        className="faq-move-button"
                                        disabled={index === 0}
                                    />
                                    <IconButton
                                        icon={chevronDown}
                                        label={__('Move Down', 'block-development-examples')}
                                        onClick={() => moveItemDown(index)}
                                        className="faq-move-button"
                                        disabled={index === faqItems.length - 1}
                                    />
                                    <IconButton
                                        icon={trash}
                                        label={__('Remove FAQ Item', 'block-development-examples')}
                                        onClick={() => removeItem(item.id)}
                                        className="faq-remove-button"
                                    />
                                    <button 
                                        className="faq-toggle-button"
                                        onClick={() => toggleItem(item.id)}
                                        aria-expanded={item.isOpen}
                                    >
                                        <span className="dashicons dashicons-arrow-down-alt2"></span>
                                    </button>
                                </div>
                            </div>
                            
                            {item.isOpen && (
                                <div className="faq-answer-container">
                                    <RichText
                                        tagName="div"
                                        className="faq-answer"
                                        value={item.answer}
                                        onChange={(value) => updateItemContent(item.id, 'answer', value)}
                                        placeholder={__('Answer here...', 'block-development-examples')}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    className="faq-add-button"
                    onClick={addItem}
                    icon={plus}
                >
                    {__('Add FAQ Item', 'block-development-examples')}
                </Button>
            </div>
        </>
    );
}
