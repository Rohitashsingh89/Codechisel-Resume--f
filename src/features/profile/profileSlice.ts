import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

export interface Profile {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  hasPassword: boolean;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  lastFetched: number;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  saving: false,
  error: null,
  lastFetched: 0,
};

// ✅ FIXED: Always fetch on mount/refresh
export const fetchProfile = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await apiFetch<Profile>('/v1/users/me');
      return profile;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk<
  Profile,
  { data: Partial<Profile> },
  { rejectValue: string }
>(
  'profile/updateProfile',
  async ({ data }, { rejectWithValue }) => {
    try {
      const updated = await apiFetch<Profile>('/v1/users/update', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return updated;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
      state.error = null;
    },
    clearProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load profile';
      })
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.saving = false;
        state.lastFetched = Date.now();
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update profile';
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
