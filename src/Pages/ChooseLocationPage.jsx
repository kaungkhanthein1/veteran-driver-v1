import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const regions = [
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
];

export default function ChooseLocationPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-theme-primary px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-theme-primary mr-2">
          {/* Back arrow */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-theme-primary">Select Region</h2>
      </div>
      <input
        type="text"
        className="w-full bg-theme-secondary border border-theme rounded-lg px-4 py-3 text-theme-primary placeholder-theme-secondary mb-6"
        placeholder="Search location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {filteredRegions.map(region => (
          <button
            key={region.name}
            className={`flex flex-col items-center justify-center rounded-lg p-4 border-2 ${
              selected === region.name ? "border-[#FFD75E] bg-theme-secondary" : "border-transparent bg-theme-primary"
            }`}
            onClick={() => setSelected(region.name)}
          >
            <span className="text-3xl mb-2">{region.flag}</span>
            <span className="text-theme-primary text-sm">{region.name}</span>
          </button>
        ))}
      </div>
      <button
        className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold mt-auto"
        disabled={!selected}
        onClick={() => {
          // TODO: Save selected region and proceed
          navigate("/home"); // Go to Home tab after choosing location
        }}
      >
        Choose this region
      </button>
    </div>
  );
}