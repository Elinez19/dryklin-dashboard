import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { ILogin, ICustomerRegistration } from "@/types/auth_types";

// Login user
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (user: ILogin, thunkAPI) => {
    try {
      return await authService.Login(user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register customer
export const RegisterCustomer = createAsyncThunk(
  "auth/register-customer",
  async ({ customerId, userData }: { customerId: string; userData: ICustomerRegistration }, thunkAPI) => {
    try {
      return await authService.RegisterCustomer(customerId, userData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const LogoutUser = createAsyncThunk("auth/logout", async () => {
  authService.Logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      try {
        const storedUser = localStorage.getItem("DryKlinUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Return the email and userType for Redux state
          return {
            email: parsedUser.email || "dryklin@gmail.com",
            userType: parsedUser.userType || "ADMIN"
          };
        }
        return null;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
      }
    })(),
    token: localStorage.getItem("DryKlinAccessToken"),
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
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
        state.user = {
          email: action.payload.user.email,
          userType: action.payload.user.userType || "ADMIN"
        };
        state.token = localStorage.getItem("DryKlinAccessToken");
        // The complete user data is already stored in localStorage by the login function
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
        state.token = null;
      })
      .addCase(RegisterCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(RegisterCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        // Clear user data from localStorage
        localStorage.removeItem("DryKlinUser");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
