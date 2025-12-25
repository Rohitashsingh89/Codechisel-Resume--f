"use client";

import { apiFetch } from "@/lib/api";
import { Template } from "@/types/common";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

type Columns = {
  name: boolean;
  slug: boolean;
  category: boolean;
  isActive: boolean;
  createdAt: boolean;
};

export interface TemplatesState {
  templates: Template[];
  totalPages: number;
  loading: boolean;
  submitting: boolean;

  // filters
  search: string;
  category: string;
  isActive: string;

  // pagination
  page: number;
  limit: number;

  // columns & UI
  columns: Columns;
  showColumnsDropdown: boolean;

  // modals
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editTemplate: Template | null;
  newTemplate: {
    name: string;
    slug: string;
    category: string;
    isPremium: boolean;
    config: string;
    isActive: boolean;
  };

  confirmDeleteSlug: string | null;

  // stats (mirroring plans)
  totalTemplates: number;
  totalActiveTemplates: number;
  totalInactiveTemplates: number;
  categoryCounts: Record<string, number>;
}

const initialState: TemplatesState = {
  templates: [],
  totalPages: 1,
  loading: false,
  submitting: false,

  search: "",
  category: "",
  isActive: "",

  page: 1,
  limit: 10,

  columns: {
    name: true,
    slug: true,
    category: true,
    isActive: true,
    createdAt: true,
  },
  showColumnsDropdown: false,

  isAddModalOpen: false,
  isEditModalOpen: false,
  editTemplate: null,
  newTemplate: {
    name: "",
    slug: "",
    category: "",
    isPremium: false,
    config: "",
    isActive: true,
  },

  confirmDeleteSlug: null,

  totalTemplates: 0,
  totalActiveTemplates: 0,
  totalInactiveTemplates: 0,
  categoryCounts: {},
};

export const resetNewTemplate = createAction("templates/resetNewTemplate");
export const resetEditTemplate = createAction("templates/resetEditTemplate");

/**
 * GET /v1/templates?search=&category=&isActive=&page=&limit=
 * Response shape expected:
 * {
 *   templates: Template[];
 *   totalPages: number;
 *   totalTemplates?: number;
 *   totalActiveTemplates?: number;
 *   totalInactiveTemplates?: number;
 *   categoryCounts?: Record<string, number>;
 * }
 */
export const fetchTemplates = createAsyncThunk<
  {
    templates: Template[];
    totalPages: number;
    totalTemplates?: number;
    totalActiveTemplates?: number;
    totalInactiveTemplates?: number;
    categoryCounts?: Record<string, number>;
  },
  void,
  { state: { templates: TemplatesState } }
>("templates/fetchTemplates", async (_, { getState }) => {
  const state = getState().templates;

  const query = new URLSearchParams({
    search: state.search,
    category: state.category,
    isActive: state.isActive,
    page: String(state.page),
    limit: String(state.limit),
  });

  const res = await apiFetch<{
    templates: Template[];
    totalPages: number;
    totalTemplates?: number;
    totalActiveTemplates?: number;
    totalInactiveTemplates?: number;
    categoryCounts?: Record<string, number>;
  }>(`/v1/templates?${query}`);

  return {
    templates: res.templates,
    totalPages: res.totalPages ?? 1,
    totalTemplates: res.totalTemplates,
    totalActiveTemplates: res.totalActiveTemplates,
    totalInactiveTemplates: res.totalInactiveTemplates,
    categoryCounts: res.categoryCounts,
  };
});

export const addTemplate = createAsyncThunk<
  void,
  void,
  { state: { templates: TemplatesState }; dispatch: any }
>("templates/addTemplate", async (_, { getState, dispatch }) => {
  const newTemplate = getState().templates.newTemplate;

  await toast.promise(
    apiFetch("/v1/templates", {
      method: "POST",
      body: JSON.stringify(newTemplate),
    }),
    {
      loading: "Saving template...",
      success: "Template added!",
      error: (err: any) => err?.message || "Failed to add template",
    },
  );

  dispatch(closeAdd());
  await dispatch(fetchTemplates());
});

export const updateTemplate = createAsyncThunk<
  void,
  void,
  { state: { templates: TemplatesState }; dispatch: any }
