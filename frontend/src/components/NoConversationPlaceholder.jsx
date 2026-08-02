import { useThemeStore } from "../store/useThemeStore";

const NoConversationPlaceholder = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      className="flex-1 h-full w-full"
      style={{ backgroundColor: isDark ? "#0f172a" : "#FAF9F5" }}
    />
  );
};

export default NoConversationPlaceholder;
