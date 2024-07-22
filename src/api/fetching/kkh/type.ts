export type Kkh = {
  id: number;
  userId: number;
  date: string;
  afterworktime: string | null;
  bedtime: string | null;
  wakeuptime: string | null;
  totaltime: string;
  departuretime: string | null;
  complaint: string;
  wValidation: boolean | null;
  fValidation: boolean | null;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
  User: {
    id: number;
    name: string;
    phoneNumber: string;
    imageUrl: string | null;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
