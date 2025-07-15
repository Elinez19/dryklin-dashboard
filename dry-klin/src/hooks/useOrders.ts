import { useState, useEffect } from 'react';
import { getAllOrders, getOrderById, updateOrder } from '@/services/features/orderService';
import { IOrder } from '@/types/dashboard_types';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (orderId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderById(orderId);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      console.error('Error fetching order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, updates: Partial<IOrder>) => {
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
      console.error('Error updating order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
  };
}; 