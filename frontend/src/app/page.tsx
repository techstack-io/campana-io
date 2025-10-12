"use client";

import React, { useState, useMemo } from "react";

export default function CampanaLMSHome() {
  const [view, setView] = useState<"welcome" | "list" | "pinout">("welcome");
  const [selectedPinout, setSelectedPinout] = useState<any>(null);
  const [q, setQ] = useState("");

  // All available pinouts
  const pinouts = [
    {
      id: "xlr-3pin",
      name: "3-Pin XLR (Standard Audio)",
      category: "Audio",
      imageUrl: "/diagrams/xlr-3pin.png",
      data: {
        name: "3-Pin XLR",
        description: "Industry standard for balanced audio signals",
        pins: [
          { num: 1, signal: "Signal Ground", color: "Shield" },
          { num: 2, signal: "Hot/Positive (+)", color: "Red/White" },
          { num: 3, signal: "Cold/Negative (-)", color: "Black/Blue" }
        ],
        applications: ["Microphones", "Professional audio equipment", "Speakers"],
        notes: "For passive speakers (which require an external amplifier), you must use a heavy-gauge speaker cable, not an XLR microphone cable. XLR is designed for low-voltage, high-impedance signals, while speaker cables handle high-current, low-impedance speaker-level signals."
      }
    },
    {
      id: "xlr-4pin-sony",
      name: "4-Pin XLR (Sony DC Power)",
      category: "Power",
      imageUrl: "/diagrams/xlr-4pin-sony-dc.png",
      data: {
        name: "Sony 4-Pin XLR DC Power",
        description: "DC power connector for Sony cameras",
        pins: [
          { num: 1, signal: "Negative (-)", color: "Black" },
          { num: 2, signal: "No Connection", color: "None" },
          { num: 3, signal: "No Connection", color: "None" },
          { num: 4, signal: "Positive (+)", color: "Red" }
        ],
        applications: ["Sony cameras", "Broadcast video equipment"],
        notes: "⚠️ WARNING: Verify pinout before connecting. Equipment damage possible."
      }
    },
    {
      id: "xlr-4pin-intercom",
      name: "4-Pin XLR (Intercom/Broadcast)",
      category: "Audio",
      imageUrl: "/diagrams/xlr-4pin-intercom.png",
      data: {
        name: "4-Pin XLR Intercom",
        description: "Stereo audio for intercom headsets",
        pins: [
          { num: 1, signal: "Left (+) Signal", color: "Red" },
          { num: 2, signal: "Left (-) Ground", color: "Green" },
          { num: 3, signal: "Right (+) Signal", color: "Red" },
          { num: 4, signal: "Right (-) Ground", color: "Green" }
        ],
        applications: ["Intercom headsets", "Broadcast equipment"],
        notes: null
      }
    },
    {
      id: "xlr-6pin-clearcom",
      name: "6-Pin XLR (Clearcom)",
      category: "Audio",
      imageUrl: "/diagrams/xlr-6pin-clearcom.png",
      data: {
        name: "6-Pin XLR / Clearcom®",
        description: "Dual-cable intercom system",
        pins: [
          { num: 1, signal: "Cable 1: Black (-)", color: "Black" },
          { num: 2, signal: "Cable 1: Red (+)", color: "Red" },
          { num: 3, signal: "Cable 1: Ground", color: "Green" },
          { num: 4, signal: "Cable 2: Black (-)", color: "Black" },
          { num: 5, signal: "Cable 2: Red (+)", color: "Red" },
          { num: 6, signal: "Cable 2: Ground", color: "Green" }
        ],
        applications: ["Professional intercom", "Theater communication", "Broadcast"],
        notes: null
      }
    }
  ];

  // Client search
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return pinouts;
    return pinouts.filter(p =>
      [p.name, p.category, p.data.description].join(" ").toLowerCase().includes(s)
    );
  }, [q, pinouts]);

  function showList() {
    setView("list");
  }
  function showPinout(pinout: any) {
    setSelectedPinout(pinout);
    setView("pinout");
  }
  function goBack() {
    if (view === "pinout") {
      setView("list");
    } else {
      setView("welcome");
    }
  }

  const tools = [
    { name: "View a pinout", icon: PinIcon, onClick: showList },
    { name: "Research a topic", icon: ResearchIcon, onClick: () => alert("Coming soon!") },
    { name: "Evaluate a spec sheet", icon: SpecIcon, onClick: () => alert("Coming soon!") },
    { name: "Something else", icon: ZapIcon, onClick: () => alert("Coming soon!") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Campana LMS</h1>
              <p className="text-xs text-slate-500">Agentic learning for B2B buyers</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Docs</button>
            <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Admin</button>
            <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">Sign in</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Quick Tools Sidebar */}
          <aside className="lg:col-span-3">
            <div className="space-y-4">
              {/* Welcome Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <CircleC className="h-5 w-5" />
                  <h2 className="text-sm font-semibold">Welcome!</h2>
                </div>
                <p className="text-xs text-gray-600">
                  Click "View a pinout" to see all available connector pinouts!
                </p>
              </div>

              {/* Quick Tools */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <SparkIcon className="h-5 w-5" />
                  <h2 className="text-sm font-semibold">Quick Tools</h2>
                </div>
                <div className="space-y-2">
                  {tools.map((t) => (
                    <button
                      key={t.name}
                      onClick={t.onClick}
                      className="group flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-all hover:border-green-600 hover:bg-gray-50 hover:shadow-md"
                    >
                      <t.icon className="h-5 w-5 text-gray-600 group-hover:text-green-700" />
                      <span className="flex-1 font-medium text-gray-900">{t.name}</span>
                      <ArrowIcon className="h-4 w-4 text-gray-400 group-hover:text-green-700" />
                    </button>
                  ))}
                </div>

              {/* Recent */}
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold">Recent</h3>
                <ul className="space-y-2 text-sm">
                  <li
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => showPinout(pinouts.find(p => p.id === "xlr-3pin"))}
                  >
                    <span className="truncate text-gray-900">3-pin XLR microphone</span>
                    <span className="text-xs text-gray-500">5 min</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer">
                    <span className="truncate text-gray-900">RJ45 DMX crossover</span>
                    <span className="text-xs text-gray-500">1 hr</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer">
                    <span className="truncate text-gray-900">SMPTE fiber camera</span>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <section className="lg:col-span-9">
            
            {/* Welcome View */}
            {view === "welcome" && (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto max-w-md">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <SparkIcon className="h-8 w-8 text-green-700" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">Welcome to Campana</h2>
                  <p className="mb-6 text-gray-600">
                    Get instant access to connector pinouts, technical documentation, and expert guidance.
                  </p>
                  <button
                    onClick={showList}
                    className="rounded-lg bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
                  >
                    View All Pinouts →
                  </button>
                </div>
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Available Pinouts</h2>
                    <p className="text-sm text-gray-600">Click any connector to view details</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search pinouts (e.g., XLR 3-pin, Clear-Com)"
                      className="w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      aria-label="Search pinouts"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && filtered.length) showPinout(filtered[0]);
                      }}
                    />
                    <button onClick={goBack} className="text-sm text-gray-600 hover:text-gray-900">
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {filtered.length === 0 ? (
                    <div className="px-6 py-8 text-sm text-gray-600">
                      No matches. Try “XLR 3-pin”, “4-pin Sony”, or “Clearcom”.
                    </div>
                  ) : (
                    filtered.map((pinout) => (
                      <button
                        key={pinout.id}
                        onClick={() => showPinout(pinout)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{pinout.name}</h3>
                            <p className="text-sm text-gray-600">{pinout.data.description}</p>
                            <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                              {pinout.category}
                            </span>
                          </div>
                          <ArrowIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Pinout View */}
            {view === "pinout" && selectedPinout && (
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-900 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{selectedPinout.data.name}</h2>
                      <p className="text-sm text-gray-300">{selectedPinout.data.description}</p>
                    </div>
                    <button onClick={goBack} className="text-sm text-gray-300 hover:text-white">
                      ← Back to List
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Pinout Diagram Image */}
                  {selectedPinout.imageUrl && (
                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Diagram</h3>
                      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                        <img 
                          src={selectedPinout.imageUrl} 
                          alt={selectedPinout.data.name}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}

                  {/* Pin Table */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Pinout</h3>
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Pin</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Signal</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Color</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedPinout.data.pins.map((pin: any) => (
                            <tr key={pin.num} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                                  {pin.num}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900">{pin.signal}</td>
                              <td className="px-4 py-3 text-gray-600">{pin.color}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Applications */}
                  {selectedPinout.data.applications && (
                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Common Applications</h3>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <ul className="space-y-2">
                          {selectedPinout.data.applications.map((app: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <span className="text-green-700">✓</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedPinout.data.notes && (
                    <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                      <div className="flex gap-3">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-sm text-yellow-800">{selectedPinout.data.notes}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-12 text-center text-xs text-slate-500">
        © 2025 Campana LMS
      </footer>
    </div>
  );
}

/* ---- Icons ---- */
function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 18l6-6-6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ResearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="1.6" />
      <path d="M20 20l-3-3" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SpecIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M13 2L3 14h7l-1 8 11-12h-7l1-8z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CircleC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path d="M15 15a4 4 0 100-6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white">
      <span className="text-sm font-bold">CA</span>
    </div>
  );
}
