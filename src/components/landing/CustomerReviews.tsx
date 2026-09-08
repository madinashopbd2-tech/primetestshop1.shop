import React, { useState } from 'react';
import { Star, MessageSquarePlus, MapPin, Quote, CheckCircle2 } from 'lucide-react';
import { ReviewData } from '../../types';
import { trackClientInternalClick } from '../../lib/marketing/tracking-client';

interface CustomerReviewsProps {
  reviews: ReviewData[];
  onAddReview: (review: ReviewData) => void;
  sectionBadge?: string;
  sectionTitle?: string;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onAddReview,
  sectionBadge,
  sectionTitle,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('ঢাকা');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: ReviewData = {
      id: `rev_${Date.now()}`,
      authorName: authorName.trim(),
      rating,
      comment: comment.trim(),
      location: location.trim() || 'ঢাকা',
      isVerified: true,
      createdAt: 'এখনই',
    };

    onAddReview(newRev);
    setShowModal(false);
    setAuthorName('');
    setComment('');
  };

  return (
    <section id="ll-review-section" className="relative py-16 sm:py-24 bg-[#064e3b] text-white font-sans overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-400/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-400/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-2">
            <span>💬</span>
            <span>{sectionTitle || 'গ্রাহকদের মতামত'}</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-200 max-w-xl mx-auto font-medium">
            সারাদেশ থেকে হাজারো সন্তুষ্ট গ্রাহক আমাদের প্রোডাক্ট ব্যবহার করে উপকৃত হয়েছেন
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setShowModal(true);
                trackClientInternalClick('Write_Review_Button', 'OpenModal');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>আপনার অভিজ্ঞতা শেয়ার করুন</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const initial = rev.authorName ? rev.authorName.charAt(0) : 'ক';
            return (
              <div
                key={rev.id}
                className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-emerald-950/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                        {initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">
                          {rev.authorName}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-emerald-200">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{rev.location || 'বাংলাদেশ'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-6 h-6 text-emerald-400/40 mb-2" />
                  <p className="text-sm text-slate-100 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300">
                  <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ভেরিফাইড ক্রেতা
                  </span>
                  <span className="text-emerald-300/80">{rev.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in duration-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              আপনার মতামত লিখুন
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="যেমন: মোঃ রাশেদ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">আপনার জেলা / এলাকা</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: ঢাকা, মিরপুর"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">রেটিং</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border ${
                        rating >= s ? 'bg-amber-100 border-amber-400 text-amber-500' : 'bg-slate-50 border-slate-200 text-slate-300'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">আপনার রিভিউ</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="পণ্যটি ব্যবহার করে কেমন ফলাফল পেলেন?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-600/30"
                >
                  সাবমিট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
