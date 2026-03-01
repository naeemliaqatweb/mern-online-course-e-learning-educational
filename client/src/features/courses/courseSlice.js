import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

export const fetchPublishedCourses = createAsyncThunk(
    "publicCourses/fetchPublished",
    async (_, { rejectWithValue }) => {
        try {
            console.log('Dispatching fetchPublishedCourses...');
            const res = await axios.get(API_URL);
            console.log('Fetch success:', res.data);
            return res.data.data;
        } catch (error) {
            console.error('Fetch error:', error);
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const fetchCourseDetails = createAsyncThunk(
    "publicCourses/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const fetchAllowedCourses = createAsyncThunk(
    "publicCourses/fetchAllowed",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/my-courses`, { withCredentials: true });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

const courseSlice = createSlice({
    name: "publicCourses",
    initialState: {
        items: [],
        currentCourse: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentCourse: (state) => {
            state.currentCourse = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Published Courses
            .addCase(fetchPublishedCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPublishedCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPublishedCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Course Details
            .addCase(fetchCourseDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourseDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCourse = action.payload;
            })
            .addCase(fetchCourseDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Allowed Courses
            .addCase(fetchAllowedCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllowedCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllowedCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;
