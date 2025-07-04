import { ILogin } from "@/types/auth_types";

// Mock user data
const MOCK_USER = {
  username: "admin",
  password: "password123",
  accessToken: "mock_access_token",
  refreshToken: "mock_refresh_token",
};

export const handle_tokens = (response: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem("DryKlinAccessToken", response.accessToken);
  localStorage.setItem("DryKlinRefreshToken", response.refreshToken);
  return response;
};

const Login = async (userData: ILogin) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (userData.username === MOCK_USER.username && userData.password === MOCK_USER.password) {
    // Don't set tokens yet, just return success
    return {
      success: true,
      user: { username: MOCK_USER.username }
    };
  }
  
  throw new Error("Invalid credentials");
};

const VerifyOTP = async (otp: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo, any 6-digit OTP works
  if (otp.length === 6) {
    const tokens = {
      accessToken: MOCK_USER.accessToken,
      refreshToken: MOCK_USER.refreshToken,
    };
    handle_tokens(tokens);
    return {
      ...tokens,
      user: { username: MOCK_USER.username }
    };
  }
  
  throw new Error("Invalid OTP");
};

export const Logout = () => {
  localStorage.removeItem("DryKlinAccessToken");
  localStorage.removeItem("DryKlinRefreshToken");
  localStorage.removeItem("DryKlinUser");
  localStorage.removeItem("tempEmail");
  window.location.href = "/auth/signin";
};

const authService = {
  Login,
  VerifyOTP,
  Logout,
};

export default authService;
