import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "@/features/templates/templatesSlice";
import resumesReducer from "@/features/resumes/resumesSlice";
import themeRegistryReducer from "@/features/themeRegistry/themeRegistrySlice";
import resumeBuilderReducer from "@/features/resumeBuilder/resumeBuilderSlice";
import themeReducer from "@/features/theme/themeSlice";
import usersReducer from "@/features/users/usersSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import downloadLogsReducer from "@/features/downloadLogs/downloadLogsSlice";
import downloadConfigReducer from "@/features/downloadConfig/downloadConfigSlice";
import usersUsageReducer from '@/features/usersUsage/usersUsageSlice';
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import plansReducer from "@/features/plans/plansSlice";
import subscriptionReducer from "@/features/subscriptions/subscriptionsSlice";
import paymentsReducer from "@/features/payments/paymentsSlice";

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    resumes: resumesReducer,
    themeRegistry: themeRegistryReducer,
    resumeBuilder: resumeBuilderReducer,
    theme: themeReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    downloadLogs: downloadLogsReducer,
    downloadConfig: downloadConfigReducer, 
    usersUsage: usersUsageReducer,
    auth: authReducer,
    profile: profileReducer,
    plans: plansReducer,
    subscriptions: subscriptionReducer,
    payments: paymentsReducer,
  },
});

// RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
