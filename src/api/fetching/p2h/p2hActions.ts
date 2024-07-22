import api from '../../url_api';
import { P2h } from '../../../api/fetching/p2h/type';

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
  p2h: Array<{
    id: number;
    name: string;
    userId: number;
    p2hId: number;
    dValidation: boolean;
    mValidation: boolean;
    fValidation: boolean;
    aValidation: boolean;
    createdAt: string;
    updatedAt: string;
    P2h: {
      id: number;
      idVehicle: number;
      idAroundUnit: number;
      idInTheCabin: number;
      idMachineRoom: number;
      idLocation: number | null;
      ntsAroundU: string | null;
      ntsInTheCabinU: string | null;
      ntsMachineRoom: string | null;
      modelu: string;
      nou: string;
      date: string;
      shift: string;
      time: string;
      earlyhm: string;
      endhm: string;
      earlykm: string | null;
      endkm: string | null;
      kbj: string;
      jobsite: string | null;
      location: string | null;
      createdAt: string;
      updatedAt: string;
      Vehicle: {
        id: number;
        type: string;
        createdAt: string;
        updatedAt: string;
      };
    };
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
  }>;
  status: string;
}

export const getAllP2h = async (): Promise<P2hResponse> => {
  try {
    const res = await api.get('/p2h/all');
    return res.data;
  } catch (err) {
    console.error('Get P2H error:', err);
    throw err;
  }
};

interface ValidateResponse {
  id: number;
  message: string;
}

export const validateAdmin = async (
  p2hData: P2h,
): Promise<ValidateResponse> => {
  try {
    const response = await api.patch(`/p2h/validate/${p2hData.id}`);

    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};
