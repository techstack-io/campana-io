"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Fugaz_One } from "next/font/google";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function CampanaNavigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="relative bg-[#313438] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-[#444445]">
        <div className="flex h-20 items-center justify-between">
          {/* Fugaz text instead of logo */}
          <div className="flex items-center">
            <span
              className={`${fugaz.className} text-4xl text-[#09A7E8] tracking-tight select-none`}
            >
              Campana
            </span>
          </div>

          {/* Desktop nav */}
          {mounted && (
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center border-b-2 border-[#4f5359] px-1 pt-1 text-sm font-medium text-[#09A7E8]"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100 transition-colors"
              >
                Learning
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100 transition-colors"
              >
                Certifications
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100 transition-colors"
              >
                Progress
              </Link>
            </div>
          )}

          {/* Right controls with Clerk */}
          {mounted && (
            <div className="flex items-center gap-3">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-9 rounded-md border border-white/30 px-3 text-sm font-medium text-gray-100 hover:bg-white/10">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="h-9 rounded-md bg-[#F9FF00] px-3 text-sm font-medium text-[#10257E] hover:opacity-90">
                    Create Account
                  </button>
                </SignUpButton>
              </SignedOut>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="rounded-md p-2 text-gray-200 hover:bg-white/10 sm:hidden"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mounted && mobileMenuOpen && (
        <div className="border-t border-white/20 sm:hidden">
          <div className="space-y-1 pt-2 pb-4">
            <Link
              href="/dashboard/"
              className="block border-l-4 border-green-600 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500"
            >
              Learning
            </Link>
            <Link
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500"
            >
              Certifications
            </Link>
            <Link
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500"
            >
              Progress
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
