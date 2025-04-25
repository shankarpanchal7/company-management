import axiosInstance from './axios';

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

const associateUserWithCompany = async (userId, companyId) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}/associate/${companyId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to associate user with company');
  }
};

export { getAllUsers, createUser, updateUser, deleteUser, associateUserWithCompany };
