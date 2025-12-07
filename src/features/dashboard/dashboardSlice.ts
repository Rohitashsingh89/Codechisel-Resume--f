"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";

// ---------------------- TYPES ----------------------

export interface GrowthItem {
  name: string;
  value: number;
}

export interface DashboardMetrics {
  totalUsers: number;
  totalResumes: number;
  totalTemplates: number;

  // NEW ADDED VALUES
  userMoM: number;
  resumeMoM: number;
  templateMoM: number;

  usersGrowth: GrowthItem[];
  resumesGrowth: GrowthItem[];
  templatesGrowth: GrowthItem[];

  totalRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  paymentsGrowth: GrowthItem[];
  
}

export interface RecentTopUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecentActivityItem {
  id: string;
  type: string;
  user: string;
  template: string;
  date: string;
}

export interface DashboardState {
  metrics: DashboardMetrics | null;
  monthlyResumes: { month: string; resumes: number }[];
  topTemplates: { name: string; uses: number }[];
  signupTrend: { month: string; users: number }[];
  categoryDistribution: { name: string; value: number }[];
  recentActivity: RecentActivityItem[];
  recentTopUsers: RecentTopUser[];  // NEW FIELD
  loading: boolean;
  error: string | null;
}

// ---------------------- INITIAL STATE ----------------------

const initialState: DashboardState = {
  metrics: null,
  monthlyResumes: [],
  topTemplates: [],
  signupTrend: [],
  categoryDistribution: [],
  recentActivity: [],
  recentTopUsers: [], // NEW FIELD
  loading: true,
  error: null,
};

// ---------------------- ASYNC THUNK ----------------------

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchDashboardSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch<any>("/v1/dashboard/summary", {
        method: "GET",
      });
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to load dashboard");
    }
  }
);

// ---------------------- SLICE ----------------------

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchDashboardSummary.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          state.metrics = action.payload.metrics;
          state.monthlyResumes = action.payload.monthlyResumes;
          state.topTemplates = action.payload.topTemplates;
          state.signupTrend = action.payload.signupTrend;
          state.categoryDistribution = action.payload.categoryDistribution;
          state.recentActivity = action.payload.recentActivity;
          state.recentTopUsers = action.payload.recentTopUsers; // NEW
        }
      )

      .addCase(fetchDashboardSummary.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard";
      });
  },
});

// ---------------------- EXPORT ----------------------

export default dashboardSlice.reducer;
