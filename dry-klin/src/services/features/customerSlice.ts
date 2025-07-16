import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllCustomers, ICustomer } from './customerService';

export interface CustomerState {
  customers: ICustomer[];
  customersLoading: boolean;
  customersError: string | null;
}

const initialState: CustomerState = {
  customers: [],
  customersLoading: false,
  customersError: null,
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const customers = await getAllCustomers();
      return customers;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch customers';
      return rejectWithValue(errorMessage);
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomersError: (state) => {
      state.customersError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.customersLoading = true;
        state.customersError = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<ICustomer[]>) => {
        state.customersLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.customersLoading = false;
        state.customersError = action.payload as string;
      });
  },
});

export const { clearCustomersError } = customerSlice.actions;
export default customerSlice.reducer; 