import React from 'react';
import { CustomerReview } from '../types';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF5EE] border-t border-[#EBDDC8]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38] mb-2">
            Patron Reflections
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#242120] tracking-tight">
            Voices of Elegance
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5E55] font-light">
            Real stories from brides, families, and silk saree lovers who made ABC an indelible part of their celebrations.
          </p>
        </div>

        {/* 3-4 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E8DFD3] p-6 flex flex-col justify-between shadow-xs relative"
            >
              <div>
                {/* Subtle Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#E0D5C5]" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4A4543] font-light leading-relaxed italic mb-4">
                  "{rev.review}"
                </p>
              </div>

              {/* Author & Purchase Info */}
              <div className="pt-4 border-t border-[#F0E8DC]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242120]">
                  <span>{rev.author}</span>
                  <span title="Verified Buyer" className="inline-flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E20]" />
                  </span>
                </div>
                
                <div className="text-[11px] text-[#8C7A6B] mt-0.5">
                  {rev.city} · {rev.date}
                </div>

                <div className="mt-2 text-[11px] text-[#8B2635] font-medium line-clamp-1">
                  Purchased: {rev.sareePurchased}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary statement */}
        <div className="mt-12 text-center text-xs text-[#7A6E65]">
          Rated <strong className="font-semibold text-[#242120]">4.9 / 5</strong> across 500+ celebrations across India and worldwide.
        </div>

      </div>
    </section>
  );
};
