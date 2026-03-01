import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/courses";


// Async Thunks
// export const createCourses = createAsyncThunk("courses/create", async ({data}) => {
//     console.log(data,'datadatadata');

//     const res = await axios.post(`${API_URL}/create`,{data});
//     return res.data;
//   });

export const fetchCourses = createAsyncThunk(
  "courses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const createCourses = createAsyncThunk(
  "courses/create",
  async (coursesData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create`, coursesData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update/${id}`, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const duplicateCourse = createAsyncThunk(
  "courses/duplicate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/duplicate/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "courses/togglePublish",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/publish/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Slice
const CoursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(course => course._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(course => course._id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Duplicate
      .addCase(duplicateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(duplicateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(duplicateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Toggle Publish
      .addCase(togglePublishStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(course => course._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default CoursesSlice.reducer;