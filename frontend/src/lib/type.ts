export interface User {
  email: string;
  fullName: string;
  profilePic?: string;
  timestamps: string;
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
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  timestamps: string;
}

export type ITab = "chats" | "contacts";
