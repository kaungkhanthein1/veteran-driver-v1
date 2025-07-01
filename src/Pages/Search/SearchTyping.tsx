import LocationIcon from "icons/Place.svg"; 
import ArrowRightIcon from "icons/RightArrow.svg"; 

const allLocations = [
  "Baby Bar", "Banana", "Barcelona Cafe", "Barandon House", "Bama Restaurant",
  "Babe Club", "Bobxy Bar", "Bruno"
  // ...add more
];

interface SearchTypingProps {
  value: string;
  onInput: (val: string) => void;
  onSubmit: () => void;
}

export default function SearchTyping({ value, onInput, onSubmit }: SearchTypingProps) {
  // Filter locations by search value
  const filtered = allLocations.filter(name =>
    name.toLowerCase().includes(value.toLowerCase())
  );

  // Helper to highlight matched text
  const highlight = (name: string) => {
    const idx = name.toLowerCase().indexOf(value.toLowerCase());
    if (idx === -1 || !value) return name;
    return (
      <>
        {name.slice(0, idx)}
        <span style={{ color: "#FFC61B" }}>{name.slice(idx, idx + value.length)}</span>
        {name.slice(idx + value.length)}
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {filtered.map((name, idx) => (
        <div
          key={name}
          className="flex items-center justify-between px-2 py-3 border-b last:border-b-0 cursor-pointer"
          onClick={() => {
            onInput(name);
            onSubmit();
          }}
        >
          <img src={LocationIcon} alt="" className="w-5 h-5 mr-2" />
          <div className="flex-1 text-base">{highlight(name)}</div>
          <img src={ArrowRightIcon} alt="" className="w-4 h-4 ml-2" />
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-8">No results found</div>
      )}
    </div>
  );
}
