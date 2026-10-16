import React, { useState } from 'react';
import { Briefcase, Zap, DollarSign, Heart, Shield, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { JobApplication } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface CareersSectionProps {
  onSuccessApplication: (app: JobApplication) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onSuccessApplication }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [certification, setCertification] = useState<JobApplication['certification']>('Certified HHA');
  const [experience, setExperience] = useState('1 - 3 Years');
  const [borough, setBorough] = useState('Brooklyn');
  const [language, setLanguage] = useState('English & Spanish');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const perks = [
    {
      title: 'Instant Pay, Same Day',
      desc: 'Get paid the same day you work! Access your earnings directly to your debit card immediately following your shift.',
      icon: Zap,
    },
    {
      title: 'Holiday Pay & Overtime',
      desc: 'Earn time-and-a-half premium compensation for working on designated holidays and eligible overtime shifts.',
      icon: DollarSign,
    },
    {
      title: 'Paid Sick Time & PTO',
      desc: 'Prioritize your personal health and well-being with accrued paid sick leave and time-off benefits.',
      icon: Heart,
    },
    {
      title: '401(k) Retirement Plan',
      desc: 'Secure your long-term future with our retirement savings account featuring agency employer matching.',
      icon: Shield,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      certification,
      experienceYears: experience,
      boroughPreference: borough,
      languageSpoken: language,
      status: 'New',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessApplication(newApp);
    }, 450);
  };

  return (
    <section id="careers" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider mb-2">
            Caregiver Careers &amp; Employment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Join the HouseCalls Care Team
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We value our home health aides, personal care aides, and nurses with industry-leading pay, same-day payouts, and supportive office staff at 4920 Church Ave.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2 hover:border-[#003561]/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Two Column Grid: Authentic Caregiver Asset & Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic Benefits Graphic / Staff Portrait */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden shadow-md border-4 border-white bg-slate-100">
              <img
                src="/images/hr-benefits.png"
                alt="HouseCalls Home Care caregiver benefits illustration"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/aide-portrait.png';
                }}
              />
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#003561]" />
                <span>Walk-In HR Office Hours</span>
              </div>
              <p>
                Visit our East Flatbush Brooklyn Headquarters at <strong>4920 Church Ave</strong> Monday through Friday, 9:00 AM – 4:00 PM for on-the-spot interviews and immediate shift placement.
              </p>
              <div className="pt-2 text-[11px] text-[#003561] font-semibold">
                HR Hotline: (718) 922-9200
              </div>
            </div>
          </div>

          {/* Right Column: Direct Online Application Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Apply in 2 Minutes: Start Working This Week
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Full-time, part-time, weekend, and 24-hour live-in cases available immediately in Brooklyn, Queens, Bronx, and Manhattan.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Application Successfully Received!</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Thank you, <strong>{fullName}</strong>. Our HR recruitment coordinator will call you at <strong>{phone}</strong> to confirm your credentials and schedule orientation at 4920 Church Ave.
                </p>
                <div className="pt-3 text-xs text-emerald-900 font-semibold">
                  Required documents for orientation: Photo ID, Social Security Card, Physical Exam with PPD/Rubella, HHA Certificate.
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
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Smith"
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
                      placeholder="jane@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Certification Status *
                    </label>
                    <select
                      value={certification}
                      onChange={(e) => setCertification(e.target.value as JobApplication['certification'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="Certified HHA">Certified Home Health Aide (HHA)</option>
                      <option value="Certified PCA">Certified Personal Care Aide (PCA)</option>
                      <option value="Registered Nurse (RN)">Registered Nurse (RN / LPN)</option>
                      <option value="Looking for Certification / CDPAP">No Certificate (Interested in CDPAP / Training)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Years of Experience
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    >
                      <option value="Entry Level (Under 1 year)">Under 1 Year / New Grad</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years Veteran</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Borough
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g. English, Bangla"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003561] hover:bg-[#002444] text-white py-2.5 px-4 rounded-md font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending Application...' : 'Submit Employment Application'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center">
                  HouseCalls Home Care is an Equal Opportunity Employer (EOE).
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
