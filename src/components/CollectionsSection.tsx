import React, { useState } from 'react';
import { Saree } from '../types';
import { CATEGORIES } from '../data/sarees';
import { Heart, ShoppingBag, Eye, SlidersHorizontal, Search, Check } from 'lucide-react';

interface CollectionsSectionProps {
  sarees: Saree[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (saree: Saree) => void;
  onAddToCart: (saree: Saree) => void;
  onViewDetails: (saree: Saree) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  sarees,
  selectedCategory,
  onSelectCategory,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  // Filter sarees based on category and search query
  const filteredSarees = sarees.filter((saree) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'new-arrivals'
        ? saree.isNewArrival || saree.category === 'new-arrivals'
        : saree.category === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort filtered sarees
  const sortedSarees = [...filteredSarees].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const handleAddToCartWithNotice = (saree: Saree) => {
    onAddToCart(saree);
    setAddedNoticeId(saree.id);
    setTimeout(() => {
      setAddedNoticeId(null);
    }, 2000);
  };

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38] mb-2">
            Authentic Weaves for Every Milestone
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#242120] tracking-tight">
            Explore Our Silk Collections
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5E55] font-light">
            From majestic wedding muhurthams to temple festivities, find the saree woven precisely for your story.
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Button Controls) */}
        <div className="mb-8">
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-3 gap-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#8B2635] text-white border-[#8B2635] shadow-xs'
                      : 'bg-white text-[#5A514B] border-[#E8DFD3] hover:border-[#C5A059] hover:text-[#242120]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white border border-[#E8DFD3] p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by color, motif, or collection..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-[#E0D5C5] focus:outline-none focus:border-[#8B2635] bg-[#FAF8F5]/60 text-[#242120] placeholder-[#9E9084]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#242120]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count & Sort Selector */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs sm:text-sm text-[#5A514B]">
            <span className="font-light">
              Showing <span className="font-semibold text-[#242120] tabular-nums">{sortedSarees.length}</span> sarees
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 border border-[#E0D5C5] text-xs font-medium text-[#242120] bg-white focus:outline-none focus:border-[#8B2635]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedSarees.length === 0 ? (
          <div className="bg-white border border-[#E8DFD3] p-12 text-center max-w-md mx-auto my-8">
            <p className="font-display text-xl text-[#242120] mb-2">No sarees found</p>
            <p className="text-xs text-[#6B5E55] mb-6">
              We couldn't find matching sarees for your search. Try changing the collection or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-6 py-2.5 bg-[#8B2635] text-white text-xs font-medium tracking-wide uppercase hover:bg-[#721F2B] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedSarees.map((saree) => {
              const isWishlisted = wishlist.includes(saree.id);
              const isJustAdded = addedNoticeId === saree.id;

              return (
                <article
                  key={saree.id}
                  className="group flex flex-col bg-white border border-[#E8DFD3] hover:border-[#C5A059] transition-all duration-300 shadow-xs hover:shadow-md"
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

                    {/* Badge / Metadata */}
                    <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider uppercase text-[#3D1418] bg-white/95 backdrop-blur-xs px-2.5 py-1 border border-[#EADDC9]">
                      {saree.category === 'new-arrivals' ? 'New Arrival' : '100% Pure Silk'}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(saree)}
                      className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-xs rounded-full border border-[#EADDC9] hover:bg-white text-[#4A4543] hover:text-[#8B2635] transition-colors focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                      aria-label={isWishlisted ? `Remove ${saree.name} from wishlist` : `Add ${saree.name} to wishlist`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : 'text-[#6B5E55]'
                        }`}
                      />
                    </button>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onViewDetails(saree)}
                        className="w-full py-2.5 bg-white/95 text-[#242120] hover:text-[#8B2635] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 border border-[#EADDC9] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Saree Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      {/* Quiet Category Metadata */}
                      <div className="text-[11px] font-medium uppercase tracking-wider text-[#A26D38] mb-1">
                        {saree.categoryLabel}
                      </div>

                      {/* Saree Name */}
                      <h3 className="font-display text-lg font-semibold text-[#242120] leading-snug group-hover:text-[#8B2635] transition-colors line-clamp-1">
                        {saree.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#786D65] line-clamp-2 mt-1.5 font-light leading-relaxed">
                        {saree.shortDescription}
                      </p>

                      {/* Fabric / Zari snippet */}
                      <div className="mt-2 text-[11px] text-[#8C7A6B] flex items-center gap-2">
                        <span>{saree.color}</span>
                        <span aria-hidden="true">·</span>
                        <span>{saree.weave}</span>
                      </div>
                    </div>

                    {/* Price and Buttons */}
                    <div className="pt-3 border-t border-[#F0E8DC]">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-[#A09388] block">Price</span>
                          <span className="text-lg font-semibold text-[#242120] tabular-nums">
                            ₹{saree.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {saree.originalPrice && (
                          <span className="text-xs text-[#A89C91] line-through tabular-nums">
                            ₹{saree.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Primary Buttons: "View Details" & "Add to Cart" */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onViewDetails(saree)}
                          className="py-2 px-2 text-center border border-[#D9CEBE] text-[#242120] hover:text-[#8B2635] hover:border-[#8B2635] text-xs font-medium tracking-wide transition-colors"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => handleAddToCartWithNotice(saree)}
                          className={`py-2 px-2 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-colors ${
                            isJustAdded
                              ? 'bg-[#1B5E20] text-white'
                              : 'bg-[#8B2635] text-white hover:bg-[#721F2B]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
