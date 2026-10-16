import React from 'react';
import { Phone, Mail, MapPin, Shield, HeartHandshake, ExternalLink, Lock } from 'lucide-react';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#001f3b] text-slate-300 border-t border-[#002f57] text-xs">
      
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md inline-block">
                <img
                  src="/images/logo.svg"
                  alt="HouseCalls Home Care Logo"
                  className="h-9 w-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo-alt.png';
                  }}
                />
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed pr-4">
              HouseCalls Home Care is a licensed New York home care agency dedicated to providing compassionate, dignified in-home care, nursing services, and CDPAP family caregiver compensation across all five boroughs.
            </p>

            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Headquarters:</strong> 4920 Church Ave, Brooklyn, NY 11203
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="hover:text-white font-semibold">
                  {BUSINESS_INFO.phone} (Ext. 815)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors text-xs font-medium"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Core Services (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Home Care Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('cdpap')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  CDPAP (Paid Family Caregiver)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  Certified Home Health Aide (HHA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  Personal Care Aide (PCA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  Skilled Clinical Nursing (RN / LPN)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  NHTD &amp; TBI Medicaid Waiver (HCSS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  Dementia &amp; Alzheimer’s Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white text-left transition-colors cursor-pointer text-slate-300"
                >
                  Companion &amp; Respite Care
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Information (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Company &amp; Care
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Agency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-white transition-colors cursor-pointer">
                  8 NYC Office Locations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Authentic Field Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  Patient Family Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors cursor-pointer">
                  Careers &amp; Same-Day Pay
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Help &amp; FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact &amp; Intake
                </button>
              </li>
            </ul>
          </div>

          {/* 8 NYC Locations Summary (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Our New York Offices
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300">
              {OFFICE_LOCATIONS.map((loc) => (
                <div key={loc.id} className="border-b border-white/5 pb-1">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white hover:text-teal-300 transition-colors block"
                  >
                    {loc.name}
                  </a>
                  <span className="text-slate-400">{loc.address} · {loc.phone}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Compliance, HIPAA, and Regulatory Disclaimers */}
      <div className="border-t border-[#002f57] bg-[#00182f] py-6 px-4 sm:px-6 lg:px-8 text-slate-400 text-[11px] leading-relaxed">
        <div className="max-w-7xl mx-auto space-y-3">
          <p>
            <strong>Regulatory &amp; Accreditation Notice:</strong> HouseCalls Home Care is licensed as a Licensed Home Care Services Agency (LHCSA) by the New York State Department of Health (NYSDOH). We do not discriminate on the basis of race, color, creed, national origin, religion, sex, age, handicap, sexual orientation, or veteran status in admission, treatment, or employment.
          </p>
          <p>
            <strong>HIPAA Privacy &amp; Data Security:</strong> All client medical evaluations, clinical health records, and family caregiver documentation are handled with strict adherence to the Health Insurance Portability and Accountability Act (HIPAA).
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/5 text-slate-400">
            <div>
              © {new Date().getFullYear()} HouseCalls Home Care LLC. All rights reserved. Headquartered at 4920 Church Ave, Brooklyn, NY 11203.
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={onOpenPrivacy}
                className="hover:text-slate-200 underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={onOpenTerms}
                className="hover:text-slate-200 underline cursor-pointer"
              >
                SMS &amp; Terms of Service
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                title="Coordinator Portal Login"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};
