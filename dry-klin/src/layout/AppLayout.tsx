import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logo from '../assets/images/logo.png';
import favicon from '../assets/images/favicon.png';
import {
  GridIcon,
  BoxIcon,
  UserIcon,
  PieChartIcon,
  GroupIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@/assets/icons';
import { MenuIcon, XIcon } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: GridIcon, label: 'Dashboard', path: '/' },
  { icon: BoxIcon, label: 'Order Management', path: '/orders' },
  { icon: UserIcon, label: 'User Management', path: '/users' },
  { icon: PieChartIcon, label: 'Analytics & Reports', path: '/analytics' },
  { icon: GroupIcon, label: 'Sub-admins', path: '/admins' },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? (
          <XIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <MenuIcon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed md:sticky top-0 left-0 h-screen z-40 md:z-0",
            "bg-orange-600 text-white transition-transform duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-64",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Logo and Toggle */}
          <div className={cn(
            "flex items-center p-6",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            <img 
              src={isCollapsed ? favicon : logo} 
              alt="DryKlin Logo" 
              className={cn(
                "transition-all duration-300",
                isCollapsed ? "h-8 w-8" : "h-8"
              )} 
            />
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors hidden md:block"
            >
              {isCollapsed ? (
                <ChevronDownIcon className="h-5 w-5 rotate-270" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-lg mb-2 transition-all duration-200",
                    isActive 
                      ? "bg-white text-orange-600" 
                      : "text-white/80 hover:bg-white hover:text-orange-600",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isCollapsed ? "mx-auto" : "mr-3"
                  )} />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out relative",
            "md:ml-0",
            isCollapsed ? "md:pl-0" : "md:pl-0"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 