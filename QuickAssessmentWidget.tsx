import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { CareInquiry } from '../types';

interface QuickAssessmentWidgetProps {
  onSuccessSubmission: (inquiry: CareInquiry) => void;
}

export const QuickAssessmentWidget: React.FC<QuickAssessmentWidgetProps> = ({ onSuccessSubmission }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Parent (Mother/Father)');
  const [service, setService] = useState('CDPAP (Get Paid to Care for Loved One)');
  const [borough, setBorough] = useState('Brooklyn');
  const [medicaidStatus, setMedicaidStatus] = useState<CareInquiry['medicaidStatus']>('Has Medicaid');
  const [urgency, setUrgency] = useState<CareInquiry['urgency']>('Immediate (within 24-48 hrs)');
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit telephone number.');
      return;
    }

    setIsSubmitting(true);

    const newInquiry: CareInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: '',
      relationToPatient: relation,
      borough,
      serviceRequested: service,
      medicaidStatus,
      urgency,
      status: 'New',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessSubmission(newInquiry);
    }, 450);
  };

  return (
    <div className="bg-white border-y border-slate-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto">
        <div className="bg-sky-50/60 rounded-xl border border-sky-100 p-6 lg:p-8">
          <div className="max-w-3xl mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#003561] uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4 text-teal-600" />
              <span>Fast-Track Care Intake · No Obligation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Find Out In 60 Seconds: Do You Qualify for Home Care or CDPAP in New York?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Our East Flatbush intake coordinators verify Medicaid coverage and assist with all New York State paperwork at zero cost to your family.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-emerald-950 flex items-start gap-4 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-emerald-900">
                  Assessment Request Received! Reference #{fullName.split(' ')[0]}-{Date.now().toString().slice(-4)}
                </h3>
                <p className="text-sm text-emerald-800">
                  Thank you, <strong>{fullName}</strong>. A licensed intake coordinator from our Brooklyn office (4920 Church Ave) will contact you shortly at <strong>{phone}</strong> to review your eligibility and next steps.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-emerald-900">
                  <span>Urgent emergency? Call directly:</span>
                  <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="underline text-emerald-900 font-bold">
                    (718) 922-9200 Ext. 815
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-md text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Who is the care for? */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Who Needs Care?
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  >
                    <option value="Parent (Mother/Father)">Parent (Mother/Father)</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Self">Myself</option>
                    <option value="Other Relative">Other Relative / Friend</option>
                  </select>
                </div>

                {/* 2. Service Requested */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program / Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  >
                    <option value="CDPAP (Get Paid to Care for Loved One)">CDPAP (Family Caregiver Pay)</option>
                    <option value="Certified Home Health Aide (HHA)">Certified Home Health Aide (HHA)</option>
                    <option value="Skilled Nursing / RN Care">Skilled Nursing / RN Care</option>
                    <option value="NHTD / TBI Waiver Transfer">NHTD / TBI Waiver HCSS Transfer</option>
                    <option value="Companion Care & Errands">Companion Care &amp; Errands</option>
                  </select>
                </div>

                {/* 3. Borough */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location / Borough
                  </label>
                  <select
                    value={borough}
                    onChange={(e) => setBorough(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  >
                    <option value="Brooklyn">Brooklyn (Church Ave HQ)</option>
                    <option value="Queens">Queens (Jackson Hts & Jamaica)</option>
                    <option value="Bronx">Bronx (Cross Bronx Expy)</option>
                    <option value="Manhattan">Manhattan (Broadway)</option>
                    <option value="Staten Island">Staten Island</option>
                    <option value="Nassau County">Nassau County</option>
                  </select>
                </div>

                {/* 4. Medicaid Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Insurance / Medicaid
                  </label>
                  <select
                    value={medicaidStatus}
                    onChange={(e) => setMedicaidStatus(e.target.value as CareInquiry['medicaidStatus'])}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  >
                    <option value="Has Medicaid">Has Active NY Medicaid</option>
                    <option value="Has Medicare Only">Medicare Only (Need Medicaid)</option>
                    <option value="Private Pay / Other Insurance">Private Insurance / Private Pay</option>
                    <option value="Unsure / Need Assistance">Unsure (Need Enrollment Help)</option>
                  </select>
                </div>

              </div>

              {/* Contact Information & Submit */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (for Confidential Callback) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(718) 000-0000"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003561] hover:bg-[#002444] text-white py-2 px-4 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Checking Details...' : 'Check My Eligibility Now'}</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-2 flex-wrap">
                <span>🔒 Your information is 100% HIPAA compliant and strictly confidential.</span>
                <span>·</span>
                <span>We never sell or share your details.</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
