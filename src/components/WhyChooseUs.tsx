import React from 'react';
import { Award, Gem, Sparkles, CheckCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Silk Mark Authenticated',
      description:
        'Every weave undergoes rigorous quality checks for warp-weft density, colorfast natural dyes, and drape weight stability.',
    },
    {
      icon: Gem,
      title: 'Authentic Silk',
      subtitle: '100% Pure Mulberry Yarn',
      description:
        'Sourced from certified sericulture centres with genuine silver-gold zari testing to guarantee zero synthetic adulteration.',
    },
    {
      icon: Sparkles,
      title: 'Traditional Craftsmanship',
      subtitle: 'Hand-Woven by Master Artisans',
      description:
        'Preserving ancient Korvai pit-loom traditions, sacred temple border motifs, and hand-embroidered pallu intricacies.',
    },
    {
      icon: CheckCheck,
      title: 'Carefully Selected Designs',
      subtitle: 'Exclusive Curated Collections',
      description:
        'Thoughtfully curated palettes harmonizing auspicious bridal reds with contemporary pastels for modern celebrations.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38] mb-2">
            The RJ Fabrics Distinction
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#242120] tracking-tight">
            Why Choose RJ Fabrics
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5E55] font-light">
            Rooted in authenticity, dedicated to excellence, and cherished by patrons worldwide.
          </p>
        </div>

        {/* Four Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white border border-[#E8DFD3] p-6 sm:p-7 relative flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <div>
                  {/* Subtle top indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-[#FAF5EE] border border-[#E2D5C3] flex items-center justify-center text-[#8B2635]">
                      <Icon className="w-5 h-5 text-[#8B2635]" />
                    </div>
                    <span className="text-xs font-medium text-[#C5A059] tabular-nums font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#242120] mb-1">
                    {feature.title}
                  </h3>

                  <p className="text-xs font-medium text-[#A26D38] uppercase tracking-wider mb-3">
                    {feature.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#6B5E55] font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0E8DC] text-[11px] text-[#8C7A6B] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>RJ Fabrics Lifetime Authenticity Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
