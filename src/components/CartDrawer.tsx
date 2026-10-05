import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sarees';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (sareeId: string, quantity: number) => void;
  onRemoveItem: (sareeId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    inquiryType: 'Retail / Bridal', // Retail or Wholesale
    notes: '',
  });
  const [inquiryReference, setInquiryReference] = useState('');

  if (!isOpen) return null;

  const totalPiecesCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartInquiry = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone) return;
    const generatedRef = `RJ-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryReference(generatedRef);
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
      setCheckoutStep('cart');
    }
    onClose();
  };

  // Pre-filled WhatsApp message for all items in the inquiry bag
  const itemsText = items
    .map((item, idx) => `${idx + 1}. ${item.saree.name} (${item.quantity} ${item.quantity === 1 ? 'pc' : 'pcs'})`)
    .join('%0A');

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello RJ Fabrics! I would like to receive the pricing and details for the following sarees in my inquiry bag:%0A%0A`
  )}${itemsText}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={handleCloseAndReset}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFD3] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-semibold text-[#242120]">
              {checkoutStep === 'cart'
                ? 'Your Saree Inquiry Bag'
                : checkoutStep === 'checkout'
                ? 'Request Price Quotation'
                : 'Inquiry Submitted'}
            </span>
            {checkoutStep === 'cart' && (
              <span className="text-xs text-[#8C7A6B]">({totalPiecesCount} {totalPiecesCount === 1 ? 'item' : 'items'})</span>
            )}
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 text-[#6B5E55] hover:text-[#242120] transition-colors"
            aria-label="Close Inquiry Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border border-[#E0D5C5] flex items-center justify-center text-[#8B2635] font-display text-2xl font-bold">
                    RJ
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#242120]">
                      Your Inquiry Bag is Empty
                    </h3>
                    <p className="text-xs text-[#7A6E65] mt-1 max-w-xs font-light">
                      Explore our handloom silk collections and add sarees to request official quotations and fabric videos.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Silk mark note */}
                  <div className="bg-[#FAF5EE] border border-[#EADDC9] p-3 text-xs flex items-center gap-2 text-[#4A4543]">
                    <ShieldCheck className="w-4 h-4 text-[#8B2635] shrink-0" />
                    <span>Direct Handloom Pricing · Wholesale & Retail Enquiries</span>
                  </div>

                  {/* Items List without prices */}
                  <div className="divide-y divide-[#F0E8DC]">
                    {items.map((item) => (
                      <div key={item.saree.id} className="py-4 flex gap-4 items-center">
                        <div className="w-20 h-24 bg-[#F2ECE1] border border-[#E8DFD3] shrink-0 overflow-hidden">
                          <img
                            src={item.saree.image}
                            alt={item.saree.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#242120] truncate">
                            {item.saree.name}
                          </h4>
                          <p className="text-[11px] text-[#8C7A6B] truncate">
                            {item.saree.color} · 100% Pure Silk
                          </p>
                          <div className="mt-1 text-xs font-semibold text-[#8B2635]">
                            Price on Request
                          </div>

                          {/* Stepper & Delete */}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center border border-[#D9CEBE] bg-[#FAF8F5]">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.saree.id, Math.max(1, item.quantity - 1))
                                }
                                className="px-2 py-0.5 text-xs text-[#242120] hover:bg-[#EBE2D5]"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.saree.id, item.quantity + 1)
                                }
                                className="px-2 py-0.5 text-xs text-[#242120] hover:bg-[#EBE2D5]"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.saree.id)}
                              className="text-xs text-[#A89C91] hover:text-[#8B2635] transition-colors p-1"
                              aria-label={`Remove ${item.saree.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct WhatsApp instant quote option */}
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#1B5E20] hover:bg-[#144718] text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire this List on WhatsApp</span>
                  </a>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="inquiry-form" onSubmit={handlePlaceInquiry} className="space-y-4 text-xs">
              <div className="bg-[#FAF5EE] p-3 border border-[#E0D5C5]">
                <div className="text-[11px] text-[#8C7A6B]">Inquiry Summary</div>
                <div className="text-sm font-semibold text-[#242120]">
                  {totalPiecesCount} Handloom Saree {totalPiecesCount === 1 ? 'Design' : 'Designs'} Selected
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  placeholder="e.g. Smt. Lakshmi Narayanan"
                  className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerDetails.phone}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, phone: e.target.value })
                    }
                    placeholder="+91 79043 96868"
                    className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={customerDetails.city}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, city: e.target.value })
                    }
                    placeholder="e.g. Tiruppur / Chennai"
                    className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={customerDetails.inquiryType}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, inquiryType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635] bg-white"
                >
                  <option value="Retail / Bridal">Retail / Bridal Occasion</option>
                  <option value="Wholesale / Boutique Reseller">Wholesale / Boutique Reseller</option>
                  <option value="Bulk Wedding Order">Bulk Wedding Order</option>
                  <option value="Export / International">Export / International Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                  Notes or Customization Requests
                </label>
                <textarea
                  rows={2}
                  value={customerDetails.notes}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, notes: e.target.value })
                  }
                  placeholder="Need video consultation, specific color shades, delivery timeline..."
                  className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                />
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#E8F5E9] text-[#1B5E20] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#242120]">
                  Inquiry Received with Pleasure
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-1 font-mono">
                  Reference: {inquiryReference}
                </p>
              </div>

              <div className="bg-[#FAF5EE] border border-[#E0D5C5] p-4 text-left space-y-2 text-xs text-[#4A4543]">
                <div><strong>Patron:</strong> {customerDetails.name}</div>
                <div><strong>Phone:</strong> {customerDetails.phone}</div>
                <div><strong>Inquiry Type:</strong> {customerDetails.inquiryType}</div>
                <div><strong>Total Sarees:</strong> {totalPiecesCount} Pieces</div>
                <div><strong>Company:</strong> RJ Fabrics (GSTIN: {BUSINESS_INFO.gstin})</div>
              </div>

              <p className="text-xs text-[#6B5E55] font-light leading-relaxed">
                Thank you! Our concierge team from RJ Fabrics will connect with you via WhatsApp or call ({BUSINESS_INFO.phonePrimary}) with comprehensive quotations and daylight weave videos.
              </p>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
              >
                Continue Browsing RJ Fabrics
              </button>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFD3] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
              <span>Direct Weaver Contact</span>
              <span className="text-[#8B2635] font-semibold">{BUSINESS_INFO.phonePrimary}</span>
            </div>

            <button
              onClick={handleStartInquiry}
              className="w-full py-3.5 bg-[#8B2635] hover:bg-[#721F2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Request Price Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {checkoutStep === 'checkout' && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFD3] bg-[#FAF8F5] flex gap-3">
            <button
              type="button"
              onClick={() => setCheckoutStep('cart')}
              className="py-3 px-4 border border-[#D9CEBE] text-xs font-semibold text-[#4A4543] hover:bg-[#F2ECE1]"
            >
              Back
            </button>
            <button
              form="inquiry-form"
              type="submit"
              className="flex-1 py-3 bg-[#8B2635] hover:bg-[#721F2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
