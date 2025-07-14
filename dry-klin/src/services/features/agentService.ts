import { axiosClient } from "@/services/api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IAgent {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
}

export const addAgent = async (agentData: IAgent): Promise<IAgent> => {
  const response = await axiosClient.post<IAgent>("/api/agents/add", agentData);
  return response.data;
};

export const getAllAgents = async (): Promise<IAgent[]> => {
  try {
    const response = await axiosClient.get("/api/agents/get-all");
    // Handle both array and object-with-data responses
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch delivery agents");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch delivery agents";
    throw new Error(errorMessage);
  }
};

export const fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllAgents();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch delivery agents";
      return rejectWithValue(errorMessage);
    }
  }
);

export interface AgentsState {
  agents: IAgent[];
  agentsLoading: boolean;
  agentsError: string | null;
}

const initialState: AgentsState = {
  agents: [],
  agentsLoading: false,
  agentsError: null,
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    clearAgentsError: (state) => {
      state.agentsError = null;
    },
    clearAgents: (state) => {
      state.agents = [];
      state.agentsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.agentsLoading = true;
        state.agentsError = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.agentsLoading = false;
        state.agents = action.payload;
        state.agentsError = null;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.agentsLoading = false;
        state.agentsError = action.payload as string;
      });
  },
});

export const { clearAgentsError, clearAgents } = agentSlice.actions;
export default agentSlice.reducer; 