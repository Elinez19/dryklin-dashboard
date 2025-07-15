import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { IOrder } from '@/types/dashboard_types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
  onUpdate: (orderId: string, updates: Partial<IOrder>) => void;
  onConfirm?: (orderId: string) => void;
}

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdate, onConfirm }: OrderDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<IOrder | null>(null);

  // Initialize edited order when modal opens
  useState(() => {
    if (order) {
      setEditedOrder(order);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedOrder && order) {
      onUpdate(order.id, editedOrder);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editedOrder) {
      setEditedOrder(prev => ({
        ...prev!,
        [name]: value
      }));
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#FF5C00]">
            Order Details - {order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="customerName"
                  value={editedOrder?.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              ) : (
                <p className="text-sm text-gray-900">{order.customerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="customerEmail"
                  value={editedOrder?.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              ) : (
                <p className="text-sm text-gray-900">{order.customerEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              {isEditing ? (
                <select
                  name="serviceType"
                  value={editedOrder?.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="Normal/Express">Normal/Express</option>
                  <option value="Quick Pickup">Quick Pickup</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{order.serviceType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Order Status
              </label>
              {isEditing ? (
                <select
                  name="orderStatus"
                  value={editedOrder?.orderStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="SUCCESSFUL">Successful</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{order.orderStatus}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Payment Status
              </label>
              {isEditing ? (
                <select
                  name="paymentStatus"
                  value={editedOrder?.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{order.paymentStatus}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 rounded-lg py-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white px-6 rounded-lg py-2"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white px-6 rounded-lg py-2"
                >
                  Edit Order
                </Button>
                {order.orderStatus === 'PENDING' && onConfirm && (
                  <Button
                    type="button"
                    onClick={() => onConfirm(order.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg py-2"
                  >
                    Confirm Order
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal; 