import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/plans";



// Async Thunks
export const fetchPlans = createAsyncThunk("plans/fetchPlans", async () => {
    const res = await axios.get(API_URL);
    return res.data;
  });
  
  export const createPlan = createAsyncThunk("plans/createPlan", async (plan) => {
    const res = await axios.post(API_URL, plan);
    return res.data;
  });
  
  export const updatePlan = createAsyncThunk("plans/updatePlan", async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  });
  
  export const deletePlan = createAsyncThunk("plans/deletePlan", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  });



// Slice
const planSlice = createSlice({
    name: "plans",
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch
        .addCase(fetchPlans.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPlans.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchPlans.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Create
        .addCase(createPlan.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
  
        // Update
        .addCase(updatePlan.fulfilled, (state, action) => {
          const index = state.items.findIndex(p => p._id === action.payload._id);
          if (index !== -1) state.items[index] = action.payload;
        })
  
        // Delete
        .addCase(deletePlan.fulfilled, (state, action) => {
          state.items = state.items.filter(p => p._id !== action.payload);
        });
    },
  });
  
  export default planSlice.reducer;