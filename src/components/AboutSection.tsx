import React from 'react';
import { craftHandloom } from '../data/sarees';
import { Award, Compass, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF5EE] border-y border-[#EBDDC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Handloom Master Craftsmanship Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Gold frame accent */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 sm:-inset-4 border border-[#C5A059]/60 pointer-events-none -translate-x-2 -translate-y-2"
              />

              <div className="relative aspect-[4/3] overflow-hidden shadow-lg border border-[#E0D5C5] bg-[#EBE2D5]">
                <img
                  src={craftHandloom}
                  alt="Master handloom weaver working on pure silk warp with golden zari threads for ABC Silk Sarees"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#F3E5AB]">The Master’s Touch</p>
                  <p className="font-display text-base sm:text-lg font-medium">Interlocking Korvai Handloom Weaving</p>
                </div>
              </div>

              {/* Heritage Stat Card */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white border border-[#E2D5C3] p-4 sm:p-5 shadow-sm max-w-[240px]">
                <div className="font-display text-2xl font-bold text-[#8B2635] tabular-nums">100%</div>
                <div className="text-xs font-semibold text-[#242120] mt-0.5">Pure Mulberry Silk</div>
                <div className="text-[11px] text-[#7A6E65] mt-1 font-light">
                  Directly sourced from certified South Indian sericulture farmers.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Heritage Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38]">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Our Heritage & Purpose</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#242120] tracking-tight leading-[1.15]">
              Preserving Indian Heritage, One Handloom at a Time
            </h2>

            <div className="w-16 h-[2px] bg-[#C5A059]" />

            <div className="space-y-4 text-sm sm:text-base text-[#5A514B] font-light leading-relaxed">
              <p>
                At <strong>ABC</strong>, our mission is born out of deep reverence for Indian handloom artistry. We believe a silk saree is never simply an attire—it is an heirloom of memory, sacred blessing, and cultural celebration passed down with pride across mothers, daughters, and generations.
              </p>
              <p>
                We are dedicated to bringing authentic, elegant, and exceptional-grade silk sarees directly to our patrons while upholding the timeless dignity of master handloom artisans. By eliminating intermediaries, every ABC drape honors traditional handloom pit-loom techniques, pure silver zari electroplated in 24k gold, and certified Mulberry silk fibers.
              </p>
            </div>

            {/* Core Commitments */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#242120]">Certified Silk Mark</h4>
                  <p className="text-xs text-[#786D65] mt-0.5">Government-authenticated 100% pure silk on every piece.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#242120]">Artisan Fair Support</h4>
                  <p className="text-xs text-[#786D65] mt-0.5">Sustainable livelihoods for fourth-generation weaving families.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
