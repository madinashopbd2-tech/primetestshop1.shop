import React from 'react';
import { Check, Zap, Heart, Shield, Activity, Sparkles, Clock, Flame, Droplets } from 'lucide-react';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';

interface BenefitsSectionProps {
  onScrollToCheckout: () => void;
}

const BENEFITS = [
  {
    title: 'দ্রুত বীর্যপাত বন্ধ করবে',
    gradient: 'from-blue-500 to-blue-700',
    icon: Zap,
  },
  {
    title: 'বীর্য পাতলাকে ঘন করবে',
    gradient: 'from-amber-500 to-orange-600',
    icon: Droplets,
  },
  {
    title: 'মিলনে সময় বাড়াবে ২৫-৩৫ মিনিট',
    gradient: 'from-emerald-500 to-emerald-700',
    icon: Clock,
  },
  {
    title: 'ভাল ফিলিংস আসবে',
    gradient: 'from-rose-500 to-pink-600',
    icon: Heart,
  },
  {
    title: 'গোপনাঙ্গকে মোটা ও লম্বা করবে',
    gradient: 'from-purple-500 to-purple-700',
    icon: Sparkles,
  },
  {
    title: 'আগা মোটা গোরা চিকন সমাধান',
    gradient: 'from-indigo-500 to-indigo-700',
    icon: Activity,
  },
  {
    title: 'রাতে ২-৩ বার সহবাস করতে পারবেন',
    gradient: 'from-pink-500 to-rose-600',
    icon: Flame,
  },
  {
    title: 'শুক্রাণুর উৎপাদন করবে',
    gradient: 'from-cyan-500 to-cyan-700',
    icon: Shield,
  },
  {
    title: 'শীথিলতা ও বক্রতা দূর করে',
    gradient: 'from-teal-500 to-teal-700',
    icon: Zap,
  },
];

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onScrollToCheckout }) => {
  const handleCtaClick = () => {
    trackClientInternalClick('Benefits_Order_Click', 'Ling Long 9 Benefits');
    onScrollToCheckout();
  };

  return (
    <section id="ll-benefits-section" className="relative py-16 sm:py-24 bg-[#064e3b] text-white overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold flex items-center justify-center gap-2">
            <span>🧠</span>
            <span>Ling Long আপনার যে সব সমস্যার সাপোর্ট দেয়</span>
          </h2>
          <p className="text-sm sm:text-lg text-emerald-200 font-medium">
            বিশেষ সময়ে তৃপ্তির জন্য এটির কোন বিকল্প নেই
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {BENEFITS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-amber-400/60 p-4 sm:p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 shadow-lg shadow-emerald-950/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 text-white shadow-md`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-white flex-1 leading-snug">
                  {item.title}
                </p>
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Order CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 sm:px-14 py-4 text-base sm:text-lg font-black text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl shadow-amber-500/30 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <span>👉</span>
            <span>অর্ডার করতে ক্লিক করুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
