import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllSubAdmins, ISubAdmin } from "./subAdminService";
import { CreateSubAdmin, ICreateSubAdminRequest } from "./auth/authService";

export const fetchSubAdmins = createAsyncThunk(
  "subadmins/fetchSubAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const data = await GetAllSubAdmins();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to fetch sub-admins";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createSubAdmin = createAsyncThunk(
  "subadmins/createSubAdmin",
  async (subAdminData: ICreateSubAdminRequest, { rejectWithValue }) => {
    try {
      const result = await CreateSubAdmin(subAdminData);
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create sub-admin";
      return rejectWithValue(errorMessage);
    }
  }
);

interface SubAdminsState {
  subAdmins: ISubAdmin[];
  subAdminsLoading: boolean;
  subAdminsError: string | null;
  createSubAdminLoading: boolean;
  createSubAdminError: string | null;
}

const initialState: SubAdminsState = {
  subAdmins: [],
  subAdminsLoading: false,
  subAdminsError: null,
  createSubAdminLoading: false,
  createSubAdminError: null,
};

const subAdminSlice = createSlice({
  name: "subadmins",
  initialState,
  reducers: {
    clearSubAdminsError: (state) => {
      state.subAdminsError = null;
    },
    clearSubAdmins: (state) => {
      state.subAdmins = [];
      state.subAdminsError = null;
    },
    clearCreateSubAdminError: (state) => {
      state.createSubAdminError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubAdmins.pending, (state) => {
        state.subAdminsLoading = true;
        state.subAdminsError = null;
      })
      .addCase(fetchSubAdmins.fulfilled, (state, action) => {
        state.subAdminsLoading = false;
        state.subAdmins = action.payload;
        state.subAdminsError = null;
      })
      .addCase(fetchSubAdmins.rejected, (state, action) => {
        state.subAdminsLoading = false;
        state.subAdminsError = action.payload as string;
      })
      .addCase(createSubAdmin.pending, (state) => {
        state.createSubAdminLoading = true;
        state.createSubAdminError = null;
      })
      .addCase(createSubAdmin.fulfilled, (state) => {
        state.createSubAdminLoading = false;
        state.createSubAdminError = null;
      })
      .addCase(createSubAdmin.rejected, (state, action) => {
        state.createSubAdminLoading = false;
        state.createSubAdminError = action.payload as string;
      });
  },
});

export const { clearSubAdminsError, clearSubAdmins, clearCreateSubAdminError } = subAdminSlice.actions;
export default subAdminSlice.reducer; 
export type { SubAdminsState };