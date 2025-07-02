import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'delete';
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ConfirmationModalProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
          confirmButtonClass: 'bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white',
          cancelButtonClass: 'border-gray-200 text-gray-700 hover:bg-gray-50'
        };
      case 'warning':
        return {
          icon: <AlertCircle className="h-12 w-12 text-yellow-500" />,
          confirmButtonClass: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          cancelButtonClass: 'border-gray-200 text-gray-700 hover:bg-gray-50'
        };
      case 'delete':
        return {
          icon: <AlertCircle className="h-12 w-12 text-red-500" />,
          confirmButtonClass: 'bg-red-500 hover:bg-red-600 text-white',
          cancelButtonClass: 'border-gray-200 text-gray-700 hover:bg-gray-50'
        };
      default:
        return {
          icon: <CheckCircle2 className="h-12 w-12 text-[#FF5C00]" />,
          confirmButtonClass: 'bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white',
          cancelButtonClass: 'border-gray-200 text-gray-700 hover:bg-gray-50'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <div className="flex flex-col items-center text-center p-4">
          {styles.icon}
          <h2 className="mt-4 text-lg font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-gray-500">{message}</p>
          
          <div className="flex gap-3 mt-6 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className={`flex-1 ${styles.cancelButtonClass}`}
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 ${styles.confirmButtonClass}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal; 