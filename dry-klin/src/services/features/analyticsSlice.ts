import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAnalyticsData, IUserStats } from './analyticsService';

export interface AnalyticsState {
  stats: IUserStats | null;
  statsLoading: boolean;
  statsError: string | null;
}

const initialState: AnalyticsState = {
  stats: null,
  statsLoading: false,
  statsError: null,
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getAnalyticsData();
      return stats;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch analytics data';
      return rejectWithValue(errorMessage);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsError: (state) => {
      state.statsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action: PayloadAction<IUserStats>) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload as string;
      });
  },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer; 