import React from 'react';
import { Heart, Award, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface AboutSectionProps {
  onOpenAssessment: () => void;
  onNavigateToCareers: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAssessment,
  onNavigateToCareers,
}) => {
  const values = [
    {
      title: 'Helpfulness',
      description: 'Our patients’ safety and dignity are our utmost priorities. We go above and beyond to provide exceptional, responsive care.',
      icon: Heart,
    },
    {
      title: 'Compassion',
      description: 'With genuine reassurance, active listening, and warmth, we foster positive, uplifting relationships with clients and their families.',
      icon: Users,
    },
    {
      title: 'Harmonization',
      description: 'We align care plans among hospitals, primary physicians, MLTC case managers, and family members into a unified care rhythm.',
      icon: Shield,
    },
    {
      title: 'Integrity',
      description: 'Honesty, strict regulatory compliance, and transparency form the bedrock of our service as a licensed NYSDOH home care agency.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Care Staff Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
              <img
                src="/images/care-senior-1.jpg"
                alt="HouseCalls registered nurse checking vitals at home"
                className="w-full h-[400px] object-cover object-center"
              />
            </div>
            
            {/* Experience overlay */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#003561] text-white p-5 rounded-lg shadow-xl max-w-[240px]">
              <div className="text-3xl font-extrabold text-white">12+ Years</div>
              <div className="text-xs text-slate-200 mt-1">
                Providing licensed home care across Brooklyn and NYC communities.
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Agency Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider">
              About HouseCalls Home Care
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Caring for You at Home with Compassion &amp; Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              HouseCalls Home Care is a New York State licensed home care agency dedicated to providing quality, compassionate, and supportive care to elderly and disabled individuals in the comfort and dignity of their own homes.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Headquartered at <strong>4920 Church Ave in Brooklyn</strong>, we work hand-in-hand with major NYC hospitals, primary care physicians, managed long-term care plans, and families to design individual care plans that foster independence, safety, and joy.
            </p>

            {/* Caregiver Quality Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>NYS DOH Fingerprinted &amp; Criminal Background Checked</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Multilingual Support in 6+ Languages</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Clinical RN Oversight &amp; 24/7 Care Dispatch</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Same-Day Pay, 401(k), and Fair Compensation</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenAssessment}
                className="bg-[#003561] hover:bg-[#002444] text-white px-5 py-2.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Request Care for a Family Member</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToCareers}
                className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
              >
                Join Our Caregiver Team
              </button>
            </div>

          </div>

        </div>

        {/* 4 Core Values Grid */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Our Core Values</h3>
            <p className="text-xs text-slate-600 mt-1">
              Guiding principles behind every patient interaction, home visit, and clinical assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:border-[#003561]/40 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#003561] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{v.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
