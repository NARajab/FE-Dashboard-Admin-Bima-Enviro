import api from '../../url_api';
import { Login, SendEmail, ResetPassword } from './type';

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

    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
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
