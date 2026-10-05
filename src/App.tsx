import React, { useState, useEffect } from 'react';
import { SAREES, REVIEWS } from './data/sarees';
import { Saree, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureCollection } from './components/SignatureCollection';
import { CollectionsSection } from './components/CollectionsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Check, Heart } from 'lucide-react';

export default function App() {
  const [sarees] = useState<Saree[]>(SAREES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);

  // Cart state stored in localStorage for persistence across reloads
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rj_inquiry_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state stored in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rj_wishlist');
      return saved ? JSON.parse(saved) : ['saree-kanchi-crimson-01'];
    } catch {
      return ['saree-kanchi-crimson-01'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('rj_inquiry_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rj_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (saree: Saree, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.saree.id === saree.id);
      if (existing) {
        return prev.map((item) =>
          item.saree.id === saree.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { saree, quantity }];
    });
    showToast(`Added "${saree.name}" to your Inquiry Bag`);
  };

  const handleUpdateCartQuantity = (sareeId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.saree.id === sareeId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (sareeId: string) => {
    setCart((prev) => prev.filter((item) => item.saree.id !== sareeId));
    showToast('Removed item from Inquiry Bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (saree: Saree) => {
    setWishlist((prev) => {
      const exists = prev.includes(saree.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((id) => id !== saree.id);
      } else {
        showToast(`Saved "${saree.name}" to your Wishlist`);
        return [...prev, saree.id];
      }
    });
  };

  const handleRemoveFromWishlist = (saree: Saree) => {
    setWishlist((prev) => prev.filter((id) => id !== saree.id));
  };

  const handleNavigateCategory = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.querySelector('#collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopSarees = () => {
    handleNavigateCategory('all');
  };

  const handleExploreCollection = () => {
    handleNavigateCategory('wedding');
  };

  const handleSearchClick = () => {
    const el = document.querySelector('#collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // find search input
      const searchInput = el.querySelector('input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistSarees = sarees.filter((s) => wishlist.includes(s.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242120] flex flex-col font-sans selection:bg-[#EBDDC8] selection:text-[#3B2C24]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#242120] text-white text-xs px-4 py-3 shadow-lg border border-[#C5A059] flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchClick={handleSearchClick}
        onNavigateCategory={handleNavigateCategory}
      />

      <main className="flex-1">
        {/* Homepage Hero Section */}
        <Hero
          onShopSarees={handleShopSarees}
          onExploreCollection={handleExploreCollection}
        />

        {/* Featured Collection: Our Signature Collection */}
        <SignatureCollection
          sarees={sarees}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onViewDetails={(saree) => setSelectedSaree(saree)}
        />

        {/* Product Collections: All 7 Categories */}
        <CollectionsSection
          sarees={sarees}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onViewDetails={(saree) => setSelectedSaree(saree)}
        />

        {/* About ABC Heritage & Mission */}
        <AboutSection />

        {/* Why Choose ABC Feature Cards */}
        <WhyChooseUs />

        {/* Customer Reviews & Testimonials */}
        <div id="reviews">
          <ReviewsSection reviews={REVIEWS} />
        </div>

        {/* Contact Section with Address, Maps, WhatsApp, and Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleNavigateCategory} />

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppButton />

      {/* Product Detail Modal */}
      <ProductDetailModal
        saree={selectedSaree}
        onClose={() => setSelectedSaree(null)}
        isWishlisted={selectedSaree ? wishlist.includes(selectedSaree.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer & Checkout Flow */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistSarees={wishlistSarees}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleAddToCart}
      />
    </div>
  );
}
