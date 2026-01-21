import { create } from "zustand";
import type { SignUpForm, User } from "../lib/type";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/utils";

interface AuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  isSigningUp: boolean;
  signUp: (data: SignUpForm) => void;
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
}));
