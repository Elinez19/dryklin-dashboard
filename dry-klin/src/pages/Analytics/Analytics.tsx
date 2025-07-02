import { Card } from '@/components/ui/card';
import avatar from "../../assets/images/Avatar.png";
import NotificationBell from '@/components/common/NotificationBell';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();
  const unreadCount = 3;

  const stats = [
    { title: 'Total No. of Users', value: '2,105' },
    { title: 'Total No. of Orders', value: '7,302' },
    { title: 'Total No. of Service Partners', value: '238' },
    { title: 'Total No. of Delivery Agents', value: '1,032' },
  ];

  return (
    <div className="p-2 md:p-6 space-y-6 pt-14 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-2xl font-bold">Analytics</h1>
        <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
          <NotificationBell unreadCount={unreadCount} />
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="p-2 md:p-4 bg-white">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-sm text-[#FF5C00] mb-1 md:mb-2 line-clamp-1">{item.title}</span>
              <div className="flex items-center justify-between">
                <span className="text-base md:text-2xl font-bold">{item.value}</span>
                <button className="text-[10px] md:text-sm text-[#FF5C00] hidden md:block">See All</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics; 