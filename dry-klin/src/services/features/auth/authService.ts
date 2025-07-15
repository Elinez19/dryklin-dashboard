import { ILogin, ILoginResponse, ISendOTPRequest, ISendOTPResponse, ICustomerRegistration, ICustomerRegistrationResponse } from "@/types/auth_types";
import { axiosClient } from "@/services/api/axiosClient";
import { encrypt } from "@/helpers/helpers.encryptDecrypt";

export const handle_tokens = (response: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem("DryKlinAccessToken", encrypt(response.accessToken));
  localStorage.setItem("DryKlinRefreshToken", encrypt(response.refreshToken));
  return response;
};

// --- UPDATED LOGIN FUNCTION: No OTP for admin ---
const Login = async (userData: ILogin): Promise<{ success: boolean; user: { email: string; userType?: string } }> => {
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
      localStorage.setItem("DryKlinAccessToken", encrypt(actualToken));
      
      // Immediately store the correct admin data in localStorage
      const adminUserData = {
        customerId: "683f0d25bc6b643b45996611",
        email: "dryklin@gmail.com",
        firstName: "Balogun",
        lastName: "Danjuma",
        dryKlinUserName: null,
        countryCode: null,
        phoneNumber: "07062380867",
        userType: "ADMIN",
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
      
      // Store admin data immediately
      localStorage.setItem("DryKlinUser", JSON.stringify(adminUserData));
      
      // Try to fetch user details to get complete user information (optional)
      try {
        const userDetails = await fetchAdminUserByEmail(userData.email);
        
        // Update with API data if available, otherwise keep the default admin data
        const finalUserData = {
          ...adminUserData,
          ...userDetails,
          // Ensure we keep the correct admin info even if API returns different data
          email: "dryklin@gmail.com",
          firstName: "Balogun",
          lastName: "Danjuma",
          phoneNumber: "07062380867",
          userType: "ADMIN",
        };
        
        // Store the final user data
        localStorage.setItem("DryKlinUser", JSON.stringify(finalUserData));
      } catch (userDetailsError) {
        // If API call fails, we already have the admin data stored
        console.warn('Could not fetch user details during login:', userDetailsError);
      }
      
      return {
        success: true,
        user: { 
          email: "dryklin@gmail.com",
          userType: "ADMIN"
        }
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
    // First, let's check if we have the current user's details to verify admin status
    const currentUserEmail = localStorage.getItem("DryKlinUser") 
      ? JSON.parse(localStorage.getItem("DryKlinUser")!).email 
      : null;
    
    if (!currentUserEmail) {
      throw new Error("User not authenticated");
    }

    // Fetch current user details to verify admin status
    try {
      const userDetails = await fetchAdminUserByEmail(currentUserEmail);
      if (userDetails.userType !== "ADMIN") {
        throw new Error("Only admin users can access sub-admin management");
      }
    } catch (userError) {
      console.error('Error fetching user details:', userError);
      throw new Error("Unable to verify admin permissions");
    }

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
  // Clear any other potential token storage
  sessionStorage.clear();
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

// Create Sub-Admin interface
export interface ICreateSubAdminRequest {
  email: string;
  firstName: string;
  lastName: string;
  dryKlinUserName: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
  userType: string;
}

export interface ICreateSubAdminResponse {
  message: string;
  status: string;
  data?: unknown;
  dateTime: string;
}

export const CreateSubAdmin = async (subAdminData: ICreateSubAdminRequest): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosClient.post<ICreateSubAdminResponse>("/api/v1/auth/create-subadmin", {
      email: subAdminData.email,
      firstName: subAdminData.firstName,
      lastName: subAdminData.lastName,
      dryKlinUserName: subAdminData.dryKlinUserName,
      password: subAdminData.password,
      confirmPassword: subAdminData.confirmPassword,
      countryCode: subAdminData.countryCode,
      phoneNumber: subAdminData.phoneNumber,
      userType: subAdminData.userType,
    });

    const { data } = response;
    // Accept both '100 CONTINUE', 'ACCEPTED', and 'SUCCESS' as success
    const isSuccess = data.status === "100 CONTINUE" || data.status === "ACCEPTED" || data.status === "SUCCESS";

    if (isSuccess) {
      return {
        success: true,
        message: data.message || "Sub-admin created successfully"
      };
    } else {
      throw new Error(data.message || "Failed to create sub-admin");
    }
  } catch (error: unknown) {
    // Handle API errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
        ? error.response.data.message
        : "Failed to create sub-admin";
    throw new Error(errorMessage);
  }
};

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
  CreateSubAdmin,
};

export default authService;
