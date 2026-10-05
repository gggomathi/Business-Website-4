import React from 'react';
import { BUSINESS_INFO, CATEGORIES } from '../data/sarees';
import { Instagram, Facebook, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Signature Collection', href: '#collections' },
    { label: 'About ABC Heritage', href: '#about' },
    { label: 'Patron Testimonials', href: '#reviews' },
    { label: 'Showroom & Inquiries', href: '#contact' },
  ];

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    const el = document.querySelector('#collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F1718] text-[#D8CDC2] pt-16 pb-12 border-t border-[#3B292C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#36272A]">
          
          {/* Col 1: ABC Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-display text-3xl sm:text-4xl font-semibold tracking-[0.2em] text-[#FAF8F5]">
                {BUSINESS_INFO.name}
              </span>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mt-1">
                Silk Sarees · Since Inception
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#A89C91] font-light leading-relaxed max-w-sm">
              ABC is dedicated to bringing authentic, elegant, and high-quality silk sarees to customers worldwide while preserving traditional handloom craftsmanship and Indian heritage.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#4A373A] flex items-center justify-center text-[#D8CDC2] hover:text-[#FAF8F5] hover:border-[#C5A059] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#4A373A] flex items-center justify-center text-[#D8CDC2] hover:text-[#FAF8F5] hover:border-[#C5A059] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-[#C5A059] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5]">
              Silk Collections
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#C5A059] transition-colors text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5]">
              Contact Showroom
            </h4>
            <div className="space-y-2.5 text-xs font-light text-[#B8ACA1]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#A89C91]">
              <span>Silk Mark Organization of India Member</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7D73] gap-4">
          <p>© 2026 ABC. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs font-light">
            <span>Handcrafted in India</span>
            <span aria-hidden="true">·</span>
            <span>Silk Mark Certified</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
