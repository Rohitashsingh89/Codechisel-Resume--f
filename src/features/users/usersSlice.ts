"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { User } from "@/types/common";

type UsersState = {
  users: User[];
  loading: boolean;
  submitting: boolean;
  error: string | null;

  // Modals
  showAddModal: boolean;
  showEditModal: boolean;
  currentUser: User | null;
  showPassword: boolean;
  confirmDeleteId: string | null;

  // Form
  formData: {
    name: string;
    email: string;
    role: string;
    password: string;
    isActive: boolean;
  };

  // Pagination
  currentPage: number;
  itemsPerPage: number;
  topMessage: string | null;
  showSuccessPrompt: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  submitting: false,
  error: null,
  showAddModal: false,
  showEditModal: false,
  currentUser: null,
  showPassword: false,
  confirmDeleteId: null,
  formData: {
    name: "",
    email: "",
    role: "User",
    password: "",
    isActive: true,
  },
  currentPage: 1,
  itemsPerPage: 10,
  topMessage: null,
  showSuccessPrompt: true,
};

// ========== Async Thunks ==========

// Fetch Users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch<{ users: User[] }>("/v1/users");
      return { users: res.users || [] };
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to fetch users";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Add User
export const addUser = createAsyncThunk(
  "users/addUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { users: UsersState };
    try {
      await apiFetch("/v1/users", {
        method: "POST",
        body: JSON.stringify(state.users.formData),
      });
      toast.success("User created successfully!");
      dispatch(closeAddModal());
      dispatch(fetchUsers());
    } catch (err: any) {
      let msg = "Failed to add user";
      if (err?.message?.includes("E11000 duplicate key error") && err.message.includes("email")) {
        msg = "Email address already exists.";
      }
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { users: UsersState };
    const currentUser = state.users.currentUser;
    if (!currentUser) return rejectWithValue("No user selected");

    try {
      const res = await apiFetch(`/v1/users/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(state.users.formData),
      });
      toast.success("User updated successfully!");
      dispatch(closeEditModal());
      dispatch(fetchUsers());
      return res.user;
    } catch (err: any) {
      let msg = "Failed to update user";
      if (err?.message?.includes("E11000 duplicate key error") && err.message.includes("email")) {
        msg = "Email address already exists.";
      }
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { dispatch, rejectWithValue }) => {

    try {
      await apiFetch(`/v1/users/${userId}`, { method: "DELETE" });
      toast.success("User deleted successfully!");
      dispatch(fetchUsers());
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to delete user";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Modals
    openAddModal: (state) => {
      state.showAddModal = true;
    },
    closeAddModal: (state) => {
      state.showAddModal = false;
      state.formData = initialState.formData;
    },
    openEditModal: (state, action: PayloadAction<User>) => {
      state.showEditModal = true;
      state.currentUser = action.payload;
      state.formData = {
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        password: "",
        isActive: action.payload.isActive,
      };
    },
    closeEditModal: (state) => {
      state.showEditModal = false;
      state.currentUser = null;
      state.formData = initialState.formData;
    },
    togglePasswordField: (state) => {
      state.showPassword = !state.showPassword;
    },

    openConfirmDelete: (state, action: PayloadAction<string>) => {
      state.confirmDeleteId = action.payload;
    },
    closeConfirmDelete: (state) => {
      state.confirmDeleteId = null;
    },

    // Form Updates
    updateFormData: (state, action: PayloadAction<Partial<UsersState["formData"]>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    showSuccessPrompt: (state, action: PayloadAction<string>) => {
      state.topMessage = action.payload;
      state.showSuccessPrompt = true;
    },
    hideSuccessPrompt: (state) => {
      state.showSuccessPrompt = false;
      state.topMessage = null;
    },
    
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // addUser / updateUser / deleteUser
    builder
      .addCase(addUser.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.submitting = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.submitting = false;
      });
  },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  togglePasswordField,
  updateFormData,
  setCurrentPage,
  setItemsPerPage,
  openConfirmDelete,
  closeConfirmDelete,
  showSuccessPrompt,
  hideSuccessPrompt,
} = usersSlice.actions;

export default usersSlice.reducer;