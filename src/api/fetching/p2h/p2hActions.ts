import api from '../../url_api';

interface P2HResponse {
  p2hData: string;
  kkhData: string;
}

export const getAllData = async (): Promise<P2HResponse> => {
  try {
    const res = await api.get('/p2h/p2hkkh');
    return res.data;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};

interface P2hMountlyResponse {
  [data: string]: number;
}

export const getP2hMountly = async (): Promise<P2hMountlyResponse> => {
  try {
    const res = await api.get('/p2h/month');
    return res.data.data;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};

interface P2hWeeklyResponse {
  thisWeek: { [date: string]: number };
  lastWeek: { [date: string]: number };
}

export const getP2hWeekly = async (): Promise<P2hWeeklyResponse> => {
  try {
    const res = await api.get('/p2h/week');
    return res.data.data;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};

interface P2hResponse {
  response: Array<{
    id: number;
    name: string;
    userId: number;
    p2hId: number;
    dValidation: string | null;
    // Add more properties as needed
  }>;
  status: string;
}

export const getAllP2h = async (): Promise<P2hResponse> => {
  try {
    const res = await api.get('/p2h/all');
    return res.data.p2h;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};
