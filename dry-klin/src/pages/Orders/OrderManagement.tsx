import { useState, useEffect } from 'react';
import { SearchIcon, ChevronDownIcon, CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import UserHeader from '@/components/common/UserHeader';
import OrderDetailsModal from './OrderDetailsModal';
import { useOrders } from '@/hooks/useOrders';
import { IOrder } from '@/types/dashboard_types';

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all-orders' | 'order-history'>('all-orders');
  const unreadCount = 3;

  const { 
    orders: apiOrders, 
    orderHistory, 
    loading, 
    error, 
    updateOrderStatus, 
    fetchOrders, 
    fetchOrderHistory 
  } = useOrders();

  // Load initial data when component mounts
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle tab change
  const handleTabChange = (tab: 'all-orders' | 'order-history') => {
    setActiveTab(tab);
    if (tab === 'all-orders') {
      fetchOrders();
    } else {
      fetchOrderHistory();
    }
  };

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
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
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
      // Refresh data after update
      if (activeTab === 'all-orders') {
        fetchOrders();
      } else {
        fetchOrderHistory();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Use appropriate data based on active tab
  const orders = activeTab === 'all-orders' ? apiOrders : orderHistory;

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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'N/A';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading {activeTab === 'all-orders' ? 'orders' : 'order history'}...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-0">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <Button 
            onClick={() => activeTab === 'all-orders' ? fetchOrders() : fetchOrderHistory()}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const filteredOrders = filterOrders(orders);

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Order Management</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#FF5C00] bg-opacity-10 text-white rounded">84 F202</span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-6">
          <Link to="/pending-orders">
            <Button variant="outline" className="flex items-center gap-2 text-sm px-3 py-2">
              <span>Pending Orders</span>
            </Button>
          </Link>
          <UserHeader unreadCount={unreadCount} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-2 sm:px-4 md:px-6 mb-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => handleTabChange('all-orders')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'all-orders'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => handleTabChange('order-history')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'order-history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-2 sm:p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-[300px] md:w-[400px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'all-orders' ? 'orders' : 'order history'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm hidden sm:block">Filter:</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  {activeTab === 'order-history' ? 'All Time' : dateFilter}
                  <ChevronDownIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {activeTab === 'order-history' ? (
                    <>
                      <DropdownMenuItem onClick={() => setDateFilter('All Time')}>All Time</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 90 Days')}>Last 90 Days</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDateFilter('Last 90 Days')}>Last 90 Days</DropdownMenuItem>
                    </>
                  )}
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
                  <DropdownMenuItem onClick={() => setStatusFilter('Successful')}>Successful</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative">
            {/* Mobile Table */}
            <div className="sm:hidden">
              <div className="space-y-3">
                {filteredOrders.map((order, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.orderStatus)}`}>
                        {order.orderStatus.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Customer:</span>
                        <span className="text-xs text-gray-900 font-medium">{order.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Email:</span>
                        <span className="text-xs text-gray-900 truncate ml-2">{order.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Service:</span>
                        <span className="text-xs text-gray-900">{order.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Amount:</span>
                        <span className="text-xs text-gray-900 font-medium">{formatCurrency(order.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Payment:</span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Date:</span>
                        <span className="text-xs text-gray-900">{formatDate(order.orderDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">#{order.id.slice(-8)}</td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">{order.serviceType}</td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{formatCurrency(order.totalAmount)}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.orderStatus)}`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default OrderManagement; 