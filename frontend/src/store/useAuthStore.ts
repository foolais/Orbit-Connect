import { create } from "zustand";
import type { User } from "../lib/type";

interface AuthState {
  authUser: User;
  isLoggedIn: boolean;
  login: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: {
    fullName: "John Doe",
    email: "johndoe@doe.com",
    password: "123",
    profilePic: "",
  },
  isLoggedIn: false,
  login: () => {
    console.log("Logged In");
    set({ isLoggedIn: true });
  },
}));
