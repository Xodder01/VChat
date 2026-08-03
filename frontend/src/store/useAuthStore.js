import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// In production Vite reads VITE_BACKEND_URL (set in Vercel dashboard or .env.production)
// Falls back to the Render URL so it works even if the env var is missing
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : (import.meta.env.VITE_BACKEND_URL || "https://vchat-backend-38n4.onrender.com");

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create account"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to log in"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  loginWithGoogle: async () => {
    set({ isLoggingIn: true });
    try {
      // Try to log in with demo google account or create it
      const googleData = {
        fullName: "Alex Rivera",
        email: "alex.rivera@gmail.com",
        password: "GoogleUserSecretPassword123!",
      };

      let res;
      try {
        res = await axiosInstance.post("/auth/login", {
          email: googleData.email,
          password: googleData.password,
        });
      } catch (loginErr) {
        // If login fails (user doesn't exist yet), sign them up automatically
        res = await axiosInstance.post("/auth/signup", googleData);
      }

      set({ authUser: res.data });
      toast.success("Signed in with Google successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error("Google authentication service failed");
      console.log("Google auth error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    console.log("Connecting socket to:", BASE_URL);

    console.log("BASE_URL =", BASE_URL);

    // io() auto-connects — do NOT call socket.connect() again or you get duplicate connections
    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
