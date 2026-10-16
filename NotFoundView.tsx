import React from 'react';
import { Home, Phone, ArrowLeft, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { PageRoute } from '../types';

interface NotFoundViewProps {
  onGoHome: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome, onNavigate }) => {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md border border-slate-200 p-8 text-center space-y-5">
        <div className="w-16 h-16 bg-sky-50 text-[#003561] rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-4xl font-extrabold text-[#003561]">404</span>
          <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested page does not exist or has been relocated within the HouseCalls Home Care portal.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={onGoHome}
            className="w-full bg-[#003561] hover:bg-[#002444] text-white py-2.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
          >
            Explore Home Care Services
          </button>
        </div>

        <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
          Need immediate home care assistance? Call{' '}
          <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-[#003561] font-bold underline">
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
