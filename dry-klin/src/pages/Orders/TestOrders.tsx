import React from 'react';
import { useOrders } from '@/hooks/useOrders';

const TestOrders: React.FC = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders API Test</h1>
      
      <button 
        onClick={fetchOrders}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Orders
      </button>

      {loading && <div className="text-lg">Loading orders...</div>}
      
      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {orders.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Orders ({orders.length})</h2>
          <div className="space-y-2">
            {orders.map((order) => (
              <div key={order.id} className="border p-4 rounded">
                <div><strong>ID:</strong> {order.id}</div>
                <div><strong>Customer:</strong> {order.customerName}</div>
                <div><strong>Email:</strong> {order.customerEmail}</div>
                <div><strong>Status:</strong> {order.orderStatus}</div>
                <div><strong>Payment:</strong> {order.paymentStatus}</div>
                <div><strong>Total:</strong> ${order.totalAmount}</div>
                <div><strong>Items:</strong> {order.items.length}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-gray-500">No orders found.</div>
      )}
    </div>
  );
};

export default TestOrders; 