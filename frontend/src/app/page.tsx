"use client";

import React, { useState } from "react";

export default function CampanaLMSHome() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text: "Welcome to Campana. What can I help with today?",
    },
  ]);
  const [previewContent, setPreviewContent] = useState<{ title: string; type: string } | null>(null);

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
    setInputMessage("");
    
    // Simulate assistant response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { 
          role: "assistant", 
          text: `I received your message: "${text}". How can I help you further?`
        },
      ]);
      
      // Simulate artifact generation
      if (text.toLowerCase().includes("xlr") || text.toLowerCase().includes("pinout")) {
        setPreviewContent({
          title: "XLR 3-Pin Pinout",
          type: "pinout"
        });
      }
    }, 500);
  }

  const tools = [
    { name: "View a pinout", icon: PinIcon },
    { name: "Research a topic", icon: ResearchIcon },
    { name: "Evaluate a spec sheet", icon: SpecIcon },
    { name: "Something else", icon: ZapIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b bg-white">
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
            <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
              Docs
            </button>
            <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
              Admin
            </button>
            <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Quick Tools Sidebar - Option 3 */}
          <aside className="lg:col-span-3">
            <div className="space-y-4">
              {/* Welcome Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <CircleC className="h-5 w-5" />
                  <h2 className="text-sm font-semibold">Welcome!</h2>
                </div>
                <p className="mb-3 text-xs text-gray-600">
                  Jump straight to what you need without any questions.
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
                      onClick={() => runTool(t.name)}
                      className={`group flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all hover:border-green-600 hover:shadow-md ${
                        activeTool === t.name
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <t.icon className="h-5 w-5 text-gray-600 group-hover:text-green-700" />
                      <span className="flex-1 font-medium text-gray-900">
                        {t.name}
                      </span>
                      <ArrowIcon className="h-4 w-4 text-gray-400 group-hover:text-green-700" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold">Recent</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
                    <span className="truncate text-gray-900">3‑pin XLR microphone</span>
                    <span className="text-xs text-gray-500">5 min</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
                    <span className="truncate text-gray-900">RJ45 DMX crossover</span>
                    <span className="text-xs text-gray-500">1 hr</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
                    <span className="truncate text-gray-900">SMPTE fiber camera</span>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Chat + Workspace */}
          <section className="lg:col-span-9">
            <div className="grid gap-6 lg:grid-cols-3">
              
              {/* Assistant - Option 4: ChatGPT Style */}
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="text-sm font-semibold text-gray-900">Assistant</h2>
                </div>
                
                {/* Messages */}
                <div className="h-[500px] overflow-y-auto p-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`mb-4 flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm text-xs font-bold text-white ${
                        msg.role === "user" ? "bg-gray-700" : "bg-green-700"
                      }`}>
                        {msg.role === "user" ? "U" : "CA"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed text-gray-900">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send(inputMessage);
                        }
                      }}
                      placeholder="Message Campana..."
                      rows={1}
                      className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                      onClick={() => send(inputMessage)}
                      className="rounded-lg bg-green-700 p-3 text-white transition-colors hover:bg-green-800"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Workspace - Option 4: Preview Panel */}
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-1">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="text-sm font-semibold text-gray-900">Workspace</h2>
                </div>

                {previewContent ? (
                  <div className="overflow-hidden">
                    {/* Preview Header */}
                    <div className="flex items-center justify-between bg-gray-900 p-3 text-white">
                      <span className="text-sm font-medium">
                        {previewContent.title}
                      </span>
                      <button
                        onClick={() => setPreviewContent(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Preview Content */}
                    <div className="flex h-80 items-center justify-center bg-gray-50 p-4">
                      <div className="text-center text-gray-500">
                        <svg
                          className="mx-auto mb-2 h-12 w-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div className="text-sm font-medium">Pinout Preview</div>
                        <div className="mt-2 text-xs text-gray-400">
                          Full pinout details coming soon
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 border-t border-gray-200 p-3">
                      <button className="flex-1 rounded bg-green-700 px-3 py-2 text-sm text-white hover:bg-green-800">
                        Download
                      </button>
                      <button className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
                        Share
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                      <svg
                        className="mx-auto mb-3 h-10 w-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        No artifacts yet
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Generated content will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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

function Logo() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white">
      <span className="text-sm font-bold">CA</span>
    </div>
  );
}