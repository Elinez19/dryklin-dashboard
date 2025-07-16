import { axiosClient } from '../api/axiosClient';

export interface IDashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalServicePartners: number;
  totalDeliveryAgents: number;
}

export interface IDashboardStatsResponse {
  status?: string;
  data?: IDashboardStats;
  message?: string;
}

// Fetch dashboard statistics by aggregating data from different endpoints
export const getDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    // Fetch all the required data in parallel
    const [customersResponse, ordersResponse, servicePartnersResponse, agentsResponse] = await Promise.allSettled([
      axiosClient.get("/api/v1/auth/get-all-users"),
      axiosClient.get("/api/v1/laundry/get-all-orders"),
      axiosClient.get("/api/service-partners/get-all"),
      axiosClient.get("/api/agents/get-all")
    ]);

    // Extract data from responses
    const customers = customersResponse.status === 'fulfilled' ? 
      (Array.isArray(customersResponse.value.data) ? customersResponse.value.data : []) : [];
    
    const orders = ordersResponse.status === 'fulfilled' ? 
      (Array.isArray(ordersResponse.value.data) ? ordersResponse.value.data : 
       (ordersResponse.value.data?.data && Array.isArray(ordersResponse.value.data.data) ? ordersResponse.value.data.data : [])) : [];
    
    const servicePartners = servicePartnersResponse.status === 'fulfilled' ? 
      (Array.isArray(servicePartnersResponse.value.data) ? servicePartnersResponse.value.data :
       (servicePartnersResponse.value.data?.data && Array.isArray(servicePartnersResponse.value.data.data) ? servicePartnersResponse.value.data.data : [])) : [];
    
    const agents = agentsResponse.status === 'fulfilled' ? 
      (Array.isArray(agentsResponse.value.data) ? agentsResponse.value.data :
       (agentsResponse.value.data?.data && Array.isArray(agentsResponse.value.data.data) ? agentsResponse.value.data.data : [])) : [];

    console.log('Dashboard stats data:', {
      customers: customers.length,
      orders: orders.length,
      servicePartners: servicePartners.length,
      agents: agents.length
    });

    return {
      totalUsers: customers.length,
      totalOrders: orders.length,
      totalServicePartners: servicePartners.length,
      totalDeliveryAgents: agents.length
    };
  } catch (error: unknown) {
    console.error('getDashboardStats error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch dashboard statistics";
    throw new Error(errorMessage);
  }
}; 