"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export interface Template {
  _id: string;
  name: string;
  slug: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

type Columns = {
  name: boolean;
  slug: boolean;
  category: boolean;
  isActive: boolean;
  createdAt: boolean;
};

type TemplatesState = {
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

  // columns
  columns: Columns;
  showColumnsDropdown: boolean;

  // modals
  isModalOpen: boolean;
  editTemplate: Template | null;
  newTemplate: {
    name: string;
    slug: string;
    category: string;
    isActive: boolean;
  };

  confirmDeleteSlug: string | null;
};

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

  isModalOpen: false,
  editTemplate: null,
  newTemplate: { name: "", slug: "", category: "business", isActive: true },

  confirmDeleteSlug: null,
};

// ---------- Async Thunks ----------

// Get templates list
export const fetchTemplates = createAsyncThunk<
  { templates: Template[]; totalPages: number },
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

  const res = await apiFetch<{ templates: Template[]; totalPages: number }>(
    `/v1/templates?${query}`,
  );
  return {
    templates: res.templates,
    totalPages: res.totalPages || 1,
  };
});

// Add template
export const addTemplate = createAsyncThunk<
  void,
  void,
  { state: { templates: TemplatesState } }
>("templates/addTemplate", async (_, { getState, dispatch }) => {
  const { newTemplate } = getState().templates;

  await toast.promise(
    apiFetch(`/v1/templates`, {
      method: "POST",
      body: JSON.stringify(newTemplate),
    }),
    {
      loading: "Saving template…",
      success: "Template added!",
      error: "Failed to add template",
    },
  );

  dispatch(closeAdd());
  await dispatch(fetchTemplates());
});

// Update template
export const updateTemplate = createAsyncThunk<
  void,
  void,
  { state: { templates: TemplatesState } }
>("templates/updateTemplate", async (_, { getState, dispatch }) => {
  const { editTemplate } = getState().templates;
  if (!editTemplate) return;

  await toast.promise(
    apiFetch(`/v1/templates/${editTemplate._id}`, {
      method: "PUT",
      body: JSON.stringify(editTemplate),
    }),
    {
      loading: "Updating…",
      success: "Template updated!",
      error: "Failed to update template",
    },
  );

  dispatch(closeEdit());
  await dispatch(fetchTemplates());
});

// Delete template
export const deleteTemplate = createAsyncThunk<void, string>(
  "templates/deleteTemplate",
  async (slug, { dispatch }) => {
    await toast.promise(
      apiFetch(`/v1/templates/${slug}`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting…",
        success: "Template deleted",
        error: "Delete failed",
      },
    );

    await dispatch(fetchTemplates());
  },
);

// ---------- Slice ----------

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // filters / paging
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
      state.isModalOpen = true;
    },
    closeAdd(state) {
      state.isModalOpen = false;
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
    },
    closeEdit(state) {
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
    // fetchTemplates
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchTemplates.rejected, (state) => {
        state.loading = false;
      });

    // addTemplate / updateTemplate / deleteTemplate – just handle submitting flag
    builder
      .addCase(addTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addTemplate.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(updateTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updateTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateTemplate.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deleteTemplate.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteTemplate.rejected, (state) => {
        state.submitting = false;
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
