import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useOrders';

const ConfirmOrderExample: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<string>('');
  const { confirmOrder, loading, error } = useOrders();

  const handleConfirmOrder = async () => {
    if (!orderId.trim()) {
      setResult('Please enter an order ID');
      return;
    }

    try {
      setResult('Confirming order...');
      const confirmedOrder = await confirmOrder(orderId);
      setResult(`Order ${orderId} confirmed successfully! New status: ${confirmedOrder.orderStatus}`);
      setOrderId('');
    } catch (err) {
      setResult(`Error confirming order: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Confirm Order Example</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
            Order ID
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter order ID to confirm"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <Button
          onClick={handleConfirmOrder}
          disabled={loading || !orderId.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? 'Confirming...' : 'Confirm Order'}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">{result}</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-2">How it works:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Enter an order ID in the input field</li>
          <li>• Click "Confirm Order" to call the API</li>
          <li>• The order status will be updated from PENDING to the next status</li>
          <li>• The order will be removed from pending orders list</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfirmOrderExample; 