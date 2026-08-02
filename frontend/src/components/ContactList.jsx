import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    selectedUser,
    isUsersLoading,
    unreadCounts,
    searchQuery,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => { getAllContacts(); }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Feature 3: filter by search query
  const filteredContacts = searchQuery.trim()
    ? allContacts.filter((c) => c.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    : allContacts;

  const itemBg = isDark ? "#1e293b" : "#ffffff";
  const itemBorder = isDark ? "rgba(51,65,85,0.7)" : "rgba(226,232,240,0.7)";
  const selectedBg = "rgba(139,92,246,0.1)";
  const selectedBorder = "rgba(139,92,246,0.3)";
  const avatarBorder = isDark ? "#334155" : "#e2e8f0";
  const nameColor = isDark ? "#f1f5f9" : "#0f172a";

  if (filteredContacts.length === 0) {
    return (
      <p className="text-center text-sm py-6" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
        No contacts found
      </p>
    );
  }

  return (
    <>
      {filteredContacts.map((contact) => {
        const isSelected = selectedUser?._id === contact._id;
        const isOnline = onlineUsers.includes(contact._id);
        const unreadCount = unreadCounts?.[contact._id] || 0;
        return (
          <div
            key={contact._id}
            className="p-3 rounded-xl cursor-pointer transition-all duration-200"
            style={
              isSelected
                ? { backgroundColor: selectedBg, border: `1px solid ${selectedBorder}` }
                : { backgroundColor: itemBg, border: `1px solid ${itemBorder}` }
            }
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                  <div className="size-11 rounded-full overflow-hidden" style={{ border: `1px solid ${avatarBorder}` }}>
                    <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className="size-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm truncate" style={{ color: nameColor }}>{contact.fullName}</h4>
                  {unreadCount > 0 && (
                    <span style={{
                      minWidth: "20px",
                      height: "20px",
                      padding: "0 6px",
                      borderRadius: "10px",
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium truncate mt-0.5" style={{ color: isOnline ? "#10b981" : "#94a3b8" }}>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ContactList;
