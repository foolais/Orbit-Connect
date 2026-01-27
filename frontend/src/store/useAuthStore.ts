import { create } from "zustand";
import type { LoginForm, SignUpForm, User } from "../lib/type";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/utils";

interface AuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  isSigningUp: boolean;
  signUp: (data: SignUpForm) => void;
  isLoggingIn: boolean;
  login: (data: LoginForm) => void;
  logout: () => void;
  updateProfile: (data: { profilePic: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in AuthCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  isSigningUp: false,
  signUp: async (data: SignUpForm) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in Sign Up", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isSigningUp: false });
    }
  },
  isLoggingIn: false,
  login: async (data: LoginForm) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in Login", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error(getErrorMessage(error));
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in Update profile", error);
      toast.error("Failed to update profile");
    }
  },
}));
