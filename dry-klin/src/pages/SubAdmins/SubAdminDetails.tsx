import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, PencilIcon, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { useState } from 'react';
import UserHeader from '@/components/common/UserHeader';

interface SubAdminDetailsProps {
  onBack: () => void;
}

const SubAdminDetails = ({ onBack }: SubAdminDetailsProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const notifications = [
    {
      id: '1',
      title: 'New Sub-admin Added',
      message: 'A new sub-admin has been added to the system',
      time: '5 mins ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Sub-admin Update',
      message: 'Sub-admin permissions have been updated',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Access Alert',
      message: 'Unusual login activity detected',
      time: '2 hours ago',
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleEdit = () => {
    navigate(`/admins/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      // Delete functionality will be implemented
    } catch {
      // Handle error
    }
  };

  const confirmDelete = () => {
    // Here you would make an API call to delete the sub-admin
    navigate('/admins');
  };

  const handleDeactivate = async () => {
    try {
      // Deactivate functionality will be implemented
    } catch {
      // Handle error
    }
  };

  const confirmDeactivate = () => {
    // Here you would make an API call to deactivate the sub-admin
    navigate('/admins');
  };

  return (
    <div className="p-2 md:p-6 space-y-6 pt-14 md:pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <h1 className="text-lg md:text-2xl font-bold">Profile</h1>
        </div>
        <UserHeader unreadCount={unreadCount} />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center">
          <UserCircle className="w-16 h-16 md:w-20 md:h-20 text-gray-400" />
        </div>
      </div>

      {/* Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">First Name</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Omolola</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">Phone Number</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">234 567 556 3456</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">Last Name</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Dende</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">Password</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">2Dende%$2020</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">Email Address</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">jekonmo@gmail.com</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FF5C00] mb-1">Date Created</label>
            <span className="text-sm text-gray-900">12/06/2020</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button 
          variant="outline" 
          className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
          onClick={handleDelete}
        >
          Delete Permanently
        </Button>
        <Button 
          className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white"
          onClick={handleDeactivate}
        >
          Deactivate User
        </Button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Sub-admin"
        message="Are you sure you want to permanently delete this sub-admin? This action cannot be undone."
        type="delete"
        confirmText="Delete"
      />

      <ConfirmationModal
        isOpen={isDeactivateConfirmOpen}
        onClose={() => setIsDeactivateConfirmOpen(false)}
        onConfirm={confirmDeactivate}
        title="Deactivate Sub-admin"
        message="Are you sure you want to deactivate this sub-admin? They will no longer have access to the system."
        type="warning"
        confirmText="Deactivate"
      />
    </div>
  );
};

export default SubAdminDetails; 