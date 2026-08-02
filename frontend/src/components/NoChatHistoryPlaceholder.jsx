import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

const QUICK_MESSAGES = [
  { emoji: "👋", text: "Say Hello", message: "Hey! 👋" },
  { emoji: "🤝", text: "How are you?", message: "How are you? 😊" },
  { emoji: "📅", text: "Meet up soon?", message: "Hey, want to meet up soon? 📅" },
];

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const handleQuickMessage = (message) => {
    sendMessage({ text: message, image: null });
  };

  const headingColor = isDark ? "#f1f5f9" : "#0f172a";
  const subtextColor = isDark ? "#94a3b8" : "#64748b";
  const iconBg = isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)";
  const iconBorder = isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)";
  const pillBg = isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)";
  const pillBorder = isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)";

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div
        className="size-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: iconBg, border: `1px solid ${iconBorder}` }}
      >
        <MessageCircleIcon className="size-8" style={{ color: "#8b5cf6" }} />
      </div>

      <h3 className="text-lg font-semibold mb-2" style={{ color: headingColor }}>
        Start your conversation with {name}
      </h3>

      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-sm font-medium" style={{ color: subtextColor }}>
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div
          className="h-px w-32 mx-auto"
          style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)" }}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_MESSAGES.map(({ emoji, text, message }) => (
          <button
            key={text}
            onClick={() => handleQuickMessage(message)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer transition-all"
            style={{
              color: "#8b5cf6",
              backgroundColor: pillBg,
              border: `1px solid ${pillBorder}`,
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.25)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = pillBg}
          >
            {emoji} {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
