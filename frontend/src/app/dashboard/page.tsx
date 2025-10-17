"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

/* -------------------------- Types -------------------------- */
type Pin = { num: number; signal: string; color: string };
export type Pinout = {
  id: string;
  name: string;
  category: "Audio" | "Power" | string;
  imageUrl?: string;
  data: {
    name: string;
    description: string;
    pins: Pin[];
    applications?: string[];
    notes?: string | null;
  };
};

/* -------------------------- Data --------------------------- */
const PINOUTS: Pinout[] = [
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
        { num: 3, signal: "Cold/Negative (-)", color: "Black/Blue" },
      ],
      applications: ["Microphones", "Professional audio equipment", "Speakers"],
      notes: "For passive speakers use a heavy-gauge speaker cable, not an XLR microphone cable.",
    },
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
        { num: 4, signal: "Positive (+)", color: "Red" },
      ],
      applications: ["Sony cameras", "Broadcast video equipment"],
      notes: "WARNING: Verify pinout before connecting.",
    },
  },
];

/* ------------------------- Component ----------------------- */
export default function PinoutCards() {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState<string>("All");
  const [zoomed, setZoomed] = useState<string | null>(null);
  const chips = ["All", "Audio", "Power"];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const arr = PINOUTS.filter((p) => (chip === "All" ? true : p.category === chip));
    if (!s) return arr;
    return arr.filter((p) => [p.name, p.category, p.data.description ?? ""].join(" ").toLowerCase().includes(s));
  }, [q, chip]);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      {/* Zoom Overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setZoomed(null)}
        >
          <div className="relative h-[90vh] w-[90vw]">
            <Image
              src={zoomed}
              alt="Zoomed diagram"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 rounded-md border p-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setChip(c)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                c === chip ? "bg-[#09A7E8]/10 text-[#0b98d2]" : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-pressed={c === chip}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pinouts (e.g., XLR 3-pin, Clear-Com)"
          className="w-80 rounded-md border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#09A7E8]"
          aria-label="Search pinouts"
        />
      </div>

      {/* Cards with dropdown Pinout + zoom + download */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            {p.imageUrl && (
              <div className="relative h-72 w-full overflow-hidden border-b bg-white cursor-zoom-in" onClick={() => setZoomed(p.imageUrl!)}>
                <Image
                  src={p.imageUrl}
                  alt={p.data.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              </div>
            )}

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                <span className="shrink-0 rounded-full bg-[#e6f6fc] px-3 py-1 text-xs font-medium text-[#09A7E8]">
                  {p.category}
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-600">{p.data.description}</p>

              <details className="group rounded-lg border border-gray-100 bg-gray-50 p-4">
                <summary className="cursor-pointer select-none text-sm font-semibold text-gray-700">
                  Pinout
                </summary>
                <table className="mt-3 w-full text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Pin</th>
                      <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Signal</th>
                      <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {p.data.pins.map((pin) => (
                      <tr key={pin.num}>
                        <td className="px-2 py-1">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                            {pin.num}
                          </div>
                        </td>
                        <td className="px-2 py-1 font-medium text-gray-900">{pin.signal}</td>
                        <td className="px-2 py-1 text-gray-600">{pin.color}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {p.data.applications && (
                  <div className="mt-4">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">Applications</h5>
                    <ul className="grid grid-cols-1 gap-1 text-sm text-gray-700 sm:grid-cols-2">
                      {p.data.applications.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {p.data.notes && (
                  <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-800">
                    ⚠️ {p.data.notes}
                  </div>
                )}
              </details>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-3">
                {p.imageUrl && (
                  <a
                    href={p.imageUrl}
                    download
                    className="rounded-md border px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Download Diagram
                  </a>
                )}
                <button
                  onClick={() => downloadJSON(p)}
                  className="rounded-md border px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Download JSON
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- Helpers ------------------------- */
function downloadJSON(p: Pinout) {
  const blob = new Blob([JSON.stringify(p, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.id}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
