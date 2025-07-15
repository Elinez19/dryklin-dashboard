import { axiosClient } from "@/services/api/axiosClient";
import { IServiceType, IServiceTypeRequest, IServiceTypesResponse } from "@/types/dashboard_types";


/**
 * Get all service types
 * @returns Promise with array of service types
 */
export const getAllServiceTypes = async (): Promise<IServiceType[]> => {
  try {
    const response = await axiosClient.get("/api/service-types/get-all");
    
    const { data } = response;
    
    // Handle both response formats:
    // 1. Direct array: [{ "laundryServiceTypeName": "CORPORATE" }]
    // 2. Wrapped response: { data: [...], httpStatus: "SUCCESS", ... }
    
    let serviceTypes: IServiceType[] = [];
    
    if (Array.isArray(data)) {
      // Direct array response
      serviceTypes = data;
    } else if (data && typeof data === 'object' && 'data' in data) {
      // Wrapped response format
      const responseData = data as IServiceTypesResponse;
      if (responseData.httpStatus === "100 CONTINUE" || responseData.httpStatus === "ACCEPTED" || responseData.httpStatus === "SUCCESS") {
        serviceTypes = Array.isArray(responseData.data) ? responseData.data : [];
      } else {
        throw new Error(responseData.message || "Failed to fetch service types");
      }
    } else {
      throw new Error("Invalid response format from server");
    }
    
    // Process service types to ensure consistent format
    serviceTypes = serviceTypes.map(serviceType => ({
      ...serviceType,
      name: serviceType.laundryServiceTypeName || serviceType.name,
      id: serviceType.id || serviceType.laundryServiceTypeName // Use laundryServiceTypeName as id if id is not provided
    }));
    
    return serviceTypes;
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch service types";
    throw new Error(errorMessage);
  }
};


export const addServiceType = async (serviceTypeData: IServiceTypeRequest): Promise<IServiceType> => {
  try {
    const response = await axiosClient.post<IServiceTypesResponse>("/api/service-types/add-service-type", serviceTypeData);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IServiceType;
    } else {
      throw new Error(data.message || "Failed to add service type");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to add service type";
    throw new Error(errorMessage);
  }
};


export const updateServiceType = async (id: string, serviceTypeData: Partial<IServiceTypeRequest>): Promise<IServiceType> => {
  try {
    const response = await axiosClient.put<IServiceTypesResponse>(`/api/service-types/${id}`, serviceTypeData);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IServiceType;
    } else {
      throw new Error(data.message || "Failed to update service type");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to update service type";
    throw new Error(errorMessage);
  }
};


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
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to delete service type";
    throw new Error(errorMessage);
  }
}; 