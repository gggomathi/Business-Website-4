import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sarees';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = "Hello RJ Fabrics! I'm interested in viewing your silk saree collection and pricing.";

  const quickPrompts = [
    'Book a Bridal Video Consultation',
    'Inquire about Kanchipuram Weaves',
    'Request Wholesale Catalog & Pricing',
    'Check Saree Availability',
  ];

  const handleSendPrompt = (prompt: string) => {
    const encoded = encodeURIComponent(`Hello RJ Fabrics, ${prompt}`);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-[#E0D5C5] shadow-xl p-4 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-display font-bold text-xs">
                RJ
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#242120]">RJ Fabrics Concierge</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1B5E20]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20] animate-pulse" />
                  <span>Online & Ready to Assist</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8C7A6B] hover:text-[#242120] p-1"
              aria-label="Close WhatsApp chat prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-[#5A514B] font-light leading-relaxed">
            Welcome to RJ Fabrics! How can our silk handloom masters assist your celebration or boutique order today?
          </div>

          <div className="space-y-1.5 mb-3">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => handleSendPrompt(q)}
                className="w-full text-left text-xs px-3 py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#242120] border border-[#E8DFD3] transition-colors flex items-center justify-between"
              >
                <span>{q}</span>
                <span className="text-[#8C7A6B] text-[10px]">→</span>
              </button>
            ))}
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-[#1B5E20] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#144718] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#1B5E20] hover:bg-[#144718] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
        aria-label="Chat with RJ Fabrics on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
