import { useEffect } from "react";
import { XIcon, DownloadIcon } from "lucide-react";

function ImageLightbox({ src, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* Stop click propagation on the image so clicking the image itself doesn't close */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Full size"
          className="rounded-2xl object-contain max-w-[90vw] max-h-[80vh]"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}
        />

        {/* Controls */}
        <div className="flex gap-3">
          <a
            href={src}
            download
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all"
            style={{ backgroundColor: "#8b5cf6" }}
            onClick={(e) => e.stopPropagation()}
          >
            <DownloadIcon className="size-4" />
            Download
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
          >
            <XIcon className="size-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
