export interface User {
  email: string;
  fullName: string;
  profilePic?: string;
  timestamps: string;
  _id: string;
}
export type SignUpForm = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export interface Contact extends User {
  _id: string;
}

export interface Messages {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageData {
  text: string;
  image: string;
}

export type ITab = "chats" | "contacts";
