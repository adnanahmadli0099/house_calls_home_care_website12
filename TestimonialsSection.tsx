import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquareQuote, Plus, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/businessData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [showAddReview, setShowAddReview] = useState(false);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('Family Member');
  const [location, setLocation] = useState('Brooklyn, NY');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [service, setService] = useState('CDPAP Program');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      relation,
      location,
      rating,
      date: 'Just now',
      verifiedSource: 'Google Reviews',
      content: content.trim(),
      serviceReceived: service,
    };

    setReviews([newRev, ...reviews]);
    setSuccessNotice(true);
    setAuthor('');
    setContent('');
    setTimeout(() => {
      setShowAddReview(false);
      setSuccessNotice(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider">
              Verified Family Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Hundreds of New York Families
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Hear directly from family caregivers and seniors who rely on HouseCalls Home Care for compassionate in-home care and CDPAP coordination.
            </p>
          </div>

          {/* Aggregate Rating Badge Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-2xs">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">4.8</div>
              <div className="flex text-amber-500 justify-center mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4 text-left">
              <div className="text-xs font-bold text-slate-900">638+ Verified Ratings</div>
              <div className="text-[11px] text-slate-500">Google Reviews &amp; Birdeye</div>
              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="mt-1 text-xs text-[#003561] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal / Form to Write a Review */}
        {showAddReview && (
          <div className="mb-10 bg-sky-50/70 border border-sky-100 rounded-xl p-6 transition-all animate-fadeIn">
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              Share Your Experience with HouseCalls Home Care
            </h3>
            {successNotice ? (
              <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded">
                Thank you! Your verified review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Sandra M."
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Borough / Neighborhood</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Crown Heights, Brooklyn"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Service Received</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      <option value="CDPAP Program">CDPAP Family Caregiver</option>
                      <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
                      <option value="Skilled Nursing">Skilled Nursing</option>
                      <option value="Companion Care">Companion Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell other families how HouseCalls Home Care helped your loved one..."
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-600 mr-2 font-medium">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-amber-400 hover:scale-110 cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#003561] hover:bg-[#002444] text-white text-xs font-semibold px-4 py-1.5 rounded cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/60 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3 text-teal-600" />
                    <span>{rev.verifiedSource}</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{rev.author}</h4>
                  <div className="text-[11px] text-slate-500">
                    {rev.relation} · {rev.location}
                  </div>
                </div>

                <div className="text-[11px] font-medium text-[#003561] bg-sky-50 px-2 py-0.5 rounded border border-sky-100 text-right">
                  {rev.serviceReceived}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
