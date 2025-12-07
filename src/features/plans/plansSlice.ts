"use client";

import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Plan } from "@/types/common";

type Columns = {
  name: boolean;
  price: boolean;
  type: boolean;
  downloadLimit: boolean;
  durationDays: boolean;
  createdAt: boolean;
};

type PlansState = {
  plans: Plan[];
  totalPages: number;
  loading: boolean;
  submitting: boolean;

  // filters
  search: string;
  type: string;
  isActive: string;

  // pagination
  page: number;
  limit: number;

  // columns
  columns: Columns;
  showColumnsDropdown: boolean;

  // modals
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editPlan: Plan | null;
  newPlan: {
    name: string;
    price: number;
    type: string;
    downloadLimit: number;
    durationDays: number;
  };
  totalPlans: number;
  totalPricedPlans: number;
  totalTypedPlans: number;
  typeCounts: Record<string, number>;
  confirmDeleteId: string | null;
};

const initialState: PlansState = {
  plans: [],
  totalPages: 1,
  loading: false,
  submitting: false,

  search: "",
  type: "",
  isActive: "",

  page: 1,
  limit: 10,

  columns: {
    name: true,
    price: true,
    type: true,
    downloadLimit: true,
    durationDays: true,
    createdAt: true,
  },
  showColumnsDropdown: false,

  isAddModalOpen: false,
  isEditModalOpen: false,
  editPlan: null,
  newPlan: {
    name: "",
    price: 0,
    type: "",
    downloadLimit: 0,
    durationDays: 0,
  },
  totalPlans: 0,
  totalPricedPlans: 0,
  totalTypedPlans: 0,
  typeCounts: {},
  confirmDeleteId: null,
};


export const resetNewPlan = createAction('plans/resetNewPlan');
export const resetEditPlan = createAction('plans/resetEditPlan');

// ---------- Async Thunks ----------

// Get plans list
export const fetchPlans = createAsyncThunk<
  {
    plans: Plan[];
    totalPages: number;
    totalPlans: number;
    totalPricedPlans: number;
    totalTypedPlans: number;
    typeCounts: Record<string, number>;
  },
  void,
  { state: { plans: PlansState } }
>("plans/fetchPlans", async (_, { getState }) => {
  const state = getState().plans;

  const query = new URLSearchParams({
    search: state.search,
    type: state.type,
    isActive: state.isActive,
    page: String(state.page),
    limit: String(state.limit),
  });

  const res = await apiFetch<{
    plans: Plan[];
    totalPages: number;
    totalPlans: number;
    totalPricedPlans: number;
    totalTypedPlans: number;
    typeCounts: Record<string, number>;
  }>(`/v1/plans?${query}`);

  return {
    plans: res.plans,
    totalPages: res.totalPages || 1,
    totalPlans: res.totalPlans || 0,
    totalPricedPlans: res.totalPricedPlans || 0,
    totalTypedPlans: res.totalTypedPlans || 0,
    typeCounts: res.typeCounts || {},
  };
});

// Add plan
export const addPlan = createAsyncThunk<
  void,
  void,
  { state: { plans: PlansState } }
>("plans/addPlan", async (_, { getState, dispatch }) => {
  const { newPlan } = getState().plans;

  await toast.promise(
    apiFetch(`/v1/plans`, {
      method: "POST",
      body: JSON.stringify(newPlan),
    }),
    {
      loading: "Saving plan…",
      success: "Plan added!",
      error: (err) => err.message || "Failed to add plan",
    },
  );

  dispatch(closeAdd());
  await dispatch(fetchPlans());
});

// Update plan
export const updatePlan = createAsyncThunk<
  void,
  void,
  { state: { plans: PlansState } }
>("plans/updatePlan", async (_, { getState, dispatch }) => {
  const { editPlan } = getState().plans;
  if (!editPlan) return;

  await toast.promise(
    apiFetch(`/v1/plans/${editPlan._id}`, {
      method: "PUT",
      body: JSON.stringify(editPlan),
    }),
    {
      loading: "Updating…",
      success: "Plan updated!",
      error: (err) => err.message || "Failed to Update plan",
    },
  );

  dispatch(closeEdit());
  await dispatch(fetchPlans());
});

// Delete plan
export const deletePlan = createAsyncThunk<void, string>(
  "plans/deletePlan",
  async (planId, { dispatch }) => {
    await toast.promise(
      apiFetch(`/v1/plans/${planId}`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting…",
        success: "Plan deleted",
        error: (err) => err.message || "Failed to Delete plan",
      },
    );

    await dispatch(fetchPlans());
  },
);

// ---------- Slice ----------

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    // filters / paging
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
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
      state.newPlan = initialState.newPlan;
    },
    updateNew(state, action: PayloadAction<Partial<PlansState["newPlan"]>>) {
      state.newPlan = { ...state.newPlan, ...action.payload };
    },

    // edit modal
    openEdit(state, action: PayloadAction<Plan>) {
      state.editPlan = action.payload;
      state.isEditModalOpen = true;
      state.isAddModalOpen = false;
    },
    closeEdit(state) {
      state.isEditModalOpen = false;
      state.editPlan = null;
    },
    updateEdit(state, action: PayloadAction<Partial<Plan>>) {
      if (!state.editPlan) return;
      state.editPlan = { ...state.editPlan, ...action.payload };
    },

    // delete confirm
    openDelete(state, action: PayloadAction<string>) {
      state.confirmDeleteId = action.payload;
    },
    closeDelete(state) {
      state.confirmDeleteId = null;
    },
  },
  extraReducers: (builder) => {
    // fetchPlans
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.plans;
        state.totalPages = action.payload.totalPages || 1;
        state.totalPlans = action.payload.totalPlans || 0;
        state.totalPricedPlans = action.payload.totalPricedPlans || 0;
        state.totalTypedPlans = action.payload.totalTypedPlans || 0;
        state.typeCounts = action.payload.typeCounts || {};
      })
      .addCase(fetchPlans.rejected, (state) => {
        state.loading = false;
      });

    // addPlan / updatePlan / deletePlan – just handle submitting flag
    builder
      .addCase(addPlan.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addPlan.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addPlan.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(updatePlan.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updatePlan.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updatePlan.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(deletePlan.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deletePlan.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deletePlan.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(resetNewPlan, (state) => {
        state.newPlan = { name: '', price: 0, type: '', downloadLimit: 0, durationDays: 0 };
      })
      .addCase(resetEditPlan, (state) => {
        state.editPlan = null;
      });
  },
});

export const {
  setSearch,
  setType,
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
} = plansSlice.actions;

export default plansSlice.reducer;
