import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import DataTable from '@/components/common/DataTable';
import avatar from "../../assets/images/avatar.png";
import NotificationBell from '@/components/common/NotificationBell';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '@/services/features/auth/authSlice';
import { AppDispatch } from '@/store';

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

  const columns = [
    { 
      header: 'Order ID', 
      accessor: 'id',
      cell: (value: unknown) => (
        <span className="text-[11px] md:text-sm">{String(value)}</span>
      )
    },
    { 
      header: 'Customer', 
      accessor: 'customerName', 
      className: 'hidden md:table-cell',
      cell: (value: unknown) => (
        <span className="text-[11px] md:text-sm">{String(value)}</span>
      )
    },
    { 
      header: 'Email', 
      accessor: 'email', 
      className: 'hidden lg:table-cell',
      cell: (value: unknown) => (
        <span className="text-[11px] md:text-sm">{String(value)}</span>
      )
    },
    { 
      header: 'Service', 
      accessor: 'serviceType', 
      className: 'hidden sm:table-cell',
      cell: (value: unknown) => (
        <span className="text-[11px] md:text-sm">{String(value)}</span>
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
          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs ${getStatusStyle(status)}`}>
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
          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs ${getStatusStyle(status)}`}>
            {String(status)}
          </span>
        );
      },
    },
    {
      header: '',
      accessor: 'actions',
      cell: () => (
        <button className="text-orange-600 text-[11px] md:text-sm whitespace-nowrap">
          View Details
        </button>
      ),
    },
  ];

  const handleLogout = () => {
    dispatch(LogoutUser());
    navigate('/auth/signin');
  };

  return (
    <div className="p-2 md:p-6 space-y-3 md:space-y-6 pt-14 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
          <NotificationBell unreadCount={unreadCount} />
          <div className="flex items-center gap-1.5 md:gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium">Olivia Rhye</div>
              <div className="text-xs text-gray-500">olivia@untitledui.com</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="p-2 md:p-4 bg-white">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-sm text-[#FF5C00] mb-1 md:mb-2 line-clamp-1">{item.title}</span>
              <div className="flex items-center justify-between">
                <span className="text-base md:text-2xl font-bold">{item.value}</span>
                <button className="text-[10px] md:text-sm text-[#FF5C00] hidden md:block">See All</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-2 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0">
            <h2 className="text-sm md:text-lg font-semibold">Recent Orders</h2>
            <button className="text-xs md:text-sm text-gray-500">See All</button>
          </div>
        </div>
        <div className="p-2 md:p-6">
          <DataTable<Order>
            columns={columns}
            data={recentOrders}
            itemsPerPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 