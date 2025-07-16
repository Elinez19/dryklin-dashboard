import { axiosClient } from '../api/axiosClient';

export interface IUserStats {
  profileUpdatesPerMonth: number;
  ordersPlacedPerMonth: number;
  newUsersPerMonth: number;
  monthlyLogins: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface IAnalyticsResponse {
  status?: string;
  data?: number | string | object;
  message?: string;
}

// Fetch all analytics data from the user stats endpoints
export const getAnalyticsData = async (): Promise<IUserStats> => {
  try {
    // Fetch all the required data in parallel
    const [
      profileUpdatesResponse,
      ordersPlacedResponse,
      newUsersResponse,
      monthlyLoginsResponse,
      completedOrdersResponse,
      cancelledOrdersResponse
    ] = await Promise.allSettled([
      axiosClient.get("/api/user-stats/profile-updates-per-month"),
      axiosClient.get("/api/user-stats/orders-placed-per-month"),
      axiosClient.get("/api/user-stats/new-users-per-month"),
      axiosClient.get("/api/user-stats/monthly-logins"),
      axiosClient.get("/api/user-stats/completed-orders"),
      axiosClient.get("/api/user-stats/cancelled-orders")
    ]);

    // Extract data from responses with fallback to 0 if request fails
    const profileUpdatesPerMonth = profileUpdatesResponse.status === 'fulfilled' ? 
      (profileUpdatesResponse.value.data?.data || profileUpdatesResponse.value.data || 0) : 0;
    
    const ordersPlacedPerMonth = ordersPlacedResponse.status === 'fulfilled' ? 
      (ordersPlacedResponse.value.data?.data || ordersPlacedResponse.value.data || 0) : 0;
    
    const newUsersPerMonth = newUsersResponse.status === 'fulfilled' ? 
      (newUsersResponse.value.data?.data || newUsersResponse.value.data || 0) : 0;
    
    const monthlyLogins = monthlyLoginsResponse.status === 'fulfilled' ? 
      (monthlyLoginsResponse.value.data?.data || monthlyLoginsResponse.value.data || 0) : 0;
    
    const completedOrders = completedOrdersResponse.status === 'fulfilled' ? 
      (completedOrdersResponse.value.data?.data || completedOrdersResponse.value.data || 0) : 0;
    
    const cancelledOrders = cancelledOrdersResponse.status === 'fulfilled' ? 
      (cancelledOrdersResponse.value.data?.data || cancelledOrdersResponse.value.data || 0) : 0;

    console.log('Analytics data:', {
      profileUpdatesPerMonth,
      ordersPlacedPerMonth,
      newUsersPerMonth,
      monthlyLogins,
      completedOrders,
      cancelledOrders
    });

    return {
      profileUpdatesPerMonth,
      ordersPlacedPerMonth,
      newUsersPerMonth,
      monthlyLogins,
      completedOrders,
      cancelledOrders
    };
  } catch (error: unknown) {
    console.error('getAnalyticsData error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch analytics data";
    throw new Error(errorMessage);
  }
}; 