import { Card } from '@/components/ui/card';
import UserHeader from '@/components/common/UserHeader';

const Analytics = () => {
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
        <UserHeader unreadCount={unreadCount} />
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