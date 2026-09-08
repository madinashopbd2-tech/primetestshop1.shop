import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const LOCATIONS = [
  'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল',
  'রংপুর', 'ময়মনসিংহ', 'কুমিল্লা', 'নারায়ণগঞ্জ', 'গাজীপুর',
  'যশোর', 'বগুড়া', 'দিনাজপুর', 'পাবনা', 'নোয়াখালী',
  'টাঙ্গাইল', 'ফরিদপুর', 'কিশোরগঞ্জ', 'নরসিংদী',
];

const NAMES = [
  'আব্দুল্লাহ', 'রহিম', 'করিম', 'জাহিদ', 'মাহমুদ', 'শাহীন',
  'রাকিব', 'তানভীর', 'ফারুক', 'সালাম', 'জামাল', 'হাসান',
  'আরিফ', 'নাসির', 'সাকিব', 'রফিক', 'বাবুল', 'মনির',
  'সাইফুল', 'কামাল', 'জসিম', 'রাজু', 'মিজান', 'সোহেল',
  'রিয়াজ', 'আসাদ', 'সাদিক', 'ইমরান', 'নাহিদ', 'মুনির',
  'শফিক', 'জাহাঙ্গীর', 'বদরুল', 'আলম', 'শাহরিয়ার', 'রাশেদ',
  'নাজমুল', 'মাসুদ', 'সুমন', 'তৌহিদ', 'ইকবাল', 'মোস্তফা',
  'সামিউল', 'ইয়াসিন', 'রিফাত', 'কবির', 'হাফিজ', 'জাভেদ',
  'ওসমান', 'আব্দুর রহমান', 'মোবারক', 'আনোয়ার',
];

const STOCK_OPTIONS = ['১ বক্স', '২ বক্স', '৩ বক্স', '১ কার্টন', '২ কার্টন'];

export const LiveOrderNotification: React.FC = () => {
  const [notification, setNotification] = useState<{
    name: string;
    stock: string;
    location: string;
    time: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let count = 0;
    const maxNotifications = 25;

    const triggerNotification = () => {
      if (count >= maxNotifications) return;

      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const randomStock = STOCK_OPTIONS[Math.floor(Math.random() * STOCK_OPTIONS.length)];
      const randomMinutes = Math.floor(Math.random() * 15) + 1;

      setNotification({
        name: randomName,
        stock: randomStock,
        location: randomLocation,
        time: `${randomMinutes} মিনিট আগে`,
      });
      setIsVisible(true);
      count++;

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // First notification after 3 seconds
    const firstTimeout = setTimeout(() => {
      triggerNotification();

      // Recurring schedule every 9-16 seconds
      const interval = setInterval(() => {
        triggerNotification();
      }, Math.floor(Math.random() * 7000) + 9000);

      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(firstTimeout);
  }, []);

  if (!notification || !isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-50 max-w-xs sm:max-w-sm w-[calc(100%-2rem)] sm:w-auto bg-white/95 backdrop-blur-md border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl shadow-emerald-950/20 flex items-center gap-3.5 transition-all duration-500 animate-in slide-in-from-left">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-500/30 animate-pulse">
        <ShoppingCart className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
          {notification.name} এইমাত্র অর্ডার করেছে
        </h4>
        <div className="text-[11px] sm:text-xs text-rose-600 font-extrabold flex items-center gap-1">
          <span>📦 {notification.stock}</span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          {notification.location} থেকে
        </div>
        <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          {notification.time}
        </span>
      </div>
    </div>
  );
};
