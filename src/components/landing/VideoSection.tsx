import React, { useState, useEffect } from 'react';
import { ProductData } from '../../types';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';
import { parseVideoUrl } from '../../utils/video-embed';
import { ExternalLink } from 'lucide-react';

interface VideoSectionProps {
  product: ProductData;
  onScrollToCheckout: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  product,
  onScrollToCheckout,
}) => {
  const videoInfo = parseVideoUrl(product.videoUrl);
  // 24-hour countdown state
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 12,
    minutes: 44,
    seconds: 35,
  });

  useEffect(() => {
    const COUNTDOWN_STORAGE_KEY = 'll-countdown-end-time';
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    let storedEnd = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    let endTime: number;

    if (!storedEnd || Number(storedEnd) <= Date.now()) {
      endTime = Date.now() + TWENTY_FOUR_HOURS;
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(endTime));
    } else {
      endTime = Number(storedEnd);
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        endTime = Date.now() + TWENTY_FOUR_HOURS;
        localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(endTime));
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOrderClick = () => {
    trackClientInternalClick('Video_Section_Order', 'Ling Long Video');
    onScrollToCheckout();
  };

  return (
    <section id="ll-video-section" className="py-14 sm:py-20 bg-white text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Header Section */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            ইরেক্টাইল ডিসফাংশন এবং অকাল বীর্যপাতের স্থায়ী সমাধান
          </h2>
          <p className="text-lg sm:text-xl font-bold text-emerald-700">
            Ling Long (Made in Japan) এক ফাইলেই স্থায়ী সমাধান
          </p>
        </div>

        {/* Video / Showcase Container */}
        <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/20 border-4 border-emerald-100 bg-slate-950 aspect-video max-w-3xl flex items-center justify-center">
          {videoInfo.embedUrl ? (
            videoInfo.isDirectVideo ? (
              <video
                src={videoInfo.embedUrl}
                controls
                className="w-full h-full object-contain"
                poster={product.images?.[0]}
              />
            ) : (
              <iframe
                className="w-full h-full border-0"
                src={videoInfo.embedUrl}
                title="Product Video"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900">
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'}
                alt="Product Preview"
                className="max-h-48 rounded-xl shadow-lg mb-3 object-contain"
              />
              <span className="text-base sm:text-lg font-bold text-amber-400">
                100% অরিজিনাল জাপানি ফর্মুলা
              </span>
              <span className="text-xs text-emerald-200 mt-1">
                বিশেষ সময়ে অফুরন্ত এনার্জি ও স্থায়ী সমাধান
              </span>
            </div>
          )}
        </div>

        {/* Optional Direct Video Link */}
        {videoInfo.rawUrl && (
          <div className="flex justify-center -mt-4">
            <a
              href={videoInfo.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 px-3.5 py-1.5 rounded-full transition-all"
            >
              <span>ভিডিও আলাদা ট্যাবে প্লে করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Order Button */}
        <div>
          <button
            type="button"
            onClick={handleOrderClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-2xl shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>👉</span>
            <span>এখনই অর্ডার করুন</span>
          </button>
        </div>

        {/* Countdown Timer Wrapper */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-xl shadow-red-600/25">
          <div className="text-base sm:text-lg font-bold mb-3 flex items-center justify-center gap-2">
            <span>⏰</span>
            <span>অফার শেষ হতে বাকি:</span>
          </div>
          <div className="flex justify-center items-center gap-3 text-center">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 min-w-[70px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-white/90 font-medium">ঘন্টা</span>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 min-w-[70px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-white/90 font-medium">মিনিট</span>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 min-w-[70px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-white/90 font-medium">সেকেন্ড</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
