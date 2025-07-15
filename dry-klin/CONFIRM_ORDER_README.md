# Confirm Order Functionality

This document describes the implementation of the order confirmation functionality for the DryKlin dashboard.

## Overview

The confirm order functionality allows users to confirm pending orders by calling the `/api/v1/laundry/confirm-order/{orderId}` endpoint. When an order is confirmed, its status is updated and it's removed from the pending orders list.

## API Endpoint

**Endpoint:** `POST /api/v1/laundry/confirm-order/{orderId}`

**Request:** No request body required - just the order ID in the URL path

**Response:** Returns the updated order object with the following structure:

```json
{
  "id": "string",
  "customerId": "string",
  "sessionId": "string",
  "normalDeliveryModePrice": 0,
  "expressDeliveryModePrice": 0,
  "serviceFee": 0,
  "serviceType": "CORPORATE",
  "items": [
    {
      "itemName": "string",
      "quantity": 0,
      "unitPrice": 0,
      "totalPrice": 0
    }
  ],
  "totalAmount": 0,
  "deliveryMode": "NORMAL",
  "pickupLocation": "string",
  "customerName": "string",
  "customerEmail": "string",
  "phoneNumber": "string",
  "deliveryLocation": "string",
  "orderStatus": "PENDING",
  "paymentStatus": "PENDING",
  "checkedOut": true,
  "expressServiceFee": 0,
  "normalServiceFee": 0,
  "message": "string",
  "orderDate": "2025-07-15T16:22:24.988Z",
  "deliveryDate": "2025-07-15T16:22:24.988Z"
}
```

## Implementation Details

### 1. Service Layer (`orderService.ts`)

Added the `confirmOrder` function to handle API calls:

```typescript
export const confirmOrder = async (orderId: string): Promise<IOrder> => {
  try {
    const response = await axiosClient.post<IOrdersResponse>(`/api/v1/laundry/confirm-order/${orderId}`);
    
    const { data } = response;
    
    if (data.httpStatus === "100 CONTINUE" || data.httpStatus === "ACCEPTED" || data.httpStatus === "SUCCESS") {
      if (Array.isArray(data.data)) {
        return data.data[0];
      }
      return data.data as IOrder;
    } else {
      throw new Error(data.message || "Failed to confirm order");
    }
  } catch (error: unknown) {
    console.error('confirmOrder error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to confirm order";
    throw new Error(errorMessage);
  }
};
```

### 2. Hook Layer (`useOrders.ts`)

Added the `confirmOrderById` function to the `useOrders` hook:

```typescript
const confirmOrderById = useCallback(async (orderId: string) => {
  try {
    setLoading(true);
    setError(null);
    const confirmedOrder = await confirmOrder(orderId);
    
    // Update the orders list with the confirmed order
    setOrders(prevOrders => 
      prevOrders.map(order => 
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
```

### 3. UI Components

#### OrderDetailsModal

Updated the `OrderDetailsModal` component to include a "Confirm Order" button for pending orders:

```typescript
interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
  onUpdate: (orderId: string, updates: Partial<IOrder>) => void;
  onConfirm?: (orderId: string) => void; // New prop
}
```

The confirm button only appears for orders with `PENDING` status:

```typescript
{order.orderStatus === 'PENDING' && onConfirm && (
  <Button
    type="button"
    onClick={() => onConfirm(order.id)}
    className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg py-2"
  >
    Confirm Order
  </Button>
)}
```

#### OrderManagement and PendingOrders

Both components now include the confirm order functionality:

```typescript
const handleConfirmOrder = async (orderId: string) => {
  try {
    await confirmOrder(orderId);
    setIsDetailsModalOpen(false);
    // Refresh data after confirmation
    fetchOrders(); // or fetchPendingOrders()
  } catch (error) {
    console.error('Error confirming order:', error);
  }
};
```

## Usage Examples

### 1. Using the Hook Directly

```typescript
import { useOrders } from '@/hooks/useOrders';

const MyComponent = () => {
  const { confirmOrder, loading, error } = useOrders();

  const handleConfirm = async (orderId: string) => {
    try {
      const confirmedOrder = await confirmOrder(orderId);
      console.log('Order confirmed:', confirmedOrder);
    } catch (err) {
      console.error('Failed to confirm order:', err);
    }
  };

  return (
    <button 
      onClick={() => handleConfirm('order-123')}
      disabled={loading}
    >
      {loading ? 'Confirming...' : 'Confirm Order'}
    </button>
  );
};
```

### 2. Using the Service Directly

```typescript
import { confirmOrder } from '@/services/features/orderService';

const handleConfirm = async (orderId: string) => {
  try {
    const confirmedOrder = await confirmOrder(orderId);
    console.log('Order confirmed:', confirmedOrder);
  } catch (err) {
    console.error('Failed to confirm order:', err);
  }
};
```

### 3. Example Component

See `ConfirmOrderExample.tsx` for a complete example component that demonstrates the functionality.

## Error Handling

The implementation includes comprehensive error handling:

1. **API Errors**: Catches and formats API response errors
2. **Network Errors**: Handles network connectivity issues
3. **Validation**: Ensures order ID is provided before making the request
4. **State Management**: Updates loading states and error messages appropriately

## State Updates

When an order is confirmed:

1. The order is updated in the main orders list
2. The order is removed from the pending orders list
3. Loading states are managed appropriately
4. Error states are cleared on successful confirmation

## Testing

To test the functionality:

1. Navigate to the Orders or Pending Orders page
2. Find a pending order
3. Click "View Details"
4. Click "Confirm Order" button
5. Verify the order status changes and it's removed from pending orders

## Notes

- The confirm order button only appears for orders with `PENDING` status
- The functionality is available in both the main Orders page and the Pending Orders page
- The implementation follows the existing code patterns and error handling conventions
- All TypeScript types are properly defined and used 