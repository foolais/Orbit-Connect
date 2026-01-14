import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
      {/* Grid Dots */}
      <div
        className="pointer-events-none absolute inset-0 z-10
           bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1.5px,transparent_1.5px)]
           bg-size-[25px_25px]"
      />
      <div className="relative z-20">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
