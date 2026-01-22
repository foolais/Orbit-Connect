import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import type { SignUpForm } from "../lib/type";
import type { FormEvent } from "react";
import { LoaderIcon, Lock, Mail, Send, UserIcon } from "lucide-react";
import { Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(formData);
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
              <h2 className="auth-heading">Join Us Today</h2>
              <p className="text-slate-400 max-w-70">
                Create your account and start your journey in minutes
              </p>
            </div>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form grid-rows-3">
              <div>
                <label htmlFor="fullName" className="label mb-1">
                  <span className="label-text text-sm">Full Name</span>
                </label>
                <div className="auth-input">
                  <UserIcon className="auth-input-icon" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="grow"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>
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
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <Send className="size-5" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="btn btn-soft btn-primary btn-sm">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="auth-image-container">
          <div>
            <img
              src="/register.png"
              alt="register images"
              className="w-full h-auto object-contain"
            />
            <h3 className="text-center text-xl text-primary mt-4">
              Begin Your Experience Today
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

export default SignUpPage;
