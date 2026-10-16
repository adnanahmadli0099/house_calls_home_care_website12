import React, { useState } from 'react';
import { Lock, Unlock, Users, Briefcase, FileSpreadsheet, ShieldAlert, CheckCircle2, Clock, Phone, Mail, Filter, Download } from 'lucide-react';
import { CareInquiry, JobApplication } from '../types';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';

interface AdminPortalProps {
  inquiries: CareInquiry[];
  jobApplications: JobApplication[];
  onUpdateInquiryStatus: (id: string, status: CareInquiry['status']) => void;
  onUpdateJobAppStatus: (id: string, status: JobApplication['status']) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  inquiries,
  jobApplications,
  onUpdateInquiryStatus,
  onUpdateJobAppStatus,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'jobs' | 'locations'>('inquiries');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default coordinator access code
    if (passcode === 'housecalls2026' || passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid coordinator passcode. Enter "housecalls2026" to access.');
    }
  };

  const exportInquiriesToCsv = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Relation', 'Borough', 'Service', 'Medicaid', 'Urgency', 'Status'];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${i.fullName}"`,
      i.phone,
      i.email,
      `"${i.relationToPatient}"`,
      i.borough,
      `"${i.serviceRequested}"`,
      `"${i.medicaidStatus}"`,
      `"${i.urgency}"`,
      i.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `housecalls_intake_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-100 min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 max-w-md w-full">
          <div className="w-12 h-12 bg-sky-50 text-[#003561] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center">
            HouseCalls Staff &amp; Coordinator Portal
          </h2>
          <p className="text-xs text-slate-500 text-center mt-1 mb-6">
            Authorized intake coordinators and HR recruitment personnel only.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Coordinator Security Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. housecalls2026)"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003561]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Demo coordinator PIN: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">housecalls2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#003561] hover:bg-[#002444] text-white py-2 rounded text-xs font-semibold transition-colors cursor-pointer"
            >
              Unlock Coordinator Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.phone.includes(searchTerm) ||
      i.borough.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl font-bold text-slate-900">
                Staff Operations Console
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              HouseCalls Home Care · Church Ave Brooklyn Central Intake
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportInquiriesToCsv}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#003561] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Care Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'bg-[#003561] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Caregiver Applications ({jobApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'locations'
                ? 'bg-[#003561] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>8 NYC Offices</span>
          </button>
        </div>

        {/* Tab 1: Inquiries List */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by name, phone, borough, service..."
                className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 w-72"
              />
              <span className="text-xs text-slate-500">
                Showing {filteredInquiries.length} of {inquiries.length} leads
              </span>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-slate-500 text-xs border border-slate-200">
                No inquiries match your filter.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Patient / Relation</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Borough</th>
                      <th className="py-3 px-4">Medicaid</th>
                      <th className="py-3 px-4">Urgency</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{inq.fullName}</div>
                          <div className="text-[11px] text-slate-600">{inq.phone}</div>
                          {inq.email && <div className="text-[10px] text-slate-400">{inq.email}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div>{inq.relationToPatient}</div>
                          {inq.patientName && <div className="text-[11px] text-slate-500">Pt: {inq.patientName}</div>}
                        </td>
                        <td className="py-3 px-4 font-medium text-[#003561]">
                          {inq.serviceRequested}
                        </td>
                        <td className="py-3 px-4">{inq.borough}</td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {inq.medicaidStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[11px] font-medium ${
                            inq.urgency.includes('Immediate') ? 'text-amber-700' : 'text-slate-600'
                          }`}>
                            {inq.urgency}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as CareInquiry['status'])}
                            className={`text-xs font-semibold rounded px-2 py-1 border ${
                              inq.status === 'New'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : inq.status === 'Contacted'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : inq.status === 'Assessment Scheduled'
                                ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Assessment Scheduled">Assessment Scheduled</option>
                            <option value="Active">Active Case</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Job Applications */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobApplications.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-slate-500 text-xs border border-slate-200">
                No caregiver job applications submitted yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Certification</th>
                      <th className="py-3 px-4">Experience</th>
                      <th className="py-3 px-4">Borough</th>
                      <th className="py-3 px-4">Languages</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{app.fullName}</div>
                          <div className="text-[11px] text-slate-600">{app.phone}</div>
                          {app.email && <div className="text-[10px] text-slate-400">{app.email}</div>}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#003561]">
                          {app.certification}
                        </td>
                        <td className="py-3 px-4">{app.experienceYears}</td>
                        <td className="py-3 px-4">{app.boroughPreference}</td>
                        <td className="py-3 px-4 text-slate-600">{app.languageSpoken}</td>
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateJobAppStatus(app.id, e.target.value as JobApplication['status'])}
                            className="text-xs font-semibold rounded px-2 py-1 bg-slate-50 border border-slate-200"
                          >
                            <option value="New">New</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Hired">Hired</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Locations Management Overview */}
        {activeTab === 'locations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICE_LOCATIONS.map((loc) => (
              <div key={loc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{loc.name}</span>
                  {loc.isPrimary && (
                    <span className="bg-[#003561] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Main HQ
                    </span>
                  )}
                </div>
                <div className="text-slate-600">{loc.address}, {loc.cityStateZip}</div>
                <div className="text-slate-700 font-medium">Phone: {loc.phone}</div>
                <div className="text-slate-500">Transit: {loc.subwayAccess || 'Subway / Bus reachable'}</div>
                <div className="pt-2">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003561] underline font-semibold"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
