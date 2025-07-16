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

/**
 * Confirm an order with retry mechanism
 * @param orderId - The ID of the order to confirm
 * @param retries - Number of retry attempts (default: 1)
 * @returns Promise with confirmed order data
 */
export const confirmOrder = async (orderId: string, retries: number = 1): Promise<IOrder> => {
  const attemptConfirm = async (attempt: number): Promise<IOrder> => {
    try {
      // Use PUT method for confirm order endpoint
      const response = await axiosClient.put<IOrdersResponse>(`/api/v1/laundry/confirm-order/${orderId}`);
      
      const { data } = response;
      
      // Handle both response formats:
      // 1. Direct order object: { id: "0000004", customerId: "...", ... }
      // 2. Wrapped response: { httpStatus: "SUCCESS", data: { order object } }
      
      if (data && typeof data === 'object') {
        // Check if it's a direct order object (has id, customerId, etc.)
        if ('id' in data && 'customerId' in data && 'sessionId' in data) {
          return data as unknown as IOrder;
        }
        
        // Check if it's a wrapped response
        if ('httpStatus' in data && 'data' in data) {
          const responseData = data as IOrdersResponse;
          if (responseData.httpStatus === "100 CONTINUE" || responseData.httpStatus === "ACCEPTED" || responseData.httpStatus === "SUCCESS") {
            if (Array.isArray(responseData.data)) {
              return responseData.data[0] as IOrder;
            }
            return responseData.data as IOrder;
          } else {
            throw new Error(responseData.message || "Failed to confirm order");
          }
        }
      }
      
      // If we get here, the response format is unexpected
      throw new Error("Unexpected response format from server");
    } catch (error: unknown) {
      // Enhanced error handling for better debugging
      let errorMessage = "Failed to confirm order";
      let shouldRetry = false;
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { 
          response?: { 
            status: number; 
            data?: { message?: string } 
          };
          code?: string;
          message?: string;
        };
        const response = axiosError.response;
        
        if (response) {
          if (response.status === 500) {
            errorMessage = "Server error: The server encountered an internal error while processing your request. Please try again later.";
            shouldRetry = attempt < retries; // Retry on 500 errors
          } else if (response.status === 404) {
            errorMessage = "Order not found: The specified order could not be found.";
          } else if (response.status === 400) {
            errorMessage = response.data?.message || "Bad request: Invalid order data.";
          } else if (response.status === 403) {
            errorMessage = "Access denied: You don't have permission to confirm this order.";
          } else if (response.status === 401) {
            errorMessage = "Unauthorized: Please log in again.";
          } else {
            errorMessage = response.data?.message || `Server error (${response.status}): Please try again.`;
            shouldRetry = attempt < retries; // Retry on other server errors
          }
        } else if (axiosError.code === 'ECONNABORTED') {
          errorMessage = "Request timeout: The server took too long to respond. Please try again.";
          shouldRetry = attempt < retries; // Retry on timeout
        } else if (axiosError.message === 'Network Error') {
          errorMessage = "Network error: Unable to connect to the server. Please check your internet connection.";
          shouldRetry = attempt < retries; // Retry on network errors
        } else {
          errorMessage = axiosError.message || "An unexpected error occurred.";
        }
      }
      
      if (shouldRetry) {
        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return attemptConfirm(attempt + 1);
      }
      
      throw new Error(errorMessage);
    }
  };
  
  return attemptConfirm(1);
};

 