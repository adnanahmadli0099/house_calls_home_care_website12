# HouseCalls Home Care — Official Website & Care Intake Portal

A premier, fully responsive business website for **HouseCalls Home Care LLC**, a New York State Licensed Home Care Services Agency (LHCSA) headquartered at **4920 Church Ave, Brooklyn, NY 11203**.

Verified Google Maps Listing: [https://maps.app.goo.gl/wEx8WPajNkzemzDg8](https://maps.app.goo.gl/wEx8WPajNkzemzDg8)

---

## 1. Business Research Report

| Attribute | Verified Information |
|---|---|
| **Business Name** | HouseCalls Home Care (House Calls Home Care LLC) |
| **Category** | Licensed Home Care Services Agency (LHCSA), CDPAP Provider, Nursing & In-Home Aide Agency |
| **Primary Address** | 4920 Church Ave, Brooklyn, NY 11203 (East Flatbush Headquarters) |
| **Coordinates** | Latitude: 40.6515479, Longitude: -73.9306913 |
| **General Phone** | (718) 922-9200 |
| **Customer Service** | (718) 922-9200 Ext. 815 |
| **Email** | info@housecallshc.org / cs@housecallshc.org |
| **Operating Hours** | Office: Monday – Friday, 9:00 AM – 5:00 PM · Care Delivery: 24/7 Live Coverage |
| **Verified Rating** | 4.8 / 5.0 Stars (638+ Verified Patient & Family Reviews on Birdeye & Google) |
| **Accreditation** | Licensed by the New York State Department of Health (NYSDOH) |
| **Official Website** | https://housecallshc.org |

### 8 Physical Office Branches in NYC
1. **East Flatbush (Brooklyn HQ):** 4920 Church Ave, Brooklyn, NY 11203 · (718) 922-9200
2. **East New York (Brooklyn):** 1950 Fulton St, Brooklyn, NY 11233 · (718) 922-9200
3. **Sunset Park (Brooklyn):** 5803 8th Ave, Brooklyn, NY 11220 · (718) 922-9200
4. **The Bronx:** 1878 Cross Bronx Expy, Bronx, NY 10472 · (718) 922-9200
5. **Jackson Heights (Queens):** 72-16 Roosevelt Ave 2nd Fl, Queens, NY 11372 · (718) 429-9700
6. **Jamaica (Queens):** 90-50 Sutphin Blvd, Queens, NY 11435 · (718) 922-9200
7. **Washington Heights (Manhattan):** 4257 Broadway, New York, NY 10033 · (212) 671-1299
8. **Glendale (Queens):** 65-06 Myrtle Ave, Glendale, NY 11385 · (718) 922-9200

---

## 2. Sitemap & Application Structure

```
├── / (Home)
│   ├── Top Emergency Hotline & Multilingual Bar (English, Spanish, Bangla, Russian, Creole, Cantonese)
│   ├── Navigation & Brand Vector Logo
│   ├── Hero Section with Authentic Caregiver Image & Trust Signals
│   ├── 60-Second Eligibility & Quick Assessment Widget
│   ├── Interactive Services Catalog (HHA/PCA, CDPAP, Nursing, NHTD/TBI, Companion)
│   ├── Interactive CDPAP Weekly Hours & Pay Calculator
│   ├── About Us, Mission & 4 Core Values (Helpfulness, Compassion, Harmonization, Integrity)
│   ├── Interactive 8-Location Directory & Google Maps Embed (Church Ave HQ)
│   ├── Authentic Field Care Photo Gallery with Lightbox
│   ├── Verified Google & Birdeye Family Reviews
│   ├── Caregiver Careers & Same-Day Pay Benefits with Application Form
│   ├── Frequently Asked Questions Accordion with Category Filters
│   └── Complete In-Home Care Intake Form (HIPAA & TCPA/SMS Compliant)
├── /#services (Services Catalog & Deep Modal Explorer)
├── /#cdpap (Dedicated CDPAP Medicaid Family Caregiver Guide & Pay Calculator)
├── /#about (Agency Story, Values, Caregiver Standards)
├── /#locations (8 NYC Branch Details, Transit Access, Directions)
├── /#gallery (Full-Screen Lightbox Image Showcase)
├── /#testimonials (Verified Reviews & Review Submission)
├── /#careers (HHA & PCA Hiring, Benefits, Online Job Application)
├── /#faq (Categorized Questions & Answers)
├── /#contact (Assessment Booking, Direct Call, WhatsApp Chat)
├── /#admin (Staff Operations Console - Code: housecalls2026)
└── /404 (Custom Error Page with Navigation Recovery)
```

---

## 3. Design System & Brand Palette

Extracted directly from the client's official SVG and visual identity:
- **Primary Navy (`#003561`):** Trust, healthcare authority, calm clinical assurance.
- **Accent Crimson (`#860c00`):** Heart warmth, compassionate care, call-to-action distinction.
- **Deep Midnight (`#001f3b` / `#002b50`):** Header and footer grounding.
- **Soft Slate (`#f8fafc` / `#f1f5f9`):** Accessible, glare-free background contrast.
- **Typography & Layout:** Clean sans-serif hierarchy, zero-pill discipline for informational metadata, WCAG AA compliant contrast ratios, accessible keyboard controls.

---

## 4. Authentic Media Assets (100% Client-Owned)

Downloaded and served from `/public/images/`:
- `logo.svg`: Official vector logo
- `logo-alt.png`: High-resolution fallback raster logo
- `favicon.png`: Official client icon
- `hero-caregiver.jpg`: Authentic caregiver with smiling senior patient
- `care-senior-1.jpg`: Registered nurse checking vitals at home
- `care-senior-2.jpg`: Care aide providing respectful mobility assistance
- `care-team.jpg`: Client care coordination session
- `aide-portrait.png`: Certified Home Health Aide portrait
- `coordinator.png`: Multilingual intake coordinator
- `nurse-consult.png`: Registered nurse clinical consultation
- `hr-benefits.png`: Caregiver employee benefits graphic

---

## 5. Staff Admin Portal

- **URL:** Access via the **Staff Portal** link in the footer or navigate to `/#admin`.
- **Passcode:** `housecalls2026`
- **Features:**
  - Real-time lead management (filter, search, change status: New $\rightarrow$ Contacted $\rightarrow$ Scheduled $\rightarrow$ Active)
  - Caregiver job application tracking (certifications, languages, experience)
  - One-click **Export to CSV** for intake and HR spreadsheets
  - Quick access to all 8 office branches and phone lines

---

## 6. Installation & Deployment

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```
