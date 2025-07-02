import { useNavigate } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NotificationBellProps {
  unreadCount?: number;
  className?: string;
}

const NotificationBell = ({ unreadCount = 0, className = '' }: NotificationBellProps) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/notifications')}
      className={`relative inline-flex items-center justify-center text-gray-500 transition-colors hover:text-gray-700 ${className}`}
    >
      <BellIcon className="w-6 h-6" />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px]"
        >
          {unreadCount}
        </Badge>
      )}
    </button>
  );
};

export default NotificationBell; 