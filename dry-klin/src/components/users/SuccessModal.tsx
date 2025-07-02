import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckIcon, XIcon } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal = ({ isOpen, onClose, title, message }: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95%] flex flex-col items-center text-center p-4 md:p-6">
        <button
          onClick={onClose}
          className="absolute right-3 md:right-4 top-3 md:top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4" />
        </button>
        
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 md:mb-4">
          <CheckIcon className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-[#FF5C00] mb-2">{title}</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-[#FF5C00] text-white rounded-lg text-sm hover:bg-[#FF5C00]/90 transition-colors"
        >
          Proceed
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal; 