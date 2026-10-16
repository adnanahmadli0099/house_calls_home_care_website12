import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { CareInquiry } from '../types';

interface ContactSectionProps {
  onSuccessInquiry: (inquiry: CareInquiry) => void;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSuccessInquiry,
  initialService,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [relation, setRelation] = useState('Parent (Mother/Father)');
  const [borough, setBorough] = useState('Brooklyn');
  const [service, setService] = useState(initialService || 'CDPAP Program');
  const [medicaidStatus, setMedicaidStatus] = useState<CareInquiry['medicaidStatus']>('Has Medicaid');
  const [urgency, setUrgency] = useState<CareInquiry['urgency']>('Within 1-2 weeks');
  const [notes, setNotes] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit telephone number.');
      return;
    }
    if (!smsConsent) {
      setErrorMsg('Please consent to receiving SMS communication for intake confirmation.');
      return;
    }

    setIsSubmitting(true);

    const inquiry: CareInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      patientName: patientName.trim(),
      relationToPatient: relation,
      borough,
      serviceRequested: service,
      medicaidStatus,
      urgency,
      notes: notes.trim(),
      status: 'New',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessInquiry(inquiry);
    }, 500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider mb-2">
            Get in Touch with HouseCalls Home Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schedule a Free In-Home Assessment
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Our Brooklyn intake team will guide you through Medicaid eligibility, CDPAP paperwork, or assigning a certified caregiver to your loved one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Agency Contact Info & Hours */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Official Agency Headquarters
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                New York State Licensed Home Care Services Agency (LHCSA)
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">East Flatbush Headquarters:</div>
                  <div className="text-slate-600">4920 Church Ave</div>
                  <div className="text-slate-600">Brooklyn, NY 11203</div>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003561] hover:underline font-semibold block mt-1"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Telephone / Intake:</div>
                  <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-slate-800 hover:text-[#003561] font-semibold text-sm">
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-slate-500 text-[11px]">Customer Service: Ext. 815</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Intake:</div>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-medium"
                  >
                    Chat live on WhatsApp →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">General Information:</div>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-slate-600 hover:text-[#003561]">
                    {BUSINESS_INFO.email}
                  </a>
                  <div className="text-slate-500 text-[11px]">Customer Care: {BUSINESS_INFO.customerServiceEmail}</div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Office Hours:</div>
                  <div className="text-slate-600">Monday – Friday: 9:00 AM – 5:00 PM</div>
                  <div className="text-teal-700 font-semibold text-[11px] mt-0.5">
                    24/7 Live Care Dispatch &amp; Emergency Nurse Line
                  </div>
                </div>
              </div>

            </div>

            {/* Other Offices Link */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Additional NYC Branches:</span>{' '}
              East New York, Sunset Park, The Bronx, Jackson Heights, Jamaica, Glendale, and Manhattan.
            </div>

          </div>

          {/* Right Column: Complete Intake Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Online Care Intake &amp; Assessment Request
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this confidential form. A care specialist will follow up with you within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-emerald-950 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-base">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Request Successfully Submitted!</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your inquiry for <strong>{service}</strong> in <strong>{borough}</strong> has been logged into our Church Ave intake department. Reference ID: <strong>INQ-{Date.now().toString().slice(-6)}</strong>.
                </p>
                <p className="text-xs text-emerald-800">
                  A care coordinator will call you at <strong>{phone}</strong> to confirm your details and coordinate the free in-home assessment.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-900">
                  Need immediate help? Call our 24/7 hotline at (718) 922-9200 Ext. 815.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maria Gonzalez"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(718) 000-0000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Relationship to Patient
                    </label>
                    <select
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="Parent (Mother/Father)">Parent (Mother/Father)</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Self">Self (I need care)</option>
                      <option value="Case Manager / Social Worker">Case Manager / Social Worker</option>
                      <option value="Other Relative / Friend">Other Relative / Friend</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Needed
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="CDPAP Program">CDPAP (Paid Family Caregiver)</option>
                      <option value="Home Health Aide (HHA)">Certified Home Health Aide</option>
                      <option value="Skilled Nursing">Skilled Clinical Nursing</option>
                      <option value="NHTD / TBI Waiver Transfer">NHTD / TBI Waiver (HCSS)</option>
                      <option value="Dementia Care">Dementia &amp; Alzheimer’s Care</option>
                      <option value="Companion Care">Companion &amp; Homemaking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Borough
                    </label>
                    <select
                      value={borough}
                      onChange={(e) => setBorough(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="Brooklyn">Brooklyn</option>
                      <option value="Queens">Queens</option>
                      <option value="Bronx">Bronx</option>
                      <option value="Manhattan">Manhattan</option>
                      <option value="Staten Island">Staten Island</option>
                      <option value="Nassau County">Nassau County</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medicaid Status
                    </label>
                    <select
                      value={medicaidStatus}
                      onChange={(e) => setMedicaidStatus(e.target.value as CareInquiry['medicaidStatus'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="Has Medicaid">Has Active NY Medicaid</option>
                      <option value="Has Medicare Only">Medicare Only</option>
                      <option value="Private Pay / Other Insurance">Private Pay / Insurance</option>
                      <option value="Unsure / Need Assistance">Unsure (Need Help Applying)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Care Requirements / Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe special needs, language preference, hospital discharge date, or questions..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                  />
                </div>

                {/* Verified SMS Consent Policy Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#003561] focus:ring-[#003561]"
                    />
                    <span className="text-[11px] text-slate-600 leading-relaxed">
                      By checking this box, I consent to receive appointments, follow ups, and directions via SMS from House Calls Home Care. Reply STOP to opt-out; Reply HELP for support; Message &amp; data rates may apply; Messaging frequency may vary.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003561] hover:bg-[#002444] text-white py-3 px-4 rounded-md font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting to Intake...' : 'Submit Care Assessment Request'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
