//Login Type

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginToken = {
  accessToken?: string;
  refreshToken?: string;
  requireTwoFa?: boolean;
};

// Customer Registration Type
export type ICustomerRegistration = {
  email: string;
  firstName: string;
  lastName: string;
  dryKlinUserName: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
  userType: string;
};

// API Response Types
export type ILoginResponse = {
  message: string;
  status: string;
  data: Record<string, unknown>;
  token: string;
  debugMessage: string;
  dateTime: string;
};

export type ICustomerRegistrationResponse = {
  message: string;
  status: string;
  data: Record<string, unknown>;
  token?: string;
  debugMessage: string;
  dateTime: string;
};

// Send OTP Types
export type ISendOTPRequest = {
  phone?: string;
  email: string;
};

export type ISendOTPResponse = {
  message: string;
  status: string;
  data: Record<string, unknown>;
  token: string;
  debugMessage: string;
  dateTime: string;
};
