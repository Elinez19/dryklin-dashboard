import { axiosClient } from "@/services/api/axiosClient";
import { IServicePartner, IServicePartnersResponse } from "@/types/dashboard_types";

export const GetAllServicePartners = async (): Promise<IServicePartner[]> => {
  const response = await axiosClient.get<IServicePartnersResponse>("/api/service-partners/get-all");
  const { data } = response;
  if (data && (data.data || Array.isArray(data))) {
    return Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
  } else {
    throw new Error(data?.message || "Failed to fetch service partners");
  }
};

export const AddServicePartner = async (servicePartnerData: IServicePartner): Promise<IServicePartner> => {
  const response = await axiosClient.post<IServicePartner>("/api/service-partners/add", servicePartnerData);
  if (response && typeof response.data === 'object') {
    return response.data;
  }
  throw new Error("Failed to add service partner: Invalid response format");
};

const servicePartnerService = {
  GetAllServicePartners,
  AddServicePartner,
};

export default servicePartnerService; 