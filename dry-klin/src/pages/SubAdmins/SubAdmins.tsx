import { useState, useEffect } from 'react';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AddSubAdminModal from './AddSubAdminModal';
import UserHeader from '@/components/common/UserHeader';
import { fetchSubAdmins, createSubAdmin, clearCreateSubAdminError } from '@/services/features/subAdminSlice';
import { RootState, AppDispatch } from '@/store';
import Loader from '@/components/common/Loader';
import { toast } from 'sonner';
import { isCurrentUserAdmin } from '@/helpers/helpers.functions';
import { ICreateSubAdminRequest } from '@/services/features/auth/authService';

const SubAdmins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subAdmins, subAdminsLoading, subAdminsError, createSubAdminLoading, createSubAdminError } = useSelector((state: RootState) => state.subadmins);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Show toast for error but do not block UI
  useEffect(() => {
    if (subAdminsError) {
      // Check if user is admin and show appropriate message
      if (!isCurrentUserAdmin()) {
        toast.error('Only admin users can access sub-admin management');
      } else if (subAdminsError.includes('Only admins can perform this action')) {
        toast.error('Only admins can perform this action');
      } else {
        toast.error(subAdminsError);
      }
    }
  }, [subAdminsError]);

  // Show toast for create sub-admin errors
  useEffect(() => {
    if (createSubAdminError) {
      toast.error(createSubAdminError);
      dispatch(clearCreateSubAdminError());
    }
  }, [createSubAdminError, dispatch]);

  // Fetch sub-admins from API
  const handleFetchSubAdmins = () => {
    dispatch(fetchSubAdmins());
  };

  useEffect(() => {
    handleFetchSubAdmins();
  }, [dispatch]);

  // Handle creating new sub-admin
  const handleCreateSubAdmin = async (subAdminData: ICreateSubAdminRequest) => {
    try {
      const result = await dispatch(createSubAdmin(subAdminData)).unwrap();
      if (result.success) {
        toast.success(result.message || 'Sub-admin created successfully');
        // Refresh the sub-admins list
        dispatch(fetchSubAdmins());
      }
    } catch (error) {
      // Error is handled by the Redux slice and shown in useEffect above
      console.error('Failed to create sub-admin:', error);
    }
  };

  // Filter sub-admins based on search query
  const filteredSubAdmins = subAdmins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (subAdminsLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sub-admins</h1>
          <p className="text-gray-600">Manage your sub-administrators</p>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-xs sm:text-sm">
                      {dateFilter}
                      <ChevronDownIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')}>
                      Last 7 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDateFilter('Last 30 Days')}>
                      Last 30 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDateFilter('Last 90 Days')}>
                      Last 90 Days
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-xs sm:text-sm">
                      All
                      <ChevronDownIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('Active')}>
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg"
                  disabled={createSubAdminLoading}
                >
                  {createSubAdminLoading ? 'Creating...' : 'Add Sub-admin'}
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubAdmins.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-2 sm:px-4 py-4 text-center text-sm text-gray-500">
                          {subAdminsLoading ? 'Loading sub-admins...' : 'No sub-admins found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredSubAdmins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-700">
                                    {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">{admin.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-500">
                            {admin.email}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-500">
                            {admin.role}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              admin.status === 'ACTIVE' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {admin.status}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-500">
                            {admin.lastActive}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                            <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">View Details</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredSubAdmins.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span>Previous</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-700">Page</span>
                <span className="text-xs sm:text-sm font-medium">1</span>
                <span className="text-xs sm:text-sm text-gray-700">of</span>
                <span className="text-xs sm:text-sm font-medium">1</span>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span>Next</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <AddSubAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateSubAdmin}
      />
    </div>
  );
};

export default SubAdmins; 