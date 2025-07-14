import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IServiceType, IServiceTypeRequest } from "@/types/dashboard_types";
import { 
  getAllServiceTypes, 
  addServiceType, 
  updateServiceType,
  deleteServiceType 
} from "./serviceTypeService";

// State interface
export interface ServiceTypesState {
  serviceTypes: IServiceType[];
  serviceTypesLoading: boolean;
  serviceTypesError: string | null;
  addLoading: boolean;
  addError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  deleteLoading: boolean;
  deleteError: string | null;
}

// Initial state
const initialState: ServiceTypesState = {
  serviceTypes: [],
  serviceTypesLoading: false,
  serviceTypesError: null,
  addLoading: false,
  addError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null
};

// Async thunks
export const fetchServiceTypes = createAsyncThunk(
  "serviceTypes/fetchServiceTypes",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllServiceTypes();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch service types");
    }
  }
);

export const createServiceType = createAsyncThunk(
  "serviceTypes/createServiceType",
  async (serviceTypeData: IServiceTypeRequest, { rejectWithValue }) => {
    try {
      return await addServiceType(serviceTypeData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to add service type");
    }
  }
);

export const editServiceType = createAsyncThunk(
  "serviceTypes/editServiceType",
  async ({ id, data }: { id: string; data: Partial<IServiceTypeRequest> }, { rejectWithValue }) => {
    try {
      return await updateServiceType(id, data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update service type");
    }
  }
);

export const removeServiceType = createAsyncThunk(
  "serviceTypes/removeServiceType",
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await deleteServiceType(id);
      if (result.success) {
        return id;
      }
      return rejectWithValue(result.message || "Failed to delete service type");
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to delete service type");
    }
  }
);

// Create slice
const serviceTypeSlice = createSlice({
  name: "serviceTypes",
  initialState,
  reducers: {
    clearServiceTypeErrors: (state) => {
      state.serviceTypesError = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch service types
      .addCase(fetchServiceTypes.pending, (state) => {
        state.serviceTypesLoading = true;
        state.serviceTypesError = null;
      })
      .addCase(fetchServiceTypes.fulfilled, (state, action) => {
        state.serviceTypesLoading = false;
        state.serviceTypes = action.payload;
      })
      .addCase(fetchServiceTypes.rejected, (state, action) => {
        state.serviceTypesLoading = false;
        state.serviceTypesError = action.payload as string;
      })

      // Add service type
      .addCase(createServiceType.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(createServiceType.fulfilled, (state, action) => {
        state.addLoading = false;
        state.serviceTypes.push(action.payload);
      })
      .addCase(createServiceType.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload as string;
      })

      // Update service type
      .addCase(editServiceType.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(editServiceType.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.serviceTypes.findIndex(
          (serviceType) => serviceType.id === action.payload.id
        );
        if (index !== -1) {
          state.serviceTypes[index] = action.payload;
        }
      })
      .addCase(editServiceType.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      })

      // Delete service type
      .addCase(removeServiceType.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(removeServiceType.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.serviceTypes = state.serviceTypes.filter(
          (serviceType) => serviceType.id !== action.payload
        );
      })
      .addCase(removeServiceType.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload as string;
      });
  },
});

export const { clearServiceTypeErrors } = serviceTypeSlice.actions;
export default serviceTypeSlice.reducer; 