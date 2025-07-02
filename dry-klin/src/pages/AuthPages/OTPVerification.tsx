import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import logo1 from "../../assets/images/logo-1.png";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('tempEmail');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  // Save email to localStorage when it's available from state
  React.useEffect(() => {
    if (location.state?.email) {
      localStorage.setItem('tempEmail', location.state.email);
    }
  }, [location.state?.email]);

  // Redirect to sign in if no email is provided
  React.useEffect(() => {
    if (!email) {
      navigate('/auth/signin', { replace: true });
    }
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, any 6-digit OTP works
      if (otp.length === 6) {
        toast.success('OTP verified successfully');
        localStorage.removeItem('tempEmail'); // Clean up
        
        // Set the auth token in localStorage (this will be picked up by the Redux store)
        const mockToken = 'mock_access_token_from_otp';
        const mockUser = { username: email };
        
        localStorage.setItem('DryKlinAccessToken', mockToken);
        localStorage.setItem('DryKlinUser', JSON.stringify(mockUser));
        
        // Reload the page to trigger Redux store reinitialization with the token
        window.location.href = '/';
      } else {
        toast.error('Invalid OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('OTP resent successfully');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <img src={logo1} alt="DryKlin Logo" className="h-12 mb-8" />
      
      <Card className="w-full shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              OTP Verification
            </h1>
            <p className="text-gray-600">
              Enter the OTP sent to {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full p-3 text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Didn't receive OTP?{' '}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-orange-600 hover:text-orange-700"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </p>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('tempEmail');
                  navigate('/auth/signin');
                }}
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 