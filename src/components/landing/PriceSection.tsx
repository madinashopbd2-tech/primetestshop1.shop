import React from 'react';
import { Crown, Check, Truck, ShieldCheck, Zap } from 'lucide-react';
import { ProductData } from '../../types';
import { trackClientInternalClick, trackClientAddToCart } from '../../lib/marketing/tracking-client';

interface PriceSectionProps {
  product: ProductData;
  onScrollToCheckout: () => void;
}

export const PriceSection: React.FC<PriceSectionProps> = ({
  product,
  onScrollToCheckout,
}) => {
  const handleOrderClick = () => {
    trackClientAddToCart(
      product.title,
      product.offerPrice || product.regularPrice,
      1,
      'Ling Long 60 Capsules Best Value'
    );
    trackClientInternalClick('Price_Section_Order', 'Ling Long Package Card');
    onScrollToCheckout();
  };

  return (
    <section id="ll-price-section" className="relative py-16 sm:py-24 overflow-hidden bg-[radial-gradient(circle_at_top_right,#ecfdf5,#ffffff)] text-slate-900 font-sans">
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            সেরা ভ্যালু প্যাকেজ
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            আপনার যৌন স্বাস্থ্য সুরক্ষায় আজই বেছে নিন জাপানি প্রযুক্তির লিং লং ক্যাপসুল। সীমিত সময়ের অফার!
          </p>
        </div>

        {/* Pricing Card Wrapper */}
        <div className="max-w-md mx-auto relative">
          <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/15 border-2 border-amber-400 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            
            {/* Golden Ribbon Banner */}
            <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden pointer-events-none">
              <div className="absolute top-6 -right-10 w-44 py-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider text-center rotate-45 shadow-md">
                সবচেয়ে জনপ্রিয়
              </div>
            </div>

            {/* Product Header */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                <Crown className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Ling Long 60 Capsules
              </h3>

              {/* Price Display */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="text-4xl sm:text-5xl font-black text-emerald-900">
                  ৳{product.offerPrice || 1299}
                </span>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-sm sm:text-base text-rose-500 line-through font-semibold">
                    ৳{product.regularPrice || 3999}
                  </span>
                  <span className="text-[10px] sm:text-xs font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full mt-0.5">
                    SAVE 60%
                  </span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <ul className="py-6 space-y-3.5">
              {[
                '৬০ টি ক্যাপসুল (২ মাসের কোর্স)',
                'ফ্রি হোম ডেলিভারি সুবিধা',
                'নিশ্চিন্তে ক্যাশ অন ডেলিভারি',
                '100% অরিজিনাল জাপানি পণ্য',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Pulsing Order CTA Button */}
            <button
              type="button"
              onClick={handleOrderClick}
              className="w-full py-4 px-6 text-base sm:text-lg font-black text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-2xl shadow-xl shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer animate-pulse flex items-center justify-center gap-2"
            >
              <span>👉</span>
              <span>অর্ডার করতে ক্লিক করুন</span>
            </button>

          </div>
        </div>

        {/* Extra Benefits Below Card */}
        <div className="flex justify-center items-center gap-6 sm:gap-12 mt-12 flex-wrap">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700">ফ্রি ডেলিভারি</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700">নিরাপদ পেমেন্ট</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700">দ্রুত শিপিং</span>
          </div>
        </div>

      </div>
    </section>
  );
};
