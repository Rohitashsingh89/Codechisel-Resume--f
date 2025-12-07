"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";

export type Resume = {
  _id?: string;
  resumeName: string;
  templateType: string;
  resumeData: any;
  createdAt?: string;
  updatedAt?: string;
};

type ResumesState = {
  resumes: Resume[];
  current: Resume | null;
  loading: boolean;
  submitting: boolean;
  error?: string | null;
};

const initialState: ResumesState = {
  resumes: [],
  current: null,
  loading: false,
  submitting: false,
  error: null,
};

// --------- Thunks (async actions) ---------

// GET /v1/resumes  -> list
export const fetchResumes = createAsyncThunk<Resume[]>(
  "resumes/fetchResumes",
  async () => {
    const res = await apiFetch<{ data: { items: Resume[] } }>("/v1/resumes", {
      method: "GET",
    });
    return res?.data?.items || [];
  }
);

// GET /v1/resumes/:id -> single
export const fetchResumeById = createAsyncThunk<Resume, string>(
  "resumes/fetchResumeById",
  async (id: string) => {
    const res = await apiFetch<{ data: { item: Resume } }>(
      `/v1/resumes/${id}`,
      { method: "GET" }
    );
    return res?.data?.item;
  }
);

// POST /v1/resumes -> create
export const createResume = createAsyncThunk<
  string,
  {
    resumeName: string;
    templateType: string;
    resumeData: any;
  }
>("resumes/createResume", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiFetch<{ id: string }>("/v1/resumes", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res?.id) {
      return rejectWithValue("No id returned from API");
    }

    return res.id;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to create resume");
  }
});

// PUT /v1/resumes/:id -> update
export const updateResume = createAsyncThunk<
  void,
  { id: string; payload: Partial<Resume> },
  { state: { resumes: ResumesState } }
>("resumes/updateResume", async ({ id, payload }, { dispatch, getState }) => {
  await apiFetch(`/v1/resumes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  await dispatch(fetchResumes());

  const { current } = getState().resumes;
  if (current?._id === id) {
    await dispatch(fetchResumeById(id));
  }
});

// DELETE /v1/resumes/:id -> delete
export const deleteResume = createAsyncThunk<
  void,
  string,
  { state: { resumes: ResumesState } }
>("resumes/deleteResume", async (id, { dispatch, getState }) => {
  await apiFetch(`/v1/resumes/${id}`, {
    method: "DELETE",
  });

  await dispatch(fetchResumes());

  const { current } = getState().resumes;
  if (current?._id === id) {
    // current delete ho gaya, reset
    dispatch(setCurrent(null));
  }
});

// --------- Slice ---------

const resumesSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Resume | null>) {
      state.current = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchResumes
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load resumes";
      });

    // fetchResumeById
    builder
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load resume";
      });

    // create / update / delete -> submitting flag
    builder
      .addCase(createResume.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create resume";
      })
      .addCase(updateResume.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateResume.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to update resume";
      })
      .addCase(deleteResume.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to delete resume";
      });
  },
});

export const { setCurrent, clearError } = resumesSlice.actions;
export default resumesSlice.reducer;
