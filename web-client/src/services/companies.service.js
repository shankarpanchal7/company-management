import axiosInstance from './axios';

const getAllCompanies = async () => {
    try {
        const response = await axiosInstance.get('/companies');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch companies');
    }
};

const createCompany = async (companyData) => {
    try {
        const response = await axiosInstance.post('/companies', companyData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create company');
    }
};

const updateCompany = async (companyId, companyData) => {
    try {
        const response = await axiosInstance.put(`/companies/${companyId}`, companyData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update company');
    }
};

const deleteCompany = async (companyId) => {
    try {
        const response = await axiosInstance.delete(`/companies/${companyId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete company');
    }
};
const assignUserToCompany = async (userId, companyId) => {
    try {
        const response = await api.put(`/companies/${companyId}/assign/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error assigning user to company:', error);
        throw new Error('Error assigning user to company');
    }
};

export { getAllCompanies, createCompany, updateCompany, deleteCompany, assignUserToCompany };
