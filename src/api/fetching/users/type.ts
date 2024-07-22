export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  imageUrl: string;
  role: string;
  isVerified: boolean;
  updatedAt: string;
  createdAt: string;
  Auth: {
    id: number;
    username: string;
    email: string;
    password: string;
    userId: number;
    updatedAt: string;
    createdAt: string;
  };
};

export type UpdateUser = {
  id: number | undefined;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  imageUrl: File | null;
};
