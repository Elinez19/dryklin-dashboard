import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import { ILogin } from "@/types/auth_types";
import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const token = localStorage.getItem("DryKlinAccessToken");
const user = JSON.parse(localStorage.getItem("DryKlinUser") ?? "null");

const initialState = {
  token: token || null,
  user: user || null,
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
};

export const LoginUser = createAsyncThunkWithHandler(
  "auth/login",
  async (user: ILogin) => {
    return await authService.Login(user);
  }
);

export const Register = createAsyncThunkWithHandler(
  "auth/login",
  async (user: ILogin, _) => {
    return await authService.Login(user);
  }
);

export const LogoutUser = createAsyncThunkWithHandler(
  "auth/logout",
  async () => {
    return await authService.Logout();
  }
);

// export const GetUser = createAsyncThunkWithHandler("auth/getUser", async () => {
//   return await authService.get_user();
// });

const authSlice = createSlice({
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
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
        state.token = null;
        state.user = null;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
