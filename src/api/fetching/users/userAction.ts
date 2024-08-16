import api from '../../url_api';
import { UpdateUser } from './type';

interface UserResponse {
  status: string;
  users: {
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
  }[];
}

export const getAllUser = async (): Promise<UserResponse> => {
  try {
    const res = await api.get('/user');
    return res.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

interface UpdateUserResponse {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    role: string;
    token: string;
  };
}
export const updateUserData = async (
  updateData: UpdateUser,
): Promise<UpdateUserResponse> => {
  const formData = new FormData();

  // Append form fields
  for (const key in updateData) {
    if (key !== 'imageUrl') {
      const value = updateData[key as keyof UpdateUser];

      if (typeof value === 'string') {
        formData.append(key, value);
      } else if (typeof value === 'number') {
        formData.append(key, value.toString());
      }
    }
  }

  if (updateData.imageUrl instanceof File) {
    formData.append('imageUrl', updateData.imageUrl);
  }

  try {
    const response = await api.patch<UpdateUserResponse>(
      `/user/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${updateData.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};
