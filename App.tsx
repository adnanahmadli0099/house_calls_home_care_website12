import React, { useState, useEffect } from 'react';
import { PageRoute, CareInquiry, JobApplication } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickAssessmentWidget } from './components/QuickAssessmentWidget';
import { ServicesSection } from './components/ServicesSection';
import { CdpapCalculator } from './components/CdpapCalculator';
import { AboutSection } from './components/AboutSection';
import { LocationsSection } from './components/LocationsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CareersSection } from './components/CareersSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';
import { NotFoundView } from './components/NotFoundView';

// Initial verified sample inquiries for demonstration in staff portal
const INITIAL_INQUIRIES: CareInquiry[] = [
  {
    id: 'inq-101',
    createdAt: '2026-10-15T14:32:00Z',
    fullName: 'Maria Rodriguez',
    phone: '(718) 555-0142',
    email: 'm.rodriguez@nycmail.org',
    relationToPatient: 'Parent (Mother/Father)',
    patientName: 'Rosa Rodriguez (Age 82)',
    borough: 'Brooklyn',
    serviceRequested: 'CDPAP (Paid Family Caregiver)',
    medicaidStatus: 'Has Medicaid',
    urgency: 'Immediate (within 24-48 hrs)',
    notes: 'Mom recently discharged from Kings County Hospital. Wants her daughter to be the official caregiver.',
    status: 'Assessment Scheduled',
  },
  {
    id: 'inq-102',
    createdAt: '2026-10-15T10:15:00Z',
    fullName: 'Mohammed Rahman',
    phone: '(917) 555-8921',
    email: 'rahman.m@gmail.com',
    relationToPatient: 'Parent (Mother/Father)',
    patientName: 'Abdul Rahman (Age 79)',
    borough: 'Queens',
    serviceRequested: 'Home Health Aide (HHA)',
    medicaidStatus: 'Has Medicaid',
    urgency: 'Within 1-2 weeks',
    notes: 'Needs Bengali-speaking aide in Jackson Heights for morning bathing and medication assistance.',
    status: 'Contacted',
  },
  {
    id: 'inq-103',
    createdAt: '2026-10-14T18:45:00Z',
    fullName: 'James O’Connor',
    phone: '(212) 555-3490',
    email: 'joconnor@verizon.net',
    relationToPatient: 'Spouse',
    patientName: 'Eleanor O’Connor',
    borough: 'Manhattan',
    serviceRequested: 'Skilled Nursing',
    medicaidStatus: 'Private Pay / Other Insurance',
    urgency: 'Immediate (within 24-48 hrs)',
    notes: 'Post-operative wound care and medication management in Washington Heights.',
    status: 'Active',
  },
];

