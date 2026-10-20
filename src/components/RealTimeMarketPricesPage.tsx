import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Calendar,
  ChevronDown,
  Star,
  TrendingUp,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export const RealTimeMarketPricesPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice · Super Quality');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('Thanjavur & Mysore Clusters');
  const [dateFilter, setDateFilter] = useState<string>('15 Oct 2026');
  const [alertSet, setAlertSet] = useState<boolean>(false);

  // Mandi Table Data matching Desktop - 19
  const mandiRates = [
    {
      id: 'rice-super',
      crop: 'Rice',
      variety: 'Super Quality',
      mandi: 'Thanjavur',
      price: '₹2,450',
      range: '₹2,350–2,500',
      trend: '+2.1%',
    },
    {
      id: 'rice-common',
      crop: 'Rice',
      variety: 'Common',
      mandi: 'Kumbakonam',
      price: '₹2,280',
      range: '₹2,180–2,320',
      trend: '+1.4%',
    },
    {
      id: 'millet-std',
      crop: 'Millet',
      variety: 'Standard',
      mandi: 'Thanjavur',
      price: '₹1,980',
      range: '₹1,900–2,050',
      trend: '+0.8%',
    },
    {
      id: 'maize-yellow',
      crop: 'Maize',
      variety: 'Yellow',
      mandi: 'Orathanadu',
      price: '₹2,120',
      range: '₹2,050–2,180',
      trend: '+1.9%',
    },
    {
      id: 'groundnut-shell',
      crop: 'Groundnut',
      variety: 'With shell',
      mandi: 'Pattukkottai',
      price: '₹6,250',
      range: '₹6,100–6,400',
      trend: '+3.4%',
    },
    {
      id: 'blackgram-faq',
      crop: 'Black gram',
      variety: 'FAQ',
      mandi: 'Kumbakonam',
      price: '₹7,400',
      range: '₹7,200–7,550',
      trend: '+2.6%',
    },
  ];

  const filteredRates = mandiRates.filter(
    (item) =>
      item.crop.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.mandi.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-7 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-1.5">
          Real-Time Market Prices
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Compare local mandi rates and make a more informed selling decision.
        </p>
      </div>

      {/* Filter Row matching Desktop - 19 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        {/* Filter 1: Location */}
        <div className="md:col-span-4 bg-white border border-gray-300 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          </div>
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="location"
            className="text-xs md:text-sm font-medium text-gray-800 placeholder:text-gray-400 bg-transparent border-none focus:outline-none w-full"
          />
        </div>

        {/* Filter 2: Search your crops */}
        <div className="md:col-span-5 bg-white border border-gray-300 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="search your crops"
            className="text-xs md:text-sm font-medium text-gray-800 placeholder:text-gray-400 bg-transparent border-none focus:outline-none w-full"
          />
        </div>

        {/* Filter 3: Date dropdown */}
        <div className="md:col-span-3 bg-white border border-gray-300 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs md:text-sm font-medium text-gray-800">
              {dateFilter}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Main 2-Column Split: Mandi Table on Left, Crop Spotlight on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* 
          LEFT / TABLE: Mandi rates near you
        */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Mandi rates near you
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Sample snapshot · 15 Oct 2026, 10:30 AM IST
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">CROP / VARIETY</th>
                  <th className="pb-3 font-semibold">MANDI</th>
                  <th className="pb-3 font-semibold text-right">MODAL PRICE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRates.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedCrop(`${row.crop} · ${row.variety}`)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 pr-2">
                      <div className="font-bold text-gray-900 group-hover:text-[#15803D]">
                        {row.crop}
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.variety}
                      </div>
                    </td>
                    <td className="py-3.5 text-xs text-gray-600 font-medium">
                      {row.mandi}
                    </td>
                    <td className="py-3.5 text-right pl-2">
                      <div className="font-extrabold text-gray-950">
                        {row.price}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {row.range}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-xs text-gray-400 text-left border-t border-gray-100">
            Showing {filteredRates.length} of {mandiRates.length} sample quotes
          </div>
        </div>

        {/* 
          RIGHT / CARD: CROP SPOTLIGHT
        */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
              CROP SPOTLIGHT
            </span>
            <button
              type="button"
              className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              title="Bookmark crop"
            >
              <Star className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Location */}
          <div>
            <h3 className="text-xl font-extrabold text-gray-950">
              {selectedCrop}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Thanjavur mandi · INR / quintal
            </p>
          </div>

          {/* Price & Day trend */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-gray-950 tracking-tight">
              ₹2,450
            </span>
            <span className="px-2.5 py-1 text-xs font-bold text-[#166534] bg-[#DCFCE7] rounded-md flex items-center gap-1">
              ↗ 2.1% today
            </span>
          </div>

          {/* 7-Day Trend Chart matching Desktop - 19 */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>7-day price trend</span>
              <span className="text-gray-400">9–15 Oct</span>
            </div>

            {/* Custom SVG Coordinate Line Graph */}
            <div className="h-32 w-full pt-2">
              <svg className="w-full h-full" viewBox="0 0 280 100" fill="none">
                {/* Horizontal gridlines */}
                <line x1="40" y1="15" x2="270" y2="15" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                <text x="5" y="18" fill="#9CA3AF" fontSize="10">2,500</text>

                <line x1="40" y1="50" x2="270" y2="50" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                <text x="5" y="53" fill="#9CA3AF" fontSize="10">2,400</text>

                <line x1="40" y1="85" x2="270" y2="85" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                <text x="5" y="88" fill="#9CA3AF" fontSize="10">2,300</text>

                {/* Trend line */}
                <path
                  d="M 60 80 L 110 74 L 160 52 L 210 40 L 260 22"
                  stroke="#15803D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Latest point dot */}
                <circle cx="260" cy="22" r="4.5" fill="#15803D" />
                <circle cx="260" cy="22" r="2" fill="#FFFFFF" />

                {/* Date markers */}
                <text x="50" y="98" fill="#9CA3AF" fontSize="9">9 Oct</text>
                <text x="150" y="98" fill="#9CA3AF" fontSize="9">12 Oct</text>
                <text x="245" y="98" fill="#9CA3AF" fontSize="9">15 Oct</text>
              </svg>
            </div>
          </div>

          {/* Green Callout Banner */}
          <div className="bg-[#15803D] text-white text-xs font-semibold px-4 py-2.5 rounded-xl text-center">
            Up ₹120 (+5.2%) over 7 days in this sample.
          </div>

          {/* Action Button: Set Price Alert */}
          <button
            type="button"
            onClick={() => setAlertSet(true)}
            className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-800 font-semibold text-xs md:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Bell className="w-4 h-4 text-gray-600" />
            <span>{alertSet ? 'Price Alert Active (SMS / Voice)' : 'Set Price Alert'}</span>
          </button>

          {alertSet && (
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>We will notify you on WhatsApp/SMS when {selectedCrop} prices exceed ₹2,500.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