>("templates/updateTemplate", async (_, { getState, dispatch }) => {
  const editTemplate = getState().templates.editTemplate;
  if (!editTemplate) return;

  await toast.promise(
    apiFetch(`/v1/templates/${editTemplate._id}`, {
      method: "PUT",
      body: JSON.stringify(editTemplate),
    }),
    {
      loading: "Updating...",
      success: "Template updated!",
      error: (err: any) => err?.message || "Failed to update template",
    },
  );

  dispatch(closeEdit());
  await dispatch(fetchTemplates());
});

export const deleteTemplate = createAsyncThunk<void, string, { dispatch: any }>(
  "templates/deleteTemplate",
  async (slug, { dispatch }) => {
    await toast.promise(
      apiFetch(`/v1/templates/${slug}`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting...",
        success: "Template deleted",
        error: (err: any) => err?.message || "Delete failed",
      },
    );

    await dispatch(fetchTemplates());
  },
);

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // filters & pagination
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.page = 1;
    },
    setIsActive(state, action: PayloadAction<string>) {
      state.isActive = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },

    // columns
    toggleColumn(state, action: PayloadAction<keyof Columns>) {
      const key = action.payload;
      state.columns[key] = !state.columns[key];
    },
    setColumnsDropdown(state, action: PayloadAction<boolean>) {
      state.showColumnsDropdown = action.payload;
    },

    // add modal
    openAdd(state) {
      state.isAddModalOpen = true;
      state.isEditModalOpen = false;
    },
    closeAdd(state) {
      state.isAddModalOpen = false;
      state.newTemplate = initialState.newTemplate;
    },
    updateNew(
      state,
      action: PayloadAction<Partial<TemplatesState["newTemplate"]>>,
    ) {
      state.newTemplate = { ...state.newTemplate, ...action.payload };
    },

    // edit modal
    openEdit(state, action: PayloadAction<Template>) {
      state.editTemplate = action.payload;
      state.isEditModalOpen = true;
      state.isAddModalOpen = false;
    },
    closeEdit(state) {
      state.isEditModalOpen = false;
      state.editTemplate = null;
    },
    updateEdit(state, action: PayloadAction<Partial<Template>>) {
      if (!state.editTemplate) return;
      state.editTemplate = { ...state.editTemplate, ...action.payload };
    },

    // delete confirm
    openDelete(state, action: PayloadAction<string>) {
      state.confirmDeleteSlug = action.payload;
    },
    closeDelete(state) {
      state.confirmDeleteSlug = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.totalPages = action.payload.totalPages ?? 1;

        const computedTotal =
          action.payload.totalTemplates ?? state.templates.length;
        const computedActive =
          action.payload.totalActiveTemplates ??
          state.templates.filter((t) => t.isActive).length;
        const computedInactive =
          action.payload.totalInactiveTemplates ??
          computedTotal - computedActive;

        state.totalTemplates = computedTotal;
        state.totalActiveTemplates = computedActive;
        state.totalInactiveTemplates = computedInactive;
        state.categoryCounts = action.payload.categoryCounts ?? {};
      })
      .addCase(fetchTemplates.rejected, (state) => {
        state.loading = false;
      })

      // add
      .addCase(addTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addTemplate.rejected, (state) => {
        state.submitting = false;
      })

      // update
      .addCase(updateTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updateTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateTemplate.rejected, (state) => {
        state.submitting = false;
      })

      // delete
      .addCase(deleteTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deleteTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteTemplate.rejected, (state) => {
        state.submitting = false;
      })

      // reset helpers
      .addCase(resetNewTemplate, (state) => {
        state.newTemplate = initialState.newTemplate;
      })
      .addCase(resetEditTemplate, (state) => {
        state.editTemplate = null;
      });
  },
});

export const {
  setSearch,
  setCategory,
  setIsActive,
  setPage,
  setLimit,
  toggleColumn,
  setColumnsDropdown,
  openAdd,
  closeAdd,
  openEdit,
  closeEdit,
  updateNew,
  updateEdit,
  openDelete,
  closeDelete,
} = templatesSlice.actions;

export default templatesSlice.reducer;
