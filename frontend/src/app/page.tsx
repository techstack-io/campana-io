"use client";

import React, { useState } from "react";

/**
 * Campana LMS – Frontend Mock
 * One-file React component that fits a Next.js App Router page.
 * - Tailwind for styling
 * - Minimal state for demo flows
 */
export default function CampanaLMSHome() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "Welcome to Campana. What can I help with today?",
    },
  ]);

  function runTool(tool: string) {
    setActiveTool(tool);
    if (tool === "View a pinout") {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Which category? audio, lighting, video, network, or power?",
        },
      ]);
    } else if (tool === "Research a topic") {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "What topic should I research?" },
      ]);
    } else if (tool === "Evaluate a spec sheet") {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Upload or paste a link to the spec sheet. I will extract key points.",
        },
      ]);
    } else {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Tell me what you're trying to do." },
      ]);
    }
  }

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setSearch("");
    // placeholder assistant echo
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `Acknowledged: ${text}` },
      ]);
    }, 250);
  }

  const tools = [
    { name: "View a pinout", icon: PinIcon },
    { name: "Research a topic", icon: ResearchIcon },
    { name: "Evaluate a spec sheet", icon: SpecIcon },
    { name: "Something else", icon: ZapIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Campana LMS
              </h1>
              <p className="text-xs text-slate-500">
                Agentic learning for B2B buyers
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-xl border px-3 py-2 text-sm">
              Docs
            </button>
            <button className="rounded-xl border px-3 py-2 text-sm">
              Admin
            </button>
            <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
              Sign in
            </button>
          </div>
        </div>
      </header>
      {/* Body */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-12">
        {/* Quick Tools */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome! Let's Get Started
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#005112] rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              <h5 className="mb-0 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Quick Tools
              </h5>
            </a>
            <p className="mb-3 mt-2 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#005112] rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Get A Pinout
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            {/* Research */}
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#005112] rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              Research A Topic
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div className="rounded-3xl border bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="mb-3 flex items-center gap-2">
              <SparkIcon className="h-5 w-5" />
              <h2 className="text-sm font-semibold">Quick Tools</h2>
            </div>
            <div className="space-y-2">
              <WelcomeCard onStart={() => runTool("Something else")} />
              {tools.map((t) => (
                <ToolRow
                  key={t.name}
                  icon={<t.icon className="h-5 w-5" />}
                  title={t.name}
                  active={activeTool === t.name}
                  onClick={() => runTool(t.name)}
                />
              ))}
              <div className="mt-3 rounded-2xl border p-3 text-xs text-slate-500">
                Quick Tools jump straight to what you need. Ideal for
                experienced users.
              </div>
            </div>
          </div>

          {/* Recent */}
          <div className="mt-6 rounded-3xl border bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold">Recent</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-xl border p-2">
                <span className="truncate">3‑pin XLR microphone pinout</span>
                <span className="text-xs text-slate-500">5 min ago</span>
              </li>
              <li className="flex items-center justify-between rounded-xl border p-2">
                <span className="truncate">RJ45 DMX crossover wiring</span>
                <span className="text-xs text-slate-500">1 hr ago</span>
              </li>
              <li className="flex items-center justify-between rounded-xl border p-2">
                <span className="truncate">SMPTE fiber camera run</span>
                <span className="text-xs text-slate-500">Yesterday</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Conversation + Workspace */}
        <section className="md:col-span-8 lg:col-span-9">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Chat */}
            <div className="rounded-3xl border bg-white p-4 shadow-sm lg:col-span-3">
              <h2 className="mb-3 text-sm font-semibold">Assistant</h2>
              <div className="mb-3 h-[380px] overflow-y-auto rounded-2xl border p-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-2 flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        m.role === "user"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(search)}
                  placeholder="Ask anything or describe your connection..."
                  className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={() => send(search)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Workspace */}
            <div className="rounded-3xl border bg-white p-4 shadow-sm lg:col-span-2">
              <h2 className="mb-3 text-sm font-semibold">Workspace</h2>
              <div className="grid gap-3 text-sm">
                <div className="rounded-2xl border p-3">
                  <p className="mb-2 font-medium">IN/OUT</p>
                  <p className="text-slate-600">
                    View raw prompts and model outputs for transparency.
                  </p>
                </div>
                <div className="rounded-2xl border p-3">
                  <p className="mb-2 font-medium">Artifacts</p>
                  <ul className="list-disc pl-5 text-slate-600">
                    <li>pinout_3pin_xlr_v1.json</li>
                    <li>diagram_rj45_dmx.png</li>
                  </ul>
                </div>
                <div className="rounded-2xl border p-3">
                  <p className="mb-2 font-medium">Next Actions</p>
                  <ul className="list-disc pl-5 text-slate-600">
                    <li>Export to PDF</li>
                    <li>Save to Project</li>
                    <li>Share</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      // replace your footer block
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-2 text-xs text-slate-500">
        © 2025 Campana
      </footer>
    </div>
  );
}

/* ---- UI Bits ---- */
function ToolRow({
  title,
  icon,
  onClick,
  active,
}: {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left text-sm transition ${
        active
          ? "border-slate-900 ring-2 ring-slate-900/10"
          : "hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <ArrowIcon className="h-4 w-4" />
    </button>
  );
}

function WelcomeCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-2xl border p-3">
      <div className="mb-2 flex items-center gap-2">
        <CircleC className="h-5 w-5" />
        <p className="text-sm font-semibold">Welcome! Let’s get started.</p>
      </div>
      <p className="mb-2 text-xs text-slate-500">
        What can I help you with today?
      </p>
      <div className="flex gap-2">
        <button
          onClick={onStart}
          className="bg-green-700 hover:bg-green-800 focus:ring-4  rounded-xl border px-3 py-1.5 text-xs"
        >
          Open chat
        </button>
        <button className="rounded-xl border px-3 py-1.5 text-xs">
          Browse examples
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-white">
      <span className="text-sm font-bold">CA</span>
    </div>
  );
}

/* ---- Icons (Lucide-style, no external deps) ---- */
function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M9 18l6-6-6-6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6 3l12 12M9 21l3-7 4-4"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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
      <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="1.6" />
      <path d="M8 7h8M8 11h8M8 15h5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M13 2L3 14h7l-1 8 11-12h-7l1-8z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
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
