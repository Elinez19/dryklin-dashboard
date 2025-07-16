import { useState, useEffect } from 'react';
import { SearchIcon, ChevronDownIcon, EyeIcon, ClockIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useOrders } from '@/hooks/useOrders';
import { IOrder } from '@/types/dashboard_types';
import OrderDetailsModal from './OrderDetailsModal';
import { toast } from 'sonner';

const PendingOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { 
    pendingOrders, 
    loading, 
    error, 
    updateOrderStatus, 
    fetchPendingOrders,
    confirmOrder
  } = useOrders();

  // Load initial data when component mounts
  useEffect(() => {
    fetchPendingOrders();
  }, [fetchPendingOrders]);

  // Filter orders based on status and search query
  const filterOrders = (ordersData: IOrder[]) => {
    let filtered = ordersData;
    
    // Filter by status
    if (statusFilter !== 'All') {
      const statusMap: Record<string, string> = {
        'In Progress': 'IN_PROGRESS',
        'Completed': 'COMPLETED',
        'Cancelled': 'CANCELLED',
        'Processing': 'PROCESSING',
        'Successful': 'SUCCESSFUL',
        'Pending': 'PENDING'
      };
      const targetStatus = statusMap[statusFilter] || statusFilter.toUpperCase();
      filtered = filtered.filter(order => order.orderStatus === targetStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleViewDetails = (order: IOrder) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateOrder = async (orderId: string, updates: Partial<IOrder>) => {
    try {
      await updateOrderStatus(orderId, updates);
      setIsDetailsModalOpen(false);
      // Refresh data after update
      fetchPendingOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    try {
      toast.loading('Confirming order...');
      const confirmedOrder = await confirmOrder(orderId, 2); // Retry up to 2 times
      toast.dismiss();
      toast.success(`Order ${orderId} confirmed successfully! Status: ${confirmedOrder.orderStatus}`);
      setIsDetailsModalOpen(false);
      // Refresh data after confirmation
      fetchPendingOrders();
    } catch (error) {
      toast.dismiss();
      const errorMessage = error instanceof Error ? error.message : 'Failed to confirm order';
      
      // Show more detailed error information
      if (errorMessage.includes('Server error')) {
        toast.error(`${errorMessage} Please contact support if the issue persists.`);
      } else if (errorMessage.includes('Network error')) {
        toast.error(`${errorMessage} Please check your internet connection and try again.`);
      } else {
        toast.error(errorMessage);
      }
      
      console.error('Error confirming order:', error);
    }
  };

  const getStatusStyle = (status: IOrder['orderStatus']) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-orange-100/50 text-orange-800';
      case 'PROCESSING':
        return 'bg-yellow-100/50 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100/50 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100/50 text-red-800';
      case 'SUCCESSFUL':
        return 'bg-green-100/50 text-green-800';
      case 'PENDING':
        return 'bg-blue-100/50 text-blue-800';
      default:
        return 'bg-gray-100/50 text-gray-800';
    }
  };

  const getPaymentStatusStyle = (status: IOrder['paymentStatus']) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'N/A';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading pending orders...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-0">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <Button onClick={fetchPendingOrders} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const filteredOrders = filterOrders(pendingOrders);

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Pending Orders</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {pendingOrders.length} Orders
          </Badge>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-6">
          <Button 
            onClick={fetchPendingOrders}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ClockIcon className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-2 sm:px-4 md:px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <span className="text-sm font-medium">₦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(pendingOrders.reduce((sum, order) => sum + order.totalAmount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined order value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Pending</CardTitle>
            <Badge variant="outline" className="text-yellow-600">PENDING</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingOrders.filter(order => order.paymentStatus === 'PENDING').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 px-2 sm:px-4 md:px-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Status: {statusFilter}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('All')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('In Progress')}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Processing')}>
              Processing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders Table */}
      <div className="px-2 sm:px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
                <p className="text-gray-500">There are currently no pending orders to display.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.serviceType}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusStyle(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusStyle(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-2 text-sm px-2 py-1"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onUpdate={handleUpdateOrder}
          onConfirm={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default PendingOrders; 