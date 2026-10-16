import React, { useState } from 'react';
import { X, Shield, Lock, Send, CheckCircle2, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { CareInquiry } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'assessment';
  onSuccessInquiry?: (inquiry: CareInquiry) => void;
  defaultService?: string;
}

export const LegalModals: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type,
  onSuccessInquiry,
  defaultService,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [borough, setBorough] = useState('Brooklyn');
  const [service, setService] = useState(defaultService || 'CDPAP Program');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    if (onSuccessInquiry) {
      const inq: CareInquiry = {
        id: `inq-${Date.now()}`,
        createdAt: new Date().toISOString(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: '',
        relationToPatient: 'Family Member',
        borough,
        serviceRequested: service,
        medicaidStatus: 'Has Medicaid',
        urgency: 'Immediate (within 24-48 hrs)',
        status: 'New',
      };
      onSuccessInquiry(inq);
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#003561]" />
            <h3 className="font-bold text-base text-slate-900">
              {type === 'privacy' && 'HIPAA & Privacy Policy'}
              {type === 'terms' && 'SMS Policy & Terms of Service'}
              {type === 'assessment' && 'Request Free In-Home Assessment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-xs text-slate-600 leading-relaxed space-y-4">
          
          {type === 'privacy' && (
            <>
              <p>
                <strong>Effective Date:</strong> January 1, 2026.
              </p>
              <p>
                HouseCalls Home Care LLC (&quot;HouseCalls Home Care&quot;, &quot;we&quot;, &quot;our&quot;) is committed to safeguarding the privacy and confidentiality of our patients, their families, and website visitors in accordance with the Health Insurance Portability and Accountability Act (HIPAA) and New York State healthcare privacy statutes.
              </p>
              <h4 className="font-bold text-slate-800 text-sm">Protected Health Information (PHI)</h4>
              <p>
                Any health or clinical information provided to us—including medical conditions, physician authorizations, Medicaid ID numbers, or care requirement notes—is strictly utilized solely for clinical evaluation, home health aide matching, and payer billing. We never sell, rent, or trade your personal or medical data to third-party commercial marketing entities.
              </p>
              <h4 className="font-bold text-slate-800 text-sm">Your HIPAA Rights</h4>
              <p>
                Patients and their authorized representatives have the right to inspect, amend, and request an accounting of disclosures of their health records at our East Flatbush Brooklyn Headquarters at 4920 Church Ave, Brooklyn, NY 11203 or by emailing <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#003561] underline">{BUSINESS_INFO.email}</a>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Terms of Service &amp; TCPA SMS Communication Policy</strong>
              </p>
              <p>
                By providing your telephone number and submitting any inquiry or assessment form on this website, you explicitly consent to receive informational messages, appointment reminders, caregiver arrival notifications, and care follow-ups via SMS text message from House Calls Home Care.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Reply <strong>STOP</strong> at any time to opt-out of text messaging.</li>
                <li>Reply <strong>HELP</strong> for customer support.</li>
                <li>Message &amp; data rates may apply based on your mobile carrier.</li>
                <li>Messaging frequency varies based on your ongoing care intake status.</li>
              </ul>
              <p>
                For customer service inquiries or questions regarding our terms, please contact: <br />
                <strong>Customer Service Phone:</strong> 718-922-9200 EXT: 815<br />
                <strong>Customer Service Email:</strong> cs@housecallshc.org
              </p>
            </>
          )}

          {type === 'assessment' && (
            <div>
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-emerald-950 space-y-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-900">Assessment Request Received!</h4>
                  <p className="text-xs text-emerald-800">
                    A care coordinator from 4920 Church Ave will call <strong>{phone}</strong> within 24 hours to schedule the in-home visit.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 bg-[#003561] text-white px-4 py-1.5 rounded text-xs font-semibold cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAssessmentSubmit} className="space-y-3">
                  <p className="text-slate-600">
                    Provide your contact details below to have our intake team schedule a complimentary in-home care consultation.
                  </p>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maria Gonzalez"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(718) 000-0000"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Borough</label>
                      <select
                        value={borough}
                        onChange={(e) => setBorough(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                      >
                        <option value="Brooklyn">Brooklyn</option>
                        <option value="Queens">Queens</option>
                        <option value="Bronx">Bronx</option>
                        <option value="Manhattan">Manhattan</option>
                        <option value="Staten Island">Staten Island</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Service</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                      >
                        <option value="CDPAP Program">CDPAP Program</option>
                        <option value="Home Health Aide (HHA)">Home Health Aide</option>
                        <option value="Skilled Nursing">Skilled Nursing</option>
                        <option value="Companion Care">Companion Care</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#003561] hover:bg-[#002444] text-white py-2.5 rounded font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Free Assessment</span>
                    </button>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 text-center">
                    Protected by HIPAA · 100% Confidential
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
