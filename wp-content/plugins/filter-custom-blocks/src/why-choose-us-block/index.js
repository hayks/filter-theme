/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Styles
 */
import './style.scss';

/**
 * Register the block
 */
registerBlockType(metadata.name, {
    edit: Edit,
    save,
}); 