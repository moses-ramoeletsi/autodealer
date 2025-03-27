
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 mt-16">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">AutoDealer</h3>
            <p className="text-muted-foreground">
              We offer the best selection of premium vehicles with exceptional service.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="#" icon="facebook" />
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="instagram" />
              <SocialIcon href="#" icon="linkedin" />
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/cars" label="Browse Cars" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <FooterLink to="#" label="Car Financing" />
              <FooterLink to="#" label="Vehicle Inspection" />
              <FooterLink to="#" label="Trade-In" />
              <FooterLink to="#" label="Maintenance" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Luxury Lane</p>
              <p>Car City, CC 10101</p>
              <p className="pt-2">
                <a href="tel:+11234567890" className="text-foreground hover:text-primary transition-colors">
                  +266 5646-7890
                </a>
              </p>
              <p>
                <a href="mailto:info@autodealer.com" className="text-foreground hover:text-primary transition-colors">
                  info@autodealer.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} AutoDealer(By Ramoeletsi.Dev). All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-muted-foreground hover:text-foreground transition-colors">
        {label}
      </Link>
    </li>
  );
};

interface SocialIconProps {
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => {
  // Simple social icons using SVG
  const renderIcon = () => {
    switch (icon) {
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-background hover:bg-foreground/10 text-foreground transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {renderIcon()}
    </a>
  );
};

export default Footer;
