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

// Raw API response item type
interface RawSubAdminItem {
  id?: string;
  customerId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  userType?: string;
  status?: string;
  enabled?: boolean;
  lastActive?: string;
  lastLoginDate?: string;
  createdAt?: string;
  dateCreated?: string;
  updatedAt?: string;
  dateUpdated?: string;
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
    const response = await axiosClient.get("/api/v1/auth/get-all-subadmins");
    const { data } = response;
    
    console.log('Raw API response:', data); // Debug log
    
    // Handle different response structures
    if (data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS") {
      // If data.data exists and is an array, use it
      if (data.data && Array.isArray(data.data)) {
        return data.data.map((item: RawSubAdminItem) => ({
          id: item.id || item.customerId || '',
          name: item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown',
          email: item.email || '',
          role: item.role || item.userType || 'SUB_ADMIN',
          status: item.status || item.enabled ? 'ACTIVE' : 'INACTIVE',
          lastActive: item.lastActive || item.lastLoginDate || 'Never',
          createdAt: item.createdAt || item.dateCreated || '',
          updatedAt: item.updatedAt || item.dateUpdated || ''
        }));
      }
      
      // If data is directly an array
      if (Array.isArray(data)) {
        return data.map((item: RawSubAdminItem) => ({
          id: item.id || item.customerId || '',
          name: item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown',
          email: item.email || '',
          role: item.role || item.userType || 'SUB_ADMIN',
          status: item.status || item.enabled ? 'ACTIVE' : 'INACTIVE',
          lastActive: item.lastActive || item.lastLoginDate || 'Never',
          createdAt: item.createdAt || item.dateCreated || '',
          updatedAt: item.updatedAt || item.dateUpdated || ''
        }));
      }
      
      // If data is a single object, wrap it in an array
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const item = data;
        return [{
          id: item.id || item.customerId || '',
          name: item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown',
          email: item.email || '',
          role: item.role || item.userType || 'SUB_ADMIN',
          status: item.status || item.enabled ? 'ACTIVE' : 'INACTIVE',
          lastActive: item.lastActive || item.lastLoginDate || 'Never',
          createdAt: item.createdAt || item.dateCreated || '',
          updatedAt: item.updatedAt || item.dateUpdated || ''
        }];
      }
      
      return [];
    } else {
      throw new Error(data.message || "Failed to fetch sub-admins");
    }
  } catch (error: unknown) {
    console.error('GetAllSubAdmins error:', error); // Debug log
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch sub-admins";
    throw new Error(errorMessage);
  }
};

// Future: add, edit, delete subadmin API functions here 