import { axiosClient } from '../api/axiosClient';

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  customerCode: string;
  phoneNumber: string;
  password: string;
  state: string;
  location: string[];
}

export interface ICustomerResponse {
  status?: string;
  data?: ICustomer[];
  message?: string;
}

export const getAllCustomers = async (): Promise<ICustomer[]> => {
  try {
    const response = await axiosClient.get("/api/v1/auth/get-all-users");
    const { data } = response;
    
    console.log('Raw API response:', data); // Debug log
    
    // Handle different response structures
    if (Array.isArray(data)) {
      // Direct array response - this matches the actual API response
      return data;
    } else if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      // Wrapped response format
      return data.data;
    } else if (data && typeof data === 'object' && 'status' in data) {
      // Response with status field
      const responseData = data as ICustomerResponse;
      if (responseData.status === "100 CONTINUE" || responseData.status === "ACCEPTED" || responseData.status === "SUCCESS") {
        return Array.isArray(responseData.data) ? responseData.data : [];
      } else {
        throw new Error(responseData.message || "Failed to fetch customers");
      }
    }
    
    return [];
  } catch (error: unknown) {
    console.error('getAllCustomers error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch customers";
    throw new Error(errorMessage);
  }
}; 