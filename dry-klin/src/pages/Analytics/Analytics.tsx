import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import UserHeader from '@/components/common/UserHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchAnalyticsData } from '@/services/features/analyticsSlice';

const Analytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats: analyticsStats, statsLoading, statsError } = useSelector(
    (state: RootState) => state.analytics
  );
  const unreadCount = 3;

  // Debug logging
  console.log('Analytics component - analyticsStats:', analyticsStats);
  console.log('Analytics component - statsLoading:', statsLoading);
  console.log('Analytics component - statsError:', statsError);

  // Fetch analytics data on component mount
  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  // Format numbers with commas
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return num.toLocaleString();
  };

  const stats = [
    { title: 'Profile Updates This Month', value: formatNumber(analyticsStats?.profileUpdatesPerMonth) },
    { title: 'Orders Placed This Month', value: formatNumber(analyticsStats?.ordersPlacedPerMonth) },
    { title: 'New Users This Month', value: formatNumber(analyticsStats?.newUsersPerMonth) },
    { title: 'Monthly Logins', value: formatNumber(analyticsStats?.monthlyLogins) },
    { title: 'Completed Orders', value: formatNumber(analyticsStats?.completedOrders) },
    { title: 'Cancelled Orders', value: formatNumber(analyticsStats?.cancelledOrders) },
  ];

  // Debug logging for stats array
  console.log('Analytics component - stats array:', stats);

  return (
    <div className="p-2 md:p-6 space-y-6 pt-14 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-2xl font-bold">Analytics</h1>
        <UserHeader unreadCount={unreadCount} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
        {statsLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-2 md:p-4 bg-white">
              <div className="flex flex-col">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))
        ) : statsError ? (
          // Error state
          <div className="col-span-full text-center py-8">
            <p className="text-red-600 text-sm">Failed to load analytics data</p>
            <button 
              onClick={() => dispatch(fetchAnalyticsData())}
              className="mt-2 text-[#FF5C00] text-sm hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          // Normal stats display
          stats.map((item, index) => (
            <Card key={index} className="p-2 md:p-4 bg-white">
              <div className="flex flex-col">
                <span className="text-[10px] md:text-sm text-[#FF5C00] mb-1 md:mb-2 line-clamp-1">{item.title}</span>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-2xl font-bold">{item.value}</span>
                  <button className="text-[10px] md:text-sm text-[#FF5C00] hidden md:block">See All</button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Analytics; 