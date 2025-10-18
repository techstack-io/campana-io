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
  pinouts?: Pinout[];
  onOpenPinout?: (p: Pinout) => void;
};

/* --- Complete Pinouts Data --- */
const DEFAULT_PINOUTS: Pinout[] = [
  // AUDIO CONNECTORS
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
      notes: "For passive speakers you must use a heavy-gauge speaker cable, not an XLR microphone cable.",
    },
  },
  {
    id: "xlr-5pin",
    name: "5-Pin XLR (Stereo Audio/DMX)",
    category: "Audio",
    imageUrl: "/diagrams/xlr-5pin.png",
    data: {
      name: "5-Pin XLR",
      description: "Used for stereo audio or DMX lighting control",
      pins: [
        { num: 1, signal: "Ground/Shield", color: "Shield" },
        { num: 2, signal: "Left Hot (+)", color: "Red" },
        { num: 3, signal: "Left Cold (-)", color: "Black" },
        { num: 4, signal: "Right Hot (+)", color: "White" },
        { num: 5, signal: "Right Cold (-)", color: "Blue" },
      ],
      applications: ["Stereo microphones", "DMX lighting control", "Intercom systems"],
      notes: "Pin 4 and 5 are reserved for future DMX expansion but commonly unused.",
    },
  },
  {
    id: "trs-quarter",
    name: "1/4\" TRS (Balanced Audio)",
    category: "Audio",
    imageUrl: "/diagrams/trs-quarter.png",
    data: {
      name: "1/4\" TRS",
      description: "Tip-Ring-Sleeve connector for balanced audio",
      pins: [
        { num: 1, signal: "Tip (Hot +)", color: "Red/White" },
        { num: 2, signal: "Ring (Cold -)", color: "Black/Blue" },
        { num: 3, signal: "Sleeve (Ground)", color: "Shield" },
      ],
      applications: ["Headphones", "Instruments", "Patch bays", "Balanced audio"],
      notes: "Also available in TS (mono) and TRRS (headset with mic) variants.",
    },
  },
  {
    id: "speakon-4pole",
    name: "Speakon 4-Pole (Speaker)",
    category: "Audio",
    imageUrl: "/diagrams/speakon-4pole.png",
    data: {
      name: "Speakon 4-Pole",
      description: "Locking speaker connector for high-power audio",
      pins: [
        { num: 1, signal: "1+ (HF+ or Full Range+)", color: "Red" },
        { num: 2, signal: "1- (HF- or Full Range-)", color: "Black" },
        { num: 3, signal: "2+ (LF+)", color: "Red" },
        { num: 4, signal: "2- (LF-)", color: "Black" },
      ],
      applications: ["Powered speakers", "Amplifiers", "Bi-amp systems"],
      notes: "Locking mechanism prevents accidental disconnection during live events.",
    },
  },
  {
    id: "xlr-4pin-intercom",
    name: "4-Pin XLR (Intercom/Broadcast)",
    category: "Audio",
    imageUrl: "/diagrams/4-pin-intercom-headset.png",
    data: {
      name: "4-Pin XLR Intercom",
      description: "Stereo audio for intercom headsets",
      pins: [
        { num: 1, signal: "Left (+) Signal", color: "Red" },
        { num: 2, signal: "Left (-) Ground", color: "Green" },
        { num: 3, signal: "Right (+) Signal", color: "Red" },
        { num: 4, signal: "Right (-) Ground", color: "Green" },
      ],
      applications: ["Intercom headsets", "Broadcast equipment"],
      notes: null,
    },
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
        { num: 6, signal: "Cable 2: Ground", color: "Green" },
      ],
      applications: ["Professional intercom", "Theater communication", "Broadcast"],
      notes: null,
    },
  },

  // LIGHTING CONNECTORS
  {
    id: "dmx-5pin",
    name: "DMX 5-Pin (Lighting Control)",
    category: "Lighting",
    imageUrl: "/diagrams/dmx-5pin.png",
    data: {
      name: "DMX 5-Pin",
      description: "Standard DMX512 lighting control protocol",
      pins: [
        { num: 1, signal: "Common/Ground", color: "Shield" },
        { num: 2, signal: "Data 1- (Primary -)", color: "Blue/White" },
        { num: 3, signal: "Data 1+ (Primary +)", color: "Blue" },
        { num: 4, signal: "Data 2- (Secondary -)", color: "Orange/White" },
        { num: 5, signal: "Data 2+ (Secondary +)", color: "Orange" },
      ],
      applications: ["Stage lighting", "Moving lights", "LED fixtures", "Fog machines"],
      notes: "Pins 4 and 5 are reserved for future expansion but rarely used. Use 120Ω terminator on last device.",
    },
  },
  {
    id: "dmx-3pin",
    name: "DMX 3-Pin (Alternate Lighting)",
    category: "Lighting",
    imageUrl: "/diagrams/dmx-3pin.png",
    data: {
      name: "DMX 3-Pin",
      description: "Common but non-standard DMX variant using XLR-3",
      pins: [
        { num: 1, signal: "Common/Ground", color: "Shield" },
        { num: 2, signal: "Data -", color: "Black/Blue" },
        { num: 3, signal: "Data +", color: "Red/White" },
      ],
      applications: ["Budget lighting fixtures", "DJ equipment", "Older installations"],
      notes: "WARNING: Not AES standard. Can be confused with audio XLR. Always label cables clearly.",
    },
  },
  {
    id: "powercon-true1",
    name: "Powercon TRUE1 (Locking Power)",
    category: "Lighting",
    imageUrl: "/diagrams/powercon-true1.png",
    data: {
      name: "Powercon TRUE1",
      description: "Locking AC power connector for entertainment equipment",
      pins: [
        { num: 1, signal: "Line (Hot)", color: "Black/Brown" },
        { num: 2, signal: "Neutral", color: "White/Blue" },
        { num: 3, signal: "Ground", color: "Green/Yellow" },
      ],
      applications: ["Powered speakers", "Lighting fixtures", "Stage equipment"],
      notes: "Rated for 20A. Locking mechanism prevents accidental disconnection. Blue=input, Grey=output.",
    },
  },
  {
    id: "edison-nema-5-15",
    name: "Edison NEMA 5-15 (Standard AC)",
    category: "Lighting",
    imageUrl: "/diagrams/edison.png",
    data: {
      name: "Edison NEMA 5-15",
      description: "Standard North American 120V AC outlet",
      pins: [
        { num: 1, signal: "Hot (Line)", color: "Black" },
        { num: 2, signal: "Neutral", color: "White" },
        { num: 3, signal: "Ground", color: "Green" },
      ],
      applications: ["General power distribution", "Small equipment", "Household"],
      notes: "15A maximum rating. Not suitable for high-current stage equipment.",
    },
  },

  // VIDEO CONNECTORS
  {
    id: "smpte-311m",
    name: "SMPTE 311M (Fiber Broadcast)",
    category: "Video",
    imageUrl: "/diagrams/smpte-311m.png",
    data: {
      name: "SMPTE 311M",
      description: "Hybrid fiber optic connector for broadcast cameras with 3G-SDI",
      pins: [
        { num: 1, signal: "TX+ (Transmit Fiber +)", color: "Orange" },
        { num: 2, signal: "TX- (Transmit Fiber -)", color: "Orange/White" },
        { num: 3, signal: "RX+ (Receive Fiber +)", color: "Green" },
        { num: 4, signal: "RX- (Receive Fiber -)", color: "Green/White" },
        { num: 5, signal: "VCC (+12V Power)", color: "Red" },
        { num: 6, signal: "Ground", color: "Black" },
        { num: 7, signal: "Intercom +", color: "Blue" },
        { num: 8, signal: "Intercom -", color: "Blue/White" },
        { num: 9, signal: "Tally", color: "Yellow" },
        { num: 10, signal: "Return Video +", color: "Brown" },
        { num: 11, signal: "Return Video -", color: "Brown/White" },
        { num: 12, signal: "Data/Control", color: "Grey" },
      ],
      applications: ["Broadcast cameras", "Remote production", "Studio connections"],
      notes: "Supports up to 10km transmission. Requires fiber termination expertise.",
    },
  },
  {
    id: "smpte-304m",
    name: "SMPTE 304M (HD Fiber)",
    category: "Video",
    imageUrl: "/diagrams/smpte-304m.png",
    data: {
      name: "SMPTE 304M",
      description: "Hybrid fiber connector for HD-SDI broadcast",
      pins: [
        { num: 1, signal: "TX Fiber", color: "Orange" },
        { num: 2, signal: "RX Fiber", color: "Green" },
        { num: 3, signal: "+12V Power", color: "Red" },
        { num: 4, signal: "Ground", color: "Black" },
        { num: 5, signal: "Intercom +", color: "Blue" },
        { num: 6, signal: "Intercom -", color: "Blue/White" },
        { num: 7, signal: "Tally", color: "Yellow" },
        { num: 8, signal: "Data", color: "Grey" },
      ],
      applications: ["HD broadcast studios", "Control rooms", "HD camera connections"],
      notes: "Earlier standard supporting HD-SDI (1.485 Gbps). Max distance 2km.",
    },
  },
  {
    id: "bnc-sdi",
    name: "BNC (SDI Video)",
    category: "Video",
    imageUrl: "/diagrams/bnc-sdi.png",
    data: {
      name: "BNC SDI",
      description: "Bayonet connector for serial digital interface video",
      pins: [
        { num: 1, signal: "Signal (Center)", color: "Copper" },
        { num: 2, signal: "Ground (Shield)", color: "Shield" },
      ],
      applications: ["Broadcast video", "HD/3G/6G/12G-SDI", "Professional monitors"],
      notes: "75Ω impedance required. Supports HD, 3G, 6G, and 12G-SDI variants. Max cable length depends on SDI type.",
    },
  },
  {
    id: "hdmi-type-a",
    name: "HDMI Type A (Standard)",
    category: "Video",
    imageUrl: "/diagrams/hdmi-type-a.png",
    data: {
      name: "HDMI Type A",
      description: "High-Definition Multimedia Interface for digital audio/video",
      pins: [
        { num: 1, signal: "TMDS Data2+", color: "N/A" },
        { num: 2, signal: "TMDS Data2 Shield", color: "N/A" },
        { num: 3, signal: "TMDS Data2-", color: "N/A" },
        { num: 4, signal: "TMDS Data1+", color: "N/A" },
        { num: 5, signal: "TMDS Data1 Shield", color: "N/A" },
        { num: 6, signal: "TMDS Data1-", color: "N/A" },
        { num: 7, signal: "TMDS Data0+", color: "N/A" },
        { num: 8, signal: "TMDS Data0 Shield", color: "N/A" },
        { num: 9, signal: "TMDS Data0-", color: "N/A" },
        { num: 10, signal: "TMDS Clock+", color: "N/A" },
        { num: 11, signal: "TMDS Clock Shield", color: "N/A" },
        { num: 12, signal: "TMDS Clock-", color: "N/A" },
        { num: 13, signal: "CEC", color: "N/A" },
        { num: 14, signal: "Reserved", color: "N/A" },
        { num: 15, signal: "SCL (DDC Clock)", color: "N/A" },
        { num: 16, signal: "SDA (DDC Data)", color: "N/A" },
        { num: 17, signal: "Ground", color: "N/A" },
        { num: 18, signal: "+5V Power", color: "N/A" },
        { num: 19, signal: "Hot Plug Detect", color: "N/A" },
      ],
      applications: ["Displays", "Projectors", "Consumer/pro video equipment"],
      notes: "HDMI 2.1 supports 8K@60Hz and 4K@120Hz. Not designed for long cable runs without active repeaters.",
    },
  },

  // DATA/NETWORK CONNECTORS
  {
    id: "rj45-ethernet",
    name: "RJ45 (Ethernet)",
    category: "Data",
    imageUrl: "/diagrams/rj45-ethernet.png",
    data: {
      name: "RJ45 Ethernet",
      description: "8P8C modular connector for Ethernet networks",
      pins: [
        { num: 1, signal: "TX+ (White/Orange)", color: "White/Orange" },
        { num: 2, signal: "TX- (Orange)", color: "Orange" },
        { num: 3, signal: "RX+ (White/Green)", color: "White/Green" },
        { num: 4, signal: "Unused (Blue)", color: "Blue" },
        { num: 5, signal: "Unused (White/Blue)", color: "White/Blue" },
        { num: 6, signal: "RX- (Green)", color: "Green" },
        { num: 7, signal: "Unused (White/Brown)", color: "White/Brown" },
        { num: 8, signal: "Unused (Brown)", color: "Brown" },
      ],
      applications: ["Computer networks", "AV over IP", "Dante audio", "Control systems"],
      notes: "T568B standard shown. All 8 pins used in Gigabit Ethernet. Category rating determines max speed/distance.",
    },
  },
  {
    id: "fiber-lc",
    name: "LC Fiber Optic (Duplex)",
    category: "Data",
    imageUrl: "/diagrams/fiber-lc.png",
    data: {
      name: "LC Fiber Connector",
      description: "Small form factor fiber optic connector",
      pins: [
        { num: 1, signal: "TX (Transmit)", color: "Orange/Yellow (MM), Blue (SM)" },
        { num: 2, signal: "RX (Receive)", color: "Orange/Yellow (MM), Blue (SM)" },
      ],
      applications: ["High-speed networking", "Data centers", "Long-distance AV", "Fiber switches"],
      notes: "Available in singlemode (blue, longer distances) or multimode (orange/aqua, shorter distances). Always TX to RX crossover.",
    },
  },
  {
    id: "rs485-terminal",
    name: "RS-485 (Terminal Block)",
    category: "Data",
    imageUrl: "/diagrams/rs485.png",
    data: {
      name: "RS-485",
      description: "Differential serial communications standard",
      pins: [
        { num: 1, signal: "A/Data+ (Non-inverting)", color: "Green/Yellow" },
        { num: 2, signal: "B/Data- (Inverting)", color: "Blue/White" },
        { num: 3, signal: "Ground (Optional)", color: "Black" },
      ],
      applications: ["DMX512", "Control systems", "Industrial automation", "MIDI"],
      notes: "Requires 120Ω termination at both ends. Can support up to 32 devices on one bus. Max distance 4000ft.",
    },
  },

  // POWER CONNECTORS
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
      notes: "WARNING: Verify pinout before connecting. Other manufacturers use different 4-pin XLR pinouts.",
    },
  },
  {
    id: "camlock-single",
    name: "Camlock (High Current Power)",
    category: "Power",
    imageUrl: "/diagrams/camlock.png",
    data: {
      name: "Camlock Connector",
      description: "Quick-connect high-current power distribution",
      pins: [
        { num: 1, signal: "Single Conductor", color: "Varies (Black/Red/Green)" },
      ],
      applications: ["Stage power distribution", "Film production", "Concerts", "Temporary power"],
      notes: "Rated for 400A. Color coding: Black=Hot 1, Red=Hot 2, Blue=Hot 3, White=Neutral, Green=Ground. Always connect in order: Ground→Neutral→Hots.",
    },
  },
];

export default function PinoutsOnly({ pinouts = DEFAULT_PINOUTS, onOpenPinout }: Props) {
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
                <img
                  src={selected.imageUrl}
                  alt={selected.data.name}
                  className="w-full h-auto"
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
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 flex gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm text-yellow-800">{selected.data.notes}</p>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Available Pinouts ({filtered.length})</h2>
          <p className="text-sm text-gray-600">Click any connector to view details</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pinouts (e.g., XLR, DMX, SMPTE)"
          className="w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#09A7E8]"
          aria-label="Search pinouts"
        />
      </div>

      <div className="divide-y">
        {filtered.length === 0 ? (
          <div className="px-6 py-8 text-sm text-gray-600">
            No matches found. Try searching for "XLR", "DMX", "SMPTE", or browse all connectors.
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