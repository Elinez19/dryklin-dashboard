import { axiosClient } from "@/services/api/axiosClient";
import { IServiceType, IServiceTypeRequest, IServiceTypesResponse } from "@/types/dashboard_types";

/**
 * Get all service types
 * @returns Promise with array of service types
 */
export const getAllServiceTypes = async (): Promise<IServiceType[]> => {
  try {
    const response = await axiosClient.get<IServiceTypesResponse>("/api/service-types/get-all");
    
    const { data } = response;
    
    // Check if the request was successful
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      return Array.isArray(data.data) ? data.data : [];
    } else {
      throw new Error(data.message || "Failed to fetch service types");
    }
  } catch (error: unknown) {
    console.error('getAllServiceTypes error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch service types";
    throw new Error(errorMessage);
  }
};

/**
 * Add a new service type
 * @param serviceTypeData Service type data to add
 * @returns Promise with the added service type
 */
export const addServiceType = async (serviceTypeData: IServiceTypeRequest): Promise<IServiceType> => {
  try {
    const response = await axiosClient.post<IServiceTypesResponse>("/api/service-types/add-service-type", serviceTypeData);
    
    const { data } = response;
    
    // Check if the request was successful
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      // If data.data is an array, return the first item, otherwise return data.data
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IServiceType;
    } else {
      throw new Error(data.message || "Failed to add service type");
    }
  } catch (error: unknown) {
    console.error('addServiceType error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to add service type";
    throw new Error(errorMessage);
  }
};

/**
 * Update an existing service type
 * @param id Service type ID
 * @param serviceTypeData Service type data to update
 * @returns Promise with the updated service type
 */
export const updateServiceType = async (id: string, serviceTypeData: Partial<IServiceTypeRequest>): Promise<IServiceType> => {
  try {
    const response = await axiosClient.put<IServiceTypesResponse>(`/api/service-types/${id}`, serviceTypeData);
    
    const { data } = response;
    
    // Check if the request was successful
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      // If data.data is an array, return the first item, otherwise return data.data
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IServiceType;
    } else {
      throw new Error(data.message || "Failed to update service type");
    }
  } catch (error: unknown) {
    console.error('updateServiceType error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to update service type";
    throw new Error(errorMessage);
  }
};

/**
 * Delete a service type
 * @param id Service type ID
 * @returns Promise with success message
 */
export const deleteServiceType = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosClient.delete<IServiceTypesResponse>(`/api/service-types/${id}`);
    
    const { data } = response;
    
    // Check if the request was successful
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      return {
        success: true,
        message: data.message || "Service type deleted successfully"
      };
    } else {
      throw new Error(data.message || "Failed to delete service type");
    }
  } catch (error: unknown) {
    console.error('deleteServiceType error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to delete service type";
    throw new Error(errorMessage);
  }
}; 