import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllSubAdmins, ISubAdmin } from "./subAdminService";

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

interface SubAdminsState {
  subAdmins: ISubAdmin[];
  subAdminsLoading: boolean;
  subAdminsError: string | null;
}

const initialState: SubAdminsState = {
  subAdmins: [],
  subAdminsLoading: false,
  subAdminsError: null,
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
      });
  },
});

export const { clearSubAdminsError, clearSubAdmins } = subAdminSlice.actions;
export default subAdminSlice.reducer; 
export type { SubAdminsState };