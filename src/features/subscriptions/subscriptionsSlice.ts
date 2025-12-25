"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Plan, User } from "@/types/common";

// ===============================
// Interfaces
// ===============================

export interface Subscription {
  _id: string;
  userId: User;
  planId: Plan;
  downloadsRemaining?: number;
  startDate: string;
  endDate?: string;
  status: "active" | "expired" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

type Columns = {
  user: boolean;
  plan: boolean;
  downloadsRemaining: boolean;
  startDate: boolean;
  endDate: boolean;
  status: boolean;
  createdAt: boolean;
};

export interface SubscriptionsState {
  subscriptions: Subscription[];
  totalPages: number;
  loading: boolean;
  submitting: boolean;

  // filters
  search: string;
  status: string;
  planId: string;

  // pagination
  page: number;
  limit: number;

  // columns
  columns: Columns;
  showColumnsDropdown: boolean;

  // modals
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editSubscription: Subscription | null;
  newSubscription: {
    userId: string;
    planId: string;
    downloadsRemaining: number;
    startDate: string;
    endDate?: string;
  };

  // stats
  totalSubscriptions: number;
  totalActiveSubscriptions: number;
  totalExpiredSubscriptions: number;
  statusCounts: Record<string, number>;
  planCounts: Record<string, number>;

  // dropdown data
  users: User[];
  plans: Plan[];
  usersLoading: boolean;
  plansLoading: boolean;

