import { ILogin, ILoginResponse, ISendOTPRequest, ISendOTPResponse, ICustomerRegistration, ICustomerRegistrationResponse } from "@/types/auth_types";
import { axiosClient } from "@/services/api/axiosClient";

export const handle_tokens = (response: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem("DryKlinAccessToken", response.accessToken);
  localStorage.setItem("DryKlinRefreshToken", response.refreshToken);
  return response;
};

// --- UPDATED LOGIN FUNCTION: No OTP for admin ---
const Login = async (userData: ILogin): Promise<{ success: boolean; user: { email: string } }> => {
  try {
    const response = await axiosClient.post<ILoginResponse>("/api/v1/auth/login", {
      email: userData.email,
      password: userData.password,
    });

    const { data } = response;
    // Accept both '100 CONTINUE', 'ACCEPTED', and 'SUCCESS' as success
    const isSuccess = data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS";
    let actualToken: string | undefined = undefined;
    if (typeof data.token === 'string') {
      actualToken = data.token;
    } else if (data.data && typeof (data.data as Record<string, unknown>).token === 'string') {
      actualToken = (data.data as Record<string, unknown>).token as string;
    }

    if (isSuccess && actualToken) {
      // Store the token
      localStorage.setItem("DryKlinAccessToken", actualToken);
      return {
        success: true,
        user: { email: userData.email }
      };
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Login failed";
    throw new Error(errorMessage);
  }
};

// --- END UPDATED LOGIN FUNCTION ---

const SendOTP = async (otpData: ISendOTPRequest): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosClient.post<ISendOTPResponse>("/api/v1/auth/send-otp", {
      email: otpData.email,
      phone: otpData.phone,
    });

    const { data } = response;
    // Accept both '100 CONTINUE' and 'ACCEPTED' as success
    if (data.status === "100 CONTINUE" || data.status === "ACCEPTED") {
      return {
        success: true,
        message: data.message || "OTP sent successfully"
      };
    } else {
      throw new Error(data.message || "Failed to send OTP");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to send OTP";
    throw new Error(errorMessage);
  }
};

const VerifyOTP = async (otp: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo, any 6-digit OTP works
  if (otp.length === 6) {
    const tokens = {
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
    };
    handle_tokens(tokens);
    return {
      ...tokens,
      user: { email: "admin@example.com" }
    };
  }
  
  throw new Error("Invalid OTP");
};

// Sub-admin types
export interface ISubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetAllSubAdminsResponse {
  message: string;
  status: string;
  data: ISubAdmin[];
  debugMessage?: string;
  dateTime: string;
}

export const GetAllSubAdmins = async (): Promise<ISubAdmin[]> => {
  try {
    const response = await axiosClient.get<IGetAllSubAdminsResponse>("/api/v1/auth/get-all-subadmins");
    
    const { data } = response;
    
    // Check if the request was successful
    if (data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS") {
      return data.data || [];
    } else {
      throw new Error(data.message || "Failed to fetch sub-admins");
    }
  } catch (error: unknown) {
    console.error('GetAllSubAdmins error:', error);
    
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to fetch sub-admins";
    throw new Error(errorMessage);
  }
};

// Customer Registration Function
const RegisterCustomer = async (customerId: string, userData: ICustomerRegistration): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosClient.post<ICustomerRegistrationResponse>(`/api/v1/auth/${customerId}`, {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dryKlinUserName: userData.dryKlinUserName,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      countryCode: userData.countryCode,
      phoneNumber: userData.phoneNumber,
      userType: userData.userType,
    });

    const { data } = response;
    // Accept both '100 CONTINUE', 'ACCEPTED', and 'SUCCESS' as success
    const isSuccess = data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS";

    if (isSuccess) {
      return {
        success: true,
        message: data.message || "Customer registered successfully"
      };
    } else {
      throw new Error(data.message || "Customer registration failed");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Customer registration failed";
    throw new Error(errorMessage);
  }
};

export const Logout = () => {
  localStorage.removeItem("DryKlinAccessToken");
  localStorage.removeItem("DryKlinRefreshToken");
  localStorage.removeItem("DryKlinUser");
  localStorage.removeItem("tempEmail");
  window.location.href = "/auth/signin";
};

export interface IAdminUserDetails {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  dryKlinUserName: string | null;
  countryCode: string | null;
  phoneNumber: string | null;
  userType: string;
  registrationLevel: string | null;
  passportUrl: string | null;
  documentUrl: string | null;
  roles: string | null;
  dateOfBirth: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  bankCode: string | null;
  payStackCustomerId: string | null;
  payStackCustomerCode: string | null;
  walletId: string | null;
}

export const fetchAdminUserByEmail = async (email: string): Promise<IAdminUserDetails> => {
  const response = await axiosClient.get(`/api/v1/auth/email?email=${encodeURIComponent(email)}`);
  return response.data.data;
};

const authService = {
  Login,
  SendOTP,
  VerifyOTP,
  RegisterCustomer,
  Logout,
  GetAllSubAdmins,
};

export default authService;
