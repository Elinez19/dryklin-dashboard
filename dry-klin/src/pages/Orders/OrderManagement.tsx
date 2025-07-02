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

interface Order extends Record<string, unknown> {
  id: string;
  customerName: string;
  email: string;
  serviceType: string;
  orderStatus: 'IN PROGRESS' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'SUCCESSFUL';
  paymentStatus: 'PAID' | 'PENDING' | 'PROCESSING';
}

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const unreadCount = 3;

  // Filter orders based on status
  const filterOrders = (orders: Order[]) => {
    if (statusFilter === 'All') return orders;
    return orders.filter(order => order.orderStatus === statusFilter.toUpperCase());
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateOrder = (orderId: string, updates: Partial<Order>) => {
    // Here you would typically make an API call to update the order
    console.log('Updating order:', orderId, updates);
    setIsDetailsModalOpen(false);
  };

  const orders: Order[] = [
    {
      id: '0081727',
      customerName: 'Chinedu Okafor',
      email: 'olivia@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'IN PROGRESS',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Amina Bello',
      email: 'phoenix@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'SUCCESSFUL',
      paymentStatus: 'PROCESSING',
    },
    {
      id: '0081727',
      customerName: 'Emeka Nwosu',
      email: 'lana@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'IN PROGRESS',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Fatima Abubakar',
      email: 'demi@untitledui.com',
      serviceType: 'Quick Pickup',
      orderStatus: 'COMPLETED',
      paymentStatus: 'PENDING',
    },
    {
      id: '0081727',
      customerName: 'Tunde Adeyemi',
      email: 'candice@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'IN PROGRESS',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Ngozi Ibe',
      email: 'natali@untitledui.com',
      serviceType: 'Quick Pickup',
      orderStatus: 'CANCELLED',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Ifeoma Uche',
      email: 'drew@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'COMPLETED',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Kelechi Eze',
      email: 'orlando@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'COMPLETED',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Zainab Ibrahim',
      email: 'andi@untitledui.com',
      serviceType: 'Quick Pickup',
      orderStatus: 'SUCCESSFUL',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Chijioke Obi',
      email: 'kate@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'COMPLETED',
      paymentStatus: 'PAID',
    },
  ];

  const getStatusStyle = (status: Order['orderStatus']) => {
    switch (status) {
      case 'IN PROGRESS':
        return 'bg-orange-100/50 text-orange-800';
      case 'PROCESSING':
        return 'bg-yellow-100/50 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100/50 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100/50 text-red-800';
      case 'SUCCESSFUL':
        return 'bg-green-100/50 text-green-800';
      default:
        return 'bg-gray-100/50 text-gray-800';
    }
  };

  const getPaymentStatusStyle = (status: Order['paymentStatus']) => {
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Order Management</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#FF5C00] bg-opacity-10 text-white rounded">84 F202</span>
        </div>
        <div className="flex items-center gap-6">
          <NotificationBell unreadCount={unreadCount} />
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">Olivia Rhye</div>
              <div className="text-xs text-gray-500">olivia@untitledui.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">Filter:</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm">
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
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm">
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

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-4 p-4 border-b border-gray-200">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Customer Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Email address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Service Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Order Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Payment Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                {filterOrders(orders).map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="w-4 p-4 border-b border-gray-200">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{order.id}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{order.customerName}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{order.email}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{order.serviceType}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusStyle(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">
                      <button 
                        onClick={() => handleViewDetails(order)}
                        className="text-[#FF5C00] hover:text-[#FF5C00]/80"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm bg-orange-50 text-[#FF5C00] rounded-lg border border-orange-200">1</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">8</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">9</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">10</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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