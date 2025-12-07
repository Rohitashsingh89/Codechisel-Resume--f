"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export interface UserUsage {
  userId: string;
  name: string;
  email: string;
  role: string;
  used: number;
  limit: number;
  remaining: number;
  lastDownloadAt: string | null;
  downloadsByResume: Record<string, number>;
  createdAt: string;
}

type UsersUsageState = {
  users: UserUsage[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalUsers: number;
  searchTerm: string;
  filters: {
    role?: string;
    minUsage?: number;
  };
};

const initialState: UsersUsageState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  totalUsers: 0,
  searchTerm: "",
  filters: {},
};
export const fetchUsersUsage = createAsyncThunk(
  "usersUsage/fetchUsersUsage",
  async (_, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "10",
      });

      // apiFetch returns parsed JSON, no need res.json()
      const data = await apiFetch(`/v1/dashboard/admin/users-usage?${params}`);

      return {
        users: data.rows || [],
        totalUsers: data.total || 0,
        page: data.page || 1,
        limit: data.pageSize || 10,
      };
    } catch (err: any) {
      const msg = err?.message || "Failed to fetch users usage";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const usersUsageSlice = createSlice({
  name: "usersUsage",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<UsersUsageState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.currentPage = action.payload.page;
        state.itemsPerPage = action.payload.limit;
        state.error = null;
      })
      .addCase(fetchUsersUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setSearchTerm, setFilters } =
  usersUsageSlice.actions;
export default usersUsageSlice.reducer;
