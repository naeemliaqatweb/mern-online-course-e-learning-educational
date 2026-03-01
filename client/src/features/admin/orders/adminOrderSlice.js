import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/orders";



// Async Thunks
export const fetchOrders = createAsyncThunk("orders/get", async () => {
  const res = await axios.get(`${API_URL}/get`);
  return res.data;
});

export const fetchDeletedOrders = createAsyncThunk("orders/getDeleted", async () => {
  const res = await axios.get(`${API_URL}/get-deleted`);
  return res.data;
});


// Async get user orders Thunks
export const fetchUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      return res.data.orders; // only return orders array
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Async get total orders Thunks
export const fetchTotalCountOrders = createAsyncThunk(
  "orders/fetchTotalCountOrders",
  async () => {
    try {
      const res = await axios.get(`${API_URL}/get-total`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Async get total orders Thunks
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update-status`, { id, status });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const softDeleteOrder = createAsyncThunk(
  "orders/softDeleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/soft-delete/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/permanent-delete/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Deleted Orders
      .addCase(fetchDeletedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeletedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeletedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })


      // Fetch Total count Orders
      .addCase(fetchTotalCountOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalCountOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTotalCountOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })


      // update Order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })


      // soft delete Order
      .addCase(softDeleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(softDeleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(softDeleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })

      // delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })



  },
});

export default ordersSlice.reducer;