import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import UserHeader from '@/components/common/UserHeader';

interface EditSubAdminProfileProps {
  onBack: () => void;
}

interface SubAdminData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  initials: string;
}

const EditSubAdminProfile = ({ onBack }: EditSubAdminProfileProps) => {
  const navigate = useNavigate();
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<SubAdminData>({
    fullName: 'Omolola Dende',
    email: 'jekonmo@gmail.com',
    phoneNumber: '234 567 556 3456',
    password: '2Dende%$2020',
    initials: 'SI'
  });

  const unreadCount = 3; // Default notification count

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsSaveConfirmOpen(true);
  };

  const confirmSave = () => {
    // Here you would make an API call to update the sub-admin's profile
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
        <UserHeader unreadCount={unreadCount} showNotificationBell={false} />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-8">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl md:text-4xl font-semibold">
            {formData.initials}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200">
            <PencilIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white px-8"
        >
          Save Changes
        </Button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSaveConfirmOpen}
        onClose={() => setIsSaveConfirmOpen(false)}
        onConfirm={confirmSave}
        title="Save Changes"
        message="Are you sure you want to save these changes to your profile?"
        type="success"
        confirmText="Save"
      />
    </div>
  );
};

export default EditSubAdminProfile; 