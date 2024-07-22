import api from '../../url_api';
import { Login, SendEmail, ResetPassword, ChangePassword } from './type';

interface LoginResponse {
  token: string;
  status: string;
  message: string;
}

export const login = async (authData: Login): Promise<LoginResponse> => {
  try {
    const res = await api.post('/auth/login-admin', {
      username: authData.username,
      password: authData.password,
    });

    sessionStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
};

export interface getMeResponse {
  status: string;
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    role: string;
  };
}

export const getMe = async (): Promise<getMeResponse> => {
  try {
    const token = sessionStorage.getItem('token');
    const res = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Get me error:', error);
    throw error;
  }
};

interface SendEmailResponse {
  status: string;
  message: string;
}

export const sendEmail = async (
  sendData: SendEmail,
): Promise<SendEmailResponse> => {
  try {
    const res = await api.post('/auth/send-email', {
      email: sendData.email,
    });
    return res.data;
  } catch (error) {
    console.error('Send email error:', error);
    throw error;
  }
};

interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (
  resetData: ResetPassword,
): Promise<ResetPasswordResponse> => {
  try {
    const res = await api.post('/auth/reset-password', {
      newPassword: resetData.newPassword,
      token: resetData.token,
    });
    return res.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async (
  changePassData: ChangePassword,
): Promise<ChangePasswordResponse> => {
  try {
    const token = sessionStorage.getItem('token');
    const res = await api.patch(
      '/auth/change-password',
      {
        password: changePassData.password,
        newPassword: changePassData.newPassword,
        confirmPassword: changePassData.confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};
