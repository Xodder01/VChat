import { SearchIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useChatStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const inputBg = isDark ? "#0f172a" : "#f8fafc";
  const inputBorder = isDark ? "#334155" : "#e2e8f0";
  const inputColor = isDark ? "#f1f5f9" : "#0f172a";
  const iconColor = isDark ? "#64748b" : "#94a3b8";

  return (
    <div className="px-4 pb-3">
      <div className="relative">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none"
          style={{ color: iconColor }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chats or contacts..."
          className="w-full pl-9 pr-8 py-2 text-sm rounded-xl transition-colors focus:outline-none"
          style={{
            backgroundColor: inputBg,
            border: `1px solid ${inputBorder}`,
            color: inputColor,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
          onBlur={(e) => (e.target.style.borderColor = inputBorder)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ color: iconColor }}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
