import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// // Axios instance with cookies enabled
const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true
});

// Get user from localStorage if exists
const storedUser = localStorage.getItem('user');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  token: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ================== THUNKS ==================

// Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const res = await api.post('/register', userData);
      console.log(res.data);

      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// ✅ Verify Code
export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await api.post('/verify-code', { email, code });
      // Save token + user
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.message; // success msg
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Verification failed');
    }
  }
);

// ✅ Resend Code
export const resendCode = createAsyncThunk(
  'auth/resendCode',
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.post('/resend-code', { email });
      return res.data.message; // success msg
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Resend failed');
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const res = await api.post('/login', userData);
      // Save token + user
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Get Users
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/get-users');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetching users failed');
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post('/logout');
  } catch (err) {
    console.error('Logout API error', err);
  }
  localStorage.removeItem('user');
  return null;
});

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.post('/forgot-password', { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send reset email');
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, c_password }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/reset-password/${token}`, { password, c_password });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Password reset failed');
    }
  }
);

// Google login
export const loginWithGoogle = createAsyncThunk(
  'auth/google',
  async (idToken, { rejectWithValue }) => {
    try {
      const res = await api.post('/google', { token: idToken });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return {
        user: res.data.user,
        token: res.data.token
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Google login failed');
    }
  }
);

// ✅ Check Auth (Fetch Current User)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/me');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Auth check failed');
    }
  }
);

// ✅ Impersonate User
export const impersonateUser = createAsyncThunk(
  'auth/impersonateUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/impersonate/${userId}`);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Impersonation failed');
    }
  }
);

// ✅ Stop Impersonating
export const stopImpersonating = createAsyncThunk(
  'auth/stopImpersonating',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post('/stop-impersonating');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Stop impersonation failed');
    }
  }
);

// ================== SLICE ==================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Verify Code
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Resend Code
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // login with google
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // Impersonate User
      .addCase(impersonateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(impersonateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(impersonateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Stop Impersonating
      .addCase(stopImpersonating.pending, (state) => {
        state.loading = true;
      })
      .addCase(stopImpersonating.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(stopImpersonating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;
