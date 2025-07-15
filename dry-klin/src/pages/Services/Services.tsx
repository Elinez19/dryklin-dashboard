import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, Plus, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { IServiceType } from '@/types/dashboard_types';
import Loader from '@/components/common/Loader';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '@/components/common/ConfirmationModal';

const Services: React.FC = () => {
  const {
    serviceTypes,
    loading,
    error,
    deleteServiceType,
    deleteLoading,
    refetch
  } = useServiceTypes();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter service types based on search query and status
  const filteredServiceTypes = serviceTypes.filter(serviceType => {
    const name = serviceType.name || serviceType.laundryServiceTypeName || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (serviceType.description && serviceType.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || serviceType.status === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddClick = () => {
    navigate('/service-types/add');
  };

  const handleEditClick = (serviceType: IServiceType) => {
    // Edit functionality will be implemented in future task
    console.log("Edit service type:", serviceType);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteServiceType(deleteId);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100/50 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100/50 text-red-800';
      default:
        return 'bg-gray-100/50 text-gray-800';
    }
  };

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Services</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#FF5C00] bg-opacity-10 text-white rounded">
            {serviceTypes.length} Service Types
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleAddClick}
            className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white flex items-center gap-2 p-2"
          >
            <Plus size={16} />
            <span>Add Service Type</span>
          </Button>
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
                  Status
                  <ChevronDownIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-x-auto -mx-2">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="w-4 p-4">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-500">
                            <Loader />
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-red-500">
                            Error: {error} <Button onClick={() => refetch()} className="ml-2">Try Again</Button>
                          </td>
                        </tr>
                      ) : filteredServiceTypes.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-500">
                            {searchQuery || statusFilter !== 'All' 
                              ? 'No service types match your search criteria.' 
                              : 'No service types found. Click "Add Service Type" to create one.'}
                          </td>
                        </tr>
                      ) : (
                        filteredServiceTypes.map((serviceType, index) => (
                          <tr key={serviceType.id || serviceType.name || index} className="hover:bg-gray-50">
                            <td className="w-4 p-4">
                              <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="font-medium">{serviceType.name || serviceType.laundryServiceTypeName}</div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="text-gray-600 max-w-xs truncate">
                                {serviceType.description || 'No description'}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {serviceType.price !== undefined ? `₦${serviceType.price.toLocaleString()}` : 'Not set'}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusStyle(serviceType.status)}`}>
                                {serviceType.status || 'ACTIVE'}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => handleEditClick(serviceType)}
                                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                  <Edit size={14} className="mr-1" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleDeleteClick(serviceType.id || serviceType.name || '')}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  disabled={deleteLoading}
                                >
                                  <Trash2 size={14} className="mr-1" /> Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Service Type"
        message="Are you sure you want to delete this service type? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
      />
    </div>
  );
};

export default Services; 