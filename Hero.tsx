import React from 'react';
import { Phone, CheckCircle2, Star, Shield, ArrowRight, HeartHandshake } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface HeroProps {
  onOpenAssessment: () => void;
  onNavigateToCdpap: () => void;
  onNavigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAssessment,
  onNavigateToCdpap,
  onNavigateToServices,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Trust Signals, and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context line with anti-slop zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#003561] uppercase tracking-wider">
              <span>Licensed NYSDOH Home Care Agency</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Serving All 5 NYC Boroughs</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>24/7 Support</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Compassionate Care, in the Comfort of Your Home.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Leading provider of personalized home health services in New York State. From certified Home Health Aides (HHA) to the NY Medicaid CDPAP program where family members can get paid to care for loved ones, HouseCalls is dedicated to dignified care at home.
            </p>

            {/* Verified Rating Row */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">4.8 / 5.0</span> Rating across{' '}
                <span className="font-medium text-slate-900">638+ verified reviews</span> on Google &amp; Birdeye
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenAssessment}
                className="bg-[#003561] hover:bg-[#002444] text-white px-6 py-3.5 rounded-md font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Free Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToCdpap}
                className="bg-[#860c00] hover:bg-[#6c0a00] text-white px-6 py-3.5 rounded-md font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>CDPAP: Get Paid to Care</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneFormatted}`}
                className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 px-5 py-3.5 rounded-md font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#003561]" />
                <span>(718) 922-9200</span>
              </a>
            </div>

            {/* Key Benefits / Checkmarks */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% Covered by NY Medicaid &amp; MLTC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Care start within 24–48 hours for urgent needs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Same-Day Pay &amp; 401(k) for Caregivers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Multilingual Coordinators (7+ languages)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Image Card with Headquarters Notice */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="/images/hero-caregiver.jpg"
                alt="HouseCalls Home Care certified aide caring for senior"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://housecallshc.org/wp-content/uploads/2025/03/30583.jpg';
                }}
              />
              
              {/* Overlay Badge for Verified Office Location */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Licensed Agency Headquarters</span>
                </div>
                <div className="text-base font-bold text-white">
                  4920 Church Ave, Brooklyn, NY 11203
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center justify-between">
                  <span>East Flatbush Intake Center</span>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 underline font-medium text-xs"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Consultation Badge Card */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-white p-3.5 rounded-lg shadow-lg border border-slate-200 max-w-[210px]">
              <div className="text-xs font-semibold text-slate-900">Need Immediate Care?</div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                On-call care coordinators ready 24/7 for hospital discharges.
              </p>
              <div className="text-xs font-bold text-[#003561] mt-1.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-teal-600" />
                <span>Call Ext. 815</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
