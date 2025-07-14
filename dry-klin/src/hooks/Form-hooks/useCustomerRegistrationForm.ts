import { RegisterCustomer, reset } from '@/services/features/auth/authSlice';
import { AppDispatch, RootState } from '@/store';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import * as Yup from 'yup';

// Validation schema for customer registration
const CustomerRegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  dryKlinUserName: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  countryCode: Yup.string()
    .required('Country code is required'),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  userType: Yup.string()
    .required('User type is required'),
});

const useCustomerRegistrationForm = (customerId: string) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      dryKlinUserName: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      phoneNumber: "",
      userType: "",
    },
    validationSchema: CustomerRegistrationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(RegisterCustomer({ customerId, userData: values })).unwrap();
        toast.success("Customer registered successfully!");
        formik.resetForm();
      } catch (err: unknown) {
        let errorMsg = 'Registration failed';
        if (err instanceof Error) errorMsg = err.message;
        toast.error(errorMsg);
        dispatch(reset());
      }
    }
  });

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    formik,
    isLoading
  };
};

export default useCustomerRegistrationForm; 