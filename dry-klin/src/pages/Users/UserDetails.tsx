import { useState } from 'react';
import { ArrowLeft, PencilIcon, Trash2Icon, MapPinIcon } from 'lucide-react';
import avatar from "../../assets/images/Avatar.png";
import EditUserModal from '@/components/users/EditUserModal';

interface UserDetailsProps {
  onBack: () => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  totalOrders: string;
}

const UserDetails = ({ onBack }: UserDetailsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<keyof UserData | null>(null);
  const [userData, setUserData] = useState<UserData>({
    firstName: 'James',
    lastName: 'Adewale',
    username: 'adewale1',
    email: 'jekonmo@gmail.com',
    phoneNumber: '234 567 556 3456',
    totalOrders: '13',
  });

  const handleEdit = (field: keyof UserData) => {
    setEditingField(field);
    setIsEditModalOpen(true);
  };

  const handleSave = (newValue: string) => {
    if (editingField) {
      setUserData(prev => ({
        ...prev,
        [editingField]: newValue
      }));
    }
  };

  const getFieldLabel = (field: keyof UserData): string => {
    const labels: Record<keyof UserData, string> = {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email Address',
      phoneNumber: 'Phone Number',
      totalOrders: 'Total Number of Orders',
    };
    return labels[field];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img src={avatar} alt="James Adewale" className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{userData.firstName} {userData.lastName}</h2>
              <p className="text-sm text-gray-500">ID No.: 01824VA</p>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="mt-8 grid grid-cols-3 gap-8">
            {/* First Name */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">First Name</label>
                <button 
                  onClick={() => handleEdit('firstName')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm">{userData.firstName}</p>
            </div>

            {/* Last Name */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">Last Name</label>
                <button 
                  onClick={() => handleEdit('lastName')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm">{userData.lastName}</p>
            </div>

            {/* Username */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">Username</label>
                <button 
                  onClick={() => handleEdit('username')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm">{userData.username}</p>
            </div>

            {/* Email Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">Email Address</label>
                <button 
                  onClick={() => handleEdit('email')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm">{userData.email}</p>
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">Phone Number</label>
                <button 
                  onClick={() => handleEdit('phoneNumber')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm">{userData.phoneNumber}</p>
            </div>

            {/* Total Number of Orders */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#FF5C00]">Total Number of Orders</label>
              </div>
              <p className="text-sm">{userData.totalOrders}</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="space-y-4">
              {/* Address 1 */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium">Jogor Centre, Ibadan, Nigeria</h4>
                    <p className="text-sm text-gray-500">Jogor Centre, Ibadan, Nigeria</p>
                  </div>
                </div>
                <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">
                  <Trash2Icon className="h-5 w-5" />
                </button>
              </div>

              {/* Address 2 */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium">New Sabo, Mokola, Ibadan, Nigeria</h4>
                    <p className="text-sm text-gray-500">New Sabo, Mokola, Ibadan, Nigeria</p>
                  </div>
                </div>
                <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">
                  <Trash2Icon className="h-5 w-5" />
                </button>
              </div>

              {/* Address 3 */}
              <div className="flex items-start justify-between pb-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium">New Sabo, Mokola, Ibadan, Nigeria</h4>
                    <p className="text-sm text-gray-500">New Sabo, Mokola, Ibadan, Nigeria</p>
                  </div>
                </div>
                <button className="text-[#FF5C00] hover:text-[#FF5C00]/80">
                  <Trash2Icon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button className="text-[#FF5C00] hover:text-[#FF5C00]/80 text-sm font-medium">
              Delete Permanently
            </button>
            <button className="px-4 py-2 bg-[#FF5C00] text-white rounded-lg text-sm hover:bg-[#FF5C00]/90 transition-colors">
              Deactivate User
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingField && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingField(null);
          }}
          fieldName={getFieldLabel(editingField)}
          currentValue={userData[editingField]}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserDetails; 