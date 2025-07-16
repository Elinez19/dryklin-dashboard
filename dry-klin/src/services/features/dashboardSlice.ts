import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDashboardStats, IDashboardStats } from './dashboardService';

export interface DashboardState {
  stats: IDashboardStats | null;
  statsLoading: boolean;
  statsError: string | null;
}

const initialState: DashboardState = {
  stats: null,
  statsLoading: false,
  statsError: null,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getDashboardStats();
      return stats;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard statistics';
      return rejectWithValue(errorMessage);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.statsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<IDashboardStats>) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload as string;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer; 