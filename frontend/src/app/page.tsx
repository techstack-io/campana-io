"use client";

import React, { useEffect, useMemo, useState } from "react";

/***************************
 * Minimal auth stubs for sandbox preview
 ***************************/
function useSignedInFlag() {
  const [flag, setFlag] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("signedin");
      if (q === "1") setFlag(true);
      else if (q === "0") setFlag(false);
      else setFlag(false);
    } catch {
      setFlag(false);
    }
  }, []);
  return flag ?? false;
}

const SignedIn: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isSignedIn = useSignedInFlag();
  return isSignedIn ? <>{children}</> : null;
};

const SignedOut: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isSignedIn = useSignedInFlag();
  return !isSignedIn ? <>{children}</> : null;
};

const SignInButton: React.FC<React.PropsWithChildren<{ mode?: "modal" | "redirect" }>> = ({ children }) => (
  <a href="/sign-in" className="inline-block">
    {children ?? <button className="h-9 rounded-md border px-3 text-sm font-medium">Sign In</button>}
  </a>
);

const SignUpButton: React.FC<React.PropsWithChildren<{ mode?: "modal" | "redirect" }>> = ({ children }) => (
  <a href="/sign-up" className="inline-block">
    {children ?? (
      <button className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-white">Create Account</button>
    )}
  </a>
);

/***************************
 * Helper
 ***************************/
function nextIndex(current: number, len: number): number {
  if (!Number.isInteger(current) || current < 0) return 0;
  if (!Number.isInteger(len) || len <= 0) return 0;
  return (current + 1) % len;
}


/***************************
 * Hero Image Component
 ***************************/
function HeroImage() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => setVisible(true), []);

  return (
    <div
      className={[
        "lg:col-span-6 flex justify-center",
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
    >
      <img
        src="/knowledgebase.jpeg"
        alt="Campana dashboard illustration"
        className="max-w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

/***************************
 * Page Component
 ***************************/
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
      <section className="relative w-full lg:py-36 md:py-28 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#313438]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center mt-6 gap-12 lg:gap-16">
            {/* Left: Text */}
            <div className="lg:col-span-6">
              <div className="lg:me-6 lg:text-left text-center">
                <h1 className="font-bold leading-tight text-4xl lg:text-5xl mb-5 text-[#EAE4DF] dark:text-white">
                  Activate Content
                  <br />
                  <span className="italic text-[#09A7E7] tracking-normal">Accelerate Decisions</span>
                </h1>
                <p className="text-lg max-w-xl lg:ms-0 mx-auto text-slate-400">
                  Campana is your B2B learning and sales intelligence hub. Build buyer knowledge, score intent, and
                  activate content that moves technical buyers toward purchase.
                </p>

                <div className="mt-6 mb-3 flex justify-center lg:justify-start gap-3">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button className="h-12 px-6 rounded-md bg-primary text-white font-semibold border border-primary hover:bg-primary/90">
                        Get Started Free
                      </button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <button className="h-12 px-6 rounded-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <a
                      href="/dashboard"
                      className="h-12 px-6 inline-flex items-center justify-center rounded-md bg-primary text-white font-semibold border border-primary hover:bg-primary/90"
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
      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Buyer Knowledge Graph",
              desc: "Map content to buyer tasks using proven consumer-behavior models.",
            },
            {
              title: "Sales Intelligence",
              desc: "Rank firms by intent using visit signals and product interest.",
            },
            {
              title: "Secure & Multi-tenant",
              desc: "Postgres with RLS, pgvector, and audited control-plane metrics.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Campana. All rights reserved.
      </footer>
    </main>
  );
}
