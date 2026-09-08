import React from 'react';
import { BadgeCheck, Package, RotateCcw, QrCode } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="ll-why-us-section" className="py-16 sm:py-24 bg-white text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <span>⭐</span>
            <span>আমাদের থেকে কেন কিনবেন?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            বাংলাদেশে একমাত্র আমরাই সরাসরি বিদেশ থেকে বাংলাদেশ সরকারকে ১৩ শতাংশ শুল্ক দিয়ে প্রোডাক্ট আমদানি করে থাকি! আপনি আমাদের কাছে পাচ্ছেন 100% অরিজিনাল ও অফিসিয়াল প্রোডাক্ট।
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
              ✔️ প্রোডাক্ট হাতে পাওয়ার পর প্রোডাক্ট দেখে খুলে চেক করে পেমেন্ট করার সুব্যবস্থা
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
              ✔️ 100% মানিব্যাগ গ্যারান্টি
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
              ✔️ 100% রিটার্ন পলিসি
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
              ✔️ QR code Scan করে নিতে পারবেন
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
