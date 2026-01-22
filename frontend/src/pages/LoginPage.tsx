import { useState, type FormEvent } from "react";
import type { LoginForm } from "../lib/type";
import { LoaderIcon, Lock, Mail, Send } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="main-card">
      <div className="main-container auth-container">
        {/* LEFT SIDE */}
        <div className="auth-form-container">
          <div className="auth-form-content">
            {/* HEADING */}
            <div className="text-center mb-8">
              <img src="/logo.png" className="size-30 mx-auto" />
              <h2 className="auth-heading"> Good to See You Again 👋</h2>
              <p className="text-slate-400 max-w-70">
                Log in to continue your journey
              </p>
            </div>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form grid-rows-2">
              <div>
                <label htmlFor="email" className="label mb-1">
                  <span className="label-text text-sm">Email</span>
                </label>
                <div className="auth-input">
                  <Mail className="auth-input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="grow"
                    placeholder="johndoen@mail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="label mb-1">
                  <span className="label-text text-sm">Password</span>
                </label>
                <div className="auth-input">
                  <Lock className="auth-input-icon" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="grow"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* SUBMIT BUTTON */}
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                ) : (
                  <>
                    <span>Login</span>
                    <Send className="size-5" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/signup" className="btn btn-soft btn-primary btn-sm">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="auth-image-container">
          <div>
            <img
              src="/login.png"
              alt="login images"
              className="w-full h-auto object-contain"
            />
            <h3 className="text-center text-xl text-primary mt-4">
              Access Your Messages
            </h3>
            <div className="mt-4 flex justify-center gap-4">
              <span className="btn btn-primary btn-sm">Free to Start</span>
              <span className="btn btn-primary btn-sm">Easy Setup</span>
              <span className="btn btn-primary btn-sm">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
