import { useRef, useState, useEffect, useCallback } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

// Debounce helper
function useDebounce(fn, delay) {
  const timer = useRef(null);
  return useCallback((...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);
}

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();
  const { socket } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [text]);

  // Feature 1: typing indicator — emit stopTyping after 2s of no input
  const emitStopTyping = useDebounce(() => {
    if (socket && selectedUser) {
      socket.emit("stopTyping", { receiverId: selectedUser._id });
    }
  }, 2000);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (isSoundEnabled) playRandomKeyStrokeSound();

    // Emit startTyping, then schedule stopTyping
    if (socket && selectedUser) {
      socket.emit("startTyping", { receiverId: selectedUser._id });
      emitStopTyping();
    }
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    // Stop typing indicator immediately on send
    if (socket && selectedUser) {
      socket.emit("stopTyping", { receiverId: selectedUser._id });
    }

    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  // Feature 13: Enter to send, Shift+Enter for newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const containerBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const inputBg = isDark ? "#0f172a" : "#ffffff";
  const inputBorder = isDark ? "#334155" : "#e2e8f0";
  const inputColor = isDark ? "#f1f5f9" : "#0f172a";
  const attachColor = isDark ? "#64748b" : "#64748b";

  return (
    <div className="p-4" style={{ borderTop: `1px solid ${borderColor}`, backgroundColor: containerBg }}>
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl" style={{ border: `1px solid ${inputBorder}` }} />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#1e293b", color: "#ffffff" }}
              type="button"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-end space-x-2 sm:space-x-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-xl py-3 px-4 text-sm focus:outline-none transition-colors resize-none overflow-hidden"
          style={{
            backgroundColor: inputBg,
            border: `1px solid ${inputBorder}`,
            color: inputColor,
            lineHeight: "1.5",
            minHeight: "46px",
            maxHeight: "120px",
          }}
          placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
          onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
          onBlur={(e) => (e.target.style.borderColor = inputBorder)}
        />

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl px-4 transition-all cursor-pointer flex-shrink-0"
          style={{
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            border: imagePreview ? "1px solid #8b5cf6" : `1px solid ${inputBorder}`,
            color: imagePreview ? "#8b5cf6" : attachColor,
            height: "46px",
          }}
          title="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="text-white rounded-xl px-5 font-semibold transition-all cursor-pointer text-sm disabled:opacity-50 flex-shrink-0"
          style={{
            backgroundColor: "#8b5cf6",
            boxShadow: "0 4px 14px rgba(139,92,246,0.25)",
            height: "46px",
          }}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
