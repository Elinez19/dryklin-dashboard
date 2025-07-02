import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { EyeCloseIcon, EyeIcon } from '@/assets/icons';

const CreateNewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/auth/forgot-password');
    }
  }, [email, navigate]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: CreateNewPasswordSchema,
    onSubmit: async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Password updated successfully');
        navigate('/auth/signin');
      } catch {
        toast.error('Failed to update password');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h1 className="mb-2 font-bold text-gray-800 text-2xl dark:text-white/90">
          Create New Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <div className="min-h-20 space-y-2">
          <Label htmlFor="password" className="font-medium">
            New Password <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 shadow-sm transition-all focus:ring-2 focus:ring-brand-500/50 ${
                formik.touched.password && formik.errors.password
                  ? "border-error-500 focus:border-error-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
          <div className="h-5 mt-1">
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-error-500">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>

        <div className="min-h-20 space-y-2">
          <Label htmlFor="confirmPassword" className="font-medium">
            Confirm Password <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`mt-1 shadow-sm transition-all focus:ring-2 focus:ring-brand-500/50 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-error-500 focus:border-error-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showConfirmPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
          <div className="h-5 mt-1">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-sm text-error-500">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex mt-3 items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all rounded-lg bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/auth/signin')}
            className="text-sm text-brand-500 hover:text-brand-600"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
} 