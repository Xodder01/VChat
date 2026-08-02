import { MessageCircleIcon, SparklesIcon, CheckCircle2Icon } from "lucide-react";

function AuthRightPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-indigo-100/90 via-purple-50 to-sky-100/90 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 p-8 flex-col justify-between overflow-hidden border-l border-indigo-100/60 dark:border-slate-800 transition-colors duration-300">
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-10 right-10 size-64 bg-indigo-300/30 dark:bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-64 bg-purple-300/30 dark:bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* TOP HEADER / BRAND */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-600 dark:bg-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            <MessageCircleIcon className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              VChat
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Real-time messaging platform
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/10 text-indigo-700 dark:bg-cyan-500/10 dark:text-cyan-300 border border-indigo-200 dark:border-cyan-500/30">
          <SparklesIcon className="size-3.5" /> v2.4 Live
        </span>
      </div>

      {/* CENTER - CHAT PREVIEW (Inspired by Image 2, rendered in modern Light theme) */}
      <div className="relative z-10 my-auto py-6 space-y-4 max-w-lg mx-auto w-full">
        {/* Message 1 (Left - Alex) */}
        <div className="flex items-start gap-3 transform hover:-translate-y-0.5 transition-transform">
          <div className="size-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0">
            A
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-indigo-100 dark:border-slate-700/60 p-3.5 rounded-2xl rounded-tl-xs shadow-sm max-w-[80%]">
            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
              Hey! Just finished testing the new dashboard 🚀
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block text-right font-mono">
              10:42 AM
            </span>
          </div>
        </div>

        {/* Message 2 (Right - Sarah) */}
        <div className="flex items-start justify-end gap-3 transform hover:-translate-y-0.5 transition-transform">
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md shadow-indigo-500/15 max-w-[80%]">
            <p className="text-sm font-medium leading-relaxed">
              It looks incredible — shipping today?
            </p>
            <span className="text-[10px] text-indigo-200 mt-1 block text-right font-mono">
              10:43 AM
            </span>
          </div>
          <div className="size-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0">
            S
          </div>
        </div>

        {/* Message 3 (Left - Alex) */}
        <div className="flex items-start gap-3 transform hover:-translate-y-0.5 transition-transform">
          <div className="size-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0">
            A
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-indigo-100 dark:border-slate-700/60 p-3.5 rounded-2xl rounded-tl-xs shadow-sm max-w-[80%]">
            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
              Already deployed. 47ms response time ⚡
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block text-right font-mono">
              10:44 AM
            </span>
          </div>
        </div>

        {/* Message 4 (Right - Sarah) */}
        <div className="flex items-start justify-end gap-3 transform hover:-translate-y-0.5 transition-transform">
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md shadow-indigo-500/15 max-w-[80%]">
            <p className="text-sm font-medium leading-relaxed">
              That's insane! Team will love this!
            </p>
            <span className="text-[10px] text-indigo-200 mt-1 block text-right font-mono">
              10:44 AM
            </span>
          </div>
          <div className="size-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0">
            S
          </div>
        </div>
      </div>

      {/* BOTTOM TESTIMONIAL & TRUST BADGES */}
      <div className="relative z-10 pt-4 border-t border-indigo-100/80 dark:border-slate-800">
        <blockquote className="italic font-serif text-slate-800 dark:text-slate-200 text-base mb-3">
          "The fastest way to keep your team in sync."
        </blockquote>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="inline-block size-7 rounded-full ring-2 ring-white dark:ring-slate-900 bg-teal-400" />
              <span className="inline-block size-7 rounded-full ring-2 ring-white dark:ring-slate-900 bg-indigo-500" />
              <span className="inline-block size-7 rounded-full ring-2 ring-white dark:ring-slate-900 bg-purple-500" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Trusted by 4,200+ teams
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="auth-badge">Free</span>
            <span className="auth-badge">Easy Setup</span>
            <span className="auth-badge">Private</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRightPanel;
