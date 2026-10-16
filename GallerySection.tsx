import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Shield } from 'lucide-react';
import { AUTHENTIC_GALLERY } from '../data/businessData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const categories = ['All', 'In-Home Care', 'Clinical Nursing', 'Caregivers', 'Community & Culture'];

  const filteredItems = AUTHENTIC_GALLERY.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const openLightbox = (idx: number) => {
    setActiveImageIdx(idx);
  };

  const closeLightbox = () => {
    setActiveImageIdx(null);
  };

  const showNext = () => {
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx + 1) % filteredItems.length);
    }
  };

  const showPrev = () => {
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIdx, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider mb-2">
            Authentic Field Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Caregivers, Nurses &amp; Community in Action
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real moments from HouseCalls Home Care visits across Brooklyn and New York City. We take pride in compassionate, dignified service.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-1.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#003561] text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackUrl;
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 text-slate-900 p-2 rounded-full shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#003561] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImageIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeImageIdx].imageUrl}
              alt={filteredItems[activeImageIdx].title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = filteredItems[activeImageIdx].fallbackUrl;
              }}
            />
            
            <div className="mt-4 text-center max-w-xl text-white">
              <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                {filteredItems[activeImageIdx].category} · Photo {activeImageIdx + 1} of {filteredItems.length}
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {filteredItems[activeImageIdx].title}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[activeImageIdx].description}
              </p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
