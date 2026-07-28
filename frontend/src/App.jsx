import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, login, isLoggedIn } = useAuthStore();
  console.log("auth User:", authUser);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <div className="min-h-screen bg-slate-950 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950" />

      <div className="absolute -top-20 -left-20 size-[500px] bg-emerald-600 opacity-30 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 -right-32 size-[550px] bg-teal-500 opacity-25 blur-[130px] rounded-full" />
      <div className="absolute -bottom-32 left-1/4 size-[500px] bg-cyan-700 opacity-25 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 size-[400px] bg-emerald-900 opacity-30 blur-[110px] rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />

      <button onClick={login} className="z-10">
        Login
      </button>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
