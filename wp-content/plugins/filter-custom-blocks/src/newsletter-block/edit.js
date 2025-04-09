import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker } from '@wordpress/components';
import './index.css';

const Edit = ({ attributes, setAttributes }) => {
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

    const blockProps = useBlockProps({
        style: {
            backgroundColor: backgroundColor || '#4D5A5E',
            color: textColor || '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
            height: '205px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
            maxWidth: 'var(--wp--style--global--content-size, 1140px)',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Form Settings', 'block-development-examples')} initialOpen={true}>
                    <TextControl
                        label={__('Placeholder Text', 'block-development-examples')}
                        value={placeholderText}
                        onChange={(value) => setAttributes({ placeholderText: value })}
                    />
                    <TextControl
                        label={__('Button Text', 'block-development-examples')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <div>
                        <p>{__('Background Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={backgroundColor || '#4D5A5E'}
                            onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                            disableAlpha
                        />
                    </div>
                    <div>
                        <p>{__('Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={textColor || '#FFFFFF'}
                            onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                            disableAlpha
                        />
                    </div>
                    <div>
                        <p>{__('Button Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={buttonColor || '#FFFFFF'}
                            onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
                            disableAlpha
                        />
                    </div>
                    <div>
                        <p>{__('Button Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={buttonTextColor || '#4D5A5E'}
                            onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
                            disableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="newsletter-block-container">
                    <RichText
                        tagName="h2"
                        className="newsletter-block-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Add Title', 'block-development-examples')}
                    />
                    <RichText
                        tagName="p"
                        className="newsletter-block-description"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Add Description', 'block-development-examples')}
                    />
                    <div className="newsletter-block-form">
                        <div className="newsletter-block-input-wrapper">
                            <div className="newsletter-block-input">
                                <span className="newsletter-block-placeholder">
                                    {placeholderText}
                                </span>
                            </div>
                        </div>
                        <button 
                            className="newsletter-block-button"
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
        </>
    );
};

export default Edit; 