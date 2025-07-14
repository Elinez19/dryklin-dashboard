import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerRegistrationForm from '@/components/auth/CustomerRegistrationForm';

const CustomerRegistration: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  
  if (!customerId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Customer ID</h2>
          <p className="mt-2 text-gray-600">Customer ID is required for registration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Customer Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register a new customer account
          </p>
        </div>
        
        <CustomerRegistrationForm customerId={customerId} />
      </div>
    </div>
  );
};

export default CustomerRegistration; 