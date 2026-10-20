import React, { useState } from 'react';
import {
  RotateCcw,
  Check,
  Mic,
  Smartphone,
  WifiOff,
  Bell,
  TrendingUp,
  Sprout,
  ShieldCheck,
  Layers,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface RoleAndAssistantPageProps {
  userName?: string;
  onGoToSettings?: () => void;
  onNavigateToCropMarket?: () => void;
  onNavigateToCropData?: () => void;
}

export const RoleAndAssistantPage: React.FC<RoleAndAssistantPageProps> = ({
  userName = 'Ramesh Farmer',
  onGoToSettings,
  onNavigateToCropMarket,
  onNavigateToCropData,
}) => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | 'both'>('farmer');
  const [interactionMode, setInteractionMode] = useState<'voice' | 'visual' | 'lite'>('voice');
  const [notificationChannels, setNotificationChannels] = useState<{
    whatsapp: boolean;
    sms: boolean;
    voiceCall: boolean;
  }>({
    whatsapp: true,
    sms: true,
    voiceCall: false,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleChannel = (channel: 'whatsapp' | 'sms' | 'voiceCall') => {
    setNotificationChannels((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  const handleSaveProfile = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* 
        Section 1: Your Role & Interaction Mode
        Faithful to the original screenshot header & role cards
      */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-1.5">
          Your Role & Interaction Mode
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Configure your personalized experience. Choose a profile mode to update dashboards and advisory services.
        </p>

        {/* 3 Role Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Card 1: FARMER */}
          <button
            type="button"
            onClick={() => setSelectedRole('farmer')}
            className={`relative p-6 rounded-2xl bg-white text-center flex flex-col items-center justify-between transition-all cursor-pointer shadow-sm ${
              selectedRole === 'farmer'
                ? 'border-2 border-[#22c55e] ring-2 ring-[#22c55e]/20 shadow-md scale-[1.01]'
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Farmer Custom Graphic Illustration */}
            <div className="h-24 flex items-center justify-center relative w-full mb-3">
              <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Speech accent bubble */}
                <ellipse cx="88" cy="22" rx="14" ry="9" fill="#22C55E" />
                {/* Farmer Green Hat brim */}
                <ellipse cx="50" cy="42" rx="36" ry="4" fill="#15803D" />
                {/* Farmer Green Hat top */}
                <path d="M 32 42 C 32 24, 68 24, 68 42 Z" fill="#22C55E" />
                {/* Face */}
                <ellipse cx="50" cy="52" rx="14" ry="12" fill="#FBCFE8" />
                {/* Shirt / Chest */}
                <rect x="30" y="66" width="40" height="20" rx="3" fill="#E11D48" />
              </svg>
            </div>

            <div>
              <div className="text-sm md:text-base font-bold text-[#15803D] uppercase tracking-wide">
                FARMER
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Grow & Protect crops
              </div>
            </div>

            {selectedRole === 'farmer' && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-[#22c55e] text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
            )}
          </button>

          {/* Card 2: BUYER */}
          <button
            type="button"
            onClick={() => setSelectedRole('buyer')}
            className={`relative p-6 rounded-2xl bg-white text-center flex flex-col items-center justify-between transition-all cursor-pointer shadow-sm ${
              selectedRole === 'buyer'
                ? 'border-2 border-[#22c55e] ring-2 ring-[#22c55e]/20 shadow-md scale-[1.01]'
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Truck / Transport Sourcing Illustration */}
            <div className="h-24 flex items-center justify-center relative w-full mb-3">
              <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Truck Cabin front pole */}
                <path d="M 22 22 L 22 62" stroke="#881337" strokeWidth="5" strokeLinecap="round" />
                {/* Truck Cargo Bed */}
                <rect x="25" y="34" width="62" height="26" rx="2" fill="#FDA4AF" />
                {/* Wheels */}
                <circle cx="36" cy="68" r="8" fill="#111827" />
                <circle cx="76" cy="68" r="8" fill="#111827" />
              </svg>
            </div>

            <div>
              <div className="text-sm md:text-base font-bold text-[#15803D] uppercase tracking-wide">
                BUYER
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Sourcing crops
              </div>
            </div>

            {selectedRole === 'buyer' && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-[#22c55e] text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
            )}
          </button>

          {/* Card 3: BOTH */}
          <button
            type="button"
            onClick={() => setSelectedRole('both')}
            className={`relative p-6 rounded-2xl bg-white text-center flex flex-col items-center justify-between transition-all cursor-pointer shadow-sm ${
              selectedRole === 'both'
                ? 'border-2 border-[#22c55e] ring-2 ring-[#22c55e]/20 shadow-md scale-[1.01]'
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Sync / Exchange Icon Graphic */}
            <div className="h-24 flex items-center justify-center relative w-full mb-3">
              <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                <RotateCcw className="w-8 h-8 stroke-[1.8]" />
              </div>
            </div>

            <div>
              <div className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-wide">
                BOTH
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Farmer & Buyer profile
              </div>
            </div>

            {selectedRole === 'both' && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-[#22c55e] text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 
        Section 2: Interaction Mode Preferences
        Fills the space meaningfully with rich, functional configuration
      */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7 space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-950 mb-1">
            Preferred Interaction Mode
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Select how you would like AgriConnect to deliver advisory alerts, mandi bids, and notifications.
          </p>
        </div>

        {/* 3 Interaction Mode Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode 1: Voice-First */}
          <button
            type="button"
            onClick={() => setInteractionMode('voice')}
            className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              interactionMode === 'voice'
                ? 'border-[#15803D] bg-emerald-50/50 shadow-sm ring-1 ring-[#15803D]'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              {interactionMode === 'voice' && (
                <span className="text-[11px] font-bold text-[#15803D] bg-emerald-100 px-2 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 mb-1">
                Voice-First Mode
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Spoken audio advisories in Kannada & Tamil. Hands-free mandi rate queries while in the field.
              </p>
            </div>
          </button>

          {/* Mode 2: Visual & Touch */}
          <button
            type="button"
            onClick={() => setInteractionMode('visual')}
            className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              interactionMode === 'visual'
                ? 'border-[#15803D] bg-emerald-50/50 shadow-sm ring-1 ring-[#15803D]'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              {interactionMode === 'visual' && (
                <span className="text-[11px] font-bold text-[#15803D] bg-emerald-100 px-2 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 mb-1">
                Standard Visual Mode
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                High-contrast charts, satellite cadastral field plots, and detailed multi-mandi comparison tables.
              </p>
            </div>
          </button>

          {/* Mode 3: Low-Bandwidth / Lite */}
          <button
            type="button"
            onClick={() => setInteractionMode('lite')}
            className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              interactionMode === 'lite'
                ? 'border-[#15803D] bg-emerald-50/50 shadow-sm ring-1 ring-[#15803D]'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              {interactionMode === 'lite' && (
                <span className="text-[11px] font-bold text-[#15803D] bg-emerald-100 px-2 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 mb-1">
                Lite / Offline Field Mode
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Optimized for rural 2G/3G connectivity. Caches weather and price quotes for offline viewing.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 
        Section 3: Role Capabilities Matrix & Advisory Channels
        Provides depth, clear value, and ensures no empty space on the screen
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left: Role Privileges & Capabilities */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Active Privileges & Modules
              </h3>
              <p className="text-xs text-gray-500">
                Configured specifically for your <span className="font-semibold text-emerald-800">{selectedRole.toUpperCase()}</span> profile.
              </p>
            </div>
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {selectedRole === 'farmer' && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Sell farm harvest directly to licensed buyers with 0% middleman commission
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Automated soil test reminders & subsidized micro-irrigation equipment schemes
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Daily 10:30 AM APMC Mandi modal price ticker for Mysore, Thanjavur & Mandya
                  </span>
                </div>
              </>
            )}

            {selectedRole === 'buyer' && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Publish bulk crop procurement tenders and connect directly with verified farmer clusters
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Certified farm-gate quality grading reports for moisture, grain size, and purity
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Real-time bulk dispatch tracking and automated GST-compliant e-invoicing
                  </span>
                </div>
              </>
            )}

            {selectedRole === 'both' && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Dual trading dashboard: Sell surplus harvest while sourcing raw commodities and seeds
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Access both farmer subsidized credit programs and buyer wholesale freight networks
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="text-xs md:text-sm text-gray-800 font-medium">
                    Cross-cluster contract farming agreements with escrow payment protection
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Broadcast & Alert Channels */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Advisory Channels
            </h3>
            <p className="text-xs text-gray-500">
              Receive live crop alerts on your preferred phone channel.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {/* WhatsApp */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">💬</span>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900">WhatsApp Digest</div>
                  <div className="text-[11px] text-gray-500">Daily 7:30 AM mandi bulletin</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleChannel('whatsapp')}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 ${
                  notificationChannels.whatsapp ? 'bg-[#15803D]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                    notificationChannels.whatsapp ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📱</span>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900">SMS Alerts</div>
                  <div className="text-[11px] text-gray-500">Urgent pest & rain warnings</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleChannel('sms')}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 ${
                  notificationChannels.sms ? 'bg-[#15803D]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                    notificationChannels.sms ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Voice Call / IVR */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📞</span>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900">Automated Voice Call</div>
                  <div className="text-[11px] text-gray-500">Emergency frost & flood broadcasts</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleChannel('voiceCall')}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 ${
                  notificationChannels.voiceCall ? 'bg-[#15803D]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                    notificationChannels.voiceCall ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Section 4: Quick Launch Actions to Crop Market & Crop Data
        Provides direct next actions matching user flow
      */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveProfile}
            className="px-6 py-3 bg-[#15803D] hover:bg-[#126e34] active:bg-[#0e5c2b] text-white font-bold text-xs md:text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Profile Preferences</span>
          </button>

          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200 animate-in fade-in">
              ✓ Preferences updated!
            </span>
          )}
        </div>

        {/* Quick jumps to the two main pages requested by user */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onNavigateToCropMarket && (
            <button
              type="button"
              onClick={onNavigateToCropMarket}
              className="flex-1 sm:flex-initial px-5 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold text-xs md:text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-[#15803D]" />
              <span>Go to Crop Market</span>
            </button>
          )}

          {onNavigateToCropData && (
            <button
              type="button"
              onClick={onNavigateToCropData}
              className="flex-1 sm:flex-initial px-5 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold text-xs md:text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sprout className="w-4 h-4 text-[#15803D]" />
              <span>Open Crop Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
