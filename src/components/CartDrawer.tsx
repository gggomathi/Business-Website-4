import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';
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
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod', // Cash on Delivery / UPI
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) return;
    const generatedOrderNum = `ABC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
      setCheckoutStep('cart');
    }
    onClose();
  };

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
                ? 'Your Shopping Bag'
                : checkoutStep === 'checkout'
                ? 'Ceremonial Delivery Checkout'
                : 'Order Confirmed'}
            </span>
            {checkoutStep === 'cart' && (
              <span className="text-xs text-[#8C7A6B]">({totalItemsCount} items)</span>
            )}
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 text-[#6B5E55] hover:text-[#242120] transition-colors"
            aria-label="Close Shopping Bag"
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
                    ABC
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#242120]">
                      Your Bag is Empty
                    </h3>
                    <p className="text-xs text-[#7A6E65] mt-1 max-w-xs font-light">
                      Explore our handloom silk collections to find the perfect heirloom drape.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
                  >
                    Explore Sarees
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free shipping banner */}
                  <div className="bg-[#FAF5EE] border border-[#EADDC9] p-3 text-xs flex items-center gap-2 text-[#4A4543]">
                    <Truck className="w-4 h-4 text-[#8B2635] shrink-0" />
                    <span>Complimentary insured shipping applied to your order!</span>
                  </div>

                  {/* Items List */}
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
                          <div className="mt-1 text-xs font-semibold text-[#242120] tabular-nums">
                            ₹{item.saree.price.toLocaleString('en-IN')}
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
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div className="bg-[#FAF5EE] p-3 border border-[#E0D5C5] flex items-center justify-between">
                <span>Order Total:</span>
                <strong className="text-sm text-[#242120] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </strong>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                  Recipient Name *
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
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerDetails.pincode}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, pincode: e.target.value })
                    }
                    placeholder="e.g. 600001"
                    className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, address: e.target.value })
                  }
                  placeholder="Door No, Street Name, Landmark, City"
                  className="w-full px-3 py-2 border border-[#D9CEBE] text-xs focus:outline-none focus:border-[#8B2635]"
                />
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A4543] mb-1.5">
                  Select Payment Option
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 border border-[#D9CEBE] cursor-pointer hover:bg-[#FAF8F5]">
                    <input
                      type="radio"
                      name="payment"
                      checked={customerDetails.paymentMethod === 'cod'}
                      onChange={() =>
                        setCustomerDetails({ ...customerDetails, paymentMethod: 'cod' })
                      }
                      className="text-[#8B2635]"
                    />
                    <div>
                      <span className="font-semibold text-[#242120] block">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-[#7A6E65]">
                        Inspect your pure silk upon delivery, then pay.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 border border-[#D9CEBE] cursor-pointer hover:bg-[#FAF8F5]">
                    <input
                      type="radio"
                      name="payment"
                      checked={customerDetails.paymentMethod === 'online'}
                      onChange={() =>
                        setCustomerDetails({ ...customerDetails, paymentMethod: 'online' })
                      }
                      className="text-[#8B2635]"
                    />
                    <div>
                      <span className="font-semibold text-[#242120] block">UPI / Net Banking / Card</span>
                      <span className="text-[10px] text-[#7A6E65]">
                        Instant secure online payment with Silk Mark guarantee.
                      </span>
                    </div>
                  </label>
                </div>
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
                  Congratulations on Your Heirloom!
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-1 font-mono">
                  Order Reference: {orderNumber}
                </p>
              </div>

              <div className="bg-[#FAF5EE] border border-[#E0D5C5] p-4 text-left space-y-2 text-xs text-[#4A4543]">
                <div><strong>Recipient:</strong> {customerDetails.name}</div>
                <div><strong>Phone:</strong> {customerDetails.phone}</div>
                <div><strong>Address:</strong> {customerDetails.address}, {customerDetails.pincode}</div>
                <div><strong>Payment:</strong> {customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Verified'}</div>
                <div><strong>Total Amount:</strong> ₹{subtotal.toLocaleString('en-IN')}</div>
              </div>

              <p className="text-xs text-[#6B5E55] font-light leading-relaxed">
                Your saree is being carefully pressed and wrapped in pure cotton muslin cloth. Our concierge will send tracking updates via WhatsApp to {customerDetails.phone}.
              </p>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#721F2B] transition-colors"
              >
                Continue Browsing ABC Sarees
              </button>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFD3] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B5E55]">Subtotal</span>
              <span className="text-lg font-bold text-[#242120] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
              <span>Shipping & Insurance</span>
              <span className="text-[#1B5E20] font-semibold">FREE</span>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 bg-[#8B2635] hover:bg-[#721F2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Proceed to Checkout</span>
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
              form="checkout-form"
              type="submit"
              className="flex-1 py-3 bg-[#8B2635] hover:bg-[#721F2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Place Order</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
