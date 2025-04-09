<?php
/**
 * Custom footer template
 */
?>
<style>
    .wp-block-template-part.footer {
        display: none !important;
    }
    
    .custom-footer {
        background-color: #4a4a4a;
        color: #fff;
        padding: 40px 0;
        width: 100%;
        margin-top: 40px;
    }
    
    .custom-footer-container {
        max-width: 1360px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
    
    .footer-branding {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .footer-branding .site-title {
        font-size: 2.25rem;
        font-weight: bold;
        color: #fff;
        margin: 0;
    }
    
    .footer-columns {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
        margin: 40px 0;
    }
    
    .footer-column {
        flex: 1;
        min-width: 200px;
    }
    
    .footer-column ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .footer-column li {
        margin-bottom: 20px;
    }
    
    .footer-column a {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
    }
    
    .footer-column a:hover {
        text-decoration: underline;
    }
    
    .footer-bottom {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    
    .footer-contact {
        flex: 1;
        min-width: 200px;
    }
    
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .footer-phone, .footer-email {
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }
    
    .footer-social {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 20px;
    }
    
    .social-links {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
    }
    
    .social-link {
        width: 24px;
        height: 24px;
        color: #fff;
    }
    
    .footer-copyright {
        text-align: right;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        .footer-columns {
            flex-direction: column;
        }
        
        .footer-bottom {
            flex-direction: column;
            gap: 30px;
        }
        
        .footer-social {
            align-items: center;
        }
        
        .social-links {
            justify-content: center;
        }
        
        .footer-copyright {
            text-align: center;
        }
        
        .contact-info {
            align-items: center;
        }
    }
    
    /* Additional responsive padding for smaller screens */
    @media (max-width: 600px) {
        .custom-footer {
            padding: 30px 0;
        }
        
        .custom-footer-container {
            padding: 0 15px;
            gap: 25px;
        }
        
        .footer-columns {
            margin: 25px 0;
            gap: 15px;
        }
        
        .footer-column li {
            margin-bottom: 15px;
        }
        
        .footer-bottom {
            gap: 20px;
        }
    }
</style>

<footer class="custom-footer">
    <div class="custom-footer-container">
        <div class="footer-branding">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/pear-logo.svg" alt="Logo" width="22" height="35">
            <h1 class="site-title">Pear</h1>
        </div>
        
        <div class="footer-columns">
            <div class="footer-column">
                <ul>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <ul>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <ul>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                    <li><a href="#">Footer Item</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-contact">
                <div class="contact-info">
                    <p class="footer-phone">+44 123 456 789</p>
                    <p class="footer-email">hello@website.com</p>
                </div>
            </div>
            
            <div class="footer-social">
                <div class="social-links">
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path></svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"></path></svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.669a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path></svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.51 14.3c-.17.27-.53.36-.8.19-2.19-1.34-4.95-1.64-8.19-.9-.32.08-.66-.12-.74-.44-.08-.32.12-.66.44-.74 3.55-.81 6.59-.46 9.06 1.08.28.17.36.53.19.8zm1.2-2.67c-.22.34-.68.44-1.01.22-2.5-1.54-6.32-1.98-9.26-1.08-.38.11-.78-.1-.9-.48-.11-.38.1-.78.48-.9 3.36-1.02 7.53-.53 10.4 1.23.35.22.45.68.23 1.01zm.1-2.77c-3-1.77-7.96-1.94-10.83-1.07-.46.17-.95-.06-1.12-.51-.17-.46.06-.95.51-1.12 3.28-1 8.74-.8 12.18 1.24.44.26.6.84.34 1.29-.26.45-.84.59-1.29.33l.21-.16z"></path></svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
                    </a>
                </div>
                
                <p class="footer-copyright">© Company</p>
            </div>
        </div>
    </div>
</footer>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const footers = document.querySelectorAll('.wp-block-template-part.footer, .site-footer:not(.custom-footer), footer:not(.custom-footer)');
        footers.forEach(footer => {
            if (!footer.classList.contains('custom-footer')) {
                footer.style.display = 'none';
            }
        });
    });
</script> 