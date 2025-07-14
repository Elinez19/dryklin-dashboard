import { SignInSchema } from '@/helpers/helpers.schemas';
import { LoginUser, reset } from '@/services/features/auth/authSlice';
import { AppDispatch, RootState } from '@/store';
import { useFormik } from 'formik';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const useSignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {isLoading} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

   
    const formik = useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      validationSchema: SignInSchema,
      onSubmit: async (values) => {
        try {
          
          await dispatch(LoginUser({ email: values.email, password: values.password })).unwrap();
          toast.success("Login successful!");
         
         
        } catch (err: unknown) {
          let errorMsg = 'An error occurred';
          if (err instanceof Error) errorMsg = err.message;
          toast.error(errorMsg);
          dispatch(reset());
        }
      }
    });

    return {showPassword, setShowPassword, formik, isLoading};
}

export default useSignInForm;