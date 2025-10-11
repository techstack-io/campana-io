"use client"

import React, { useState, useEffect } from 'react';

export default function CampanaNavigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="relative bg-[#005112] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo - Static, no hydration issues */}
          <div className="flex items-center">
            <img 
              src="/logo@72x.svg" 
              alt="Campana Logo" 
              className="h-24 w-auto p-2"
            />
          </div>

          {/* Desktop Navigation - Only render after mount */}
          {mounted && (
            <div className="hidden sm:flex sm:space-x-8">
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-green-600 px-1 pt-1 text-sm font-medium text-[#F9FF00]"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-700 transition-colors"
              >
                Learning
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-700 transition-colors"
              >
                Certifications
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-700 transition-colors"
              >
                Progress
              </a>
            </div>
          )}

          {/* Right side - Only render after mount */}
          {mounted && (
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                type="button"
                className="rounded-full p-1 text-gray-400 hover:text-green-600 transition-colors"
                title="Notifications"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {profileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                        Your Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                        Learning History
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                        Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                        Sign Out
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu - Only render after mount */}
      {mounted && mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="space-y-1 pt-2 pb-4">
            <a
              href="#"
              className="block border-l-4 border-green-600 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-400"
            >
              Learning
            </a>
            <a
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-400"
            >
              Certifications
            </a>
            <a
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-400"
            >
              Progress
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}