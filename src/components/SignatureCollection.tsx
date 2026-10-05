import React from 'react';
import { Saree } from '../types';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface SignatureCollectionProps {
  sarees: Saree[];
  wishlist: string[];
  onToggleWishlist: (saree: Saree) => void;
  onAddToCart: (saree: Saree) => void;
  onViewDetails: (saree: Saree) => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  sarees,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  // Select 4-6 signature sarees
  const signatureItems = sarees.filter((s) => s.isSignature).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#EBDDC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Curated Masterpieces</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#242120] tracking-tight">
            Our Signature Collection
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5E55] font-light leading-relaxed">
            Every signature saree in this collection is a tribute to centuries of handloom virtuosity, featuring pure Mulberry silk and certified gold zari.
          </p>
        </div>

        {/* 4-Column Luxury Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {signatureItems.map((saree) => {
            const isWishlisted = wishlist.includes(saree.id);

            return (
              <div
                key={saree.id}
                className="group relative flex flex-col bg-white border border-[#E8DFD3] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Saree Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F2EB]">
                  <img
                    src={saree.image}
                    alt={saree.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Soft overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Subtle unboxed metadata kicker */}
                  <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider uppercase text-[#5C1822] bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-[#EADDC9]">
                    Pure Silk Mark
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => onToggleWishlist(saree)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs rounded-full border border-[#EADDC9] hover:bg-white text-[#4A4543] hover:text-[#8B2635] transition-colors focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                    aria-label={isWishlisted ? `Remove ${saree.name} from wishlist` : `Add ${saree.name} to wishlist`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : 'text-[#6B5E55]'
                      }`}
                    />
                  </button>

                  {/* Quick View Button overlay on hover */}
                  <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={() => onViewDetails(saree)}
                      className="flex-1 py-2.5 px-3 bg-white/95 text-[#242120] hover:text-[#8B2635] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 border border-[#EADDC9] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                {/* Saree Information & Minimal Text */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    {/* Unboxed category metadata with separator */}
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#A26D38] mb-1">
                      {saree.categoryLabel}
                    </div>

                    <h3 className="font-display text-lg font-semibold text-[#242120] leading-snug line-clamp-1 group-hover:text-[#8B2635] transition-colors">
                      {saree.name}
                    </h3>

                    <p className="text-xs text-[#786D65] line-clamp-2 mt-1 font-light leading-relaxed">
                      {saree.shortDescription}
                    </p>
                  </div>

                  {/* Inquiry & Action Row */}
                  <div className="pt-2 border-t border-[#F0E8DC] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                        Direct Handloom
                      </span>
                      <span className="text-xs font-semibold text-[#8B2635]">
                        Price on Request
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(saree)}
                      className="p-2 sm:px-3 sm:py-2 bg-[#8B2635] text-white hover:bg-[#721F2B] text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                      aria-label={`Add ${saree.name} to inquiry`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add to Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
