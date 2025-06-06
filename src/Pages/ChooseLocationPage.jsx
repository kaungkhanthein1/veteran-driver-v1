import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import { useTranslation } from "react-i18next";

export const regions = [
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
  const { t } = useTranslation();

  const filteredRegions = regions.filter(region =>
    t(`regions.${region.name.toLowerCase().replace(' ', '')}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dvh-fallback flex flex-col bg-theme-primary px-4 py-8">
      <div className="flex items-center mb-6">
        <BackButton/>
        <h2 className="text-xl font-bold text-theme-primary">{t('chooseLocation.selectRegionTitle')}</h2>
      </div>
      <input
        type="text"
        className="w-full bg-theme-secondary border border-theme rounded-lg px-4 py-3 text-theme-primary placeholder-theme-secondary mb-6"
        placeholder={t('chooseLocation.searchLocationPlaceholder')}
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
            <span className="text-theme-primary text-sm">{t(`regions.${region.name.toLowerCase().replace(' ', '')}`)}</span>
          </button>
        ))}
      </div>
      <button
        className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold mt-auto"
        disabled={!selected}
        onClick={() => {
          // TODO: Save selected region and proceed
          navigate("/"); // Go to Home tab after choosing location
        }}
      >
        {t('chooseLocation.chooseThisRegionButton')}
      </button>
    </div>
  );
}