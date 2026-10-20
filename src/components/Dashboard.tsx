import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  Mic,
  Search,
  MapPin,
  LogOut,
  Settings as SettingsIcon,
  User as UserIcon,
  ArrowRight,
  Sprout,
} from 'lucide-react';
import { AgriLogo } from './AgriLogo.tsx';
import { RoleAndAssistantPage } from './RoleAndAssistantPage.tsx';
import { RegionConfigurationPage } from './RegionConfigurationPage.tsx';
import { FarmLocationSoilProfilePage } from './FarmLocationSoilProfilePage.tsx';
import { RealTimeMarketPricesPage } from './RealTimeMarketPricesPage.tsx';

interface DashboardProps {
  onLogout: () => void;
  user: {
    name: string;
    emailOrPhone: string;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, user }) => {
  // Navigation active tab:
  // Starts on 'Accessibility' (Desktop - 15)
  // Step 2: 'RegionConfiguration' (Desktop - 17)
  // Step 3: 'RoleAndAssistant' (Desktop - 16)
  // Sidebar: 'CropData' (Desktop - 18), 'CropMarket' (Desktop - 19), etc.
  const [activeTab, setActiveTab] = useState<string>('Accessibility');

  // Accessibility Studio controls
  const [voiceGuideLevel, setVoiceGuideLevel] = useState<number>(3); // 1 to 5
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState<boolean>(true);
  const [textSizeLevel, setTextSizeLevel] = useState<number>(3); // 1 to 5
  const [hiContrastEnabled, setHiContrastEnabled] = useState<boolean>(true);

  // Audio simulation state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeVoicePrompt, setActiveVoicePrompt] = useState<string>(
    "Voice First Active. Speak to ask: What are today's rice prices in Mysore mandi?"
  );
  const [isListening, setIsListening] = useState<boolean>(false);

  // Advice speech synthesis
  const adviceText =
    'Water early morning. Apply organic compost tomorrow to maximize leaf vigor and prevent early blight.';

  const handleListenAdvice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(adviceText);
      utterance.rate = 0.9 + voiceGuideLevel * 0.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleMicSpeak = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setActiveVoicePrompt(
        "Rice Sona Masoori in Mysore APMC mandi today: ₹2,850/quintal (Steady, arrival: 450 tonnes)."
      );
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(
          "Rice Sona Masoori in Mysore APMC mandi today is 2,850 rupees per quintal."
        );
        utt.rate = 0.95;
        window.speechSynthesis.speak(utt);
      }
    }, 1800);
  };

  // Font size multiplier based on Large Text control
  const textSizeScaleClass =
    textSizeLevel === 1
      ? 'text-xs'
      : textSizeLevel === 2
      ? 'text-sm'
      : textSizeLevel === 3
      ? 'text-base'
      : textSizeLevel === 4
      ? 'text-lg'
      : 'text-xl';

  const headingSizeClass =
    textSizeLevel === 1
      ? 'text-lg'
      : textSizeLevel === 2
      ? 'text-xl'
      : textSizeLevel === 3
      ? 'text-2xl'
      : textSizeLevel === 4
      ? 'text-3xl'
      : 'text-4xl';

  // Navigation items matching screenshot
  const navItems = [
    {
      id: 'Home',
      label: 'Home',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#8B3A2B]/10 flex items-center justify-center text-lg shrink-0">
          🏡
        </span>
      ),
    },
    {
      id: 'Crop Market',
      label: 'Crop Market',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#D97706]/10 flex items-center justify-center text-lg shrink-0">
          🛍️
        </span>
      ),
    },
    {
      id: 'Government schemes',
      label: 'Government schemes',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#10B981]/10 flex items-center justify-center text-lg shrink-0">
          📑
        </span>
      ),
    },
    {
      id: 'Ai Assistant',
      label: 'Ai Assistant',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#84CC16]/20 flex items-center justify-center text-lg shrink-0">
          💬
        </span>
      ),
    },
    {
      id: 'Soil Health',
      label: 'Soil Health',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#B45309]/15 flex items-center justify-center text-lg shrink-0">
          🌰
        </span>
      ),
    },
    {
      id: 'Scan Crop',
      label: 'Scan Crop',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#374151]/15 flex items-center justify-center text-lg shrink-0">
          📷
        </span>
      ),
    },
    {
      id: 'Weather',
      label: 'Weather',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#38BDF8]/20 flex items-center justify-center text-lg shrink-0">
          ⛅
        </span>
      ),
    },
    {
      id: 'Crop Data',
      label: 'Crop Data',
      icon: (
        <span className="w-8 h-8 rounded-md bg-[#059669]/15 flex items-center justify-center text-lg shrink-0">
          📊
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F3F4F6] text-gray-900 font-sans selection:bg-[#1E4E2B]/20 selection:text-[#1E4E2B]">
      {/* 
        Top Header Bar
        Faithful to screenshots:
        - Warm Yellowish background `#F8E398`
        - Left: AgriConnect logo
        - Middle-Right: Search bar pill, location marker "Mysore, India", User profile lockup "Ramesh Farmer / Karnataka, IN"
      */}
      <header className="w-full bg-[#f8e398] px-4 md:px-8 py-2.5 flex items-center justify-between border-b border-[#2d3a22]/10 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <AgriLogo size="md" />
        </div>

        {/* Right Header Zone */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Bar Pill */}
          <div className="hidden sm:flex items-center bg-white rounded-full px-4 py-1.5 shadow-sm border border-black/5 w-64 md:w-80">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search crops, market rates, schemes..."
              className="bg-transparent border-none text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none w-full"
            />
          </div>

          {/* Location Marker */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <MapPin className="w-4 h-4 text-[#165b2d]" />
            <span>Mysore, India</span>
          </div>

          {/* User Profile Lockup */}
          <div className="flex items-center gap-2.5 bg-white/40 hover:bg-white/70 px-2.5 py-1 rounded-full transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm overflow-hidden">
              <span className="text-xl">👨‍🌾</span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight">
                {user.name || 'Ramesh Farmer'}
              </div>
              <div className="text-[11px] font-semibold text-[#1e5d2a] leading-tight">
                Karnataka, IN
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Left Sidebar + Central Work Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 
          Left Sidebar
          - Deep forest green `#1E4E2B`
          - White card buttons for navigation
          - Bottom: Profile, Settings, Logout
        */}
        <aside className="w-full md:w-64 bg-[#1E4E2B] p-4 flex flex-col justify-between shrink-0 shadow-lg md:min-h-[calc(100vh-62px)]">
          {/* Navigation Items */}
          <div className="space-y-2.5">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'Home' && (activeTab === 'Home' || activeTab === 'RoleAndAssistant')) ||
                (item.id === 'Crop Market' && activeTab === 'Crop Market') ||
                (item.id === 'Crop Data' && activeTab === 'Crop Data') ||
                (item.id === 'Soil Health' && activeTab === 'Soil Health') ||
                (item.id === 'Ai Assistant' && activeTab === 'Ai Assistant') ||
                activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'Crop Market') {
                      setActiveTab('Crop Market');
                    } else if (item.id === 'Crop Data' || item.id === 'Soil Health') {
                      setActiveTab('Crop Data');
                    } else if (item.id === 'Home' || item.id === 'Ai Assistant') {
                      setActiveTab('RoleAndAssistant');
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-sm font-bold transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-white text-gray-950 ring-2 ring-white/80 translate-x-1'
                      : 'bg-white hover:bg-gray-50 text-gray-900 hover:translate-x-0.5'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Action Items */}
          <div className="pt-6 mt-4 border-t border-white/10 space-y-1.5 text-white/90 text-sm font-medium">
            <button
              onClick={() => setActiveTab('Profile')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-left cursor-pointer ${
                activeTab === 'Profile' ? 'bg-white/20 text-white font-bold' : ''
              }`}
            >
              <UserIcon className="w-4 h-4 text-white/80" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('Accessibility')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-left cursor-pointer ${
                activeTab === 'Accessibility' ? 'bg-white/25 text-white font-bold' : ''
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-white" />
              <span className="font-bold">Settings</span>
            </button>

            <button
              onClick={onLogout}
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-red-500/20 text-red-200 hover:text-white transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* 
          Central Content Canvas
          Renders dynamically according to active flow / sidebar click:
          1. Accessibility Studio (Desktop - 15)
          2. Region & Main Crops Configuration (Desktop - 17)
          3. Role & Interaction Mode + AI Assistant (Desktop - 16)
          4. Farm Location & Soil Profile (Desktop - 18) [Clicking Crop Data in sidebar]
          5. Real-Time Market Prices (Desktop - 19) [Clicking Crop Market in sidebar]
        */}
        <main className="flex-1 bg-white p-6 md:p-10 overflow-y-auto">
          {/* View 1: Region & Main Crops Configuration (Desktop - 17) */}
          {activeTab === 'RegionConfiguration' ? (
            <RegionConfigurationPage
              onContinue={() => setActiveTab('RoleAndAssistant')}
            />
          ) : /* View 2: Your Role & Interaction Mode + AI Assistant (Desktop - 16) */
          activeTab === 'RoleAndAssistant' ? (
            <RoleAndAssistantPage
              userName={user.name}
              onGoToSettings={() => setActiveTab('Accessibility')}
              onNavigateToCropMarket={() => setActiveTab('Crop Market')}
              onNavigateToCropData={() => setActiveTab('Crop Data')}
            />
          ) : /* View 3: Farm Location & Soil Profile (Desktop - 18) */
          activeTab === 'Crop Data' ? (
            <FarmLocationSoilProfilePage />
          ) : /* View 4: Real-Time Market Prices (Desktop - 19) */
          activeTab === 'Crop Market' ? (
            <RealTimeMarketPricesPage />
          ) : /* View 5: Accessibility Studio (Desktop - 15) */
          activeTab === 'Accessibility' ? (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
              {/* Header Title & Subtitle */}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
                  Accessibility Studio
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
                  Customize the app&apos;s visual, audio, and motor controls. Adjust controls and check live preview below.
                </p>
              </div>

              {/* Main 2-Column Split: Controls on Left, Live Previews on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* 
                  LEFT COLUMN: Accessibility Controls (HEAR and SEE cards)
                */}
                <div className="lg:col-span-5 space-y-6">
                  {/* HEAR Control Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 text-[#165b2d] font-bold text-base tracking-wide">
                      <Volume2 className="w-6 h-6 stroke-[2.5]" />
                      <span>HEAR</span>
                    </div>

                    {/* Setting 1: Voice Guide with [ + ] [ - ] */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Voice Guide
                      </span>
                      <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setVoiceGuideLevel((prev) => Math.min(prev + 1, 5))}
                          className="px-3 py-1 font-bold text-gray-800 hover:bg-white rounded-md transition-colors cursor-pointer text-sm"
                          aria-label="Increase voice guide volume/speed"
                        >
                          +
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-600">
                          {voiceGuideLevel}
                        </span>
                        <button
                          type="button"
                          onClick={() => setVoiceGuideLevel((prev) => Math.max(prev - 1, 1))}
                          className="px-3 py-1 font-bold text-gray-800 hover:bg-white rounded-md transition-colors cursor-pointer text-sm"
                          aria-label="Decrease voice guide volume/speed"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    {/* Setting 2: Voice Cmds toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Voice Cmds
                      </span>
                      <button
                        type="button"
                        onClick={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer p-0.5 ${
                          voiceCommandsEnabled ? 'bg-[#1e5d2a]' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={voiceCommandsEnabled}
                      >
                        <span
                          className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            voiceCommandsEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* SEE Control Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 text-[#165b2d] font-bold text-base tracking-wide">
                      <Eye className="w-6 h-6 stroke-[2.5]" />
                      <span>SEE</span>
                    </div>

                    {/* Setting 1: Large Text with [ + ] [ - ] */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Large Text
                      </span>
                      <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setTextSizeLevel((prev) => Math.min(prev + 1, 5))}
                          className="px-3 py-1 font-bold text-gray-800 hover:bg-white rounded-md transition-colors cursor-pointer text-sm"
                          aria-label="Increase text size"
                        >
                          +
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-600">
                          {textSizeLevel}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTextSizeLevel((prev) => Math.max(prev - 1, 1))}
                          className="px-3 py-1 font-bold text-gray-800 hover:bg-white rounded-md transition-colors cursor-pointer text-sm"
                          aria-label="Decrease text size"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    {/* Setting 2: Hi-Contrast toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Hi-Contrast
                      </span>
                      <button
                        type="button"
                        onClick={() => setHiContrastEnabled(!hiContrastEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer p-0.5 ${
                          hiContrastEnabled ? 'bg-[#1e5d2a]' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={hiContrastEnabled}
                      >
                        <span
                          className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            hiContrastEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 
                  RIGHT COLUMN: Live Previews matching screenshot
                */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Top Live Preview Box */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      LIVE PREVIEW ({textSizeLevel >= 3 ? 'LARGE TEXT ACTIVE' : 'STANDARD TEXT'})
                    </div>

                    <div
                      className={`rounded-2xl p-6 md:p-7 transition-all ${
                        hiContrastEnabled
                          ? 'border-2 border-[#1E4E2B] bg-white shadow-md'
                          : 'border border-gray-200 bg-white shadow-sm'
                      }`}
                    >
                      {/* Crop Title & Health Badge */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h2 className={`${headingSizeClass} font-bold text-gray-900`}>
                          Tomato
                        </h2>
                        <span className="px-3 py-1 text-xs font-semibold rounded-md bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                          Health Score: 85% Good
                        </span>
                      </div>

                      {/* Health Progress Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-2">
                        <div
                          className="bg-gradient-to-r from-[#22c55e] to-[#86efac] h-full rounded-full transition-all duration-300"
                          style={{ width: '85%' }}
                        />
                      </div>

                      {/* Sub-status */}
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-5">
                        <span>Optimal Health</span>
                        <span>·</span>
                        <span>Low Risk</span>
                      </div>

                      {/* Advice Text Section */}
                      <div className="mb-6">
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          Advice:
                        </div>
                        <p
                          className={`${textSizeScaleClass} ${
                            hiContrastEnabled ? 'text-gray-950 font-medium' : 'text-gray-700'
                          } leading-relaxed`}
                        >
                          {adviceText}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleListenAdvice}
                          className={`px-5 py-2.5 rounded-md text-sm font-bold text-white transition-all flex items-center gap-2 cursor-pointer ${
                            isSpeaking
                              ? 'bg-amber-600 animate-pulse'
                              : 'bg-[#1E4E2B] hover:bg-[#163c21]'
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{isSpeaking ? 'Playing...' : 'Listen Advice'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHiContrastEnabled(!hiContrastEnabled)}
                          className="px-4 py-2.5 rounded-md text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Contrast: {hiContrastEnabled ? 'OK' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 
                    Bottom Box: FARMER VOICE DASHBOARD PREVIEW
                  */}
                  <div className="rounded-2xl border-2 border-[#1E4E2B] bg-white p-5 md:p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#1E4E2B] tracking-wide">
                        <Mic className="w-4 h-4 text-[#1E4E2B]" />
                        <span className="uppercase">FARMER VOICE DASHBOARD PREVIEW</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-[#DCFCE7] text-[#166534] rounded-md">
                        Active Profile
                      </span>
                    </div>

                    {/* Dark Green Voice Prompt Box */}
                    <div className="bg-[#276e3d] text-white rounded-xl p-4 md:p-5 flex items-start gap-3.5 shadow-inner">
                      <button
                        type="button"
                        onClick={handleMicSpeak}
                        className={`w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                          isListening ? 'ring-2 ring-white animate-spin' : ''
                        }`}
                        title="Click to speak command"
                        aria-label="Click to speak command"
                      >
                        <Volume2 className="w-5 h-5 text-white" />
                      </button>
                      <div className="text-sm md:text-base font-medium leading-relaxed">
                        &ldquo;{isListening ? 'Listening to your voice command...' : activeVoicePrompt}&rdquo;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 
                "after accesibilty studio add this" (Desktop - 17)
                Clicking Get Started takes user directly to Region & Main Crops Configuration!
              */}
              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Step 1 of 3 · Next: Region & Main Crops Configuration
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('RegionConfiguration')}
                  className="px-8 py-3.5 bg-[#1E4E2B] hover:bg-[#163c21] active:bg-[#0f2a17] text-white font-bold text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer flex items-center gap-2.5 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            /* Fallback Content for remaining sidebar tabs */
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{activeTab}</h1>
                  <p className="text-sm text-gray-500">
                    Live updates for {user.name || 'Ramesh Farmer'}&apos;s farm in Mysore, Karnataka.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('Crop Market')}
                  className="px-4 py-2 bg-[#1E4E2B] text-white text-xs font-bold rounded-lg hover:bg-[#163c21] transition-colors"
                >
                  View Real-Time Market Prices
                </button>
              </div>

              {activeTab === 'Weather' && (
                <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">⛅</span>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">28°C · Partly Sunny</div>
                      <div className="text-xs text-gray-600">Mysore Agronomy Weather Station · Humidity: 62%</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Favorable weather for morning spray and fertilizer application. Light rain expected in 48 hours.
                  </p>
                </div>
              )}

              {activeTab !== 'Weather' && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-[#1E4E2B]/10 text-[#1E4E2B] rounded-full flex items-center justify-center mx-auto">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{activeTab}</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Access your agricultural records, check mandi prices in Crop Market, or update your farm coordinates in Crop Data.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('Crop Data')}
                      className="px-4 py-2 bg-[#1E4E2B] text-white text-xs font-semibold rounded-lg hover:bg-[#163c21]"
                    >
                      Open Crop Data & Soil Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('Crop Market')}
                      className="px-4 py-2 bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg hover:bg-gray-200 border border-gray-300"
                    >
                      Open Real-Time Market Prices
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
