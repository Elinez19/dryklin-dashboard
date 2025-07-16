import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import DataTable from '@/components/common/DataTable';
import UserHeader from '@/components/common/UserHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchDashboardStats } from '@/services/features/dashboardSlice';
import { useOrders } from '@/hooks/useOrders';

import { IOrder } from '@/types/dashboard_types';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats: dashboardStats, statsLoading, statsError } = useSelector(
    (state: RootState) => state.dashboard
  );
  const { orders: apiOrders, loading: ordersLoading, error: ordersError } = useOrders();
  const unreadCount = 3;

  // Fetch dashboard stats on component mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Format numbers with commas
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString();
  };

  const stats = [
    { title: 'Total No. of Users', value: formatNumber(dashboardStats?.totalUsers) },
    { title: 'Total No. of Orders', value: formatNumber(dashboardStats?.totalOrders) },
    { title: 'Total No. of Service Partners', value: formatNumber(dashboardStats?.totalServicePartners) },
    { title: 'Total No. of Delivery Agents', value: formatNumber(dashboardStats?.totalDeliveryAgents) },
  ];

  // Transform API orders to match the table format
  const recentOrders = apiOrders.slice(0, 10).map(order => ({
    id: order.id,
    customerName: order.customerName,
    email: order.customerEmail,
    serviceType: order.serviceType,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
  }));

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-3 md:space-y-6 pt-14 md:pt-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Dashboard</h1>
        <UserHeader unreadCount={unreadCount} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {statsLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-2 sm:p-3 md:p-4 bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))
        ) : statsError ? (
          // Error state
          <div className="col-span-full text-center py-8">
            <p className="text-red-600 text-sm">Failed to load dashboard statistics</p>
            <button 
              onClick={() => dispatch(fetchDashboardStats())}
              className="mt-2 text-[#FF5C00] text-sm hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          // Normal stats display
          stats.map((item, index) => (
            <Card key={index} className="p-2 sm:p-3 md:p-4 bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs md:text-sm text-[#FF5C00] mb-1 md:mb-2 line-clamp-1">{item.title}</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-lg md:text-2xl font-bold">{item.value}</span>
                  <button className="text-[10px] sm:text-xs md:text-sm text-[#FF5C00] hidden sm:block hover:text-orange-700 transition-colors duration-200">See All</button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-white p-2 sm:p-4 md:p-6">
        <div className="w-full">
          {ordersLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <span>Loading recent orders...</span>
            </div>
          ) : ordersError ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <span className="text-red-600">Failed to load recent orders</span>
            </div>
          ) : (
            <DataTable
              columns={[
              { 
                header: 'Order ID', 
                accessor: 'id',
                cell: (value: unknown) => (
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium">{String(value)}</span>
                )
              },
              { 
                header: 'Customer', 
                accessor: 'customerName', 
                className: 'hidden sm:table-cell',
                cell: (value: unknown) => (
                  <span className="text-[11px] sm:text-xs md:text-sm">{String(value)}</span>
                )
              },
              { 
                header: 'Email', 
                accessor: 'email', 
                className: 'hidden lg:table-cell',
                cell: (value: unknown) => (
                  <span className="text-[11px] sm:text-xs md:text-sm text-gray-600">{String(value)}</span>
                )
              },
              { 
                header: 'Service', 
                accessor: 'serviceType', 
                className: 'hidden md:table-cell',
                cell: (value: unknown) => (
                  <span className="text-[11px] sm:text-xs md:text-sm">{String(value)}</span>
                )
              },
              {
                header: 'Status',
                accessor: 'orderStatus',
                cell: (value: unknown) => {
                  const status = value as IOrder['orderStatus'];
                  const getStatusStyle = (status: IOrder['orderStatus']) => {
                    switch (status) {
                      case 'PENDING':
                        return 'bg-blue-100 text-blue-800';
                      case 'PROCESSING':
                        return 'bg-orange-100 text-orange-800';
                      case 'COMPLETED':
                        return 'bg-green-100 text-green-800';
                      case 'CANCELLED':
                        return 'bg-red-100 text-red-800';
                      case 'SUCCESSFUL':
                        return 'bg-green-100 text-green-800';
                      case 'IN_PROGRESS':
                        return 'bg-yellow-100 text-yellow-800';
                      default:
                        return 'bg-gray-100 text-gray-800';
                    }
                  };
                  return (
                    <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap ${getStatusStyle(status)}`}>
                      {String(status)}
                    </span>
                  );
                },
              },
              {
                header: 'Payment',
                accessor: 'paymentStatus',
                className: 'hidden sm:table-cell',
                cell: (value: unknown) => {
                  const status = value as IOrder['paymentStatus'];
                  const getStatusStyle = (status: IOrder['paymentStatus']) => {
                    switch (status) {
                      case 'PAID':
                        return 'bg-green-100 text-green-800';
                      case 'PENDING':
                        return 'bg-yellow-100 text-yellow-800';
                      case 'PROCESSING':
                        return 'bg-blue-100 text-blue-800';
                      default:
                        return 'bg-gray-100 text-gray-800';
                    }
                  };
                  return (
                    <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap ${getStatusStyle(status)}`}>
                      {String(status)}
                    </span>
                  );
                },
              },
              {
                header: '',
                accessor: 'viewDetails' as keyof typeof recentOrders[0],
                cell: () => (
                  <button className="text-orange-600 hover:text-orange-700 text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-200">
                    View Details
                  </button>
                ),
              },
            ]}
            data={recentOrders}
            itemsPerPage={5}
          />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 