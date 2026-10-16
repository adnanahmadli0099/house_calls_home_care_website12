import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle2, Shield, ArrowRight, HeartHandshake, HelpCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface CdpapCalculatorProps {
  onStartEnrollment: (initialHours: number, estimatedWeeklyPay: number) => void;
}

export const CdpapCalculator: React.FC<CdpapCalculatorProps> = ({ onStartEnrollment }) => {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(30);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'Bathing & Grooming',
    'Meal Preparation',
    'Mobility & Transfers',
  ]);

  // Standard NYC CDPAP competitive base wage parity rate
  const hourlyRate = 21.09;
  const weeklyEarnings = Math.round(hoursPerWeek * hourlyRate);
  const monthlyEarnings = Math.round(weeklyEarnings * 4.33);

  const careActivities = [
    { id: 'bathing', label: 'Bathing & Grooming', avgHrs: 7 },
    { id: 'dressing', label: 'Dressing & Hygiene', avgHrs: 5 },
    { id: 'meals', label: 'Meal Preparation & Feeding', avgHrs: 8 },
    { id: 'mobility', label: 'Mobility & Transfers', avgHrs: 6 },
    { id: 'meds', label: 'Medication Reminders', avgHrs: 4 },
    { id: 'housekeeping', label: 'Light Housekeeping & Laundry', avgHrs: 5 },
    { id: 'errands', label: 'Doctor Visits & Errands', avgHrs: 5 },
  ];

  const toggleActivity = (label: string) => {
    if (selectedNeeds.includes(label)) {
      if (selectedNeeds.length > 1) {
        setSelectedNeeds(selectedNeeds.filter((n) => n !== label));
      }
    } else {
      setSelectedNeeds([...selectedNeeds, label]);
    }
  };

  return (
    <section id="cdpap-guide" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#860c00] uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>New York State CDPAP Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get Paid to Care for Your Loved One
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Did you know that under NY Medicaid, you can legally get paid to care for an aging parent, grandparent, or disabled relative? Calculate your estimated earnings below.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Hours Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900">
                  Estimated Care Hours Per Week
                </label>
                <div className="text-base font-extrabold text-[#003561] bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">
                  {hoursPerWeek} Hours / week
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003561]"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                <span>10 hrs (Part-Time)</span>
                <span>30 hrs (Average NY Approval)</span>
                <span>50 hrs (High-Need Care)</span>
              </div>
            </div>

            {/* Step 2: Select Care Needs */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Select Activities Your Loved One Needs Assistance With:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {careActivities.map((act) => {
                  const isChecked = selectedNeeds.includes(act.label);
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => toggleActivity(act.label)}
                      className={`text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-sky-50 border-[#003561] text-[#003561] shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{act.label}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#003561]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Program Notice */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>Who is eligible to be the paid caregiver?</span>
              </div>
              <p>
                Adult children, grandchildren, nieces, nephews, siblings, friends, and neighbors can all be hired. Spouses and designated legal representatives cannot be paid under NY State law.
              </p>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#003561] to-[#002b50] rounded-xl text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Estimated CDPAP Compensation</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Potential Caregiver Earnings
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Based on NYC statutory wage parity &amp; HouseCalls Home Care payroll.
              </p>

              {/* Big Pay Figures */}
              <div className="mt-6 pt-6 border-t border-sky-800/80 space-y-4">
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-slate-300">Estimated Weekly Pay</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    ${weeklyEarnings.toLocaleString()}
                    <span className="text-sm font-normal text-slate-300 ml-1">/ week</span>
                  </div>
                  <div className="text-[11px] text-teal-300 mt-1">
                    Direct deposit with instant same-day pay availability
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-200 px-1">
                  <span>Estimated Monthly Income:</span>
                  <span className="font-bold text-white text-sm">~${monthlyEarnings.toLocaleString()} / mo</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-200 px-1">
                  <span>Cost to Patient / Family:</span>
                  <span className="font-bold text-emerald-300 text-sm">$0 (100% Medicaid Paid)</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-4 border-t border-sky-800/80">
              <button
                onClick={() => onStartEnrollment(hoursPerWeek, weeklyEarnings)}
                className="w-full bg-[#860c00] hover:bg-[#6e0a00] text-white py-3 px-4 rounded-md font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in CDPAP Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-300">
                Questions? Call our CDPAP specialists at{' '}
                <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-amber-300 font-semibold underline">
                  {BUSINESS_INFO.phone} Ext. 815
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 4-Step Enrollment Roadmap */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
            How CDPAP Enrollment Works with HouseCalls Home Care
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#003561] text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">Physician Form</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your loved one’s doctor fills out a standard Medical Request for Home Care (M11q or DOH-4359).
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#003561] text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Nurse Assessment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                New York Independent Assessor (NYIA) evaluates care needs and assigns weekly approved hours.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#003561] text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Choose Caregiver</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designate your son, daughter, friend, or relative. No certificates or previous license needed.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#860c00] text-white font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-900">Get Paid Weekly</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                HouseCalls serves as Fiscal Intermediary, providing prompt weekly direct deposit or same-day pay!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
