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
