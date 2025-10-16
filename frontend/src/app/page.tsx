"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ---- minimal auth stubs ---- */
function useSignedInFlag() {
  const [flag, setFlag] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("signedin");
      setFlag(q === "1");
    } catch {
      setFlag(false);
    }
  }, []);
  return flag ?? false;
}
const SignedIn: React.FC<React.PropsWithChildren> = ({ children }) => (useSignedInFlag() ? <>{children}</> : null);
const SignedOut: React.FC<React.PropsWithChildren> = ({ children }) => (!useSignedInFlag() ? <>{children}</> : null);
const SignInButton: React.FC<React.PropsWithChildren<{ mode?: "modal" | "redirect" }>> = ({ children }) => (
  <a href="/sign-in" className="inline-block">{children ?? <button className="h-9 rounded-md border px-3 text-sm font-medium">Sign In</button>}</a>
);
const SignUpButton: React.FC<React.PropsWithChildren<{ mode?: "modal" | "redirect" }>> = ({ children }) => (
  <a href="/sign-up" className="inline-block">{children ?? <button className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-white">Create Account</button>}</a>
);

/* ---- helpers ---- */
function nextIndex(current: number, len: number): number {
  if (!Number.isInteger(current) || current < 0) return 0;
  if (!Number.isInteger(len) || len <= 0) return 0;
  return (current + 1) % len;
}

/* ---- hero image ---- */
function HeroImage() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => setVisible(true), []);
  return (
    <div
      className={[
        "md:col-span-6 flex justify-center order-2 md:order-2",
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
    >
      <img
        src="/knowledgebase.jpeg"
        alt="Campana dashboard illustration"
        className="w-full max-w-md sm:max-w-lg md:max-w-none h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

/* ---- page ---- */
export default function HomePage() {
  const phrases = useMemo(() => ["AI Content", "Blog Writing", "Technical Writing"], []);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => nextIndex(i, phrases.length)), 2000);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="relative w-full pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#191b1d]" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-4 gap-8 sm:gap-10 lg:gap-16">
            {/* Left: Text */}
            <div className="md:col-span-6 order-1 md:order-1">
              <div className="md:text-left text-center">
                <h1 className="font-bold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-5xl mb-5 text-[#EAE4DF] dark:text-white">
                  Activate Content
                  <br />
                  <span className="italic text-[#09A7E7] tracking-normal font-light lg:text-5xl">Accelerate Decisions</span>
                </h1>
                <p className="text-base sm:text-lg max-w-2xl md:mx-0 mx-auto text-slate-400">
                  Campana is your B2B learning and sales intelligence hub. Build buyer knowledge, score intent, and
                  activate content that moves technical buyers toward purchase.
                </p>

                <div className="mt-6 mb-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button className="h-12 px-6 rounded-md bg-primary text-white font-semibold border border-primary hover:bg-primary/90 w-full sm:w-auto">
                        Get Started Free
                      </button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <button className="h-12 px-6 rounded-md border border-slate-300 dark:border-slate-700 text-[#09A7E7] dark:text-white font-semibold w-full sm:w-auto">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <a
                      href="/dashboard"
                      className="h-12 px-6 inline-flex items-center justify-center rounded-md bg-primary text-white font-semibold border border-primary hover:bg-primary/90 w-full sm:w-auto"
                    >
                      Go to Dashboard
                    </a>
                  </SignedIn>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <HeroImage />
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { title: "Buyer Knowledge Graph", desc: "Map content to buyer tasks using proven consumer-behavior models." },
            { title: "Sales Intelligence", desc: "Rank firms by intent using visit signals and product interest." },
            { title: "Secure & Multi-tenant", desc: "Postgres with RLS, pgvector, and audited control-plane metrics." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-[0.95rem]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 sm:py-10 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Campana. All rights reserved.
      </footer>
    </main>
  );
}
