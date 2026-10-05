import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/sarees';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Instagram,
  Facebook,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Wedding / Muhurtham',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A26D38] mb-2">
            Visit Our Showroom or Inquire Online
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#242120] tracking-tight">
            Connect with ABC
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5E55] font-light">
            Whether selecting a bridal trousseau, arranging a virtual video drape call, or visiting our boutique in person, our saree curators look forward to serving you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Details, Social, & Google Maps Placeholder */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Business Info Box */}
            <div className="bg-white border border-[#E8DFD3] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-[#F0E8DC] pb-4">
                <span className="font-display text-2xl font-bold tracking-wider text-[#242120]">
                  {BUSINESS_INFO.name}
                </span>
                <p className="text-xs uppercase tracking-widest text-[#8C7A6B] mt-1">
                  Pure Handloom Silk Boutique
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#4A4543]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#242120] mb-0.5">
                      Store Address
                    </strong>
                    <p className="font-light leading-relaxed">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#242120] mb-0.5">
                      Phone Number
                    </strong>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="font-medium text-[#242120] hover:text-[#8B2635] transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#242120] mb-0.5">
                      Email Concierge
                    </strong>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="font-medium text-[#242120] hover:text-[#8B2635] transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8B2635] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#242120] mb-0.5">
                      Visiting Hours
                    </strong>
                    <p className="font-light text-xs sm:text-sm text-[#6B5E55]">
                      {BUSINESS_INFO.storeHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp button and Social Icons */}
              <div className="pt-4 border-t border-[#F0E8DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20ABC%20Silk%20Sarees,%20I%20would%20like%20to%20inquire%20about%20your%20collection.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1B5E20] hover:bg-[#144718] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Social media icons */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8C7A6B]">Follow ABC:</span>
                  <a
                    href={BUSINESS_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#E0D5C5] text-[#4A4543] hover:text-[#8B2635] hover:border-[#8B2635] transition-colors"
                    aria-label="ABC Silk Sarees on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={BUSINESS_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#E0D5C5] text-[#4A4543] hover:text-[#8B2635] hover:border-[#8B2635] transition-colors"
                    aria-label="ABC Silk Sarees on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder Card */}
            <div className="bg-white border border-[#E8DFD3] p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#242120] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B2635]" />
                  Google Maps Location
                </span>
                <span className="text-[#8C7A6B]">Kanchipuram, Tamil Nadu</span>
              </div>
              
              {/* Styled Interactive/Visual Map Container */}
              <div className="relative aspect-[16/7] w-full bg-[#EAE3D6] overflow-hidden border border-[#D9CEBE] flex flex-col items-center justify-center text-center p-4">
                {/* Stylized vector map pattern */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B2635_1px,transparent_1px)] [background-size:16px_16px]"
                />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#8B2635] text-white flex items-center justify-center shadow-md mb-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="font-display font-semibold text-sm text-[#242120]">
                    ABC Flagship Silk Showroom
                  </div>
                  <div className="text-[11px] text-[#6B5E55] max-w-xs mt-0.5">
                    Silk Weaver Lane, Kanchipuram
                  </div>
                  <a
                    href="https://maps.google.com/?q=Kanchipuram+Silk+Weavers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[11px] font-semibold text-[#8B2635] underline hover:text-[#5C1822]"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquire / Book Video Appointment Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-xs">
              <div className="border-b border-[#F0E8DC] pb-4 mb-6">
                <h3 className="font-display text-2xl font-semibold text-[#242120]">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-[#6B5E55] mt-1 font-light">
                  Plan your bridal trousseau or request a private 1-on-1 virtual video drape session.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#FAF5EE] border border-[#C5A059] text-[#1B5E20] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="font-display text-2xl font-semibold text-[#242120]">
                    Inquiry Received with Warmth
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B5E55] max-w-sm mx-auto font-light leading-relaxed">
                    Thank you, {formData.name}. Our senior saree curator will connect with you via phone / WhatsApp within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        occasion: 'Wedding / Muhurtham',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Meera Raman"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CEBE] focus:border-[#8B2635] focus:outline-none bg-[#FAF8F5]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CEBE] focus:border-[#8B2635] focus:outline-none bg-[#FAF8F5]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="meera@example.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CEBE] focus:border-[#8B2635] focus:outline-none bg-[#FAF8F5]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                        Occasion of Interest
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CEBE] focus:border-[#8B2635] focus:outline-none bg-white"
                      >
                        <option value="Wedding / Muhurtham">Wedding / Muhurtham</option>
                        <option value="Bridal Trousseau">Bridal Trousseau</option>
                        <option value="Reception / Sangeet">Reception / Sangeet</option>
                        <option value="Festive / Diwali">Festive / Diwali</option>
                        <option value="Custom Handloom Order">Custom Handloom Order</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                      Your Message / Saree Preferences
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share preferred colors, zari type, target date, or request a video consultation..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CEBE] focus:border-[#8B2635] focus:outline-none bg-[#FAF8F5]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] active:bg-[#5C1822] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                  <p className="text-[11px] text-center text-[#8C7A6B] font-light">
                    We respect your privacy. No promotional spam ever.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
