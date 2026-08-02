import { useThemeStore } from "../store/useThemeStore";

function formatDateLabel(date) {
  const today = new Date();
  const msgDate = new Date(date);

  const isToday =
    today.getDate() === msgDate.getDate() &&
    today.getMonth() === msgDate.getMonth() &&
    today.getFullYear() === msgDate.getFullYear();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    yesterday.getDate() === msgDate.getDate() &&
    yesterday.getMonth() === msgDate.getMonth() &&
    yesterday.getFullYear() === msgDate.getFullYear();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return msgDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: msgDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
}

function DateSeparator({ date }) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const labelColor = isDark ? "#64748b" : "#94a3b8";
  const lineColor = isDark ? "rgba(51,65,85,0.6)" : "rgba(226,232,240,0.8)";

  return (
    <div className="flex items-center gap-3 my-3 px-2">
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
      <span
        className="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
        style={{ color: labelColor, border: `1px solid ${lineColor}` }}
      >
        {formatDateLabel(date)}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
    </div>
  );
}

export default DateSeparator;
