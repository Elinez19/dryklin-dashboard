import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/services/features/auth/authSlice";
import subAdminReducer from "@/services/features/subAdminSlice";
import servicePartnerReducer from "@/services/features/servicePartnerSlice";
import serviceTypeReducer from "@/services/features/serviceTypeSlice";
import agentReducer from "@/services/features/agentService";
import customerReducer from "@/services/features/customerSlice";
import dashboardReducer from "@/services/features/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subadmins: subAdminReducer,
    servicePartners: servicePartnerReducer,
    serviceTypes: serviceTypeReducer,
    agents: agentReducer,
    customers: customerReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
