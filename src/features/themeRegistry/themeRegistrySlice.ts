"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";

export type TemplateMeta = {
  slug: string;
  name: string;
  tier?: "free" | "pro";
  fonts?: string[];
  previewUrl?: string;
  templateJson?: any;
};

type ThemeRegistryState = {
  templates: TemplateMeta[];
  loading: boolean;
  error?: string | null;
};

const initialState: ThemeRegistryState = {
  templates: [],
  loading: false,
  error: null,
};

// GET /v1/templates?isActive=true
export const fetchActiveTemplates = createAsyncThunk<TemplateMeta[]>(
  "themeRegistry/fetchActiveTemplates",
  async () => {
    const res = await apiFetch<{ templates?: any[] }>(
      "/v1/templates?isActive=true",
    );
    if (!Array.isArray(res.templates)) return [];
    // Type cast to TemplateMeta[] (assuming backend shape match karti hai)
    return res.templates as TemplateMeta[];
  },
);

const themeRegistrySlice = createSlice({
  name: "themeRegistry",
  initialState,
  reducers: {
    clearThemeRegistryError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchActiveTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load templates";
      });
  },
});

export const { clearThemeRegistryError } = themeRegistrySlice.actions;
export default themeRegistrySlice.reducer;
