import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, Menu, X, ChevronRight, Shield, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { PageRoute } from '../types';

interface HeaderProps {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  onOpenAssessment: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  setCurrentRoute,
  onOpenAssessment,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Services', route: 'services' },
    { label: 'CDPAP Guide', route: 'cdpap' },
    { label: 'Locations', route: 'locations' },
    { label: 'About Us', route: 'about' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Reviews', route: 'testimonials' },
    { label: 'Careers', route: 'careers' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Emergency / Multilingual Utility Bar */}
      <div className="bg-[#002b50] text-slate-100 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-sky-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>NYS Licensed Home Care Agency (LHCSA)</span>
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>24/7 Live Care Dispatch &amp; Emergency Intake</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-xs hover:bg-white/10 transition-colors text-slate-200 cursor-pointer"
                aria-label="Select preferred language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span className="uppercase font-medium">{selectedLanguage}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Bilingual Support
                  </div>
                  {BUSINESS_INFO.languagesSupported.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedLanguage === lang.code ? 'font-semibold text-[#003561] bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[11px] text-slate-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-500">|</span>

            {/* Click to Call */}
            <a
              href={`tel:${BUSINESS_INFO.phoneFormatted}`}
              className="font-semibold text-white hover:text-teal-200 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-teal-300" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <span className="hidden sm:inline text-slate-500">|</span>

            {/* WhatsApp Direct */}
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
              title="Chat with Care Intake on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
          >
            <img
              src="/images/logo.svg"
              alt="HouseCalls Home Care Logo"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-102"
              onError={(e) => {
                // Fallback to secondary logo if SVG encounters an issue
                (e.target as HTMLImageElement).src = '/images/logo-alt.png';
              }}
            />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-sm font-medium transition-colors py-1 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-[#003561] border-[#003561] font-semibold'
                      : 'text-slate-600 border-transparent hover:text-[#003561] hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenAssessment}
              className="bg-[#003561] hover:bg-[#002444] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Free Care Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${BUSINESS_INFO.phoneFormatted}`}
              className="bg-sky-50 text-[#003561] p-2 rounded-md hover:bg-sky-100 transition-colors"
              aria-label="Call HouseCalls Home Care"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <a
              href={`tel:${BUSINESS_INFO.phoneFormatted}`}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-sky-50 text-[#003561] rounded-md text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-[#003561]" />
              <span>Call (718) 922-9200</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 text-emerald-800 rounded-md text-xs font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  currentRoute === item.route
                    ? 'bg-[#003561] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full bg-[#860c00] hover:bg-[#6e0a00] text-white py-3 px-4 rounded-md text-sm font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Free In-Home Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2 text-xs text-slate-500">
            Main Office: 4920 Church Ave, Brooklyn, NY 11203
          </div>
        </div>
      )}
    </header>
  );
};
