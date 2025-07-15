import { axiosClient } from "@/services/api/axiosClient";
import { IOrder, IOrdersResponse } from "@/types/dashboard_types";

/**
 * Get all orders
 * @returns Promise with array of orders
 */
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    console.log('Making API call to /api/v1/laundry/get-all-orders');
    const response = await axiosClient.get<IOrdersResponse>("/api/v1/laundry/get-all-orders");
    
    console.log('API Response:', response);
    const { data } = response;
    
    console.log('Response data:', data);
    
    // Handle both response formats:
    // 1. Direct array: [{ order data }]
    // 2. Wrapped response: { data: [...], httpStatus: "SUCCESS", ... }
    
    let orders: IOrder[] = [];
    
    if (Array.isArray(data)) {
      // Direct array response
      orders = data;
    } else if (data && typeof data === 'object' && 'data' in data) {
      // Wrapped response format
      const responseData = data as IOrdersResponse;
      if (responseData.httpStatus === "100 CONTINUE" || responseData.httpStatus === "ACCEPTED" || responseData.httpStatus === "SUCCESS") {
        orders = Array.isArray(responseData.data) ? responseData.data : [];
      } else {
        console.error('API returned unsuccessful status:', responseData.httpStatus, responseData.message);
        throw new Error(responseData.message || "Failed to fetch orders");
      }
    } else {
      throw new Error("Invalid response format from server");
    }
    
    console.log('Processed orders:', orders);
    return orders;
  } catch (error: unknown) {
    console.error('getAllOrders error:', error);
    
    // Log more details about the error
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown } };
      console.error('Error response:', axiosError.response);
      console.error('Error status:', axiosError.response?.status);
      console.error('Error data:', axiosError.response?.data);
    }
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch orders";
    throw new Error(errorMessage);
  }
};

/**
 * Get order by ID
 * @param orderId - The ID of the order to fetch
 * @returns Promise with order data
 */
export const getOrderById = async (orderId: string): Promise<IOrder> => {
  try {
    const response = await axiosClient.get<IOrdersResponse>(`/api/v1/laundry/orders/${orderId}`);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IOrder;
    } else {
      throw new Error(data.message || "Failed to fetch order");
    }
  } catch (error: unknown) {
    console.error('getOrderById error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch order";
    throw new Error(errorMessage);
  }
};

/**
 * Update order status
 * @param orderId - The ID of the order to update
 * @param updates - The updates to apply to the order
 * @returns Promise with updated order data
 */
export const updateOrder = async (orderId: string, updates: Partial<IOrder>): Promise<IOrder> => {
  try {
    const response = await axiosClient.put<IOrdersResponse>(`/api/v1/laundry/orders/${orderId}`, updates);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IOrder;
    } else {
      throw new Error(data.message || "Failed to update order");
    }
  } catch (error: unknown) {
    console.error('updateOrder error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to update order";
    throw new Error(errorMessage);
  }
}; 