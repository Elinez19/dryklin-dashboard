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
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Sub-admins</h1>
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
          <button 
            onClick={() => navigate('/signin')}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Log Out
          </button>
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
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white rounded-lg px-4 py-2"
              >
                Add Sub-admin
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-4 p-4 border-b border-gray-200">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Email address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Last Active</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                {subAdmins.map((admin, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="w-4 p-4 border-b border-gray-200">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{admin.id}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{admin.name}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{admin.email}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{admin.role}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(admin.status)}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">{admin.lastActive}</td>
                    <td className="px-4 py-4 text-sm border-b border-gray-200">
                      <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">View Details</button>
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