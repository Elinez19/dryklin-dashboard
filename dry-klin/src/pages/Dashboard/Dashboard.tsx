import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import DataTable from '@/components/common/DataTable';
import avatar from "../../assets/images/avatar.png";
import NotificationBell from '@/components/common/NotificationBell';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '@/services/features/auth/authSlice';
import { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { fetchAdminUserByEmail, IAdminUserDetails } from '@/services/features/auth/authService';

interface Order extends Record<string, unknown> {
  id: string;
  customerName: string;
  email: string;
  serviceType: string;
  orderStatus: 'NEW' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'SUCCESSFUL';
  paymentStatus: 'PAID' | 'PENDING';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const unreadCount = 3;

  // Admin profile state
  const [admin, setAdmin] = useState<IAdminUserDetails | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);

  useEffect(() => {
    setAdminLoading(true);
    fetchAdminUserByEmail('dryklin@gmail.com')
      .then(setAdmin)
      .catch((err) => setAdminError(err.message || 'Failed to fetch admin'))
      .finally(() => setAdminLoading(false));
  }, []);

  const stats = [
    { title: 'Total No. of Users', value: '2,105' },
    { title: 'Total No. of Orders', value: '7,302' },
    { title: 'Total No. of Service Partners', value: '238' },
    { title: 'Total No. of Delivery Agents', value: '1,032' },
  ];

  const recentOrders: Order[] = [
    {
      id: '0081727',
      customerName: 'Chinedu Okafor',
      email: 'olivia@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'NEW',
      paymentStatus: 'PAID',
    },
    {
      id: '0081727',
      customerName: 'Amina Bello',
      email: 'phoenix@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'SUCCESSFUL',
      paymentStatus: 'PENDING',
    },
    {
      id: '0081727',
      customerName: 'Emeka Nwosu',
      email: 'lana@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'PROCESSING',
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
      orderStatus: 'PROCESSING',
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
      customerName: 'Chijoke Obi',
      email: 'kate@untitledui.com',
      serviceType: 'Normal/Express',
      orderStatus: 'COMPLETED',
      paymentStatus: 'PAID',
    },
  ];

  const handleLogout = () => {
    dispatch(LogoutUser());
    navigate('/auth/signin');
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-3 md:space-y-6 pt-14 md:pt-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center justify-between sm:justify-end gap-2 md:gap-4">
          <NotificationBell unreadCount={unreadCount} />
          <div className="flex items-center gap-1.5 md:gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
            />
            <div className="hidden sm:block min-w-[120px]">
              {adminLoading ? (
                <div className="text-xs text-gray-400">Loading...</div>
              ) : adminError ? (
                <div className="text-xs text-red-500">{adminError}</div>
              ) : admin ? (
                <>
                  <div className="text-sm font-medium">{admin.firstName} {admin.lastName}</div>
                  <div className="text-xs text-gray-500">{admin.email}</div>
                  {admin.phoneNumber && (
                    <div className="text-xs text-gray-500">{admin.phoneNumber}</div>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="p-2 sm:p-3 md:p-4 bg-white hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs md:text-sm text-[#FF5C00] mb-1 md:mb-2 line-clamp-1">{item.title}</span>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-lg md:text-2xl font-bold">{item.value}</span>
                <button className="text-[10px] sm:text-xs md:text-sm text-[#FF5C00] hidden sm:block hover:text-orange-700 transition-colors duration-200">See All</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-white p-2 sm:p-4 md:p-6">
        <div className="w-full">
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
                  const status = value as Order['orderStatus'];
                  const getStatusStyle = (status: Order['orderStatus']) => {
                    switch (status) {
                      case 'NEW':
                        return 'bg-blue-100 text-blue-800';
                      case 'PROCESSING':
                        return 'bg-orange-100 text-orange-800';
                      case 'COMPLETED':
                        return 'bg-green-100 text-green-800';
                      case 'CANCELLED':
                        return 'bg-red-100 text-red-800';
                      case 'SUCCESSFUL':
                        return 'bg-green-100 text-green-800';
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
                  const status = value as Order['paymentStatus'];
                  const getStatusStyle = (status: Order['paymentStatus']) => {
                    switch (status) {
                      case 'PAID':
                        return 'bg-green-100 text-green-800';
                      case 'PENDING':
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
                header: '',
                accessor: 'actions',
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
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 