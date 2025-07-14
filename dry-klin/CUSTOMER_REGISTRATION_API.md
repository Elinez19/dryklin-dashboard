# Customer Registration API

This document describes the customer registration endpoint that has been implemented in the DryKlin dashboard.

## Endpoint

```
POST /api/v1/auth/{customerId}
```

## Request Body

```json
{
  "email": "string",
  "firstName": "string", 
  "lastName": "string",
  "dryKlinUserName": "string",
  "password": "string",
  "confirmPassword": "string",
  "countryCode": "string",
  "phoneNumber": "string",
  "userType": "string"
}
```

## Field Descriptions

- **email**: Customer's email address (required, must be valid email format)
- **firstName**: Customer's first name (required, minimum 2 characters)
- **lastName**: Customer's last name (required, minimum 2 characters)
- **dryKlinUserName**: Customer's username (required, minimum 3 characters)
- **password**: Customer's password (required, minimum 8 characters, must contain uppercase, lowercase, and number)
- **confirmPassword**: Password confirmation (required, must match password)
- **countryCode**: Country calling code (required, e.g., "+1", "+44", "+234")
- **phoneNumber**: Phone number (required, digits only, minimum 10 digits)
- **userType**: Type of user (required, options: "customer", "business", "premium")

## Response

### Success Response (200)
```json
{
  "message": "Customer registered successfully",
  "status": "SUCCESS",
  "data": {},
  "debugMessage": "",
  "dateTime": "2024-01-01T12:00:00Z"
}
```

### Error Response (400/500)
```json
{
  "message": "Error message describing the issue",
  "status": "ERROR",
  "data": {},
  "debugMessage": "Debug information",
  "dateTime": "2024-01-01T12:00:00Z"
}
```

## Usage Examples

### Using the React Component

```tsx
import CustomerRegistrationForm from '@/components/auth/CustomerRegistrationForm';

// In your component
<CustomerRegistrationForm customerId="customer-123" />
```

### Using the Service Directly

```tsx
import authService from '@/services/features/auth/authService';

const registerCustomer = async () => {
  try {
    const result = await authService.RegisterCustomer('customer-123', {
      email: 'customer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dryKlinUserName: 'johndoe',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
      countryCode: '+1',
      phoneNumber: '1234567890',
      userType: 'customer'
    });
    
    console.log('Registration successful:', result.message);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};
```

### Using Redux Thunk

```tsx
import { useDispatch } from 'react-redux';
import { RegisterCustomer } from '@/services/features/auth/authSlice';

const dispatch = useDispatch();

const handleRegistration = async () => {
  try {
    await dispatch(RegisterCustomer({
      customerId: 'customer-123',
      userData: {
        email: 'customer@example.com',
        firstName: 'John',
        lastName: 'Doe',
        dryKlinUserName: 'johndoe',
        password: 'SecurePass123',
        confirmPassword: 'SecurePass123',
        countryCode: '+1',
        phoneNumber: '1234567890',
        userType: 'customer'
      }
    })).unwrap();
    
    console.log('Registration successful');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

## Route Access

The customer registration form is accessible at:
```
/auth/customer-registration/{customerId}
```

Where `{customerId}` is the customer identifier required for registration.

## Validation Rules

- **Email**: Must be a valid email format
- **First Name**: Minimum 2 characters
- **Last Name**: Minimum 2 characters  
- **Username**: Minimum 3 characters
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, and number
- **Confirm Password**: Must match password exactly
- **Country Code**: Must be selected from dropdown
- **Phone Number**: Digits only, minimum 10 digits
- **User Type**: Must be selected from dropdown (customer, business, premium)

## Error Handling

The implementation includes comprehensive error handling:

1. **Form Validation**: Client-side validation using Yup schema
2. **API Error Handling**: Proper error messages from server responses
3. **Network Error Handling**: Graceful handling of network issues
4. **User Feedback**: Toast notifications for success/error states

## Security Considerations

- Passwords are validated for strength requirements
- Form data is validated both client-side and server-side
- API calls include proper authentication headers
- Error messages don't expose sensitive information 