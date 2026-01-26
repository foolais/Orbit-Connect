import { create } from "zustand";
import type { Contact, ITab, Messages } from "../lib/type";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/utils";
import { axiosInstance } from "../lib/axios";

interface ChatState {
  allContact: Contact[];
  chats: Contact[];
  messages: Messages[];
  activeTab: ITab;
  selectedUser: Contact | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  setActiveTab: (tab: ITab) => void;
  setSelectedUser: (selectedUser: Contact | null) => void;
  getAllContacts: () => void;
  getMyChatPartners: () => void;
  getMessagesByUserId: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  allContact: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContact: res.data });
    } catch (error) {
      console.log("Error in Get All Contats", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.log("Error in Get Chats", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
      console.log({ data: res.data });
    } catch (error) {
      console.log("Error in Get Messages", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
