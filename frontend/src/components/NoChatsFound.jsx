import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const subtextColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div
        className="size-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        <MessageCircleIcon className="size-8" style={{ color: "#8b5cf6" }} />
      </div>
      <div>
        <h4 className="font-semibold mb-1" style={{ color: textColor }}>No conversations yet</h4>
        <p className="text-xs px-6" style={{ color: subtextColor }}>
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all"
        style={{ color: "#8b5cf6", backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
