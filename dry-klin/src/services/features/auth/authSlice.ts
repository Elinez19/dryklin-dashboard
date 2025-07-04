import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { ILogin } from "@/types/auth_types";

// Get user from localStorage
const user = localStorage.getItem("DryKlinUser");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: localStorage.getItem("DryKlinAccessToken"),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Login user
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (user: ILogin, thunkAPI) => {
    try {
      return await authService.Login(user);
    } catch (error: any) {
      const message = error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify OTP
export const VerifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp: string, thunkAPI) => {
    try {
      return await authService.VerifyOTP(otp);
    } catch (error: any) {
      const message = error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const LogoutUser = createAsyncThunk("auth/logout", async () => {
  authService.Logout();
});

// export const GetUser = createAsyncThunkWithHandler("auth/getUser", async () => {
//   return await authService.get_user();
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
        state.token = null;
      })
      .addCase(VerifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(VerifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
