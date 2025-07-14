import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllServicePartners } from "./servicePartnerService";
import { IServicePartner } from "@/types/dashboard_types";

// State interface
export interface ServicePartnersState {
  servicePartners: IServicePartner[];
  servicePartnersLoading: boolean;
  servicePartnersError: string | null;
}

// Async thunk for fetching service partners
export const fetchServicePartners = createAsyncThunk(
  "servicePartners/fetchServicePartners",
  async (_, { rejectWithValue }) => {
    try {
      const data = await GetAllServicePartners();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to fetch service partners";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: ServicePartnersState = {
  servicePartners: [],
  servicePartnersLoading: false,
  servicePartnersError: null,
};

const servicePartnerSlice = createSlice({
  name: "servicePartners",
  initialState,
  reducers: {
    clearServicePartnersError: (state) => {
      state.servicePartnersError = null;
    },
    clearServicePartners: (state) => {
      state.servicePartners = [];
      state.servicePartnersError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePartners.pending, (state) => {
        state.servicePartnersLoading = true;
        state.servicePartnersError = null;
      })
      .addCase(fetchServicePartners.fulfilled, (state, action) => {
        state.servicePartnersLoading = false;
        state.servicePartners = action.payload;
        state.servicePartnersError = null;
      })
      .addCase(fetchServicePartners.rejected, (state, action) => {
        state.servicePartnersLoading = false;
        state.servicePartnersError = action.payload as string;
      });
  },
});

export const { clearServicePartnersError, clearServicePartners } = servicePartnerSlice.actions;
export default servicePartnerSlice.reducer; 