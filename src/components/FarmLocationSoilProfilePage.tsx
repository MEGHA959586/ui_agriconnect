import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Layers,
  Plus,
  Minus,
  CheckSquare,
  Square,
  Sparkles,
  Check,
} from 'lucide-react';

export const FarmLocationSoilProfilePage: React.FC = () => {
  const [villageSearch, setVillageSearch] = useState('Mysore Rural, Bilikere Taluk');
  const [farmSize, setFarmSize] = useState<number>(5);
  const [soilType, setSoilType] = useState<'loamy' | 'sandy' | 'clay'>('loamy');
  const [cropInput, setCropInput] = useState('');
  const [activeCrops, setActiveCrops] = useState<string[]>(['cotton']);
  const [irrigation, setIrrigation] = useState<string>('drip');
  const [savedToast, setSavedToast] = useState(false);

  const toggleCrop = (crop: string) => {
    if (activeCrops.includes(crop)) {
      setActiveCrops(activeCrops.filter((c) => c !== crop));
    } else {
      setActiveCrops([...activeCrops, crop]);
    }
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-1.5">
          Farm Location & Soil Profile
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Provide farm parameters for localized smart advisories.
        </p>
      </div>

      {/* Main 2-Column Split matching Desktop - 18 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 
          LEFT COLUMN: "Find Your Farm Village" & Aerial Satellite Map
        */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 md:p-6 space-y-4">
          <div className="text-sm font-bold text-gray-900">
            Find Your Farm Village
          </div>

          {/* Village search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={villageSearch}
              onChange={(e) => setVillageSearch(e.target.value)}
              placeholder="Search for your farm village, taluk, or district..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/30 focus:border-[#15803D]"
            />
          </div>

          {/* Aerial Farmland Satellite Imagery */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
            <img
              src="/src/assets/images/aerial_farm_fields_1792428088676.jpg"
              alt="Aerial Satellite View of Farm Plots and Land Parcels"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Simulated Parcel Boundary Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Farm Parcel Highlight Box */}
            <div className="absolute top-[32%] left-[28%] w-[38%] h-[32%] border-2 border-emerald-400 bg-emerald-500/20 rounded-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-lg pointer-events-none">
              <span className="bg-black/70 px-2 py-0.5 rounded text-[11px] mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                Plot #4B · {farmSize} Acres
              </span>
              <span className="text-[10px] text-emerald-100 font-medium">
                Loamy Clay Soil
              </span>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg shadow px-2.5 py-1 text-[11px] font-semibold text-gray-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Satellite Cadastral View</span>
            </div>
          </div>
        </div>

        {/* 
          RIGHT COLUMN: Farm Parameters (Size, Soil, Crops, Irrigation)
        */}
        <div className="lg:col-span-6 space-y-6">
          {/* Farm Size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900">
                Farm Size
              </label>
              <span className="text-xs font-semibold text-gray-500">acres</span>
            </div>

            {/* Stepper matching screenshot: [ + ] on left, number in center, [ - ] on right */}
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-xl p-2.5 shadow-sm">
              <button
                type="button"
                onClick={() => setFarmSize((s) => s + 1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-red-600 transition-colors cursor-pointer text-base"
                aria-label="Increase farm size"
              >
                +
              </button>
              <span className="text-base font-bold text-gray-900">
                {farmSize}
              </span>
              <button
                type="button"
                onClick={() => setFarmSize((s) => Math.max(1, s - 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-red-600 transition-colors cursor-pointer text-base"
                aria-label="Decrease farm size"
              >
                -
              </button>
            </div>
          </div>

          {/* Soil Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">
              Soil Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['loamy', 'sandy', 'clay'] as const).map((type) => {
                const isSelected = soilType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSoilType(type)}
                    className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold capitalize transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803D] text-white shadow-sm ring-2 ring-[#15803D]/20'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crop Growing */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">
              Crop Growing
            </label>
            <input
              type="text"
              value={cropInput}
              onChange={(e) => setCropInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && cropInput.trim()) {
                  toggleCrop(cropInput.trim().toLowerCase());
                  setCropInput('');
                }
              }}
              placeholder="search crops..."
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/30 focus:border-[#15803D] shadow-inner"
            />

            {/* Quick Suggestions below input matching screenshot */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {['cotton', 'wheat', 'sugarcane'].map((crop) => {
                const isSelected = activeCrops.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803D] text-white border border-[#15803D]'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    +{crop}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Irrigation Method matching screenshot */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-gray-900">
              Irrigation Method
            </label>

            <div className="space-y-2">
              {/* Option 1: Drip Irrigation (with red checked indicator as in screenshot) */}
              <button
                type="button"
                onClick={() => setIrrigation('drip')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border bg-white transition-all cursor-pointer ${
                  irrigation === 'drip' ? 'border-gray-400 shadow-sm' : 'border-gray-200'
                }`}
              >
                <span className="text-xs md:text-sm font-medium text-gray-800">
                  Drip Irrigation
                </span>
                <span className="w-4 h-4 rounded-sm bg-[#B91C1C] flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </button>

              {/* Option 2: Sprinkler System */}
              <button
                type="button"
                onClick={() => setIrrigation('sprinkler')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border bg-white transition-all cursor-pointer ${
                  irrigation === 'sprinkler' ? 'border-gray-400 shadow-sm' : 'border-gray-200'
                }`}
              >
                <span className="text-xs md:text-sm font-medium text-gray-800">
                  Sprinkler System
                </span>
                <span className={`w-4 h-4 rounded-sm border ${irrigation === 'sprinkler' ? 'bg-[#B91C1C] text-white text-[10px] flex items-center justify-center' : 'border-gray-300'}`}>
                  {irrigation === 'sprinkler' ? '✓' : ''}
                </span>
              </button>

              {/* Option 3: Rain-fed Farming */}
              <button
                type="button"
                onClick={() => setIrrigation('rainfed')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border bg-white transition-all cursor-pointer ${
                  irrigation === 'rainfed' ? 'border-gray-400 shadow-sm' : 'border-gray-200'
                }`}
              >
                <span className="text-xs md:text-sm font-medium text-gray-800">
                  Rain-fed Farming
                </span>
                <span className={`w-4 h-4 rounded-sm border ${irrigation === 'rainfed' ? 'bg-[#B91C1C] text-white text-[10px] flex items-center justify-center' : 'border-gray-300'}`}>
                  {irrigation === 'rainfed' ? '✓' : ''}
                </span>
              </button>
            </div>
          </div>

          {/* 
            Bottom Right Action Button matching screenshot:
            Brownish/clay colored button: "+Add Another Crop"
          */}
          <div className="pt-2 flex items-center justify-between">
            {savedToast && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                ✓ Farm parameters saved to cloud profile!
              </span>
            )}
            <div className="ml-auto">
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 bg-[#8C5656] hover:bg-[#784646] active:bg-[#683939] text-white font-semibold text-xs md:text-sm rounded-xl shadow transition-all cursor-pointer"
              >
                +Add Another Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
