import { useState } from "react";
import SearchRecent from "./SearchRecent";
import SearchTyping from "./SearchTyping";
import SearchResults from "./SearchResults";
import BackButton from "../../components/common/BackButton";

export default function SearchMain() {
  const [searchState, setSearchState] = useState<"recent" | "typing" | "results">("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchState("typing");
    } else {
      setSearchState("recent");
    }
  };
  const handleSubmit = () => setSearchState("results");

  return (
    <div className="bg-theme-primary min-h-screen">
      <div className="flex items-center gap-2 mb-4 px-4 pt-4 pb-1">
        <BackButton />
        <div className="flex-1">
          <div className="bg-theme-secondary rounded-full w-full relative">
            <input
              type="text"
              className="w-full bg-theme-secondary rounded-full px-6 py-3 text-base outline-none border-none placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search location..."
              value={searchQuery}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            {searchQuery && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl focus:outline-none"
                onClick={() => handleInput("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
      {searchState === "recent" && <SearchRecent />}
      {searchState === "typing" && (
        <SearchTyping value={searchQuery} onInput={handleInput} onSubmit={handleSubmit} />
      )}
      {searchState === "results" && (
        <SearchResults query={searchQuery} onBack={() => setSearchState("recent")} />
      )}
    </div>
  );
}
