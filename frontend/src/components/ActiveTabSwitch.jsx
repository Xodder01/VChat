import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const containerBg = isDark ? "#0f172a" : "#F4F4EE";
  const containerBorder = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const activeBg = isDark ? "#1e293b" : "#ffffff";
  const activeBorder = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.6)";
  const inactiveColor = isDark ? "#64748b" : "#64748b";

  return (
    <div
      className="flex p-1.5 mx-3 my-2.5 rounded-xl gap-1"
      style={{ backgroundColor: containerBg, border: `1px solid ${containerBorder}` }}
    >
      {["chats", "contacts"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer capitalize"
          style={
            activeTab === tab
              ? { backgroundColor: activeBg, color: "#8b5cf6", border: `1px solid ${activeBorder}`, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }
              : { color: inactiveColor, backgroundColor: "transparent", border: "1px solid transparent" }
          }
        >
          {tab === "chats" ? "Chats" : "Contacts"}
        </button>
      ))}
    </div>
  );
}
export default ActiveTabSwitch;
