import React, { useState } from 'react';
import { Saree } from '../types';
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Award,
  Check,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/sarees';

interface ProductDetailModalProps {
  saree: Saree | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (saree: Saree) => void;
  onAddToCart: (saree: Saree, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  saree,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');
  const [added, setAdded] = useState(false);

  if (!saree) return null;

  const handleAdd = () => {
    onAddToCart(saree, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello RJ Fabrics, I am inquiring about the ${saree.name} (SKU: ${saree.id}). Could you please share the price quotation, fabric videos, and availability?`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="saree-modal-title"
    >
      <div
        className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#D9C4A2] shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4A4543] hover:text-[#8B2635] bg-white/90 border border-[#E8DFD3] rounded-full transition-colors focus:outline-none"
          aria-label="Close Product Details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Saree Image Showcase (5 cols) */}
          <div className="md:col-span-6 bg-[#FAF5EE] border-b md:border-b-0 md:border-r border-[#E8DFD3] p-6 sm:p-8 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-[#E8DFD3] shadow-xs">
              <img
                src={saree.image}
                alt={saree.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8B2635] border border-[#EADDC9]">
                Silk Mark Authenticated
              </div>
            </div>

            {/* Micro badges below image */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 border border-[#E8DFD3]">
                <span className="block font-semibold text-[#242120]">Handloom</span>
                <span className="text-[11px] text-[#7A6E65]">100% Pit Loom</span>
              </div>
              <div className="bg-white p-2.5 border border-[#E8DFD3]">
                <span className="block font-semibold text-[#242120]">Silk Mark</span>
                <span className="text-[11px] text-[#7A6E65]">Certified Pure</span>
              </div>
            </div>
          </div>

          {/* Right Column: Saree Details & Purchase Module (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Collection */}
              <div className="flex items-center justify-between text-xs text-[#A26D38] uppercase tracking-wider font-semibold mb-1">
                <span>{saree.categoryLabel}</span>
                <span className="text-[#8C7A6B] font-mono text-[11px]">SKU: {saree.id.slice(-6).toUpperCase()}</span>
              </div>

              {/* Title */}
              <h2
                id="saree-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#242120] leading-snug"
              >
                {saree.name}
              </h2>

              <p className="text-xs text-[#8C7A6B] mt-1 font-light italic">
                {saree.tagline}
              </p>

              {/* Pricing on Request Row */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-xl font-bold text-[#8B2635]">
                  Price on Request
                </span>
                <span className="text-xs text-[#1B5E20] font-medium bg-[#E8F5E9] px-2.5 py-1 border border-[#C8E6C9]">
                  Wholesale & Retail Orders Welcome
                </span>
              </div>

              {/* Tabs for Details, Care, Shipping */}
              <div className="mt-6 border-b border-[#E8DFD3] flex gap-4 text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-[#8B2635] text-[#8B2635]'
                      : 'border-transparent text-[#6B5E55] hover:text-[#242120]'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'care'
                      ? 'border-[#8B2635] text-[#8B2635]'
                      : 'border-transparent text-[#6B5E55] hover:text-[#242120]'
                  }`}
                >
                  Heirloom Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-[#8B2635] text-[#8B2635]'
                      : 'border-transparent text-[#6B5E55] hover:text-[#242120]'
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs sm:text-sm text-[#5A514B]">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#6B5E55] leading-relaxed mb-3">
                      {saree.fullDescription}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><strong className="text-[#242120]">Fabric:</strong> {saree.fabric}</div>
                      <div><strong className="text-[#242120]">Zari:</strong> {saree.zari}</div>
                      <div><strong className="text-[#242120]">Weave:</strong> {saree.weave}</div>
                      <div><strong className="text-[#242120]">Length:</strong> {saree.length}</div>
                      <div><strong className="text-[#242120]">Weight:</strong> {saree.weight}</div>
                      <div><strong className="text-[#242120]">Blouse:</strong> {saree.blousePiece}</div>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2 text-xs leading-relaxed">
                    <p><strong className="text-[#242120]">Cleaning:</strong> {saree.care}</p>
                    <p><strong className="text-[#242120]">Storage:</strong> Wrap in clean, unbleached cotton muslin cloth. Avoid plastic zip covers.</p>
                    <p><strong className="text-[#242120]">Ironing:</strong> Medium temperature reverse-ironing with a soft cloth layer.</p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-xs leading-relaxed">
                    <div className="flex items-center gap-2 text-[#242120]">
                      <Truck className="w-4 h-4 text-[#8B2635]" />
                      <span>Complimentary insured shipping across India (2–4 business days).</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#242120]">
                      <RotateCcw className="w-4 h-4 text-[#8B2635]" />
                      <span>7-day easy exchange guarantee for complete peace of mind.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase & Action Controls */}
            <div className="space-y-3 pt-4 border-t border-[#F0E8DC]">
              {/* Quantity Stepper & Add to Bag */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D9CEBE] bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs hover:bg-[#EBE2D5] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold tabular-nums text-[#242120]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs hover:bg-[#EBE2D5] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    added
                      ? 'bg-[#1B5E20] text-white'
                      : 'bg-[#8B2635] text-white hover:bg-[#721F2B]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Inquiry Bag ({quantity} {quantity === 1 ? 'Piece' : 'Pieces'})</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(saree)}
                  className={`p-3 border transition-colors ${
                    isWishlisted
                      ? 'border-[#8B2635] bg-[#8B2635]/10 text-[#8B2635]'
                      : 'border-[#D9CEBE] text-[#4A4543] hover:text-[#8B2635]'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8B2635]' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Concierge Button */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#1B5E20] hover:bg-[#144718] text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask about this Saree on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
