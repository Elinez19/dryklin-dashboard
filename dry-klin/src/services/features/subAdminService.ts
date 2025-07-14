import { axiosClient } from "@/services/api/axiosClient";

// Sub-admin types
export interface ISubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetAllSubAdminsResponse {
  message: string;
  status: string;
  data: ISubAdmin[];
  debugMessage?: string;
  dateTime: string;
}

export const GetAllSubAdmins = async (): Promise<ISubAdmin[]> => {
  try {
    const response = await axiosClient.get<IGetAllSubAdminsResponse>("/api/v1/auth/get-all-subadmins");
    const { data } = response;
    if (data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS") {
      return data.data || [];
    } else {
      throw new Error(data.message || "Failed to fetch sub-admins");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch sub-admins";
    throw new Error(errorMessage);
  }
};

// Future: add, edit, delete subadmin API functions here 