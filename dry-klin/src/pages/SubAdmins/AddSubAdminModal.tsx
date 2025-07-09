import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { XIcon } from 'lucide-react';

interface AddSubAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubAdminFormData) => void;
}

interface SubAdminFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const AddSubAdminModal = ({ isOpen, onClose, onSubmit }: AddSubAdminModalProps) => {
  const [formData, setFormData] = useState<SubAdminFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[600px] p-4 sm:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF5C00]">Add New Sub-admin</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Input full name here"
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
              <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
                Phone No.
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
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
                Create Password
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