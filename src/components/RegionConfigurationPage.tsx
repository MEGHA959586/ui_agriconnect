import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Plus,
  Check,
  ArrowRight,
  Globe2,
  Coins,
  Mountain,
  Thermometer,
} from 'lucide-react';

interface RegionConfigurationPageProps {
  onContinue: () => void;
}

export const RegionConfigurationPage: React.FC<RegionConfigurationPageProps> = ({
  onContinue,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tamil Nadu, South India');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Rice', 'Millets']);
  const [cropSearch, setCropSearch] = useState<string>('');

  const languages = ['Tamil', 'English', 'Telugu', 'Hindi', 'Kannada'];

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-1.5">
          Region & Main Crops Configuration
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Select your agricultural region and main crops to synchronize mandi and localized advisory services.
        </p>
      </div>

      {/* Main Grid matching Desktop - 17 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column (Selected Region, Language, Metric Standards) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Selected Region */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-start gap-4">
            <div className="w-18 h-18 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 p-2 relative overflow-hidden">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M 8 20 L 22 14 L 38 22 L 52 16 L 52 46 L 38 52 L 22 44 L 8 50 Z" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
                <path d="M 22 14 L 22 44" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M 38 22 L 38 52" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="30" cy="28" r="6" fill="#EF4444" />
                <path d="M 30 28 L 30 38" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                SELECTED REGION
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {selectedRegion}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Highly recommended crops configured for local soil types & red-yellow clay texture.
              </p>
            </div>
          </div>

          {/* Card 2: Select App Language */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm font-bold text-gray-900 mb-3">
              Select App Language
            </div>
            <div className="flex flex-wrap gap-2.5">
              {languages.map((lang) => {
                const isSelected = selectedLanguage === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803D] text-white shadow-sm ring-2 ring-[#15803D]/20'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Local Metric Standards */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
              LOCAL METRIC STANDARDS
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Currency */}
              <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[96px]">
                <div className="text-[11px] font-medium text-gray-500">Currency</div>
                <div className="text-sm font-bold text-gray-900">INR (₹)</div>
                <div className="w-8 h-5 bg-[#22C55E]/15 border border-[#22C55E]/40 rounded flex items-center justify-center text-[10px] text-[#15803D] font-bold">
                  💵
                </div>
              </div>

              {/* Land Area */}
              <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[96px]">
                <div className="text-[11px] font-medium text-gray-500">Land Area</div>
                <div className="text-sm font-bold text-gray-900">Acres</div>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path d="M 4 18 L 12 4 L 18 18 Z" fill="#991B1B" />
                  <path d="M 14 18 L 20 8 L 26 18 Z" fill="#DC2626" />
                </svg>
              </div>

              {/* Temperature */}
              <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[96px]">
                <div className="text-[11px] font-medium text-gray-500">Temperature</div>
                <div className="text-sm font-bold text-gray-900">Celsius (°C)</div>
                <div className="flex items-center text-[#DC2626]">
                  <Thermometer className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Your Main Crops) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="text-sm font-bold text-gray-900">
            Your Main Crops (Select all that apply):
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cropSearch}
              onChange={(e) => setCropSearch(e.target.value)}
              placeholder="search your main crops"
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/30 focus:border-[#15803D]"
            />
          </div>

          {/* Crop Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {/* Rice Card */}
            <button
              type="button"
              onClick={() => toggleCrop('Rice')}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all cursor-pointer ${
                selectedCrops.includes('Rice')
                  ? 'border-gray-300 bg-white shadow-sm ring-1 ring-gray-200'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="w-16 h-16 bg-[#B45309]/15 border border-[#B45309]/30 rounded-xl flex items-center justify-center text-3xl mb-2 relative">
                🌾
                {selectedCrops.includes('Rice') && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#15803D] text-white rounded-full flex items-center justify-center text-[11px]">
                    ✓
                  </span>
                )}
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-800">Rice</span>
            </button>

            {/* Millets Card (selected green gradient as in screenshot) */}
            <button
              type="button"
              onClick={() => toggleCrop('Millets')}
              className={`p-3.5 rounded-2xl text-center flex flex-col items-center justify-between transition-all cursor-pointer ${
                selectedCrops.includes('Millets')
                  ? 'bg-gradient-to-b from-[#86EFAC] to-[#4ADE80] text-gray-950 font-bold border-2 border-[#22C55E] shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center text-3xl mb-2 relative">
                🌱
                {selectedCrops.includes('Millets') && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#15803D] text-white rounded-full flex items-center justify-center text-[11px]">
                    ✓
                  </span>
                )}
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-900">Millets</span>
            </button>
          </div>

          {/* Add Crop Custom Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                const name = prompt('Enter crop name (e.g. Cotton, Maize, Sugarcane):');
                if (name && name.trim()) toggleCrop(name.trim());
              }}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#15803D] rounded-xl text-gray-600 hover:text-[#15803D] text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add another crop to profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Continue Action Button to navigate to Role & Interaction Mode */}
      <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Step 2 of 3 · Next: Your Role & Interaction Mode
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="px-8 py-3.5 bg-[#1E4E2B] hover:bg-[#163c21] active:bg-[#0f2a17] text-white font-bold text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer flex items-center gap-2.5 group"
        >
          <span>Continue to Role & Interaction</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
