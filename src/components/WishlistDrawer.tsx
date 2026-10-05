import React from 'react';
import { Saree } from '../types';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistSarees: Saree[];
  onRemoveFromWishlist: (saree: Saree) => void;
  onMoveToCart: (saree: Saree) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistSarees,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFD3] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8B2635] fill-[#8B2635]" />
            <span className="font-display text-xl font-semibold text-[#242120]">
              Saved Wishlist
            </span>
            <span className="text-xs text-[#8C7A6B]">({wishlistSarees.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5E55] hover:text-[#242120] transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {wishlistSarees.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#E0D5C5] flex items-center justify-center text-[#8B2635]">
                <Heart className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#242120]">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#7A6E65] mt-1 max-w-xs font-light">
                  Click the heart icon on any saree to save it for your special celebrations.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#F0E8DC]">
              {wishlistSarees.map((saree) => (
                <div key={saree.id} className="py-4 flex gap-4 items-center">
                  <div className="w-20 h-24 bg-[#F2ECE1] border border-[#E8DFD3] shrink-0 overflow-hidden">
                    <img
                      src={saree.image}
                      alt={saree.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#242120] truncate">
                      {saree.name}
                    </h4>
                    <p className="text-[11px] text-[#8C7A6B] truncate">
                      {saree.categoryLabel} · {saree.color}
                    </p>
                    <div className="mt-1 text-xs font-semibold text-[#8B2635]">
                      Price on Request
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onMoveToCart(saree);
                          onRemoveFromWishlist(saree);
                        }}
                        className="py-1.5 px-3 bg-[#8B2635] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 hover:bg-[#721F2B] transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Inquiry</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(saree)}
                        className="p-1.5 text-[#A89C91] hover:text-[#8B2635] transition-colors"
                        aria-label={`Remove ${saree.name} from wishlist`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistSarees.length > 0 && (
          <div className="p-4 border-t border-[#E8DFD3] bg-[#FAF8F5]">
            <button
              onClick={() => {
                wishlistSarees.forEach((s) => onMoveToCart(s));
                onClose();
              }}
              className="w-full py-3 bg-[#8B2635] hover:bg-[#721F2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Move All to Inquiry Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
