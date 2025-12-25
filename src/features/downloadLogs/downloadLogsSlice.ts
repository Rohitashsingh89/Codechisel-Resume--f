"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export interface DownloadLog {
  _id: string;
  userId: {
    _id: string;
    name?: string; // ✅ Optional
    email?: string;
  } | null; // ✅ Can be null
  resumeId: {
    _id: string;
    resumeName?: string;
    selectedTemplateSlug?: string;
  } | null;
  templateSlug?: string;
  downloadType: "pdf" | "docx" | "image";
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
}

type DownloadLogsState = {
  logs: DownloadLog[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalLogs: number;
  filters: {
    userId?: string;
    resumeId?: string;
    downloadType?: string;
  };
};

const initialState: DownloadLogsState = {
  logs: [],
  loading: false,
  submitting: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 20,
  totalLogs: 0,
  filters: {},
};

// Async Thunks
export const fetchDownloadLogs = createAsyncThunk(
  "downloadLogs/fetchDownloadLogs",
  async (_, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
      });
      const res = await apiFetch(`/v1/dashboard/admin/download-logs?${params}`);
      return {
        logs: res.logs || [],
        totalLogs: res.total || 0,
      };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch download logs";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const fetchUserDownloadLogs = createAsyncThunk(
  "downloadLogs/fetchUserDownloadLogs",
  async (userId: string, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
        userId,
      });

      const res = await apiFetch(`/v1/dashboard/admin/download-logs?${params}`);

      return {
        logs: res.logs || [],
        totalLogs: res.total || 0,
      };
    } catch (err: any) {
      let msg = err?.message || "Failed to fetch user logs";
      try {
        const parsed = JSON.parse(msg);
        msg = parsed.message || msg;
      } catch {}
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const deleteDownloadLog = createAsyncThunk(
  "downloadLogs/deleteDownloadLog",
  async (logId: string, { dispatch, rejectWithValue }) => {
    try {
      await apiFetch(`/v1/dashboard/admin/download-logs/${logId}`, {
        method: "DELETE",
      });
      toast.success("Download log deleted successfully!");
      dispatch(fetchDownloadLogs());
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete download log";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const downloadLogsSlice = createSlice({
  name: "downloadLogs",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<DownloadLogsState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDownloadLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.logs;
        state.totalLogs = action.payload.totalLogs;
        state.error = null;
      })
      .addCase(fetchDownloadLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDownloadLog.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deleteDownloadLog.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteDownloadLog.rejected, (state) => {
        state.submitting = false;
      });
  },
});

export const { setCurrentPage, setFilters } = downloadLogsSlice.actions;
export default downloadLogsSlice.reducer;
