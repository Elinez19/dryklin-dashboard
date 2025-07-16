import { useState, useEffect, useCallback } from 'react';
import { getAllOrders, getOrderById, updateOrder, getOrderHistory, createPendingOrder, getPendingOrders, confirmOrder } from '@/services/features/orderService';
import { IOrder, IPendingOrderRequest } from '@/types/dashboard_types';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderHistory, setOrderHistory] = useState<IOrder[]>([]);
  const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderHistory();
      setOrderHistory(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order history';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPendingOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPendingOrders();
      setPendingOrders(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pending orders';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (orderId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderById(orderId);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, updates: Partial<IOrder>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedOrder = await updateOrder(orderId, updates);
      
      // Update the orders list with the updated order
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewPendingOrder = useCallback(async (orderData: IPendingOrderRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newOrder = await createPendingOrder(orderData);
      
      // Add the new order to the orders list
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create pending order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOrderById = useCallback(async (orderId: string, retries: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const confirmedOrder = await confirmOrder(orderId, retries);
      
      // Update the orders list with the confirmed order
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? confirmedOrder : order
        )
      );
      
      // Update order history list with the confirmed order
      setOrderHistory(prevOrderHistory => 
        prevOrderHistory.map(order => 
          order.id === orderId ? confirmedOrder : order
        )
      );
      
      // Update pending orders list if it exists
      setPendingOrders(prevPendingOrders => 
        prevPendingOrders.filter(order => order.id !== orderId)
      );
      
      return confirmedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    orderHistory,
    pendingOrders,
    loading,
    error,
    fetchOrders,
    fetchOrderHistory,
    fetchPendingOrders,
    fetchOrderById,
    updateOrderStatus,
    createPendingOrder: createNewPendingOrder,
    confirmOrder: confirmOrderById,
  };
}; 