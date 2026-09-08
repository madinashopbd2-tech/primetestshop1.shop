import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export const CertificateSection: React.FC = () => {
  return (
    <section id="ll-certificate-section" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <span>📜</span>
            <span>সার্টিফিকেট ও মান নিয়ন্ত্রণ</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            আমাদের প্রোডাক্ট আন্তর্জাতিক ও বাংলাদেশ মান অনুযায়ী সার্টিফাইড এবং মানসম্পন্ন
          </p>
        </div>

        {/* Certificate Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10 border-2 border-amber-200 text-center space-y-6">
            
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                BSTI ও ল্যাব সার্টিফিকেট
              </h3>
            </div>

            {/* Certificate Presentation Document Box */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-100 bg-amber-50/40 p-6 sm:p-8 text-left space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                <span className="font-mono text-xs font-bold text-amber-800 tracking-wider">
                  CERTIFICATE REF: BSTI-QCL-2025/JP-992
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  PASS & VERIFIED
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product Name:</span>
                  <span className="font-bold text-slate-900">Ling Long Herbal Extract 60 Pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Origin Formulation:</span>
                  <span className="font-bold text-slate-900">Japan Advanced Health Tech</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Test:</span>
                  <span className="font-bold text-slate-900">100% Herbal, Heavy Metal Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quality Assurance:</span>
                  <span className="font-bold text-emerald-700">Verified Authentic Imported Goods</span>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-amber-200/60 text-[11px] text-slate-500 italic">
                প্রোডাক্ট হাতে পাওয়ার পর QR কোড স্ক্যান করে অফিসিয়াল ভেরিফিকেশন চেক করতে পারবেন।
              </div>
            </div>

            {/* Verified Badge */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100% Verified & Authentic</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
