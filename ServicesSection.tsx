import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ShieldCheck, Check, HeartHandshake } from 'lucide-react';
import { SERVICES_DATA } from '../data/businessData';
import { HomeCareService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onOpenAssessmentWithService?: (serviceName: string) => void;
  onNavigateToCdpap?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAssessmentWithService,
  onNavigateToCdpap,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<HomeCareService | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'cdpap', label: 'CDPAP (Family Caregiver)' },
    { id: 'personal-care', label: 'Home Health Aide (HHA)' },
    { id: 'nursing', label: 'Skilled Nursing' },
    { id: 'waiver', label: 'NHTD / TBI Waiver' },
    { id: 'companion', label: 'Companion & Homemaking' },
    { id: 'specialty', label: 'Dementia & Alzheimer’s' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleBook = (title: string) => {
    if (onOpenAssessmentWithService) {
      onOpenAssessmentWithService(title);
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider mb-2">
            Personalized In-Home Health Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Home Care Tailored to Your Needs
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From certified personal care aides to the popular NY CDPAP family caregiver pay program and skilled nursing, our licensed agency coordinates every aspect of your in-home comfort.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#003561] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, symptoms..."
              className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
            />
          </div>

        </div>

        {/* Service Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-8">
            <p className="text-sm text-slate-600">No services match your search &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#003561] font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 group"
              >
                {/* Service Card Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />
                  {service.badge && (
                    <div className="absolute top-3 right-3 bg-[#003561] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs">
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#003561] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Key feature highlights */}
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-[#003561] hover:text-[#002444] transition-colors flex items-center gap-1 cursor-pointer py-1"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleBook(service.title)}
                      className="bg-slate-100 hover:bg-[#003561] text-slate-800 hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>Request Care</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* Feature Spotlight: CDPAP Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#003561] to-[#004e8c] rounded-xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Specialized New York Medicaid Program</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Are You Already Caring for a Loved One at Home?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Under New York’s CDPAP program, adult children, relatives, and friends can become paid caregivers. HouseCalls Home Care handles payroll, direct deposit, and all Medicaid liaison tasks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            {onNavigateToCdpap && (
              <button
                onClick={onNavigateToCdpap}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-md text-xs transition-colors shadow-xs cursor-pointer"
              >
                Calculate Weekly Pay
              </button>
            )}
            <button
              onClick={() => handleBook('CDPAP Family Caregiver Program')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-md text-xs transition-colors border border-white/20 cursor-pointer"
            >
              Enroll in CDPAP
            </button>
          </div>
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={handleBook}
      />
    </section>
  );
};
