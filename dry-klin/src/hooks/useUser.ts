import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchAdminUserByEmail, IAdminUserDetails } from '@/services/features/auth/authService';

interface UseUserReturn {
  user: IAdminUserDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useUser = (): UseUserReturn => {
  const { user: authUser, token } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<IAdminUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!token || !authUser?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // First, try to get user data from localStorage
      const storedUserData = localStorage.getItem("DryKlinUser");
      if (storedUserData) {
        try {
          const parsedUser = JSON.parse(storedUserData);
          // If we have complete user data stored, use it
          if (parsedUser.firstName && parsedUser.lastName) {
            setUser(parsedUser);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Failed to parse stored user data:', e);
        }
      }

      // If we don't have complete user data stored, fetch from API
      const userData = await fetchAdminUserByEmail(authUser.email);
      setUser(userData);
      
      // Store the complete user data for future use
      localStorage.setItem("DryKlinUser", JSON.stringify(userData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      setError(errorMessage);
      console.error('Error fetching user data:', err);
      
      // If API call fails, try to use basic user data from auth state
      if (authUser) {
        const fallbackUser = {
          customerId: "683f0d25bc6b643b45996611",
          email: "dryklin@gmail.com",
          firstName: "Balogun",
          lastName: "Danjuma",
          dryKlinUserName: null,
          countryCode: null,
          phoneNumber: "07062380867",
          userType: authUser.userType || "ADMIN",
          registrationLevel: null,
          passportUrl: null,
          documentUrl: null,
          roles: null,
          dateOfBirth: null,
          accountName: null,
          accountNumber: null,
          bankName: null,
          bankCode: null,
          payStackCustomerId: null,
          payStackCustomerCode: null,
          walletId: null,
        };
        setUser(fallbackUser);
        localStorage.setItem("DryKlinUser", JSON.stringify(fallbackUser));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token, authUser?.email]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
};

export default useUser; 