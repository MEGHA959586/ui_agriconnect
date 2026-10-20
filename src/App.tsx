/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgriLogo } from './components/AgriLogo.tsx';
import { BackgroundContours } from './components/BackgroundContours.tsx';
import { SocialButtons } from './components/SocialButtons.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [identifier, setIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<{
    name: string;
    emailOrPhone: string;
  } | null>(null);

  // Quick Demo Auto-fill for easy testing
  const handleAutoFill = () => {
    setIdentifier('ramesh.farmer@agriconnect.in');
    setPassword('Harvest2026!');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (mode === 'register') {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    // Simulate login and navigate straight to the Accessibility Studio Dashboard
    setTimeout(() => {
      setIsLoading(false);
      const name = fullName.trim() || 'Ramesh Farmer';
      setLoggedInUser({
        name,
        emailOrPhone: identifier,
      });
    }, 600);
  };

  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setLoggedInUser({
        name: 'Ramesh Farmer',
        emailOrPhone: provider === 'google' ? 'ramesh@gmail.com' : 'ramesh@facebook.com',
      });
    }, 600);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setPassword('');
    setConfirmPassword('');
  };

  // If logged in, display the Accessibility Studio Dashboard page
  if (loggedInUser) {
    return <Dashboard onLogout={handleLogout} user={loggedInUser} />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden selection:bg-[#0b8017]/20 selection:text-[#0b8017]">
      {/* 
        Top Navigation Bar
        Faithful to the screenshot: warm wheat-maize background with AgriConnect logo & wordmark
      */}
      <header className="relative z-10 w-full bg-[#f8e398] px-6 md:px-10 py-3.5 md:py-4 flex items-center justify-between border-b border-[#2d3a22]/10 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <AgriLogo size="md" />

        {/* Demo Fast-fill / Status Helper */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAutoFill}
            type="button"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#165b2d]/10 hover:bg-[#165b2d]/20 text-[#165b2d] border border-[#165b2d]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Click to quickly fill sample credentials"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demo Fill</span>
          </button>
        </div>
      </header>

      {/* Main Body with Organic Topographic Farmland Background */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        {/* Layered Organic Contours */}
        <BackgroundContours />

        {/* Centered Content Container */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Header Title matching screenshot: "Login to your account" */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight text-center mb-6">
            {mode === 'signin' ? 'Login to your account' : 'Create your account'}
          </h1>

          {/* White Auth Card matching screenshot */}
          <div className="w-full bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)] border border-gray-100/80 p-7 md:p-9 transition-all">
            {/* 
              Top Segment Action Pills
              In the screenshot:
              "Create Account" (Black pill) & "Sign In" (Rich green pill)
            */}
            <div className="flex items-center justify-center gap-3 mb-7">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-black text-white shadow-md ring-2 ring-black/20 scale-[1.02]'
                    : 'bg-black text-white hover:bg-neutral-800 opacity-90'
                }`}
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-[#0b8017] text-white shadow-md ring-2 ring-[#0b8017]/30 scale-[1.02]'
                    : 'bg-[#0b8017] text-white hover:bg-[#0a7315] opacity-90'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Validation Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* The Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Additional field for Register mode */}
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ramesh Farmer"
                    disabled={isLoading}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8017]/30 focus:border-[#0b8017] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] transition-all"
                  />
                </div>
              )}

              {/* Mail or phone number Field (as labeled in screenshot) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  mail or phone number
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder=""
                  disabled={isLoading}
                  autoComplete="username"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8017]/30 focus:border-[#0b8017] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] transition-all"
                />
              </div>

              {/* Password Field (as labeled in screenshot) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions will be sent to your registered mail or phone.')}
                      className="text-xs text-gray-500 hover:text-[#0b8017] transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    disabled={isLoading}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8017]/30 focus:border-[#0b8017] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password for Register mode */}
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    confirm password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    disabled={isLoading}
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8017]/30 focus:border-[#0b8017] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] transition-all"
                  />
                </div>
              )}

              {/* 
                Login Button
                Screenshot: Green button with centered text "login" (all lowercase)
              */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#0b8017] hover:bg-[#096d14] active:bg-[#075910] text-white font-semibold text-sm rounded-md shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>{mode === 'signin' ? 'login' : 'register'}</span>
                  )}
                </button>
              </div>
            </form>

            {/* Social Login Section: "continue with" + Google & Facebook */}
            <div className="mt-6 text-center">
              <p className="text-xs font-medium text-gray-700 mb-3.5">
                continue with
              </p>
              <SocialButtons onSelect={handleSocialAuth} isLoading={isLoading} />
            </div>
          </div>

          {/* 
            Bottom Text below the card
            Screenshot: "donot have an account? do register"
          */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'register' : 'signin');
                setErrorMessage('');
              }}
              className="text-xs md:text-sm font-semibold text-gray-900 hover:text-[#0b8017] hover:underline cursor-pointer transition-colors"
            >
              {mode === 'signin'
                ? 'donot have an account? do register'
                : 'already have an account? sign in'}
            </button>
          </div>
        </div>
      </main>

      {/* Subtle footer */}
      <footer className="relative z-10 py-3 text-center text-xs text-gray-600/80">
        AgriConnect &copy; {new Date().getFullYear()} · 
      </footer>
    </div>
  );
}
