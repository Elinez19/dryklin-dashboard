import { useState } from 'react';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import avatar from "../../assets/images/Avatar.png";
import UserDetails from './UserDetails';
import AddServicePartnerModal from '@/components/users/AddServicePartnerModal';
import AddDeliveryAgentModal from '@/components/users/AddDeliveryAgentModal';
import NotificationBell from '@/components/common/NotificationBell';
import { useNavigate } from 'react-router-dom';



type UserType = 'customers' | 'service-partners' | 'delivery-agents';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinDate: string;
  type?: string;
  companyName?: string;
  totalOrders?: number;
}

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UserType>('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddServicePartnerOpen, setIsAddServicePartnerOpen] = useState(false);
  const [isAddDeliveryAgentOpen, setIsAddDeliveryAgentOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const unreadCount = 3;





  const users: User[] = [
    {
      id: '001',
      name: 'Chinedu Okafor',
      email: 'chinedu@example.com',
      phone: '+234 123 456 7890',
      status: 'ACTIVE',
      joinDate: '2024-01-15',
      totalOrders: 25,
    },
    {
      id: '002',
      name: 'Amina Bello',
      companyName: 'CleanPro Services',
      email: 'amina@cleanpro.com',
      phone: '+234 123 456 7891',
      status: 'ACTIVE',
      joinDate: '2024-01-16',
      type: 'Service Partner',
      totalOrders: 150,
    },
    {
      id: '003',
      name: 'Ibrahim Mohammed',
      email: 'ibrahim@example.com',
      phone: '+234 123 456 7892',
      status: 'ACTIVE',
      joinDate: '2024-01-17',
      type: 'Delivery Agent',
      totalOrders: 75,
    },
  ];

  const getStatusStyle = (status: User['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    // Filter by active tab
    let matchesTab = false;
    if (activeTab === 'customers' && !user.type) matchesTab = true;
    if (activeTab === 'service-partners' && user.type === 'Service Partner') matchesTab = true;
    if (activeTab === 'delivery-agents' && user.type === 'Delivery Agent') matchesTab = true;
    
    if (!matchesTab) return false;
    
    // Filter by status
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Active' && user.status === 'ACTIVE') return true;
    if (statusFilter === 'Inactive' && user.status === 'INACTIVE') return true;
    
    return false;
  });

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  if (selectedUserId) {
    return (
      <UserDetails
        onBack={handleBack}
      />
    );
  }

  const renderTable = () => (
    <table className="w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th className="w-4 p-4 border-b border-gray-200">
            <input type="checkbox" className="rounded border-gray-300" />
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">ID</th>
          {activeTab === 'service-partners' && (
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Company Name</th>
          )}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Name</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Email</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Phone</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Join Date</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Total Orders</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200"></th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="w-4 p-4 border-b border-gray-200">
              <input type="checkbox" className="rounded border-gray-300" />
            </td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.id}</td>
            {activeTab === 'service-partners' && (
              <td className="px-4 py-4 text-sm border-b border-gray-200">{user.companyName}</td>
            )}
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.name}</td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.email}</td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.phone}</td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(user.status)}`}>
                {user.status}
              </span>
            </td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.joinDate}</td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">{user.totalOrders}</td>
            <td className="px-4 py-4 text-sm border-b border-gray-200">
              <button 
                onClick={() => handleViewDetails(user.id)}
                className="text-[#FF5C00] hover:text-[#FF5C00]/80"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-2 md:p-6 space-y-6 pt-14 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-2xl font-bold">User Management</h1>
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
            onClick={() => navigate('/signin')}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-4 md:gap-8 px-4 md:px-6 pt-4 min-w-[400px]">
            <button
              onClick={() => setActiveTab('customers')}
              className={cn(
                "pb-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                activeTab === 'customers'
                  ? "text-[#FF5C00] border-b-2 border-[#FF5C00]"
                  : "text-gray-500 hover:text-[#FF5C00]"
              )}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('service-partners')}
              className={cn(
                "pb-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                activeTab === 'service-partners'
                  ? "text-[#FF5C00] border-b-2 border-[#FF5C00]"
                  : "text-gray-500 hover:text-[#FF5C00]"
              )}
            >
              Service Partners
            </button>
            <button
              onClick={() => setActiveTab('delivery-agents')}
              className={cn(
                "pb-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                activeTab === 'delivery-agents'
                  ? "text-[#FF5C00] border-b-2 border-[#FF5C00]"
                  : "text-gray-500 hover:text-[#FF5C00]"
              )}
            >
              Delivery Agents
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-[400px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
              <div className="text-sm whitespace-nowrap">Filter:</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-auto">
                  {dateFilter}
                  <ChevronDownIcon className="h-4 w-4 ml-auto md:ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full md:w-auto">
                  <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('Last 90 Days')}>Last 90 Days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-auto">
                  Status
                  <ChevronDownIcon className="h-4 w-4 ml-auto md:ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full md:w-auto">
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {(activeTab === 'service-partners' || activeTab === 'delivery-agents') && (
                <button
                  onClick={() => activeTab === 'service-partners' 
                    ? setIsAddServicePartnerOpen(true)
                    : setIsAddDeliveryAgentOpen(true)
                  }
                  className="px-4 py-2 bg-[#FF5C00] text-white rounded-lg text-sm hover:bg-[#FF5C00]/90 transition-colors w-full md:w-auto whitespace-nowrap"
                >
                  Add {activeTab === 'service-partners' ? 'Service Partner' : 'Delivery Agent'}
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[800px] px-4 md:px-0">
              {renderTable()}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
              <button className="px-3 py-1.5 text-sm bg-orange-50 text-[#FF5C00] rounded-lg border border-orange-200">1</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">8</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">9</button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors">10</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>

      <AddServicePartnerModal
        isOpen={isAddServicePartnerOpen}
        onClose={() => setIsAddServicePartnerOpen(false)}
      />

      <AddDeliveryAgentModal
        isOpen={isAddDeliveryAgentOpen}
        onClose={() => setIsAddDeliveryAgentOpen(false)}
      />
    </div>
  );
};

export default UserManagement; 