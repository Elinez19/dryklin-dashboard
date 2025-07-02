import { EyeCloseIcon, EyeIcon } from "../../assets/icons";
import logo1 from "../../assets/images/logo-1.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useSignInForm from "@/hooks/Form-hooks/useSignInForm";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

export default function SignInForm() {
  const {showPassword, setShowPassword, formik, isLoading} = useSignInForm()

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <img src={logo1} alt="DryKlin Logo" className="h-12 mb-8" />
      
      <Card className="w-full shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome
            </h1>
            <p className="text-gray-600">
              Input your log in details below
            </p>
          </div>
          
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Enter Email Address
              </Label>
              <Input 
                id="username"
                name="username"
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`w-full p-3 ${
                  formik.touched.username && formik.errors.username 
                    ? "border-red-500" 
                    : "border-gray-200"
                }`}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-sm text-red-500">{formik.errors.username}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">
                  Enter Password
                </Label>
                <Link 
                  to="/auth/forgot-password"
                  className="text-orange-600 hover:text-orange-700 text-sm"
                >
                  Forgotten Password
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full p-3 ${
                    formik.touched.password && formik.errors.password 
                      ? "border-red-500" 
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeCloseIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
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
                  Signing in...
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}