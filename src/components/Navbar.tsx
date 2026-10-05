import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sarees';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchClick: () => void;
  onNavigateCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchClick,
  onNavigateCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Collections', href: '#collections', category: 'all' },
    { label: 'Wedding Sarees', href: '#collections', category: 'wedding' },
    { label: 'New Arrivals', href: '#collections', category: 'new-arrivals' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (link: { href: string; category?: string }) => {
    setMobileMenuOpen(false);
    if (link.category) {
      onNavigateCategory(link.category);
    }
    const el = document.querySelector(link.href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD3]/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#2D1B1E] text-[#E8DFD3] text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-3">
        <span>Handloom Heritage</span>
        <span aria-hidden="true" className="text-[#C5A059]">✦</span>
        <span>100% Pure Silk Mark Certified</span>
        <span aria-hidden="true" className="text-[#C5A059]">✦</span>
        <span>Complimentary Express Shipping Across India</span>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <a
              href="#home"
              className="group flex flex-col focus:outline-none"
              aria-label="RJ Fabrics Pure Silk Sarees Home"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#242120] group-hover:text-[#8B2635] transition-colors leading-none">
                RJ FABRICS
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C7A6B] font-medium mt-1">
                Pure Silk Sarees · Tiruppur
              </span>
            </a>
          </div>

          {/* Zone 2: 4–6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A4543]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="hover:text-[#8B2635] transition-colors relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8B2635] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1–2 primary actions + functional icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              className="p-2 text-[#4A4543] hover:text-[#8B2635] hover:bg-[#F2ECE1] rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#8B2635]"
              aria-label="Search Sarees"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#4A4543] hover:text-[#8B2635] hover:bg-[#F2ECE1] rounded-full transition-colors relative focus-visible:ring-2 focus-visible:ring-[#8B2635]"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B2635] text-white text-[10px] font-medium rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-[#242120] hover:text-[#8B2635] hover:bg-[#F2ECE1] rounded-full transition-colors relative focus-visible:ring-2 focus-visible:ring-[#8B2635]"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-[#8B2635] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#242120]">
                Inquiry Bag
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A4543] hover:text-[#242120] hover:bg-[#F2ECE1] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#8B2635]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8DFD3] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="text-left text-base font-medium text-[#242120] hover:text-[#8B2635] py-2 border-b border-[#F0E8DC] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#B39B84] text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#1B5E20] text-white text-sm font-medium rounded-lg hover:bg-[#144718] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-[#6B5E55]">
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
