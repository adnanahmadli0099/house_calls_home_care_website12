import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Building2, Train } from 'lucide-react';
import { OFFICE_LOCATIONS, BUSINESS_INFO, NYC_NEIGHBORHOODS_SERVED } from '../data/businessData';
import { OfficeLocation } from '../types';

export const LocationsSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<OfficeLocation>(OFFICE_LOCATIONS[0]);
  const [boroughFilter, setBoroughFilter] = useState<'All' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Manhattan'>('All');

  const filteredLocations = OFFICE_LOCATIONS.filter(
    (loc) => boroughFilter === 'All' || loc.borough === boroughFilter
  );

  return (
    <section id="locations" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#003561] uppercase tracking-wider mb-2">
            Local Care Across New York
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Locations &amp; Service Areas
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Headquartered at <strong>4920 Church Ave in Brooklyn</strong>, HouseCalls operates 8 regional branches across New York City, ensuring personalized local support for your family.
          </p>
        </div>

        {/* Borough Filters */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {(['All', 'Brooklyn', 'Queens', 'Bronx', 'Manhattan'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBoroughFilter(b)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                boroughFilter === b
                  ? 'bg-[#003561] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b === 'All' ? 'All NYC Boroughs' : `${b} Offices`}
            </button>
          ))}
        </div>

        {/* Main Location Grid: Interactive Selector + Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office List Selector */}
          <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-sky-50/70 border-[#003561] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{loc.name}</span>
                        {loc.isPrimary && (
                          <span className="bg-[#003561] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{loc.address}, {loc.cityStateZip}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={`tel:${loc.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-700 hover:text-[#003561] font-semibold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-[#003561]" />
                      <span>{loc.phone}</span>
                    </a>

                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#003561] hover:text-[#002444] font-medium flex items-center gap-1 underline"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Office Card & Embedded Map */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
            
            {/* Selected Location Details Card */}
            <div className="p-6 bg-white border-b border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#003561]" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedLocation.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {selectedLocation.address}, {selectedLocation.cityStateZip}
                  </p>
                </div>

                <a
                  href={selectedLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#003561] hover:bg-[#002444] text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Office Hours:</span>
                    <span>{selectedLocation.hours}</span>
                    <span className="block text-[11px] text-teal-700 font-medium">
                      24/7 Live Care Line: (718) 922-9200
                    </span>
                  </div>
                </div>

                {selectedLocation.subwayAccess && (
                  <div className="flex items-start gap-2">
                    <Train className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Public Transit:</span>
                      <span>{selectedLocation.subwayAccess}</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedLocation.notes && (
                <div className="text-xs text-slate-600 bg-sky-50/70 p-2.5 rounded border border-sky-100">
                  {selectedLocation.notes}
                </div>
              )}
            </div>

            {/* Google Map Interactive Embed */}
            <div className="relative w-full h-[320px] bg-slate-200">
              <iframe
                title={`Map of ${selectedLocation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selectedLocation.address + ', ' + selectedLocation.cityStateZip
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
              <div className="absolute top-2 right-2 bg-white/95 px-3 py-1.5 rounded shadow-md border border-slate-200 text-[11px] font-semibold text-slate-800">
                📍 {selectedLocation.address}
              </div>
            </div>

          </div>

        </div>

        {/* Neighborhood Coverage Section */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Neighborhoods We Actively Serve in New York
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Caregivers are dispatched locally from within your community to ensure punctual, consistent care.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {NYC_NEIGHBORHOODS_SERVED.map((n, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs hover:bg-sky-50 hover:text-[#003561] transition-colors"
              >
                {n}
              </span>
            ))}
            <span className="text-xs text-slate-500 font-medium px-2 py-1">
              + All other NYC communities
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
