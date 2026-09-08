import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';

interface HelplineSectionProps {
  phone?: string;
}

export const HelplineSection: React.FC<HelplineSectionProps> = ({ phone }) => {
  const phoneNumber = phone || '01344509990';
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const internationalPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone.startsWith('0') ? cleanPhone : '0' + cleanPhone}`;
  const whatsappUrl = `https://wa.me/${internationalPhone}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি Ling Long 60 Pcs অর্ডার করতে চাই।')}`;

  const handleCall = () => {
    trackClientInternalClick('Helpline_Call', phoneNumber);
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    trackClientInternalClick('Helpline_WhatsApp', phoneNumber);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="ll-guarantee-section" className="py-14 sm:py-20 bg-white text-slate-900 font-sans border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 border-2 border-emerald-100 text-center space-y-8 hover:border-emerald-300 transition-colors">
          
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              সরাসরি হেল্পলাইন ও কাস্টমার সাপোর্ট
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              অর্ডার করতে বা পণ্য সম্পর্কে যেকোনো তথ্য জানতে সরাসরি আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>

          {/* Contact Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={handleCall}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              <span>{phoneNumber}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>হোয়াটসঅ্যাপ মেসেজ</span>
            </button>
          </div>

          {/* Prompt Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm font-bold text-emerald-900">
            অর্ডার কনফার্ম করতে কোন সমস্যা হলে সরাসরি <a href={`tel:${phoneNumber}`} className="underline font-mono text-emerald-800 font-black">{phoneNumber}</a> এই নাম্বারে কল করুন।
          </div>

        </div>

      </div>
    </section>
  );
};
