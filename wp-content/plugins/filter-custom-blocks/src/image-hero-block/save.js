import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
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

	return (
		<div {...useBlockProps.save()} id={id}>
			<div className="image-hero-block-container">
				<div 
					className="image-hero-block-image-container"
				>
					{imageUrl && (
						<img 
							src={imageUrl} 
							alt={title} 
							className="image-hero-block-image"
							loading="lazy"
							style={imgStyle}
							data-has-border-radius="true"
							data-border-radius={cornerRadius}
						/>
					)}
				</div>
				
				<div className="image-hero-block-content">
					{title && (
						<h2 className="image-hero-block-title" style={{ color: textColor }}>
							{title}
						</h2>
					)}
					
					{description && (
						<p 
							className="image-hero-block-description"
							style={{
								maxWidth: '700px',
								width: 'auto',
								minWidth: '0',
								fontSize: '16px',
								lineHeight: '1.6',
								marginBottom: '20px'
							}}
						>
							{description}
						</p>
					)}
					
					<div className="image-hero-block-buttons">
						{primaryButtonText && (
							<a 
								href={primaryButtonLink} 
								className="image-hero-block-button image-hero-block-primary-button custom-btn"
								style={primaryButtonStyle}
								data-type="primary"
							>
								<span className="button-text">{primaryButtonText}</span>
							</a>
						)}
						
						{secondaryButtonText && (
							<a 
								href={secondaryButtonLink} 
								className="image-hero-block-button image-hero-block-secondary-button custom-btn"
								style={secondaryButtonStyle}
								data-type="secondary"
							>
								<span className="button-text">{secondaryButtonText}</span>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save; 