/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    Button,
    ColorPicker,
    RangeControl,
    SelectControl,
    ToggleControl,
    Spinner,
    CheckboxControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

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
        heading,
        subheading,
        products,
        productIds,
        numberOfProducts,
        displayMode,
        cardBackgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        borderRadius,
        spacing
    } = attributes;

    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Fetch WooCommerce products when display mode is "woo"
    useEffect(() => {
        if (displayMode === 'woo') {
            if (productIds.length > 0) {
                fetchSelectedWooProducts();
            } else {
                fetchLatestWooProducts();
            }
        }
    }, [displayMode]);

    // Initialize selected products from productIds
    useEffect(() => {
        if (productIds.length > 0 && displayMode === 'woo') {
            const selected = productIds.map(id => {
                const product = products.find(p => p.id === id);
                return {
                    id,
                    name: product ? product.title : `Product ${id}`,
                    selected: true
                };
            });
            setSelectedProducts(selected);
        }
    }, []);

    // Fetch specific WooCommerce products by IDs
    const fetchSelectedWooProducts = async () => {
        if (!productIds.length) return;
        
        setIsLoading(true);
        try {
            // Fetch products by IDs using the include parameter
            const fetchedProducts = await apiFetch({ 
                path: `/wc/v3/products?include=${productIds.join(',')}&per_page=${productIds.length}` 
            });
            
            if (fetchedProducts && fetchedProducts.length) {
                processWooProducts(fetchedProducts);
            }
        } catch (error) {
            console.error('Error fetching selected WooCommerce products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch the latest WooCommerce products
    const fetchLatestWooProducts = async () => {
        setIsLoading(true);
        try {
            // Using the WooCommerce REST API endpoint
            const fetchedProducts = await apiFetch({ 
                path: `/wc/v3/products?per_page=${numberOfProducts}` 
            });
            
            if (fetchedProducts && fetchedProducts.length) {
                processWooProducts(fetchedProducts);
            }
        } catch (error) {
            console.error('Error fetching WooCommerce products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Process fetched WooCommerce products
    const processWooProducts = (fetchedProducts) => {
        setAvailableProducts(fetchedProducts);
        
        // Map WooCommerce products to our format
        const mappedProducts = fetchedProducts.map(product => {
            return {
                id: product.id,
                title: product.name,
                price: extractSimplePrice(product),
                description: stripHtml(product.short_description || product.description || ''),
                imageUrl: product.images && product.images.length > 0 ? product.images[0].src : '',
                imageId: product.images && product.images.length > 0 ? product.images[0].id : 0,
                imageAlt: product.images && product.images.length > 0 ? product.images[0].alt : ''
            };
        });
        
        setAttributes({ 
            products: mappedProducts,
            productIds: fetchedProducts.map(p => p.id)
        });

        // Update selected products
        setSelectedProducts(fetchedProducts.map(p => ({
            id: p.id,
            name: p.name,
            selected: true
        })));
    };

    // Search for WooCommerce products
    const searchWooProducts = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            // Search for products by name
            const results = await apiFetch({ 
                path: `/wc/v3/products?search=${encodeURIComponent(searchQuery)}&per_page=10` 
            });
            
            if (results && results.length) {
                // Mark products that are already selected
                const processedResults = results.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        image: product.images && product.images.length > 0 ? product.images[0].src : '',
                        price: extractSimplePrice(product),
                        selected: productIds.includes(product.id)
                    };
                });
                
                setSearchResults(processedResults);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching WooCommerce products:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Toggle product selection
    const toggleProductSelection = (productId, productName) => {
        // Update selected products
        const updatedSelectedProducts = [...selectedProducts];
        const existingIndex = updatedSelectedProducts.findIndex(p => p.id === productId);
        
        if (existingIndex >= 0) {
            // Product exists, toggle selection
            updatedSelectedProducts[existingIndex].selected = !updatedSelectedProducts[existingIndex].selected;
            
            // If unselected, remove from product IDs
            if (!updatedSelectedProducts[existingIndex].selected) {
                const newProductIds = productIds.filter(id => id !== productId);
                setAttributes({ productIds: newProductIds });
            }
        } else {
            // Product doesn't exist, add it as selected
            updatedSelectedProducts.push({
                id: productId,
                name: productName,
                selected: true
            });
            
            // Add to product IDs
            const newProductIds = [...productIds, productId];
            setAttributes({ productIds: newProductIds });
        }
        
        setSelectedProducts(updatedSelectedProducts);
        
        // Refresh product data for selected products
        if (!productIds.includes(productId)) {
            const newProductIds = [...productIds, productId];
            setAttributes({ productIds: newProductIds });
            fetchSelectedWooProducts();
        }
    };

    // Clear all selected products
    const clearSelectedProducts = () => {
        setSelectedProducts([]);
        setAttributes({ productIds: [] });
        setProducts([]);
    };

    // Helper to strip HTML from WooCommerce data
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    // Helper to extract simplified price from WooCommerce price HTML
    const extractSimplePrice = (product) => {
        let simplePrice = '';
        
        if (product.price_html) {
            // Create a temporary DOM element to parse the price HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = product.price_html;
            
            // Check if it has a sale price (has both del and ins elements)
            const insElement = tempDiv.querySelector('ins .woocommerce-Price-amount');
            const regularElement = tempDiv.querySelector('.woocommerce-Price-amount');
            
            // Use sale price if available, otherwise use regular price
            if (insElement) {
                simplePrice = insElement.textContent.trim();
            } else if (regularElement) {
                simplePrice = regularElement.textContent.trim();
            } else {
                // Fallback to numeric price with currency
                simplePrice = product.price ? `${product.currency_symbol || ''}${product.price}` : '';
            }
        } else {
            // Fallback to numeric price with currency
            simplePrice = product.price ? `${product.currency_symbol || ''}${product.price}` : '';
        }
        
        return simplePrice;
    };

    const handleProductChange = (index, property, value) => {
        const newProducts = [...products];
        newProducts[index] = { ...newProducts[index], [property]: value };
        setAttributes({ products: newProducts });
    };

    const handleSelectImage = (index, media) => {
        handleProductChange(index, 'imageUrl', media.url);
        handleProductChange(index, 'imageId', media.id);
        handleProductChange(index, 'imageAlt', media.alt || '');
    };

    const handleRemoveImage = (index) => {
        handleProductChange(index, 'imageUrl', '');
        handleProductChange(index, 'imageId', 0);
        handleProductChange(index, 'imageAlt', '');
    };

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Product Showcase Settings', 'block-development-examples')}>
                    <TextControl
                        label={__('Heading', 'block-development-examples')}
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                    />
                    
                    <TextareaControl
                        label={__('Subheading', 'block-development-examples')}
                        value={subheading}
                        onChange={(value) => setAttributes({ subheading: value })}
                    />
                    
                    <SelectControl
                        label={__('Display Mode', 'block-development-examples')}
                        value={displayMode}
                        options={[
                            { label: 'Custom Products', value: 'custom' },
                            { label: 'WooCommerce Products', value: 'woo' },
                        ]}
                        onChange={(value) => setAttributes({ displayMode: value })}
                        help={__('Select products source. WooCommerce mode requires the WooCommerce plugin.', 'block-development-examples')}
                    />
                    
                    {displayMode === 'woo' && (
                        <div className="components-base-control woo-product-selector">
                            <div className="components-base-control__label">
                                {__('Select WooCommerce Products', 'block-development-examples')}
                            </div>
                            
                            <div className="product-search">
                                <TextControl
                                    label={__('Search Products', 'block-development-examples')}
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder={__('Type product name', 'block-development-examples')}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={searchWooProducts}
                                    isBusy={isSearching}
                                    disabled={isSearching || !searchQuery.trim()}
                                >
                                    {__('Search', 'block-development-examples')}
                                </Button>
                            </div>
                            
                            {isSearching && <Spinner />}
                            
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    <h4>{__('Search Results', 'block-development-examples')}</h4>
                                    <ul className="product-list">
                                        {searchResults.map(product => (
                                            <li key={`search-${product.id}`} className="product-item">
                                                <CheckboxControl
                                                    label={`${product.name} (${product.price})`}
                                                    checked={product.selected || productIds.includes(product.id)}
                                                    onChange={() => toggleProductSelection(product.id, product.name)}
                                                />
                                                {product.image && (
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="product-thumbnail" 
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {selectedProducts.length > 0 && (
                                <div className="selected-products">
                                    <div className="selected-header">
                                        <h4>{__('Selected Products', 'block-development-examples')}</h4>
                                        <Button
                                            variant="link"
                                            isDestructive
                                            onClick={clearSelectedProducts}
                                        >
                                            {__('Clear All', 'block-development-examples')}
                                        </Button>
                                    </div>
                                    <ul className="product-list">
                                        {selectedProducts
                                            .filter(product => product.selected)
                                            .map(product => (
                                                <li key={`selected-${product.id}`} className="product-item">
                                                    <span>{product.name}</span>
                                                    <Button
                                                        variant="link"
                                                        isDestructive
                                                        onClick={() => toggleProductSelection(product.id, product.name)}
                                                    >
                                                        {__('Remove', 'block-development-examples')}
                                                    </Button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                            
                            <Button
                                variant="secondary"
                                onClick={fetchSelectedWooProducts}
                                isBusy={isLoading}
                                disabled={isLoading || !productIds.length}
                                className="mt-2"
                            >
                                {isLoading ? __('Loading...', 'block-development-examples') : __('Refresh Selected Products', 'block-development-examples')}
                            </Button>
                            
                            <Button
                                variant="secondary"
                                onClick={fetchLatestWooProducts}
                                isBusy={isLoading}
                                disabled={isLoading}
                                className="mt-2"
                            >
                                {isLoading ? __('Loading...', 'block-development-examples') : __('Get Latest Products', 'block-development-examples')}
                            </Button>
                        </div>
                    )}
                    
                    <RangeControl
                        label={__('Border Radius', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    
                    <RangeControl
                        label={__('Spacing', 'block-development-examples')}
                        value={spacing}
                        onChange={(value) => setAttributes({ spacing: value })}
                        min={0}
                        max={60}
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
                        <p>{__('Text Color', 'block-development-examples')}</p>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
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

                {displayMode === 'custom' && selectedProductIndex !== null && (
                    <PanelBody title={__('Product Settings', 'block-development-examples')}>
                        <TextControl
                            label={__('Title', 'block-development-examples')}
                            value={products[selectedProductIndex].title}
                            onChange={(value) => handleProductChange(selectedProductIndex, 'title', value)}
                        />
                        
                        <TextControl
                            label={__('Price', 'block-development-examples')}
                            value={products[selectedProductIndex].price}
                            onChange={(value) => handleProductChange(selectedProductIndex, 'price', value)}
                        />
                        
                        <TextareaControl
                            label={__('Description', 'block-development-examples')}
                            value={products[selectedProductIndex].description}
                            onChange={(value) => handleProductChange(selectedProductIndex, 'description', value)}
                        />
                        
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Image', 'block-development-examples')}
                            </label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => handleSelectImage(selectedProductIndex, media)}
                                    allowedTypes={['image']}
                                    value={products[selectedProductIndex].imageId}
                                    render={({ open }) => (
                                        <div>
                                            {!products[selectedProductIndex].imageUrl ? (
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
                                                        src={products[selectedProductIndex].imageUrl}
                                                        alt={products[selectedProductIndex].imageAlt}
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
                                                            onClick={() => handleRemoveImage(selectedProductIndex)}
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
                )}
            </InspectorControls>

            <div {...blockProps}>
                <div className="product-showcase-header" style={{ color: textColor }}>
                    <h2 className="product-showcase-heading">{heading}</h2>
                    <p className="product-showcase-subheading">{subheading}</p>
                </div>
                
                <div 
                    className="product-showcase-grid"
                    style={{ 
                        gap: `${spacing}px`,
                    }}
                >
                    {products.map((product, index) => (
                        <div
                            key={`product-${index}`}
                            className={`product-card ${selectedProductIndex === index ? 'is-selected' : ''}`}
                            style={{
                                backgroundColor: cardBackgroundColor,
                                borderRadius: `${borderRadius}px`,
                                color: textColor
                            }}
                            onClick={() => displayMode === 'custom' && setSelectedProductIndex(index)}
                        >
                            <div 
                                className="product-image-container"
                                style={{ borderRadius: `${borderRadius}px` }}
                            >
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.imageAlt}
                                        className="product-image"
                                    />
                                ) : displayMode === 'custom' ? (
                                    <div className="product-image-placeholder">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => {
                                                    setSelectedProductIndex(index);
                                                    handleSelectImage(index, media);
                                                }}
                                                allowedTypes={['image']}
                                                render={({ open }) => (
                                                    <Button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            open();
                                                        }}
                                                        className="product-image-upload-button"
                                                    >
                                                        <span>+</span>
                                                    </Button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                ) : (
                                    <div className="product-image-placeholder">
                                        <span>No image available</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="product-details">
                                <h3 className="product-title">{product.title}</h3>
                                {displayMode === 'woo' ? (
                                    <div 
                                        className="product-price"
                                        dangerouslySetInnerHTML={{ __html: product.price }}
                                    />
                                ) : (
                                    <p className="product-price">{product.price}</p>
                                )}
                                <p className="product-description">{product.description}</p>
                                
                                <button 
                                    className="product-cart-button"
                                    style={{
                                        backgroundColor: buttonColor,
                                        color: buttonTextColor,
                                        borderRadius: `${Math.min(72, borderRadius * 3)}px`
                                    }}
                                    data-product-id={product.id}
                                >
                                    {__('Add to Cart', 'block-development-examples')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
} 