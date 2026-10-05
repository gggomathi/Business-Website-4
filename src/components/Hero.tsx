import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { heroImg } from '../data/sarees';

interface HeroProps {
  onShopSarees: () => void;
  onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopSarees, onExploreCollection }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:py-20 border-b border-[#EBDDC8]/60">
      {/* Subtle traditional Indian arch background motif */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8B2635_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Headline */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Heritage South Indian Handlooms</span>
              <span aria-hidden="true">·</span>
              <span>100% Pure Mulberry Silk</span>
            </div>

            {/* Business Monogram & Title */}
            <div>
              <p className="font-display text-sm tracking-[0.3em] uppercase text-[#8C7A6B] mb-1">
                The House of
              </p>
              <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tight text-[#242120] leading-[1.08] text-balance">
                Elegance Woven in Every Thread
              </h1>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-[#5A514B] font-light leading-relaxed max-w-xl">
              Discover timeless silk sarees crafted for your most beautiful occasions. From ceremonial Kanchipuram weaves to ethereal bridal brocades, celebrated through generations.
            </p>

            {/* Actions: "Shop Sarees" and "Explore Collection" */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopSarees}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B2635] text-white text-sm font-medium tracking-wide rounded-none hover:bg-[#721F2B] active:bg-[#5C1822] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:ring-offset-2 cursor-pointer group"
              >
                <span>Shop Sarees</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#B39B84] text-[#242120] hover:text-[#8B2635] hover:border-[#8B2635] hover:bg-[#F2ECE1]/60 text-sm font-medium tracking-wide transition-colors focus:outline-none cursor-pointer"
              >
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#E8DFD3] grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B2635]">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#242120]">Silk Mark</span>
                </div>
                <p className="text-[11px] text-[#786D65]">100% Certified Pure Silk</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B2635]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#242120]">Pure Zari</span>
                </div>
                <p className="text-[11px] text-[#786D65]">Authentic Temple Weaves</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B2635]">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#242120]">Bespoke</span>
                </div>
                <p className="text-[11px] text-[#786D65]">Direct Loom Artistry</p>
              </div>
            </div>

          </div>

          {/* Right Column: Large Premium Silk Saree Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative gold accent frame */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-3 sm:-inset-4 border border-[#D9C4A2] rounded-sm pointer-events-none translate-x-2 translate-y-2 opacity-70"
              />

              {/* Main Image Container */}
              <div className="relative overflow-hidden bg-[#F2ECE1] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] shadow-md border border-[#E8DFD3]">
                <img
                  src={heroImg}
                  alt="Elegant model draped in authentic crimson and gold Kanchipuram pure silk saree by ABC"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle luxury vignette */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                />

                {/* Caption pill-free overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs tracking-widest uppercase text-[#F3E5AB] font-medium drop-shadow-sm">
                    Masterpiece Edition
                  </p>
                  <p className="font-display text-lg sm:text-xl font-medium text-white drop-shadow-sm">
                    Rajkanya Crimson Handloom Korvai
                  </p>
                </div>
              </div>

              {/* Verified artisan tag */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-sm border border-[#E2D5C3] p-3 sm:p-4 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EB] border border-[#C5A059] flex items-center justify-center text-[#8B2635] font-display font-semibold text-sm">
                  ABC
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#242120]">Hand-Woven in Kanchipuram</div>
                  <div className="text-[10px] text-[#7A6E65]">Over 240 Loom Hours Dedicated</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
