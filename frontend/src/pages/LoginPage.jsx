import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import GalileoRightPanel from "../components/GalileoRightPanel";
import { LoaderIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn, loginWithGoogle } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    <div className="min-h-screen min-h-dvh w-full flex items-center justify-center px-3 py-6 sm:p-8 relative overflow-x-hidden overflow-y-auto" style={{ backgroundColor: "#F4F4EE", color: "#0f172a" }}>
      {/* FULL CANVAS ELEGANT WAVY LINES SVG PATTERN */}
      <svg
        className="absolute inset-0 size-full pointer-events-none"
        style={{ opacity: 0.75, color: "#e2e1d0" }}
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

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between lg:min-h-[650px] relative z-10">

        {/* FORM COLUMN - LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-0 sm:p-6">
          <div className="w-full max-w-[420px] rounded-2xl p-6 sm:p-8 transition-all duration-300" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(226,232,240,0.6)", boxShadow: "0 8px 30px rgb(0,0,0,0.04)" }}>
            {/* HEADING TEXT */}
            <div className="text-center mb-5">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
                Welcome to VChat!
              </h2>
              <p className="text-sm mt-1.5 font-medium" style={{ color: "#64748b" }}>
                Get started for free, work email required
              </p>
            </div>

            {/* SIGN UP WITH GOOGLE */}
            <div className="mb-4">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer text-sm"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
                disabled={isLoggingIn}
              >
                <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>

            {/* DIVIDER */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid #e2e8f0" }} />
              </div>
              <span className="relative px-3 text-xs font-medium lowercase" style={{ backgroundColor: "#ffffff", color: "#94a3b8" }}>
                or
              </span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#334155" }}>
                  Work email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none transition-colors"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#0f172a" }}
                  placeholder="Enter your email address"
                  onFocus={e => e.target.style.outline = "2px solid #8b5cf6"}
                  onBlur={e => e.target.style.outline = "none"}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#334155" }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none transition-colors"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#0f172a" }}
                    placeholder="Enter 8 or more characters"
                    onFocus={e => e.target.style.outline = "2px solid #8b5cf6"}
                    onBlur={e => e.target.style.outline = "none"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                    style={{ color: "#94a3b8" }}
                  >
                    {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                className="w-full text-white rounded-xl py-3 font-semibold transition-all cursor-pointer disabled:opacity-70 mt-2 text-sm"
                style={{ backgroundColor: "#8b5cf6", boxShadow: "0 4px 14px rgba(139,92,246,0.25)" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7c3aed"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#8b5cf6"}
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <LoaderIcon className="w-full h-5 animate-spin text-center" /> : "Sign in"}
              </button>
            </form>

            {/* SWITCH LINK */}
            <div className="mt-4 text-center text-xs font-medium" style={{ color: "#475569" }}>
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold underline underline-offset-2" style={{ color: "#0f172a" }}>
                Sign up
              </Link>
            </div>

            {/* TERMS FOOTER */}
            <p className="mt-4 text-center text-[11px] leading-relaxed" style={{ color: "#94a3b8" }}>
              By signing up, you agree to our{" "}
              <Link to="/terms" className="underline" style={{ color: "#94a3b8" }}>Terms & Conditions</Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline" style={{ color: "#94a3b8" }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <GalileoRightPanel />
      </div>
    </div>
  );
}

export default LoginPage;
