import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SuccessModal from './SuccessModal';

interface AddServicePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  companyName: string;
  email: string;
  contactPersonName: string;
  phoneNumber: string;
  address: string;
}

const AddServicePartnerModal = ({ isOpen, onClose }: AddServicePartnerModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    contactPersonName: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the service partner
    // For now, we'll just show the success modal
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
    // Reset form data
    setFormData({
      companyName: '',
      email: '',
      contactPersonName: '',
      phoneNumber: '',
      address: '',
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[#FF5C00] text-lg md:text-xl">Add New Service Partner</DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
              </button>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company's Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Input company's name here"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00]"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Input user's email address here"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00]"
                  required
                />
              </div>

              {/* Contact Person Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  placeholder="Input contact person name here"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00]"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No.
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Input contact phone number here"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00]"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Input service partner's address here"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00]"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-[#FF5C00] text-white rounded-lg text-sm hover:bg-[#FF5C00]/90 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Service Partner Added Successfully"
        message="You have successfully added a new service partner to DryKlin's database."
      />
    </>
  );
};

export default AddServicePartnerModal; 