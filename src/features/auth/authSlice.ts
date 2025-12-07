import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    fullName?: string;
    role: string;
    hasPassword: boolean;
  } | null;
  loading: boolean;
  loginError: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.loading = false;
      state.loginError = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoginError(state, action: PayloadAction<string | null>) {
      state.loginError = action.payload;
      state.loading = false;
    },
    logOut(state) {
      state.accessToken = null;
      state.user = null;
      state.loginError = null;
    },
  },
});

export const { setCredentials, setLoading, setLoginError, logOut } =
  authSlice.actions;
export default authSlice.reducer;
