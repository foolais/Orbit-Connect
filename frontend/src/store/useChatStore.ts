import { create } from "zustand";
import type { Contact, ITab, MessageData, Messages } from "../lib/type";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/utils";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

interface ChatState {
  allContact: Contact[];
  chats: Contact[];
  messages: Messages[];
  activeTab: ITab;
  selectedUser: Contact | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSendingMessage: boolean;
  setActiveTab: (tab: ITab) => void;
  setSelectedUser: (selectedUser: Contact | null) => void;
  getAllContacts: () => void;
  getMyChatPartners: () => void;
  getMessagesByUserId: (userId: string) => void;
  sendMessages: (messageData: MessageData) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  allContact: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

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
  sendMessages: async (messageData: MessageData) => {
    set({ isSendingMessage: true });
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    if (authUser?._id === undefined || selectedUser?._id === undefined) {
      toast.error("User information is missing.");
      set({ isSendingMessage: false });
      return;
    }

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id || "",
      receiverId: selectedUser?._id || "",
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date(),
      updatedAt: new Date(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      set({ messages: messages });
      console.log("Error in Send Messages", error);
      toast.error(getErrorMessage(error));
    } finally {
      set({ isSendingMessage: false });
    }
  },
}));
