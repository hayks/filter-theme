<?php
/**
 * Title: Footer with logo, 3 columns and contact info
 * Slug: filter/footer
 * Categories: footer
 * Block Types: core/template-part/footer
 * Description: A footer section with a logo, 3 navigation columns, and contact info with social icons.
 */
?>

<!-- wp:group {"tagName":"footer","className":"site-footer","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"},"blockGap":"var:preset|spacing|40"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"backgroundColor":"tertiary","textColor":"base","layout":{"type":"constrained"}} -->
<footer class="wp-block-group site-footer has-base-color has-tertiary-background-color has-text-color has-background has-link-color" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
	<!-- wp:group {"align":"wide","className":"footer-content","style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"flex-start"}} -->
	<div class="wp-block-group alignwide footer-content">
		<!-- wp:group {"className":"footer-branding","style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"flex-start"}} -->
		<div class="wp-block-group footer-branding">
			<!-- wp:site-logo {"width":22,"className":"footer-logo"} /-->
			<!-- wp:site-title {"level":0,"fontSize":"x-large","className":"footer-site-title"} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:columns {"align":"wide","className":"footer-nav-columns","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|20"},"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
		<div class="wp-block-columns alignwide footer-nav-columns" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40)">
			<!-- wp:column {"className":"footer-nav-column"} -->
			<div class="wp-block-column footer-nav-column">
				<!-- wp:navigation {"overlayMenu":"never","className":"footer-navigation","layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"fontSize":"small"} -->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
				<!-- /wp:navigation -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"className":"footer-nav-column"} -->
			<div class="wp-block-column footer-nav-column">
				<!-- wp:navigation {"overlayMenu":"never","className":"footer-navigation","layout":{"type":"flex","orientation":"vertical","justifyContent":"center"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"fontSize":"small"} -->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
				<!-- /wp:navigation -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"className":"footer-nav-column"} -->
			<div class="wp-block-column footer-nav-column">
				<!-- wp:navigation {"overlayMenu":"never","className":"footer-navigation","layout":{"type":"flex","orientation":"vertical","justifyContent":"right"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"fontSize":"small"} -->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
					<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Footer Item', 'filter' ); ?>","url":"#","className":"footer-nav-item"} /-->
				<!-- /wp:navigation -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->

		<!-- wp:columns {"align":"wide","className":"footer-bottom","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|20"}}}} -->
		<div class="wp-block-columns alignwide footer-bottom">
			<!-- wp:column {"verticalAlignment":"center","className":"footer-contact"} -->
			<div class="wp-block-column is-vertically-aligned-center footer-contact">
				<!-- wp:group {"className":"contact-info","style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"flex-start"}} -->
				<div class="wp-block-group contact-info">
					<!-- wp:paragraph {"className":"footer-phone","fontSize":"small"} -->
					<p class="footer-phone has-small-font-size"><?php esc_html_e( '+44 123 456 789', 'filter' ); ?></p>
					<!-- /wp:paragraph -->

					<!-- wp:paragraph {"className":"footer-email","fontSize":"small"} -->
					<p class="footer-email has-small-font-size"><?php esc_html_e( 'hello@website.com', 'filter' ); ?></p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","className":"footer-social-column"} -->
			<div class="wp-block-column is-vertically-aligned-center footer-social-column">
				<!-- wp:group {"className":"social-copyright","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"flex-end","alignItems":"flex-end"}} -->
				<div class="wp-block-group social-copyright">
					<!-- wp:social-links {"iconColor":"base","iconColorValue":"#ffffff","size":"has-normal-icon-size","className":"footer-social-links is-style-logos-only","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|16","left":"var:preset|spacing|16"}}},"layout":{"type":"flex","justifyContent":"right"}} -->
					<ul class="wp-block-social-links has-normal-icon-size has-icon-color footer-social-links is-style-logos-only">
						<!-- wp:social-link {"url":"#","service":"facebook","className":"footer-social-link"} /-->
						<!-- wp:social-link {"url":"#","service":"x","className":"footer-social-link"} /-->
						<!-- wp:social-link {"url":"#","service":"youtube","className":"footer-social-link"} /-->
						<!-- wp:social-link {"url":"#","service":"instagram","className":"footer-social-link"} /-->
						<!-- wp:social-link {"url":"#","service":"spotify","className":"footer-social-link"} /-->
						<!-- wp:social-link {"url":"#","service":"linkedin","className":"footer-social-link"} /-->
					</ul>
					<!-- /wp:social-links -->

					<!-- wp:paragraph {"align":"right","className":"footer-copyright","fontSize":"small"} -->
					<p class="has-text-align-right footer-copyright has-small-font-size"><?php esc_html_e( '© Company', 'filter' ); ?></p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->
	</div>
	<!-- /wp:group -->
</footer>
<!-- /wp:group -->
