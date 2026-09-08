import React from 'react';
import { Clock, Package, CheckCircle, ShieldCheck } from 'lucide-react';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';

interface UsageSectionProps {
  onScrollToCheckout: () => void;
}

export const UsageSection: React.FC<UsageSectionProps> = ({ onScrollToCheckout }) => {
  const handleOrderClick = () => {
    trackClientInternalClick('Usage_Order_Click', 'Ling Long Usage Section');
    onScrollToCheckout();
  };

  return (
    <section id="ll-usage-section" className="py-16 sm:py-24 bg-white text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <span>💊</span>
            <span>লিং লং ক্যাপসুল সেবন বিধি</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            প্রতিদিন রাত্রে খাবার পর একটি করে ক্যাপসুল খাবেন। এক বোতলে ৬০ টি ক্যাপসুল আছে, যা ২ মাসের পূর্ণাঙ্গ কোর্স।
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Clock className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              প্রতি রাতে খাবার পর ১টি ক্যাপসুল
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Package className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              ৬০টি ক্যাপসুল - পূর্ণ ২ মাসের কোর্স
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              ২-৩ দিনের মধ্যেই পরিবর্তন লক্ষ্য করবেন
            </p>
          </div>
        </div>

        {/* Reassurance Callout Box */}
        <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-6 text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-black text-emerald-800 flex items-center justify-center gap-2">
            <span>✅</span>
            <span>স্থায়ী সমাধানের জন্য</span>
          </h3>
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3.5 rounded-xl border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <span className="text-base sm:text-lg font-bold text-emerald-900">
              মাত্র এক ফাইলে দুর্বলতার স্থায়ী সমাধান
            </span>
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleOrderClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 sm:px-14 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>👉</span>
            <span>অর্ডার করতে ক্লিক করুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
