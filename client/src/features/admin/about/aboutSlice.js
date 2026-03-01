import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/about";

// Thunks
export const fetchAbouts = createAsyncThunk("about/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addAbout = createAsyncThunk("about/add", async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const updateAbout = createAsyncThunk("about/update", async ({ id, formData }) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const deleteAbout = createAsyncThunk("about/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const aboutSlice = createSlice({
  name: "about",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbouts.pending, (state) => { state.loading = true; })
      .addCase(fetchAbouts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAbouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAbout.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload);
      });
  },
});

export default aboutSlice.reducer;
