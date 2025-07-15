import { useState } from 'react';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import avatar from "../../assets/images/Avatar.png";
import NotificationBell from '@/components/common/NotificationBell';
import OrderDetailsModal from './OrderDetailsModal';
import { useOrders } from '@/hooks/useOrders';
import { IOrder } from '@/types/dashboard_types';

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const unreadCount = 3;

  const { orders: apiOrders, loading, error, updateOrderStatus } = useOrders();

  // Filter orders based on status and search query
  const filterOrders = (ordersData: IOrder[]) => {
    let filtered = ordersData;
    
    // Filter by status
    if (statusFilter !== 'All') {
      const statusMap: Record<string, string> = {
        'In Progress': 'IN_PROGRESS',
        'Completed': 'COMPLETED',
        'Cancelled': 'CANCELLED',
        'Processing': 'PROCESSING',
        'Successful': 'SUCCESSFUL',
        'Pending': 'PENDING'
      };
      const targetStatus = statusMap[statusFilter] || statusFilter.toUpperCase();
      filtered = filtered.filter(order => order.orderStatus === targetStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleViewDetails = (order: IOrder) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateOrder = async (orderId: string, updates: Partial<IOrder>) => {
    try {
      await updateOrderStatus(orderId, updates);
      setIsDetailsModalOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Use API orders data
  const orders = apiOrders;

  const getStatusStyle = (status: IOrder['orderStatus']) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-orange-100/50 text-orange-800';
      case 'PROCESSING':
        return 'bg-yellow-100/50 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100/50 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100/50 text-red-800';
      case 'SUCCESSFUL':
        return 'bg-green-100/50 text-green-800';
      case 'PENDING':
        return 'bg-blue-100/50 text-blue-800';
      default:
        return 'bg-gray-100/50 text-gray-800';
    }
  };

  const getPaymentStatusStyle = (status: IOrder['paymentStatus']) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Order Management</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#FF5C00] bg-opacity-10 text-white rounded">84 F202</span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-6">
          <NotificationBell unreadCount={unreadCount} />
          <div className="flex items-center gap-1.5 sm:gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Olivia Rhye</div>
              <div className="text-xs text-gray-500">olivia@untitledui.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-2 sm:p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-[300px] md:w-[400px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm hidden sm:block">Filter:</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm">
                  {dateFilter}
                  <ChevronDownIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('Last 90 Days')}>Last 90 Days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm">
                  Status
                  <ChevronDownIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('In Progress')}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Cancelled')}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative">
            <div className="sm:hidden overflow-x-auto -mx-2">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="w-4 p-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">Customer Name</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">Order Status</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filterOrders(orders).map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="w-4 p-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                          <td className="px-2 py-2 text-xs whitespace-nowrap">{order.id}</td>
                          <td className="px-2 py-2 text-xs whitespace-nowrap">{order.customerName}</td>
                          <td className="px-2 py-2 text-xs whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusStyle(order.orderStatus)}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-xs whitespace-nowrap">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className="text-[#FF5C00] hover:text-[#FF5C00]/80 text-xs font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="w-4 p-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email address</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filterOrders(orders).map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="w-4 p-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{order.id}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{order.customerName}</td>
                                              <td className="px-4 py-4 text-sm whitespace-nowrap">{order.customerEmail}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{order.serviceType}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusStyle(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-[#FF5C00] hover:text-[#FF5C00]/80 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1 overflow-x-auto">
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-orange-50 text-[#FF5C00] rounded-lg border border-orange-200">1</button>
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">8</button>
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">9</button>
              <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">10</button>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdateOrder}
      />
    </div>
  );
};

export default OrderManagement; 