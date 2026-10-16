export type PageRoute = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'cdpap'
  | 'locations'
  | 'gallery'
  | 'testimonials'
  | 'faq'
  | 'careers'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin'
  | 'not-found';

export interface OfficeLocation {
  id: string;
  name: string;
  borough: 'Brooklyn' | 'Queens' | 'Manhattan' | 'Bronx';
  address: string;
  cityStateZip: string;
  phone: string;
  email: string;
  hours: string;
  googleMapsUrl: string;
  isPrimary?: boolean;
  notes?: string;
  subwayAccess?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface HomeCareService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'personal-care' | 'cdpap' | 'nursing' | 'waiver' | 'specialty' | 'companion';
  badge?: string;
  features: string[];
  eligibility: string[];
  coveredBy: string[];
  image: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  author: string;
  relation: string;
  location: string;
  rating: number;
  date: string;
  verifiedSource: 'Google Reviews' | 'Birdeye' | 'Care Coordinator';
  content: string;
  serviceReceived: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'In-Home Care' | 'Caregivers' | 'Clinical Nursing' | 'Community & Culture';
  imageUrl: string;
  fallbackUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'CDPAP' | 'General' | 'Payment & Insurance' | 'Caregivers & Staffing';
}

export interface CareInquiry {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  relationToPatient: string;
  patientName?: string;
  borough: string;
  serviceRequested: string;
  medicaidStatus: 'Has Medicaid' | 'Has Medicare Only' | 'Private Pay / Other Insurance' | 'Unsure / Need Assistance';
  urgency: 'Immediate (within 24-48 hrs)' | 'Within 1-2 weeks' | 'Planning ahead';
  notes?: string;
  status: 'New' | 'Contacted' | 'Assessment Scheduled' | 'Active';
}

export interface JobApplication {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  certification: 'Certified HHA' | 'Certified PCA' | 'Registered Nurse (RN)' | 'Looking for Certification / CDPAP';
  experienceYears: string;
  boroughPreference: string;
  languageSpoken: string;
  status: 'New' | 'Interview Scheduled' | 'Hired' | 'Archived';
}