const INITIAL_JOB_APPS: JobApplication[] = [
  {
    id: 'app-501',
    createdAt: '2026-10-15T11:20:00Z',
    fullName: 'Natasha Pierre',
    phone: '(347) 555-7281',
    email: 'natasha.p@outlook.com',
    certification: 'Certified HHA',
    experienceYears: '3 - 5 Years',
    boroughPreference: 'Brooklyn',
    languageSpoken: 'English & Haitian Creole',
    status: 'Interview Scheduled',
  },
  {
    id: 'app-502',
    createdAt: '2026-10-14T09:05:00Z',
    fullName: 'Fatima Begum',
    phone: '(718) 555-6612',
    email: 'fatima.b@gmail.com',
    certification: 'Certified PCA',
    experienceYears: '1 - 3 Years',
    boroughPreference: 'Queens',
    languageSpoken: 'Bengali & English',
    status: 'New',
  },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'assessment' | null>(null);
  const [contactInitialService, setContactInitialService] = useState<string>('CDPAP Program');

  // Unified inquiries state with localStorage backup
  const [inquiries, setInquiries] = useState<CareInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('housecalls_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Unified job applications state with localStorage backup
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('housecalls_jobs');
      return saved ? JSON.parse(saved) : INITIAL_JOB_APPS;
    } catch {
      return INITIAL_JOB_APPS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('housecalls_inquiries', JSON.stringify(inquiries));
    } catch {
      // Storage quota or private mode fallback
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('housecalls_jobs', JSON.stringify(jobApplications));
    } catch {
      // Storage quota or private mode fallback
    }
  }, [jobApplications]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (
        [
          'home',
          'about',
          'services',
          'cdpap',
          'locations',
          'gallery',
          'testimonials',
          'faq',
          'careers',
          'contact',
          'admin',
        ].includes(hash)
      ) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddInquiry = (inquiry: CareInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleAddJobApplication = (app: JobApplication) => {
    setJobApplications((prev) => [app, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, status: CareInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const handleUpdateJobAppStatus = (id: string, status: JobApplication['status']) => {
    setJobApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleOpenAssessmentWithService = (serviceName: string) => {
    setContactInitialService(serviceName);
    navigateTo('contact');
  };

  const handleStartCdpapEnrollment = (hours: number, pay: number) => {
    setContactInitialService(`CDPAP (${hours} hrs/wk, ~$${pay}/wk)`);
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      
      {/* Universal Header */}
      <Header
        currentRoute={currentRoute}
        setCurrentRoute={navigateTo}
        onOpenAssessment={() => setModalType('assessment')}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <Hero
              onOpenAssessment={() => setModalType('assessment')}
              onNavigateToCdpap={() => navigateTo('cdpap')}
              onNavigateToServices={() => navigateTo('services')}
            />
            <QuickAssessmentWidget onSuccessSubmission={handleAddInquiry} />
            <ServicesSection
              onOpenAssessmentWithService={handleOpenAssessmentWithService}
              onNavigateToCdpap={() => navigateTo('cdpap')}
            />
            <CdpapCalculator onStartEnrollment={handleStartCdpapEnrollment} />
            <AboutSection
              onOpenAssessment={() => setModalType('assessment')}
              onNavigateToCareers={() => navigateTo('careers')}
            />
            <LocationsSection />
            <GallerySection />
            <TestimonialsSection />
            <CareersSection onSuccessApplication={handleAddJobApplication} />
            <FaqSection onOpenAssessment={() => setModalType('assessment')} />
            <ContactSection
              onSuccessInquiry={handleAddInquiry}
              initialService={contactInitialService}
            />
          </>
        )}

        {currentRoute === 'services' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  In-Home Care Services &amp; Clinical Programs
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  From certified home health aides to CDPAP, skilled nursing, and NHTD waiver services across Brooklyn and all 5 NYC boroughs.
                </p>
              </div>
            </div>
            <ServicesSection
              onOpenAssessmentWithService={handleOpenAssessmentWithService}
              onNavigateToCdpap={() => navigateTo('cdpap')}
            />
            <ContactSection
              onSuccessInquiry={handleAddInquiry}
              initialService={contactInitialService}
            />
          </>
        )}

        {currentRoute === 'cdpap' && (
          <>
            <div className="bg-gradient-to-r from-[#003561] via-[#002f57] to-[#860c00] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                  New York State Consumer Directed Personal Assistance Program
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Get Paid to Care for Your Loved One
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  No certificate required. Children, relatives, and friends can become paid caregivers under NY Medicaid.
                </p>
              </div>
            </div>
            <CdpapCalculator onStartEnrollment={handleStartCdpapEnrollment} />
            <ContactSection
              onSuccessInquiry={handleAddInquiry}
              initialService="CDPAP Program"
            />
          </>
        )}

        {currentRoute === 'about' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  About HouseCalls Home Care
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  A New York State Licensed Home Care Services Agency (LHCSA) upholding compassion, dignity, and clinical excellence.
                </p>
              </div>
            </div>
            <AboutSection
              onOpenAssessment={() => setModalType('assessment')}
              onNavigateToCareers={() => navigateTo('careers')}
            />
            <GallerySection />
            <TestimonialsSection />
          </>
        )}

        {currentRoute === 'locations' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Our New York Offices &amp; Directions
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  Headquartered at 4920 Church Ave in Brooklyn with 8 service branches across Brooklyn, Queens, Bronx, and Manhattan.
                </p>
              </div>
            </div>
            <LocationsSection />
            <ContactSection onSuccessInquiry={handleAddInquiry} />
          </>
        )}

        {currentRoute === 'gallery' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Authentic Field Care Gallery
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  Real moments, dedicated aides, and clinical nurse visits across New York City.
                </p>
              </div>
            </div>
            <GallerySection />
          </>
        )}

        {currentRoute === 'testimonials' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Patient &amp; Family Testimonials
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  Rated 4.8 / 5.0 with 638+ verified reviews across Birdeye and Google Reviews.
                </p>
              </div>
            </div>
            <TestimonialsSection />
            <ContactSection onSuccessInquiry={handleAddInquiry} />
          </>
        )}

        {currentRoute === 'careers' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Careers at HouseCalls Home Care
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  Instant same-day pay, competitive wages, paid sick time, and 401(k) retirement matching.
                </p>
              </div>
            </div>
            <CareersSection onSuccessApplication={handleAddJobApplication} />
          </>
        )}

        {currentRoute === 'faq' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Frequently Asked Questions
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  Answers to Medicaid eligibility, CDPAP family pay, caregiver qualifications, and care transfer.
                </p>
              </div>
            </div>
            <FaqSection onOpenAssessment={() => setModalType('assessment')} />
          </>
        )}

        {currentRoute === 'contact' && (
          <>
            <div className="bg-[#002b50] text-white py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Contact HouseCalls Home Care
                </h1>
                <p className="text-sm text-slate-200 max-w-2xl mx-auto">
                  East Flatbush Headquarters: 4920 Church Ave, Brooklyn, NY 11203 · Phone: (718) 922-9200
                </p>
              </div>
            </div>
            <ContactSection
              onSuccessInquiry={handleAddInquiry}
              initialService={contactInitialService}
            />
            <LocationsSection />
          </>
        )}

        {currentRoute === 'admin' && (
          <AdminPortal
            inquiries={inquiries}
            jobApplications={jobApplications}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onUpdateJobAppStatus={handleUpdateJobAppStatus}
          />
        )}

        {currentRoute === 'not-found' && (
          <NotFoundView onGoHome={() => navigateTo('home')} onNavigate={navigateTo} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => setModalType('privacy')}
        onOpenTerms={() => setModalType('terms')}
      />

      {/* Legal & Assessment Modals */}
      <LegalModals
        isOpen={modalType !== null}
        type={modalType || 'assessment'}
        onClose={() => setModalType(null)}
        onSuccessInquiry={handleAddInquiry}
        defaultService={contactInitialService}
      />

    </div>
  );
}
