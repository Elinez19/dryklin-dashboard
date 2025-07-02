import { SignInSchema } from '@/helpers/helpers.schemas';
import { LoginUser, reset } from '@/services/features/auth/authSlice';
import { AppDispatch, RootState } from '@/store';
import { useFormik } from 'formik';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const useSignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {isLoading, message} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Initialize useFormik hook
    const formik = useFormik({
      initialValues: {
        username: "",
        password: ""
      },
      validationSchema: SignInSchema,
      onSubmit: async (values) => {
        try {
          // Validate credentials first
          await dispatch(LoginUser(values)).unwrap();
          // Store email temporarily and navigate to OTP verification
          localStorage.setItem('tempEmail', values.username);
          navigate('/auth/otp-verification', { 
            replace: true,
            state: { email: values.username } 
          });
        } catch {
          toast.error(message || 'Invalid credentials');
          dispatch(reset());
        }
      }
    });

    return {showPassword, setShowPassword, formik, isLoading};
}

export default useSignInForm;