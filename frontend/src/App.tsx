import { Route, Routes, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

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
        {isCheckingAuth ? (
          <PageLoader />
        ) : (
          <Routes>
            <Route
              path="/"
              element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default App;
