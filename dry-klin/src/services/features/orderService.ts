import { axiosClient } from "@/services/api/axiosClient";
import { IOrder, IOrdersResponse, IPendingOrderRequest, IPendingOrderResponse } from "@/types/dashboard_types";

/**
 * Get all orders
 * @returns Promise with array of orders
 */
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axiosClient.get<IOrdersResponse>("/api/v1/laundry/get-all-orders");
    
    const { data } = response;
    
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
        throw new Error(responseData.message || "Failed to fetch orders");
      }
    } else {
      throw new Error("Invalid response format from server");
    }
    
    return orders;
  } catch (error: unknown) {
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

/**
 * Get order history for the current user
 * @returns Promise with array of order history
 */
export const getOrderHistory = async (): Promise<IOrder[]> => {
  try {
    const response = await axiosClient.get<IOrdersResponse>("/api/v1/laundry/my-order-history");
    
    const { data } = response;
    
    // Handle the specific response format from the API
    let orders: IOrder[] = [];
    
    if (Array.isArray(data)) {
      // Direct array response - this matches the API specification
      orders = data;
    } else if (data && typeof data === 'object' && 'data' in data) {
      // Wrapped response format
      const responseData = data as IOrdersResponse;
      
      if (responseData.httpStatus === "100 CONTINUE" || responseData.httpStatus === "ACCEPTED" || responseData.httpStatus === "SUCCESS") {
        if (Array.isArray(responseData.data)) {
          orders = responseData.data;
        } else {
          throw new Error("Invalid response format: data is not an array");
        }
      } else {
        throw new Error(responseData.message || "Failed to fetch order history");
      }
    } else {
      throw new Error("Invalid response format from server");
    }
    
    return orders;
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch order history";
    throw new Error(errorMessage);
  }
}; 

/**
 * Get pending orders for the current user
 * @returns Promise with array of pending orders
 */
export const getPendingOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axiosClient.get<IOrdersResponse>("/api/v1/laundry/my-pending-orders");
    
    const { data } = response;
    
    // Handle the specific response format from the API
    let orders: IOrder[] = [];
    
    if (Array.isArray(data)) {
      // Direct array response - this matches the API specification
      orders = data;
    } else if (data && typeof data === 'object' && 'data' in data) {
      // Wrapped response format
      const responseData = data as IOrdersResponse;
      
      if (responseData.httpStatus === "100 CONTINUE" || responseData.httpStatus === "ACCEPTED" || responseData.httpStatus === "SUCCESS") {
        if (Array.isArray(responseData.data)) {
          orders = responseData.data;
        } else {
          throw new Error("Invalid response format: data is not an array");
        }
      } else {
        throw new Error(responseData.message || "Failed to fetch pending orders");
      }
    } else {
      throw new Error("Invalid response format from server");
    }
    
    // Filter to only include pending orders
    const pendingOrders = orders.filter(order => order.orderStatus === 'PENDING');
    
    return pendingOrders;
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch pending orders";
    throw new Error(errorMessage);
  }
};

/**
 * Create a pending order
 * @param orderData - The pending order data
 * @returns Promise with created order data
 */
export const createPendingOrder = async (orderData: IPendingOrderRequest): Promise<IOrder> => {
  try {
    const response = await axiosClient.post<IPendingOrderResponse>("/api/v1/laundry/my-pending-orders", orderData);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IOrder;
    } else {
      throw new Error(data.message || "Failed to create pending order");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to create pending order";
    throw new Error(errorMessage);
  }
}; 