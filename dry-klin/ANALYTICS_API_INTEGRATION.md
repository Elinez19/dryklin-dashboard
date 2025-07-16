# Analytics API Integration

This document describes the integration of the analytics API endpoints into the DryKlin dashboard Analytics page.

## Overview

The analytics API integration allows the Analytics page to fetch and display real-time statistics from the user stats endpoints. The implementation includes:

- API service layer for fetching analytics data
- Redux state management for analytics data
- UI integration in the Analytics component
- Loading and error states
- Responsive grid layout for multiple statistics cards

## API Endpoints

The following endpoints are consumed to fetch analytics data:

1. **GET /api/user-stats/profile-updates-per-month** - Profile updates count for the current month
2. **GET /api/user-stats/orders-placed-per-month** - Orders placed count for the current month
3. **GET /api/user-stats/new-users-per-month** - New users registered this month
4. **GET /api/user-stats/monthly-logins** - Monthly login count
5. **GET /api/user-stats/completed-orders** - Total completed orders
6. **GET /api/user-stats/cancelled-orders** - Total cancelled orders

## Implementation Details

### 1. Analytics Service (`src/services/features/analyticsService.ts`)

- Handles API calls to fetch analytics data from all endpoints
- Uses `Promise.allSettled()` to fetch data in parallel
- Includes error handling and response format validation
- Supports different response structures (direct value or wrapped response)
- Provides fallback values (0) if any endpoint fails

### 2. Redux Slice (`src/services/features/analyticsSlice.ts`)

- Manages analytics state (loading, error, data)
- Provides async thunk for fetching analytics data
- Exports actions and reducer

### 3. Store Integration (`src/store/index.ts`)

- Analytics reducer added to the Redux store
- Available as `state.analytics` in the application

### 4. UI Integration (`src/pages/Analytics/Analytics.tsx`)

- Fetches analytics data when component mounts
- Displays data in a responsive grid layout
- Includes loading skeleton animation
- Error handling with retry functionality
- Number formatting with commas

## Features

### Statistics Cards
The Analytics page displays 6 key metrics:

1. **Profile Updates This Month** - Number of profile updates in current month
2. **Orders Placed This Month** - Number of orders placed in current month
3. **New Users This Month** - Number of new user registrations this month
4. **Monthly Logins** - Total login count for the month
5. **Completed Orders** - Total number of completed orders
6. **Cancelled Orders** - Total number of cancelled orders

### UI Features
- **Responsive Grid**: 2 columns on mobile, 3 on tablet, 6 on desktop
- **Loading States**: Skeleton animation while data is loading
- **Error Handling**: Error message with retry button
- **Number Formatting**: Large numbers displayed with commas
- **Consistent Styling**: Matches the existing design system

### Data Handling
- **Parallel Fetching**: All endpoints called simultaneously for better performance
- **Graceful Degradation**: If one endpoint fails, others still work
- **Fallback Values**: Default to 0 if data is unavailable
- **Real-time Updates**: Data refreshes when component mounts

## Usage

1. Navigate to Analytics & Reports page
2. Analytics data will be automatically fetched and displayed
3. Loading skeleton will show while data is being fetched
4. If there's an error, a retry button will be available

## Error Handling

- Network errors are handled gracefully
- Individual endpoint failures don't break the entire page
- Loading states prevent multiple API calls
- Console logging for debugging
- User-friendly error messages

## Future Enhancements

- Add data visualization charts/graphs
- Implement date range filtering
- Add export functionality for analytics data
- Real-time data updates with WebSocket
- Historical data comparison
- Custom metric calculations
- Dashboard customization options 