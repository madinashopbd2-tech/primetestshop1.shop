import React from 'react';
import { Zap, ShieldCheck, Truck, Award, Star } from 'lucide-react';
import { ProductData, StoreSettings } from '../../types';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';

interface HeroSectionProps {
  product: ProductData;
  settings: StoreSettings;
  onScrollToCheckout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  product,
  settings,
  onScrollToCheckout,
}) => {
  const handleCtaClick = () => {
    trackClientInternalClick('Hero_Order_Click', 'Ling Long 60 Pcs');
    onScrollToCheckout();
  };

  return (
    <div id="ll-fast-hero" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#064e3b,#022c22)] text-white pt-8 sm:pt-12 pb-24 sm:pb-32">
      {/* Background ambient glow circles */}
      <div className="absolute -top-[10%] -left-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald-500/25 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-amber-600/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Text Content Column */}
          <div className="flex-1 max-w-xl text-center lg:text-left space-y-5">
            {/* Natural Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <span>✨</span>
              <span>১০০% ন্যাচারাল</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent font-black">
                Ling Long
              </span>{' '}
              60 Pcs
              <span className="block text-base sm:text-xl font-medium text-emerald-100/90 mt-2">
                জাপানি প্রযুক্তিতে তৈরি (100% Original)
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-emerald-50/95 leading-relaxed font-normal">
              {product.description ||
                'হতাশাকে বলুন বিদায়! আধুনিক জাপানি প্রযুক্তিতে তৈরি লিং লং ক্যাপসুল আপনাকে দেবে হারানো যৌবন এবং অফুরন্ত এনার্জি।'}
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
              <div className="bg-white/[0.08] border border-white/15 p-3 sm:p-3.5 rounded-xl flex items-center gap-3 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  এনার্জি ও স্ট্যামিনা বুস্টার
                </span>
              </div>

              <div className="bg-white/[0.08] border border-white/15 p-3 sm:p-3.5 rounded-xl flex items-center gap-3 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  কোয়ালিটি কন্ট্রোলড
                </span>
              </div>

              <div className="bg-white/[0.08] border border-white/15 p-3 sm:p-3.5 rounded-xl flex items-center gap-3 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  ডেলিভারি বাংলাদেশ
                </span>
              </div>

              <div className="bg-white/[0.08] border border-white/15 p-3 sm:p-3.5 rounded-xl flex items-center gap-3 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  অরিজিনাল ইম্পোর্টেড
                </span>
              </div>
            </div>

            {/* Big CTA Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                <span>👉</span>
                <span>অর্ডার করতে ক্লিক করুন</span>
              </button>
            </div>
          </div>

          {/* Visual Column */}
          <div className="flex-1 flex justify-center relative w-full max-w-md lg:max-w-none">
            <div className="relative p-6 sm:p-10 flex justify-center items-center">
              {/* Radial glow around image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-[radial-gradient(circle,rgba(251,191,36,0.3)_0%,rgba(16,185,129,0.15)_50%,transparent_70%)] blur-2xl pointer-events-none" />

              {/* Product Image */}
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'}
                alt="Ling Long Box"
                className="relative z-10 max-w-[260px] sm:max-w-[340px] w-full h-auto rounded-2xl object-cover drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-[bounce_5s_ease-in-out_infinite]"
              />

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute top-4 sm:top-8 right-2 sm:right-4 z-20 px-3.5 py-1.5 bg-amber-500/90 backdrop-blur-md border border-amber-300/60 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current text-amber-100" />
                <span>Premium</span>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute bottom-6 sm:bottom-10 left-2 sm:left-4 z-20 px-3.5 py-1.5 bg-rose-600/90 backdrop-blur-md border border-rose-400/60 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5">
                <span>🇯🇵</span>
                <span>Made in Japan</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-10 sm:h-16 text-white fill-current">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z" />
        </svg>
      </div>
    </div>
  );
};
