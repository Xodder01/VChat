function GalileoRightPanel() {
  return (
    <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center lg:items-start px-6 py-8 lg:p-12 overflow-hidden select-none">
      <div className="relative z-10 max-w-lg mx-auto w-full space-y-8 lg:space-y-10 lg:pl-6">
        {/* BRAND LOGO & NAME */}
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center" style={{ color: "#ea580c" }}>
            <svg viewBox="0 0 24 24" className="size-8 fill-current">
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
            </svg>
          </div>
          <span className="text-3xl font-semibold tracking-tight font-sans" style={{ color: "#0f172a" }}>
            VChat
          </span>
        </div>

        {/* FEATURE POINTS */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: "#1e293b" }} />
            <span className="text-sm font-medium" style={{ color: "#334155" }}>
              10x faster messaging
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: "#1e293b" }} />
            <span className="text-sm font-medium" style={{ color: "#334155" }}>
              Ship reliable real-time chats
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: "#1e293b" }} />
            <span className="text-sm font-medium" style={{ color: "#334155" }}>
              End-to-end private &amp; secure conversations
            </span>
          </div>
        </div>

        {/* TRUSTED BY SECTION */}
        <div className="pt-6 space-y-6" style={{ borderTop: "1px solid rgba(226,232,240,0.8)" }}>
          <h4 className="text-base font-semibold" style={{ color: "#1e293b" }}>
            Loved by many, trusted by many
          </h4>
        </div>
      </div>
    </div>
  );
}

export default GalileoRightPanel;
