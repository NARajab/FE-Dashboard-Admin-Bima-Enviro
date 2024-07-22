import api from '../../url_api';

interface KkhMountlyResponse {
  [data: string]: number;
}

export const getKkhMountly = async (): Promise<KkhMountlyResponse> => {
  try {
    const res = await api.get('/kkh/mounth');
    return res.data.data;
  } catch (error) {
    console.error('Get KKH error:', error);
    throw error;
  }
};

interface KkhWeeklyResponse {
  thisWeek: { [date: string]: number };
  lastWeek: { [date: string]: number };
}

export const getKkhWeekly = async (): Promise<KkhWeeklyResponse> => {
  try {
    const res = await api.get('/kkh/week');
    return res.data.data;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};

interface KkhResponse {
  status: string;
  kkh: {
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
  }[];
}

export const getAllKkh = async (): Promise<KkhResponse> => {
  try {
    const res = await api.get('/kkh');
    return res.data;
  } catch (err) {
    console.error('Get KKH error:', err);
    throw err;
  }
};
