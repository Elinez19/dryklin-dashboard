import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import logo1 from "@/assets/images/logo-1.png";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { VerifyOTP, reset } from '@/services/features/auth/authSlice';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get email from state or localStorage
    const stateEmail = location.state?.email;
    const storedEmail = localStorage.getItem('tempEmail');
    
    console.log('State email:', stateEmail);
    console.log('Stored email:', storedEmail);
    
    if (stateEmail) {
      setEmail(stateEmail);
      localStorage.setItem('tempEmail', stateEmail);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.log('No email found, redirecting to sign in');
      navigate('/auth/signin', { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Reset auth state on component mount
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }

    try {
      await dispatch(VerifyOTP(otp)).unwrap();
      localStorage.removeItem('tempEmail'); // Clean up
      navigate('/', { replace: true });
    } catch (error) {
      if (isError) {
        toast.error(message || 'Failed to verify OTP');
      }
      dispatch(reset());
    }
  };

  const handleResendOTP = async () => {
    toast.success('OTP resent successfully');
  };

  // Show loading state while checking email
  if (email === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
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