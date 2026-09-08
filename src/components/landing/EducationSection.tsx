import React from 'react';
import { Activity, Heart, Wind, ShieldAlert, CheckCircle2 } from 'lucide-react';

const CONDITIONS = [
  {
    title: 'ডায়াবেটিস',
    desc: 'নিরাপদে সেবন করতে পারবেন',
    icon: CheckCircle2,
  },
  {
    title: 'উচ্চরক্তচাপ/নিম্ন রক্তচাপ',
    desc: 'কোন সমস্যা নেই',
    icon: Activity,
  },
  {
    title: 'এজমা',
    desc: 'নিরাপদ ব্যবহার',
    icon: Wind,
  },
  {
    title: 'হাঁপানি',
    desc: 'সেবন করতে পারবেন',
    icon: Wind,
  },
  {
    title: 'হার্টের প্রবলেম',
    desc: 'নিরাপদে ব্যবহার করতে পারবেন',
    icon: Heart,
  },
  {
    title: 'কিডনি সমস্যা',
    desc: 'নিরাপদে ব্যবহার করা যাবে',
    icon: ShieldAlert,
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section id="ll-education-section" className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50/50 to-white text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <span>🩺</span>
            <span>রোগ সংক্রান্ত তথ্য</span>
          </h2>
          <p className="text-base sm:text-xl font-bold text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            আপনার শরীরে নিচের সমস্যা থাকলেও নিশ্চিন্তে সেবন করতে পারবেন ইনশাআল্লাহ
          </p>
        </div>

        {/* Condition Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONDITIONS.map((cond, index) => {
            const IconComponent = cond.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {cond.title}
                </h3>
                <p className="text-sm font-semibold text-emerald-600">
                  {cond.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
