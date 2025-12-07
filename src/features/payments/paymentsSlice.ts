import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Plan, User } from "@/types/common";

export interface Payment {
  _id: string;
  transactionId: string;
  userId:
    | {
        _id: string;
        name?: string;
        email?: string;
      }
    | string;
  planId:
    | {
        _id: string;
        name: string;
        type: string;
        price: number;
      }
    | string;
  amount: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  currency: string;
  createdAt: string;
}

type Columns = {
  transactionId: boolean;
  user: boolean;
  plan: boolean;
  amount: boolean;
  status: boolean;
  currency: boolean;
  createdAt: boolean;
};

type PaymentsState = {
  payments: Payment[];
  totalPages: number;
  totalPayments: number;
  totalAmount: number;
  statusCounts: Record<string, number>;

  loading: boolean;
  submitting: boolean;

  // filters
  search: string;
  status: string;

  // pagination
  page: number;
  limit: number;

  // columns
  columns: Columns;
  showColumnsDropdown: boolean;

  // modals
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editPayment: Payment | null;
  newPayment: {
    transactionId: string;
    userId: string;
    planId: string;
    amount: number;
    status: string;
    currency: string;
  };

  // dropdown data
  users: User[];
  plans: Plan[];
  usersLoading: boolean;
  plansLoading: boolean;
  confirmDeleteId: string | null;
};

const initialState: PaymentsState = {
  payments: [],
  totalPages: 1,
  totalPayments: 0,
  totalAmount: 0,
  statusCounts: {},

  loading: false,
  submitting: false,

  search: "",
  status: "",

  page: 1,
  limit: 10,

  columns: {
    transactionId: true,
    user: true,
    plan: true,
    amount: true,
    status: true,
    currency: true,
    createdAt: true,
  },
  showColumnsDropdown: false,

  isAddModalOpen: false,
  isEditModalOpen: false,
  editPayment: null,
  newPayment: {
    transactionId: "",
    userId: "",
    planId: "",
    amount: 0,
    status: "pending",
    currency: "INR",
  },

  users: [],
  plans: [],
  usersLoading: false,
  plansLoading: false,
  confirmDeleteId: null,
};

export const resetNewPayment = createAction("payments/resetNewPayment");
export const resetEditPayment = createAction("payments/resetEditPayment");

// LIST
export const fetchPayments = createAsyncThunk<
  {
    payments: Payment[];
    totalPages: number;
    totalPayments: number;
    totalAmount: number;
    statusCounts: Record<string, number>;
  },
  void,
  { state: { payments: PaymentsState } }
>("payments/fetchPayments", async (_, { getState }) => {
  const state = getState().payments;

  const query = new URLSearchParams({
    search: state.search,
    status: state.status,
    page: String(state.page),
    limit: String(state.limit),
  });

  const res = await apiFetch<{
    payments: Payment[];
    totalPages: number;
    totalPayments: number;
    totalAmount: number;
    statusCounts: Record<string, number>;
  }>(`/v1/payments?${query}`);

  return {
    payments: res.payments,
    totalPages: res.totalPages || 1,
    totalPayments: res.totalPayments || 0,
    totalAmount: res.totalAmount || 0,
    statusCounts: res.statusCounts || {},
  };
});

export const fetchUsers = createAsyncThunk(
  "payments/fetchUsers",
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
  "payments/fetchPlans",
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

// ADD
export const addPayment = createAsyncThunk<
  void,
  void,
  { state: { payments: PaymentsState } }
>("payments/addPayment", async (_, { getState, dispatch }) => {
  const { newPayment } = getState().payments;

  await toast.promise(
    apiFetch(`/v1/payments`, {
      method: "POST",
      body: JSON.stringify(newPayment),
    }),
    {
      loading: "Saving payment…",
      success: "Payment added!",
      error: (err) => err.message || "Failed to add payment",
    },
  );

  dispatch(closeAdd());
  await dispatch(fetchPayments());
});

// UPDATE
export const updatePayment = createAsyncThunk<
  void,
  void,
  { state: { payments: PaymentsState } }
>("payments/updatePayment", async (_, { getState, dispatch }) => {
  const { editPayment } = getState().payments;
  if (!editPayment) return;

  await toast.promise(
    apiFetch(`/v1/payments/${editPayment._id}`, {
      method: "PUT",
      body: JSON.stringify(editPayment),
    }),
    {
      loading: "Updating…",
      success: "Payment updated!",
      error: (err) => err.message || "Failed to update payment",
    },
  );

  dispatch(closeEdit());
  await dispatch(fetchPayments());
});

// DELETE
export const deletePayment = createAsyncThunk<void, string>(
  "payments/deletePayment",
  async (paymentId, { dispatch }) => {
    await toast.promise(
      apiFetch(`/v1/payments/${paymentId}`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting…",
        success: "Payment deleted",
        error: (err) => err.message || "Failed to delete payment",
      },
    );

    await dispatch(fetchPayments());
  },
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    // filters & paging
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
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
      state.newPayment = initialState.newPayment;
    },
    updateNew(
      state,
      action: PayloadAction<Partial<PaymentsState["newPayment"]>>,
    ) {
      state.newPayment = { ...state.newPayment, ...action.payload };
    },

    // edit modal
    openEdit(state, action: PayloadAction<Payment>) {
      state.editPayment = action.payload;
      state.isEditModalOpen = true;
      state.isAddModalOpen = false;
    },
    closeEdit(state) {
      state.isEditModalOpen = false;
      state.editPayment = null;
    },
    // updateEdit(state, action: PayloadAction<Partial<Payment>>) {
    //   if (!state.editPayment) return;
    //   state.editPayment = { ...state.editPayment, ...action.payload };
    // },
    updateEdit(state, action: PayloadAction<Partial<Payment>>) {
      if (!state.editPayment) return;

      state.editPayment = {
        ...state.editPayment,
        ...action.payload,
      };

      // ⭐ CRITICAL FIX: UserId/PlanId ko string ya object handle karo
      if (action.payload.userId !== undefined) {
        state.editPayment.userId =
          typeof action.payload.userId === "string"
            ? action.payload.userId
            : action.payload.userId?._id || action.payload.userId;
      }

      if (action.payload.planId !== undefined) {
        state.editPayment.planId =
          typeof action.payload.planId === "string"
            ? action.payload.planId
            : action.payload.planId?._id || action.payload.planId;
      }
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
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments;
        state.totalPages = action.payload.totalPages || 1;
        state.totalPayments = action.payload.totalPayments || 0;
        state.totalAmount = action.payload.totalAmount || 0;
        state.statusCounts = action.payload.statusCounts || {};
      })
      .addCase(fetchPayments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addPayment.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addPayment.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addPayment.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(updatePayment.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updatePayment.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(deletePayment.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deletePayment.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(resetNewPayment, (state) => {
        state.newPayment = initialState.newPayment;
      })
      .addCase(resetEditPayment, (state) => {
        state.editPayment = null;
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

export const {
  setSearch,
  setStatus,
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
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
