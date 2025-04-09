import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker, Button, RangeControl } from '@wordpress/components';
import './index.css';

const Edit = ({ attributes, setAttributes, clientId }) => {
	const {
		imageUrl,
		title,
		description,
		primaryButtonText,
		secondaryButtonText,
		primaryButtonLink,
		secondaryButtonLink,
		textColor,
		cornerRadius,
		id
	} = attributes;

	// Set a unique ID for the block if not already set
	if (!id) {
		setAttributes({ id: 'image-hero-' + clientId.slice(0, 8) });
	}

	// Add inline style directly to the img tag
	const imgStyle = {
		borderRadius: `${cornerRadius}px !important`,
		WebkitBorderRadius: `${cornerRadius}px !important`,
		MozBorderRadius: `${cornerRadius}px !important`,
		transform: 'none !important',
		transition: 'none !important',
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	};

	// Define inline styles for buttons
	const primaryButtonStyle = {
		width: '193px',
		minWidth: '0',
		maxWidth: 'none',
		backgroundColor: '#F2F2F2',
		color: '#4D5A5E',
		border: 'none',
		borderRadius: '10000px',
		height: '39px',
	};

	const secondaryButtonStyle = {
		width: '160px',
		minWidth: '0',
		maxWidth: 'none',
		backgroundColor: '#4D5A5E',
		color: '#FFFFFF',
		border: '1px solid rgba(0,0,0,0.15)',
		borderRadius: '72px',
		height: '39px',
	};

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'block-development-examples')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageUrl: media.url })}
							allowedTypes={['image']}
							value={imageUrl}
							render={({ open }) => (
								<Button
									className="editor-media-placeholder__button is-button is-default is-large"
									onClick={open}
								>
									{imageUrl ? __('Replace Image', 'block-development-examples') : __('Upload Image', 'block-development-examples')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{imageUrl && (
						<Button 
							className="clear-image-button"
							onClick={() => setAttributes({ imageUrl: '' })}
							isSecondary
							isSmall
							style={{ marginTop: '10px' }}
						>
							{__('Remove Image', 'block-development-examples')}
						</Button>
					)}
				</PanelBody>

				<PanelBody title={__('Button Settings', 'block-development-examples')} initialOpen={false}>
					<TextControl
						label={__('Primary Button Text', 'block-development-examples')}
						value={primaryButtonText}
						onChange={(value) => setAttributes({ primaryButtonText: value })}
					/>
					<TextControl
						label={__('Primary Button Link', 'block-development-examples')}
						value={primaryButtonLink}
						onChange={(value) => setAttributes({ primaryButtonLink: value })}
					/>
					<TextControl
						label={__('Secondary Button Text', 'block-development-examples')}
						value={secondaryButtonText}
						onChange={(value) => setAttributes({ secondaryButtonText: value })}
					/>
					<TextControl
						label={__('Secondary Button Link', 'block-development-examples')}
						value={secondaryButtonLink}
						onChange={(value) => setAttributes({ secondaryButtonLink: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Appearance', 'block-development-examples')} initialOpen={false}>
					<div style={{ marginBottom: '20px' }}>
						<p>{__('Text Color', 'block-development-examples')}</p>
						<ColorPicker
							color={textColor}
							onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
							disableAlpha
						/>
					</div>
					<RangeControl
						label={__('Corner Radius', 'block-development-examples')}
						value={cornerRadius}
						onChange={(value) => setAttributes({ cornerRadius: value })}
						min={0}
						max={50}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="image-hero-block-container">
					<div 
						className="image-hero-block-image-container" 
					>
						{imageUrl ? (
							<img 
								src={imageUrl} 
								alt={title} 
								className="image-hero-block-image"
								style={imgStyle}
								data-has-border-radius="true"
								data-border-radius={cornerRadius}
							/>
						) : (
							<div className="image-hero-block-placeholder">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => setAttributes({ imageUrl: media.url })}
										allowedTypes={['image']}
										value={imageUrl}
										render={({ open }) => (
											<Button
												className="editor-media-placeholder__button is-button is-default is-large"
												onClick={open}
											>
												{__('Upload Image', 'block-development-examples')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
						)}
					</div>
					
					<div className="image-hero-block-content">
						<RichText
							tagName="h2"
							className="image-hero-block-title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Add title...', 'block-development-examples')}
							style={{ color: textColor }}
						/>
						
						<RichText
							tagName="p"
							className="image-hero-block-description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__('Add description...', 'block-development-examples')}
							style={{ 
								color: textColor,
								maxWidth: '700px',
								width: 'auto',
								minWidth: '0',
								fontSize: '16px',
								lineHeight: '1.6',
								marginBottom: '20px'
							}}
						/>
						
						<div className="image-hero-block-buttons">
							<button 
								className="image-hero-block-button image-hero-block-primary-button"
								style={primaryButtonStyle}
							>
								{primaryButtonText}
							</button>
							
							<button 
								className="image-hero-block-button image-hero-block-secondary-button"
								style={secondaryButtonStyle}
							>
								{secondaryButtonText}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit; 