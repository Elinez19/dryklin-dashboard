import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { LogoutUser } from '@/services/features/auth/authSlice';
import useUser from '@/hooks/useUser';
import { UserCircle, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import NotificationBell from './NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserHeaderProps {
  unreadCount?: number;
  showNotificationBell?: boolean;
}

const UserHeader = ({ unreadCount = 3, showNotificationBell = true }: UserHeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading: adminLoading, error: adminError } = useUser();

  const handleLogout = () => {
    dispatch(LogoutUser());
    navigate('/auth/signin');
  };

  // Get display name from user data
  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user?.firstName) {
      return user.firstName;
    } else if (user?.email) {
      return user.email.split('@')[0]; // Use email prefix as name
    }
    return 'Guest User';
  };

  // Get display email
  const getDisplayEmail = () => {
    if (user?.email) {
      return user.email;
    }
    return 'Not signed in';
  };

  return (
    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
      {showNotificationBell && <NotificationBell unreadCount={unreadCount} />}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 sm:gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors">
            <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            <div className="hidden sm:block text-left">
              {adminLoading ? (
                <div className="text-xs text-gray-400">Loading...</div>
              ) : adminError ? (
                <div className="text-xs text-red-500">{adminError}</div>
              ) : user ? (
                <>
                  <div className="text-sm font-medium">{getDisplayName()}</div>
                  <div className="text-xs text-gray-500">{getDisplayEmail()}</div>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium">Guest User</div>
                  <div className="text-xs text-gray-500">Not signed in</div>
                </>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
              <p className="text-xs leading-none text-muted-foreground">{getDisplayEmail()}</p>
              {user?.phoneNumber && (
                <p className="text-xs leading-none text-muted-foreground">{user.phoneNumber}</p>
              )}
              {user?.userType && (
                <p className="text-xs leading-none text-muted-foreground capitalize">{user.userType.toLowerCase()}</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserHeader; 