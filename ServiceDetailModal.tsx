import React from 'react';
import { X, CheckCircle2, Shield, Calendar, Phone, HeartHandshake } from 'lucide-react';
import { HomeCareService } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface ServiceDetailModalProps {
  service: HomeCareService | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>HouseCalls Home Care · New York Program</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
              Overview &amp; Scope of Care
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Inclusions */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Included Care &amp; Daily Support
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Requirements */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Who Qualifies for this Service in New York?
            </h3>
            <ul className="space-y-1.5">
              {service.eligibility.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003561] shrink-0 mt-1.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accepted Coverages */}
          <div className="border-t border-slate-200 pt-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Approved Payment / Insurance Methods
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
              {service.coveredBy.map((cov, idx) => (
                <span
                  key={idx}
                  className="bg-sky-50 text-[#003561] px-2.5 py-1 rounded text-xs font-medium border border-sky-100"
                >
                  {cov}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneFormatted}`}
              className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 py-2.5 px-4 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#003561]" />
              <span>Call Intake: (718) 922-9200</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onBookService(service.title);
                }}
                className="w-full sm:w-auto bg-[#003561] hover:bg-[#002444] text-white px-5 py-2.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Request Free Assessment for this Service</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
