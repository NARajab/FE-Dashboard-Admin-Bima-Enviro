export type Login = {
  username: string;
  password: string;
  token: string;
};

export type SendEmail = {
  email: string;
};

export type ResetPassword = {
  newPassword: string;
  token: string;
};

export type ChangePassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
