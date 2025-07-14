import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EyeCloseIcon, EyeIcon } from '@/assets/icons';
import useCustomerRegistrationForm from '@/hooks/Form-hooks/useCustomerRegistrationForm';

interface CustomerRegistrationFormProps {
  customerId: string;
}

const CustomerRegistrationForm: React.FC<CustomerRegistrationFormProps> = ({ customerId }) => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    formik,
    isLoading
  } = useCustomerRegistrationForm(customerId);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Customer Registration</CardTitle>
        <CardDescription>
          Register a new customer account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? 'border-red-500' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-sm text-red-500">{formik.errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-sm text-red-500">{formik.errors.lastName}</div>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="dryKlinUserName">Username</Label>
            <Input
              id="dryKlinUserName"
              name="dryKlinUserName"
              type="text"
              placeholder="Enter username"
              value={formik.values.dryKlinUserName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.dryKlinUserName && formik.errors.dryKlinUserName ? 'border-red-500' : ''}
            />
            {formik.touched.dryKlinUserName && formik.errors.dryKlinUserName && (
              <div className="text-sm text-red-500">{formik.errors.dryKlinUserName}</div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.password && formik.errors.password ? 'border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeCloseIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeCloseIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-sm text-red-500">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Country Code */}
          <div className="space-y-2">
            <Label htmlFor="countryCode">Country Code</Label>
            <Select
              value={formik.values.countryCode}
              onValueChange={(value) => formik.setFieldValue('countryCode', value)}
            >
              <SelectTrigger className={formik.touched.countryCode && formik.errors.countryCode ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select country code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">+1 (USA/Canada)</SelectItem>
                <SelectItem value="+44">+44 (UK)</SelectItem>
                <SelectItem value="+91">+91 (India)</SelectItem>
                <SelectItem value="+234">+234 (Nigeria)</SelectItem>
                <SelectItem value="+254">+254 (Kenya)</SelectItem>
                <SelectItem value="+27">+27 (South Africa)</SelectItem>
                <SelectItem value="+233">+233 (Ghana)</SelectItem>
                <SelectItem value="+256">+256 (Uganda)</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.countryCode && formik.errors.countryCode && (
              <div className="text-sm text-red-500">{formik.errors.countryCode}</div>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-sm text-red-500">{formik.errors.phoneNumber}</div>
            )}
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <Label htmlFor="userType">User Type</Label>
            <Select
              value={formik.values.userType}
              onValueChange={(value) => formik.setFieldValue('userType', value)}
            >
              <SelectTrigger className={formik.touched.userType && formik.errors.userType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.userType && formik.errors.userType && (
              <div className="text-sm text-red-500">{formik.errors.userType}</div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formik.isValid}
          >
            {isLoading ? "Registering..." : "Register Customer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerRegistrationForm; 