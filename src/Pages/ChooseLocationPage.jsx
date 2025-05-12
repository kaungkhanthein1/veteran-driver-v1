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
    <div className="min-h-screen flex flex-col bg-black px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-white mr-2">
          {/* Back arrow */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white">Select Region</h2>
      </div>
      <input
        type="text"
        className="w-full bg-[#232323] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-6"
        placeholder="Search location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {filteredRegions.map(region => (
          <button
            key={region.name}
            className={`flex flex-col items-center justify-center rounded-lg p-4 border-2 ${
              selected === region.name ? "border-yellow-400 bg-[#232323]" : "border-transparent bg-[#181818]"
            }`}
            onClick={() => setSelected(region.name)}
          >
            <span className="text-3xl mb-2">{region.flag}</span>
            <span className="text-white text-sm">{region.name}</span>
          </button>
        ))}
      </div>
      <button
        className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold mt-auto"
        disabled={!selected}
        onClick={() => {
          // TODO: Save selected region and proceed
          navigate("/social"); // Go to Home tab after choosing location
        }}
      >
        Choose this region
      </button>
    </div>
  );
}