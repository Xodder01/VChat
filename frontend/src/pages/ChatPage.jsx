import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import SearchBar from "../components/SearchBar";

function ChatPage() {
  const { activeTab, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  // Subscribe to real-time messages once for the whole page lifetime
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);


  const pageBg = isDark ? "#0f172a" : "#F4F4EE";
  const wavyColor = isDark ? "#1e293b" : "#e2e1d0";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const cardBorder = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.6)";
  const cardShadow = isDark ? "0 8px 30px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.06)";
  const sidebarBorder = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const chatAreaBg = isDark ? "#0f172a" : "#FAF9F5";

  return (
    <div
      className="min-h-screen min-h-dvh w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: pageBg, color: isDark ? "#f1f5f9" : "#0f172a" }}
    >
      {/* WAVY LINES SVG BACKGROUND */}
      <svg
        className="absolute inset-0 size-full pointer-events-none"
        style={{ opacity: isDark ? 0.3 : 0.75, color: wavyColor }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
      >
        <path d="M 1400,0 C 1100,200 800,450 650,650 C 500,850 250,880 0,900" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 1400,100 C 1080,280 780,510 630,710 C 480,910 230,890 0,900" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 1400,200 C 1060,360 760,570 610,770 C 460,950 210,895 0,900" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 1400,300 C 1040,440 740,630 590,820 C 440,980 190,898 0,900" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 1400,400 C 1020,520 720,690 570,860 C 420,995 170,899 0,900" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* MAIN CARD */}
      <div
        className="relative z-10 w-full h-dvh md:h-[800px] md:mx-4 md:my-auto md:rounded-2xl overflow-hidden flex"
        style={{
          maxWidth: "72rem",
          backgroundColor: cardBg,
          border: `1px solid ${cardBorder}`,
          boxShadow: cardShadow,
        }}
      >
        {/* LEFT SIDE (SIDEBAR) */}
        <div
          className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80 flex-col`}
          style={{ backgroundColor: cardBg, borderRight: `1px solid ${sidebarBorder}` }}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <SearchBar />
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE (CHAT AREA) */}
        <div
          className={`${selectedUser ? "flex" : "hidden md:flex"} flex-1 flex-col`}
          style={{ backgroundColor: chatAreaBg }}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
