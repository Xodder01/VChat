import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, SunIcon, MoonIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const { theme, toggleTheme } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const isDark = theme === "dark";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const headerBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const iconColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div
      className="p-4 space-y-3.5"
      style={{ borderBottom: `1px solid ${borderColor}`, backgroundColor: headerBg }}
    >
      {/* BRAND LOGO HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight font-sans" style={{ color: textColor }}>
            VChat
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-1 items-center">
          {/* THEME TOGGLE */}
          <button
            className="p-1.5 rounded-xl transition-all cursor-pointer"
            style={{ color: iconColor }}
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <SunIcon className="size-4" style={{ color: "#f59e0b" }} />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </button>

          {/* SOUND TOGGLE */}
          <button
            className="p-1.5 rounded-xl transition-all cursor-pointer"
            style={{ color: iconColor }}
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log("Audio play failed:", e));
              toggleSound();
            }}
            title={isSoundEnabled ? "Mute Sounds" : "Enable Sounds"}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-4" />
            ) : (
              <VolumeOffIcon className="size-4" style={{ color: "#f43f5e" }} />
            )}
          </button>

          {/* LOGOUT */}
          <button
            className="p-1.5 rounded-xl transition-all cursor-pointer"
            style={{ color: iconColor }}
            onClick={logout}
            title="Log Out"
          >
            <LogOutIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* USER PROFILE INFO */}
      <div className="flex items-center gap-3 pt-1">
        <div className="avatar online">
          <button
            className="size-11 rounded-full overflow-hidden relative group cursor-pointer"
            style={{ boxShadow: "0 0 0 2px rgba(139,92,246,0.3)" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="User image"
              className="size-full object-cover"
            />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <span className="text-white text-[10px] font-semibold">Edit</span>
            </div>
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm truncate" style={{ color: textColor }}>
            {authUser?.fullName}
          </h3>
          <p className="text-xs font-medium flex items-center gap-1.5 mt-0.5" style={{ color: "#10b981" }}>
            <span className="size-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: "#10b981" }} />
            Online
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
