import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

interface AddSubAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubAdminFormData) => void;
}

interface SubAdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  dryKlinUserName: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
  userType: string;
}

const AddSubAdminModal = ({ isOpen, onClose, onSubmit }: AddSubAdminModalProps) => {
  const [formData, setFormData] = useState<SubAdminFormData>({
    firstName: '',
    lastName: '',
    email: '',
    dryKlinUserName: '',
    password: '',
    confirmPassword: '',
    countryCode: '+234',
    phoneNumber: '',
    userType: 'SUB_ADMIN',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dryKlinUserName: '',
      password: '',
      confirmPassword: '',
      countryCode: '+234',
      phoneNumber: '',
      userType: 'SUB_ADMIN',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[800px] p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF5C00]">Add New Sub-admin</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Input first name here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Input last name here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Input user's email address here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="dryKlinUserName" className="block text-xs sm:text-sm font-medium text-gray-700">
                DryKlin Username
              </label>
              <input
                type="text"
                id="dryKlinUserName"
                name="dryKlinUserName"
                value={formData.dryKlinUserName}
                onChange={handleChange}
                placeholder="Input DryKlin username here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="countryCode" className="block text-xs sm:text-sm font-medium text-gray-700">
                Country Code
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              >
                <option value="+234">+234 (Nigeria)</option>
                <option value="+1">+1 (USA/Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+86">+86 (China)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+33">+33 (France)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+34">+34 (Spain)</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Input contact phone number here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="userType" className="block text-xs sm:text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              >
                <option value="SUB_ADMIN">Sub Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Input password here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password here"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white px-6 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubAdminModal; 