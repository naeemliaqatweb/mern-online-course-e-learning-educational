import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5000/api/admin/users';

// ========== Thunks ==========

// Get all users (with pagination, excluding admins)
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Count total users (excluding admins)
export const countUsers = createAsyncThunk(
  'admin/countUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/count`);
      return data.count;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add a new user
export const addUser = createAsyncThunk(
  'admin/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_URL, userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, updates);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ========== Slice ==========
const adminAuthSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.users = [];
      state.total = 0;
      state.page = 1;
      state.limit = 10;
      state.totalPages = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.pagination.total;
        state.page = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // countUsers
      .addCase(countUsers.fulfilled, (state, action) => {
        state.total = action.payload;
      })

      // addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
        state.total += 1;
      })

      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u._id === action.payload._id ? action.payload : u
        );
      })

      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { resetAdminState } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
