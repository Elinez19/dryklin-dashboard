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
    const extractValue = (response: PromiseSettledResult<{ data: unknown }>): number => {
      if (response.status !== 'fulfilled') return 0;
      
      const data = response.value.data;
      console.log('Raw response data:', data);
      
      // Handle different response formats
      if (typeof data === 'number') return data;
      if (typeof data === 'string') return parseInt(data) || 0;
      if (data && typeof data === 'object') {
        const dataObj = data as Record<string, unknown>;
        // If data has a 'data' property
        if (dataObj.data !== undefined) {
          const value = dataObj.data;
          if (typeof value === 'number') return value;
          if (typeof value === 'string') return parseInt(value) || 0;
        }
        // If data has a 'value' property
        if (dataObj.value !== undefined) {
          const value = dataObj.value;
          if (typeof value === 'number') return value;
          if (typeof value === 'string') return parseInt(value) || 0;
        }
        // If data has a 'count' property
        if (dataObj.count !== undefined) {
          const value = dataObj.count;
          if (typeof value === 'number') return value;
          if (typeof value === 'string') return parseInt(value) || 0;
        }
      }
      
      return 0;
    };

    const profileUpdatesPerMonth = extractValue(profileUpdatesResponse);
    const ordersPlacedPerMonth = extractValue(ordersPlacedResponse);
    const newUsersPerMonth = extractValue(newUsersResponse);
    const monthlyLogins = extractValue(monthlyLoginsResponse);
    const completedOrders = extractValue(completedOrdersResponse);
    const cancelledOrders = extractValue(cancelledOrdersResponse);

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