  // delete confirmation
  confirmDeleteId: string | null;
}

// ===============================
// Initial State
// ===============================

const initialState: SubscriptionsState = {
  subscriptions: [],
  totalPages: 1,
  loading: false,
  submitting: false,

  search: "",
  status: "",
  planId: "",

  page: 1,
  limit: 10,

  columns: {
    user: true,
    plan: true,
    downloadsRemaining: true,
    startDate: true,
    endDate: true,
    status: true,
    createdAt: true,
  },
  showColumnsDropdown: false,

  isAddModalOpen: false,
  isEditModalOpen: false,
  editSubscription: null,
  newSubscription: {
    userId: "",
    planId: "",
    downloadsRemaining: 0,
    startDate: "",
    endDate: "",
  },

  totalSubscriptions: 0,
  totalActiveSubscriptions: 0,
  totalExpiredSubscriptions: 0,
  statusCounts: {},
  planCounts: {},

  users: [],
  plans: [],
  usersLoading: false,
  plansLoading: false,

  confirmDeleteId: null,
};

// ===============================
// Async Thunks
// ===============================

export const fetchSubscriptions = createAsyncThunk<
  {
    subscriptions: Subscription[];
    totalPages: number;
    totalSubscriptions: number;
    totalActiveSubscriptions: number;
    totalExpiredSubscriptions: number;
    statusCounts: Record<string, number>;
    planCounts: Record<string, number>;
  },
  void,
  { state: { subscriptions: SubscriptionsState } }
>("subscriptions/fetchSubscriptions", async (_, { getState }) => {
  const state = getState().subscriptions;

  const query = new URLSearchParams({
    search: state.search,
    status: state.status,
    planId: state.planId,
    page: String(state.page),
    limit: String(state.limit),
  });

  const res = await apiFetch(`/v1/subscriptions?${query}`);

  return {
    subscriptions: res.subscriptions,
    totalPages: res.totalPages || 1,
    totalSubscriptions: res.totalSubscriptions || 0,
    totalActiveSubscriptions: res.totalActiveSubscriptions || 0,
    totalExpiredSubscriptions: res.totalExpiredSubscriptions || 0,
    statusCounts: res.statusCounts || {},
    planCounts: res.planCounts || {},
  };
});

export const fetchUsers = createAsyncThunk(
  "subscriptions/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch<{ users: User[] }>("/v1/users");
      return { users: res.users || [] };
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to fetch users";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const fetchPlans = createAsyncThunk(
  "subscriptions/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch<{ plans: Plan[] }>("/v1/plans");
      return { plans: res.plans || [] };
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to fetch plans";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const addSubscription = createAsyncThunk<
  void,
  void,
  { state: { subscriptions: SubscriptionsState } }
>("subscriptions/addSubscription", async (_, { getState, dispatch }) => {
  const { newSubscription } = getState().subscriptions;

  await toast.promise(
    apiFetch(`/v1/subscriptions`, {
      method: "POST",
      body: JSON.stringify(newSubscription),
    }),
    {
      loading: "Creating subscription…",
      success: "Subscription created!",
      error: (err) => err.message || "Failed to create subscription",
    },
  );

  dispatch(closeAdd());
  await dispatch(fetchSubscriptions());
});

export const updateSubscription = createAsyncThunk<
  void,
  void,
  { state: { subscriptions: SubscriptionsState } }
>("subscriptions/updateSubscription", async (_, { getState, dispatch }) => {
  const { editSubscription } = getState().subscriptions;
  if (!editSubscription) return;

  await toast.promise(
    apiFetch(`/v1/subscriptions/${editSubscription._id}`, {
      method: "PUT",
      body: JSON.stringify(editSubscription),
    }),
    {
      loading: "Updating…",
      success: "Subscription updated!",
      error: (err) => err.message || "Failed to update subscription",
    },
  );

  dispatch(closeEdit());
  await dispatch(fetchSubscriptions());
});

export const deleteSubscription = createAsyncThunk<void, string>(
  "subscriptions/deleteSubscription",
  async (subscriptionId, { dispatch }) => {
    await toast.promise(
      apiFetch(`/v1/subscriptions/${subscriptionId}`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting…",
        success: "Subscription deleted",
        error: (err) => err.message || "Failed to delete subscription",
      },
    );

    await dispatch(fetchSubscriptions());
  },
);

// ===============================
// Slice
// ===============================

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
      state.page = 1;
    },
    setPlanId(state, action: PayloadAction<string>) {
      state.planId = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    toggleColumn(state, action: PayloadAction<keyof Columns>) {
      state.columns[action.payload] = !state.columns[action.payload];
    },
    setColumnsDropdown(state, action: PayloadAction<boolean>) {
      state.showColumnsDropdown = action.payload;
    },
    openAdd(state) {
      state.isAddModalOpen = true;
      state.isEditModalOpen = false;
    },
    closeAdd(state) {
      state.isAddModalOpen = false;
      state.newSubscription = initialState.newSubscription;
    },
    updateNew(
      state,
      action: PayloadAction<Partial<SubscriptionsState["newSubscription"]>>,
    ) {
      state.newSubscription = { ...state.newSubscription, ...action.payload };
    },
    openEdit(state, action: PayloadAction<Subscription>) {
      state.editSubscription = action.payload;
      state.isEditModalOpen = true;
      state.isAddModalOpen = false;
    },
    closeEdit(state) {
      state.isEditModalOpen = false;
      state.editSubscription = null;
    },
    updateEdit(state, action: PayloadAction<Partial<Subscription>>) {
      if (!state.editSubscription) return;

      // ⭐ TYPE-SAFE MERGE
      const payload = action.payload;
      state.editSubscription = {
        ...state.editSubscription,
        ...payload,
      };

      // ⭐ TYPE-SAFE User/Plan ID handling
      if (payload.userId !== undefined) {
        if (typeof payload.userId === "string") {
          state.editSubscription.userId = payload.userId; // ✅ String ID
        } else if (payload.userId && "_id" in payload.userId) {
          state.editSubscription.userId = payload.userId; // ✅ Full object
        }
      }

      if (payload.planId !== undefined) {
        if (typeof payload.planId === "string") {
          state.editSubscription.planId = payload.planId; // ✅ String ID
        } else if (payload.planId && "_id" in payload.planId) {
          state.editSubscription.planId = payload.planId; // ✅ Full object
        }
      }
    },
    openDelete(state, action: PayloadAction<string>) {
      state.confirmDeleteId = action.payload;
    },
    closeDelete(state) {
      state.confirmDeleteId = null;
    },
    // ✅ NEW: Reset new subscription form
    resetNewSubscription(state) {
      state.newSubscription = initialState.newSubscription;
    },

    // ✅ NEW: Reset edit subscription form
    resetEditSubscription(state) {
      state.editSubscription = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.subscriptions;
        state.totalPages = action.payload.totalPages;
        state.totalSubscriptions = action.payload.totalSubscriptions;
        state.totalActiveSubscriptions =
          action.payload.totalActiveSubscriptions;
        state.totalExpiredSubscriptions =
          action.payload.totalExpiredSubscriptions;
        state.statusCounts = action.payload.statusCounts;
        state.planCounts = action.payload.planCounts;
      })
      .addCase(fetchSubscriptions.rejected, (state) => {
        state.loading = false;
      })

      // Add / Update / Delete Submitting States
      .addCase(addSubscription.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addSubscription.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addSubscription.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updateSubscription.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateSubscription.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(deleteSubscription.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deleteSubscription.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteSubscription.rejected, (state) => {
        state.submitting = false;
      })

      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoading = false;
      })

      // Plans
      .addCase(fetchPlans.pending, (state) => {
        state.plansLoading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload.plans;
      })
      .addCase(fetchPlans.rejected, (state) => {
        state.plansLoading = false;
      });
  },
});

// ===============================
// Export Actions
// ===============================

export const {
  setSearch,
  setStatus,
  setPlanId,
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
  resetNewSubscription,
  resetEditSubscription,
} = subscriptionsSlice.actions;

// ===============================
export default subscriptionsSlice.reducer;
