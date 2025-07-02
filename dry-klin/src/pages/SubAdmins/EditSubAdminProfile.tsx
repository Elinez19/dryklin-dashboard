import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PencilIcon, BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import avatar from "../../assets/images/Avatar.png";

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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
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

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Profile Update',
      message: 'Your profile has been updated successfully',
      time: '5 mins ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Security Alert',
      message: 'New login detected from unknown device',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

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
    console.log('Saving profile changes:', formData);
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
        <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-8 w-8 md:h-11 md:w-11 hover:bg-gray-100">
              <BellIcon className="w-4 h-4 md:w-5 md:h-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 min-w-[16px] md:min-w-[18px] h-[16px] md:h-[18px] flex items-center justify-center p-0 text-[9px] md:text-[10px]"
                >
                  {unreadCount}
                </Badge>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px] md:w-80">
              <div className="p-2">
                <h3 className="text-xs md:text-sm font-medium px-2 py-1">Notifications</h3>
                <div className="mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start gap-0.5 md:gap-1 p-1.5 md:p-2 cursor-pointer",
                        !notification.isRead && "bg-orange-50"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-xs md:text-sm">{notification.title}</span>
                        <span className="text-[10px] md:text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-600">{notification.message}</p>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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