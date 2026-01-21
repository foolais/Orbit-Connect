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
