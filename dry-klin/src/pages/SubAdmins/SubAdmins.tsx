import { useState } from 'react';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AddSubAdminModal from './AddSubAdminModal';
import avatar from "../../assets/images/Avatar.png";
import NotificationBell from '@/components/common/NotificationBell';
import { useNavigate } from 'react-router-dom';

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
}

const SubAdmins = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const unreadCount = 3;

  const subAdmins: SubAdmin[] = [
    {
      id: '0081727',
      name: 'Chinedu Okafor',
      email: 'olivia@untitledui.com',
      role: 'Super Admin',
      status: 'ACTIVE',
      lastActive: '2 hours ago',
    },
    {
      id: '0081728',
      name: 'Amina Bello',
      email: 'phoenix@untitledui.com',
      role: 'Admin',
      status: 'INACTIVE',
      lastActive: '5 hours ago',
    },
    {
      id: '0081729',
      name: 'Emeka Nwosu',
      email: 'lana@untitledui.com',
      role: 'Admin',
      status: 'ACTIVE',
      lastActive: '1 day ago',
    },
    {
      id: '0081730',
      name: 'Fatima Abubakar',
      email: 'demi@untitledui.com',
      role: 'Admin',
      status: 'ACTIVE',
      lastActive: '3 days ago',
    },
    {
      id: '0081731',
      name: 'Tunde Adeyemi',
      email: 'candice@untitledui.com',
      role: 'Super Admin',
      status: 'ACTIVE',
      lastActive: '1 week ago',
    },
  ];

  const getStatusStyle = (status: SubAdmin['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Sub-admins</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#FF5C00] bg-opacity-10 text-[#FF5C00] rounded">84 F202</span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
          <NotificationBell unreadCount={unreadCount} />
          <div className="flex items-center gap-2 sm:gap-3">
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
          <button 
            onClick={() => navigate('/signin')}
            className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-2 sm:p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-[300px] md:w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="text-sm hidden sm:block">Filter:</div>
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
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
              >
                Add Sub-admin
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="w-4 p-4 sm:p-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">ID</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Name</th>
                      <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Email</th>
                      <th className="hidden md:table-cell px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Role</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Status</th>
                      <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Last Active</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subAdmins.map((admin, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="w-4 p-2 sm:p-4">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">{admin.id}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">{admin.name}</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">{admin.email}</td>
                        <td className="hidden md:table-cell px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">{admin.role}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusStyle(admin.status)}`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">{admin.lastActive}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                          <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

      <AddSubAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => {
          console.log('New sub-admin data:', data);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default SubAdmins; 