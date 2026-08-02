import { XIcon, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const isOnline = onlineUsers.includes(selectedUser._id);
  const isTyping = typingUsers[selectedUser._id] === true;

  useEffect(() => {
    const handleEscKey = (event) => { if (event.key === "Escape") setSelectedUser(null); };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  const headerBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const nameColor = isDark ? "#f1f5f9" : "#0f172a";
  const iconColor = isDark ? "#64748b" : "#94a3b8";
  const avatarBorder = isDark ? "#334155" : "#e2e8f0";

  return (
    <div
      className="flex justify-between items-center min-h-[72px] px-5 sm:px-6"
      style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 -ml-1 rounded-xl cursor-pointer"
          style={{ color: iconColor }}
          title="Back to chats"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: `1px solid ${avatarBorder}` }}>
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="size-full object-cover" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-base tracking-tight" style={{ color: nameColor }}>
            {selectedUser.fullName}
          </h3>

          {/* Feature 1: typing indicator replaces online/offline text when typing */}
          <p className="text-xs font-medium flex items-center gap-1.5 mt-0.5">
            {isTyping ? (
              <span className="flex items-center gap-1.5" style={{ color: "#8b5cf6" }}>
                <span className="flex gap-0.5 items-end h-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block w-1 rounded-full"
                      style={{
                        backgroundColor: "#8b5cf6",
                        animation: "typingBounce 1.2s ease-in-out infinite",
                        animationDelay: `${i * 0.2}s`,
                        height: "4px",
                      }}
                    />
                  ))}
                </span>
                typing...
              </span>
            ) : isOnline ? (
              <span className="flex items-center gap-1" style={{ color: "#10b981" }}>
                <span className="size-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: "#10b981" }} />
                Online
              </span>
            ) : (
              <span style={{ color: "#94a3b8" }}>Offline</span>
            )}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        title="Close Chat (Esc)"
        className="p-2 rounded-xl cursor-pointer transition-all"
        style={{ color: iconColor }}
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ChatHeader;
