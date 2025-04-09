import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('block-development-examples/newsletter-block', {
    edit: Edit,
    save: Save,
}); 