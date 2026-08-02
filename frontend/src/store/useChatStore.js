import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

// Persist unread counts across page refreshes (feature 9)
const loadUnreadCounts = () => {
  try {
    const stored = localStorage.getItem("unreadCounts");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveUnreadCounts = (counts) => {
  try {
    localStorage.setItem("unreadCounts", JSON.stringify(counts));
  } catch {}
};

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // Feature 3: search
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),

  // Feature 1: typing indicator — { [userId]: boolean }
  typingUsers: {},
  setTypingUser: (userId, isTyping) => {
    set((state) => ({
      typingUsers: { ...state.typingUsers, [userId]: isTyping },
    }));
  },

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Feature 2: mark messages as read
  markMessagesAsRead: async (userId) => {
    try {
      await axiosInstance.put(`/messages/read/${userId}`);
    } catch (error) {
      console.log("Error marking messages as read:", error.message);
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
      read: false,
    };
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      });
    } catch (error) {
      set({ messages: get().messages.filter((msg) => msg._id !== tempId) });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Feature 9: persisted unread counts
  unreadCounts: loadUnreadCounts(),

  clearUnread: (userId) => {
    const current = { ...get().unreadCounts };
    delete current[userId];
    saveUnreadCounts(current);
    set({ unreadCounts: current });
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, isSoundEnabled } = get();
      const isFromCurrentChat = selectedUser && newMessage.senderId === selectedUser._id;

      if (isFromCurrentChat) {
        set({ messages: [...get().messages, newMessage] });
      } else {
        // Increment unread count for this sender
        const current = { ...get().unreadCounts };
        current[newMessage.senderId] = (current[newMessage.senderId] || 0) + 1;
        saveUnreadCounts(current);
        set({ unreadCounts: current });
      }

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });

    // Feature 2: listen for read receipts — mark sent messages as read
    socket.on("messagesRead", ({ readBy }) => {
      set({
        messages: get().messages.map((msg) =>
          msg.receiverId === readBy || msg.receiverId?.toString?.() === readBy
            ? { ...msg, read: true }
            : msg
        ),
      });
    });

    // Feature 1: typing indicator events
    socket.on("userTyping", ({ senderId }) => {
      get().setTypingUser(senderId, true);
    });

    socket.on("userStopTyping", ({ senderId }) => {
      get().setTypingUser(senderId, false);
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("messagesRead");
      socket.off("userTyping");
      socket.off("userStopTyping");
    }
  },
}));
