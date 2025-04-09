/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    TextareaControl,
    SelectControl,
    ColorPicker,
    Spinner,
    Placeholder
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
        title,
        subtitle,
        postsToShow,
        columns,
        categories,
        tags,
        order,
        orderBy,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        cardBackgroundColor,
        borderRadius
    } = attributes;

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    // Fetch posts on initial load and when attributes change
    useEffect(() => {
        fetchPosts();
        fetchCategories();
        fetchTags();
    }, [postsToShow, categories, tags, order, orderBy]);

    // Fetch posts based on current attributes
    const fetchPosts = async () => {
        setIsLoading(true);
        
        try {
            // Fetch regular posts
            let url = `/wp/v2/posts?_embed&per_page=${postsToShow}&order=${order}&orderby=${orderBy}`;
            
            if (categories.length > 0) {
                url += `&categories=${categories.join(',')}`;
            }
            
            if (tags.length > 0) {
                url += `&tags=${tags.join(',')}`;
            }
            
            const fetchedPosts = await apiFetch({ path: url });
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch categories for the selector
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await apiFetch({ path: '/wp/v2/categories?per_page=100' });
            setCategoriesList(fetchedCategories.map(category => ({
                label: category.name,
                value: category.id
            })));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch tags for the selector
    const fetchTags = async () => {
        try {
            const fetchedTags = await apiFetch({ path: '/wp/v2/tags?per_page=100' });
            setTagsList(fetchedTags.map(tag => ({
                label: tag.name,
                value: tag.id
            })));
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    // Get post excerpt
    const getExcerpt = (post) => {
        if (post.excerpt && post.excerpt.rendered) {
            const excerpt = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            return excerpt.length > 100 ? excerpt.substring(0, 100) + '...' : excerpt;
        }
        return '';
    };

    // Get post featured image URL
    const getFeaturedImageUrl = (post) => {
        if (post._embedded && 
            post._embedded['wp:featuredmedia'] && 
            post._embedded['wp:featuredmedia'][0] &&
            post._embedded['wp:featuredmedia'][0].source_url) {
            return post._embedded['wp:featuredmedia'][0].source_url;
        }
        return '';
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
                    <RangeControl
                        label={__('Number of Posts', 'block-development-examples')}
                        value={postsToShow}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                        min={1}
                        max={12}
                    />
                    <RangeControl
                        label={__('Columns', 'block-development-examples')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={4}
                    />
                </PanelBody>

                <PanelBody title={__('Query Settings', 'block-development-examples')}>
                    <SelectControl
                        multiple
                        label={__('Categories', 'block-development-examples')}
                        value={categories}
                        options={[
                            { label: __('All Categories', 'block-development-examples'), value: '' },
                            ...categoriesList
                        ]}
                        onChange={(value) => {
                            // Convert empty string to empty array
                            const newValue = value.includes('') ? [] : value.map(Number);
                            setAttributes({ categories: newValue });
                        }}
                    />
                    <SelectControl
                        multiple
                        label={__('Tags', 'block-development-examples')}
                        value={tags}
                        options={[
                            { label: __('All Tags', 'block-development-examples'), value: '' },
                            ...tagsList
                        ]}
                        onChange={(value) => {
                            // Convert empty string to empty array
                            const newValue = value.includes('') ? [] : value.map(Number);
                            setAttributes({ tags: newValue });
                        }}
                    />
                    <SelectControl
                        label={__('Order By', 'block-development-examples')}
                        value={orderBy}
                        options={[
                            { label: __('Date', 'block-development-examples'), value: 'date' },
                            { label: __('Title', 'block-development-examples'), value: 'title' },
                            { label: __('Popularity', 'block-development-examples'), value: 'comment_count' },
                            { label: __('Random', 'block-development-examples'), value: 'rand' }
                        ]}
                        onChange={(value) => setAttributes({ orderBy: value })}
                    />
                    <SelectControl
                        label={__('Order', 'block-development-examples')}
                        value={order}
                        options={[
                            { label: __('Descending', 'block-development-examples'), value: 'desc' },
                            { label: __('Ascending', 'block-development-examples'), value: 'asc' }
                        ]}
                        onChange={(value) => setAttributes({ order: value })}
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
                    <RangeControl
                        label={__('Border Radius', 'block-development-examples')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} style={{ backgroundColor, color: textColor }}>
                <div className="blog-posts-header">
                    <h2 className="blog-posts-title">{title}</h2>
                    <p className="blog-posts-subtitle">{subtitle}</p>
                </div>
                
                <div 
                    className="blog-posts-grid" 
                    style={{ 
                        // Let CSS handle the responsive columns
                    }}
                >
                    {isLoading ? (
                        <div className="blog-posts-loading">
                            <Spinner />
                            <p>{__('Loading posts...', 'block-development-examples')}</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <Placeholder
                            className="blog-posts-placeholder"
                            icon="format-aside"
                            label={__('No Posts Found', 'block-development-examples')}
                            instructions={__('No posts were found matching your selection.', 'block-development-examples')}
                        />
                    ) : (
                        posts.map(post => (
                            <div 
                                key={post.id} 
                                className="blog-post-card"
                                style={{
                                    backgroundColor: cardBackgroundColor,
                                    borderRadius: `${borderRadius}px`,
                                    color: textColor,
                                    overflow: 'hidden'
                                }}
                            >
                                <div 
                                    className="blog-post-image-container"
                                    style={{ 
                                        borderRadius: `${borderRadius}px`,
                                        backgroundColor: '#4D5A5E' 
                                    }}
                                >
                                    {getFeaturedImageUrl(post) ? (
                                        <img 
                                            src={getFeaturedImageUrl(post)} 
                                            alt={post.title.rendered}
                                            className="blog-post-image" 
                                            style={{ 
                                                objectFit: 'cover', 
                                                width: '100%', 
                                                height: '100%',
                                                borderRadius: `${borderRadius}px`
                                            }}
                                        />
                                    ) : (
                                        <div className="blog-post-image-placeholder" style={{ borderRadius: `${borderRadius}px` }}>
                                            <span>{__('No featured image', 'block-development-examples')}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="blog-post-content" style={{ padding: '24px' }}>
                                    <h3 
                                        className="blog-post-title"
                                        style={{ 
                                            fontSize: '1.5rem',
                                            fontWeight: '600',
                                            lineHeight: '1.3',
                                            margin: '0',
                                            color: textColor
                                        }}
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />
                                    <p 
                                        className="blog-post-excerpt"
                                        style={{ 
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            margin: '10px 0',
                                            color: textColor
                                        }}
                                    >
                                        {getExcerpt(post)}
                                    </p>
                                    <a 
                                        href="#" 
                                        className="blog-post-read-more"
                                        style={{
                                            backgroundColor: buttonColor,
                                            color: buttonTextColor,
                                            borderRadius: '72px',
                                            padding: '10px 40px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            fontWeight: '500',
                                            marginTop: '10px'
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {__('Read More', 'block-development-examples')}
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
