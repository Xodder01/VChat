import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import DateSeparator from "./DateSeparator";
import ImageLightbox from "./ImageLightbox";
import { CheckIcon } from "lucide-react";

// Returns a date-only string like "2026-08-02" for grouping
function getDayKey(dateStr) {
  return new Date(dateStr).toISOString().split("T")[0];
}

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    clearUnread,
    markMessagesAsRead,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const messageEndRef = useRef(null);

  // Feature 8: image lightbox
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    // Feature 2: mark messages as read when chat is opened
    markMessagesAsRead(selectedUser._id);
    // Feature 9: clear unread badge
    clearUnread(selectedUser._id);
  }, [selectedUser, getMessagesByUserId, markMessagesAsRead, clearUnread]);

  useEffect(() => {
    if (messageEndRef.current) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const receivedBubbleBg = isDark ? "#1e293b" : "#ffffff";
  const receivedBubbleBorder = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const receivedTextColor = isDark ? "#f1f5f9" : "#0f172a";
  const timeColorReceived = isDark ? "#64748b" : "#94a3b8";

  // Feature 5: build message list with date separators inserted between day groups
  const renderMessagesWithSeparators = () => {
    const items = [];
    let lastDayKey = null;

    messages.forEach((msg) => {
      const dayKey = getDayKey(msg.createdAt);
      if (dayKey !== lastDayKey) {
        items.push(<DateSeparator key={`sep-${dayKey}`} date={msg.createdAt} />);
        lastDayKey = dayKey;
      }

      const isMine = msg.senderId === authUser._id;
      items.push(
        <div key={msg._id} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
          <div
            className="chat-bubble p-3.5 rounded-2xl text-sm font-medium"
            style={
              isMine
                ? { backgroundColor: "#8b5cf6", color: "#ffffff", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }
                : { backgroundColor: receivedBubbleBg, color: receivedTextColor, border: `1px solid ${receivedBubbleBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }
            }
          >
            {/* Feature 8: clickable image opens lightbox */}
            {msg.image && (
              <img
                src={msg.image}
                alt="Shared"
                className="rounded-xl h-48 object-cover mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                onClick={() => setLightboxSrc(msg.image)}
              />
            )}
            {msg.text && <p className="leading-relaxed">{msg.text}</p>}

            {/* Timestamp + Feature 2: read receipt ticks */}
            <div className={`flex items-center gap-1 mt-1.5 ${isMine ? "justify-end" : "justify-start"}`}>
              <p
                className="text-[10px]"
                style={{ color: isMine ? "rgba(255,255,255,0.65)" : timeColorReceived }}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              {/* Only show ticks on my own messages */}
              {isMine && (
                <span className="flex -space-x-1.5" title={msg.read ? "Read" : "Sent"}>
                  {/* First tick — always shown (sent) */}
                  <CheckIcon
                    className="size-3"
                    style={{ color: msg.read ? "#a78bfa" : "rgba(255,255,255,0.55)" }}
                  />
                  {/* Second tick — shown only when read */}
                  <CheckIcon
                    className="size-3"
                    style={{ color: msg.read ? "#a78bfa" : "rgba(255,255,255,0.55)", opacity: msg.read ? 1 : 0.4 }}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      );
    });

    return items;
  };

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-3 sm:px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {renderMessagesWithSeparators()}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />

      {/* Feature 8: image lightbox portal */}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}

export default ChatContainer;
