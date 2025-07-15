import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserHeader from '@/components/common/UserHeader';

type Tab = 'log' | 'configuration' | 'settings';

interface NotificationLogItem {
  id: string;
  action: string;
  adminFullName: string;
  author: string;
  dateCreated: string;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<Tab>('log');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const notificationLogs: NotificationLogItem[] = [
    {
      id: '1',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '2',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '3',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '4',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '5',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '6',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
    {
      id: '7',
      action: 'Lorem ipsum dolor sit amet consectetur.',
      adminFullName: 'James Blake',
      author: 'Name of User',
      dateCreated: '23/03/24',
    },
  ];

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === notificationLogs.length
        ? []
        : notificationLogs.map(item => item.id)
    );
  };

  const renderNotificationLog = () => (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                checked={selectedItems.length === notificationLogs.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Admin Full Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Author</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {notificationLogs.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="px-4 py-3">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                />
              </td>
              <td className="px-4 py-3 text-sm">{item.action}</td>
              <td className="px-4 py-3 text-sm">{item.adminFullName}</td>
              <td className="px-4 py-3 text-sm">{item.author}</td>
              <td className="px-4 py-3 text-sm">{item.dateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">
          Previous
        </button>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-sm bg-orange-50 text-[#FF5C00] rounded-lg border border-orange-200">1</button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200">2</button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200">3</button>
          <span className="px-2 text-gray-400">...</span>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200">8</button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200">9</button>
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-lg border border-transparent hover:border-gray-200">10</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );

  const renderNotificationConfiguration = () => (
    <div className="space-y-8 mt-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 bg-gray-50 inline-block px-3 py-1 rounded">User</h3>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">Email Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">SMS Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">In-App Alerts</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 bg-gray-50 inline-block px-3 py-1 rounded">Admin.</h3>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">Email Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">SMS Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
            <span className="text-sm">In-App Alerts</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4 mt-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">New Account Creation</span>
          <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">Log In</span>
          <input type="checkbox" className="rounded border-gray-300" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">New Order</span>
          <input type="checkbox" className="rounded border-gray-300" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">User Profile Edit</span>
          <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">User Password Change</span>
          <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#FF5C00]">System Downtime Alerts</span>
          <CheckIcon className="h-5 w-5 text-[#FF5C00]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-2 md:p-6 space-y-6 pt-14 md:pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-2xl font-bold">Notifications</h1>
        <UserHeader unreadCount={3} showNotificationBell={false} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('log')}
            className={cn(
              "py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'log'
                ? "border-[#FF5C00] text-[#FF5C00]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Notification Log
          </button>
          <button
            onClick={() => setActiveTab('configuration')}
            className={cn(
              "py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'configuration'
                ? "border-[#FF5C00] text-[#FF5C00]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Notification Configuration
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'settings'
                ? "border-[#FF5C00] text-[#FF5C00]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Notification Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'log' && renderNotificationLog()}
      {activeTab === 'configuration' && renderNotificationConfiguration()}
      {activeTab === 'settings' && renderNotificationSettings()}
    </div>
  );
};

export default Notifications; 