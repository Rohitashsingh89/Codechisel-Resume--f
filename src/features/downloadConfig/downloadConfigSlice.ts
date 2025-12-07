"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

interface DownloadConfig {
  _id: string;
  maxFreeDownloadsPerUser: number;
  createdAt: string;
  updatedAt: string;
}

type DownloadConfigState = {
  config: DownloadConfig | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
};

const initialState: DownloadConfigState = {
  config: null,
  loading: false,
  saving: false,
  error: null,
};
export const fetchDownloadConfig = createAsyncThunk(
  "downloadConfig/fetchDownloadConfig",
  async (_, { rejectWithValue }) => {
    try {
      // apiFetch RETURNS parsed JSON directly
      const data = await apiFetch("/v1/dashboard/config/downloads");
      return data;
    } catch (err: any) {
      const msg = err?.message || "Failed to fetch config";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const updateDownloadConfig = createAsyncThunk(
  "downloadConfig/updateDownloadConfig",
  async (maxFreeDownloadsPerUser: number, { dispatch, rejectWithValue }) => {
    try {
      const data = await apiFetch("/v1/dashboard/config/downloads", {
        method: "PUT",
        body: JSON.stringify({ maxFreeDownloadsPerUser }),
      });

      toast.success("Download limit updated successfully!");

      // Refresh list after update
      dispatch(fetchDownloadConfig());

      return data;
    } catch (err: any) {
      const msg = err?.message || "Failed to update config";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const downloadConfigSlice = createSlice({
  name: "downloadConfig",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDownloadConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload.config;
        state.error = null;
      })
      .addCase(fetchDownloadConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDownloadConfig.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateDownloadConfig.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateDownloadConfig.rejected, (state) => {
        state.saving = false;
      });
  },
});

export const { clearError } = downloadConfigSlice.actions;
export default downloadConfigSlice.reducer;
