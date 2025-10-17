"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

/* --- Types --- */
type Pin = { num: number; signal: string; color: string };
type Pinout = {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  data: {
    name: string;
    description: string;
    pins: Pin[];
    applications?: string[];
    notes?: string | null;
  };
};

type Props = {
  pinouts?: Pinout[]; // optional but defaults to []
  onOpenPinout?: (p: Pinout) => void;
};

export default function PinoutsOnly({ pinouts = [], onOpenPinout }: Props) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Pinout | null>(null);

  const filtered = useMemo(() => {
    const list = Array.isArray(pinouts) ? pinouts : [];
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter((p) =>
      [p.name, p.category, p.data.description ?? ""].join(" ").toLowerCase().includes(s)
    );
  }, [q, pinouts]);

  const open = (p: Pinout) => {
    setSelected(p);
    onOpenPinout?.(p);
  };

  /* ---- Detail view ---- */
  if (selected) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-900 px-6 py-4 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{selected.data.name}</h2>
            <p className="text-sm text-gray-300">{selected.data.description}</p>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="text-sm text-gray-300 hover:text-white"
            aria-label="Back to list"
          >
            ← Back
          </button>
        </div>

        <div className="p-6 space-y-6">
          {selected.imageUrl && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Diagram</h3>
              <div className="rounded-lg border overflow-hidden">
                <Image
                  src={selected.imageUrl}
                  alt={selected.data.name}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Pinout</h3>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Pin</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Signal</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Color</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selected.data.pins.map((pin) => (
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

          {selected.data.applications?.length ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700">Common Applications</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <ul className="space-y-2 text-gray-700">
                  {selected.data.applications.map((app, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-700">✓</span> {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {selected.data.notes ? (
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
              ⚠️ {selected.data.notes}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  /* ---- List view ---- */
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Available Pinouts</h2>
          <p className="text-sm text-gray-600">Click any connector to view details</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pinouts (e.g., XLR 3-pin, Clear-Com)"
          className="w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#09A7E8]"
          aria-label="Search pinouts"
        />
      </div>

      <div className="divide-y">
        {(filtered ?? []).length === 0 ? (
          <div className="px-6 py-8 text-sm text-gray-600">
            No matches. Try “XLR 3-pin”, “4-pin Sony”, or “Clear-Com”.
          </div>
        ) : (
          filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => open(p)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-label={`Open ${p.name}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.data.description}</p>
                  <span className="mt-2 inline-block rounded-full bg-[#e6f6fc] px-2 py-1 text-xs font-medium text-[#09A7E8]">
                    {p.category}
                  </span>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
