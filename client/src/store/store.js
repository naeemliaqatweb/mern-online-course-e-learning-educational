import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminAuthReducer from "../features/admin/auth/adminAuthSlice";
import adminPlanReducer from "../features/admin/plans/planSlice";
import adminAboutReducer from "../features/admin/about/aboutSlice";
import adminOrderReducer from "../features/admin/orders/adminOrderSlice";
import adminCoursesReducer from "../features/admin/courses/adminCourseSlice";
import courseReducer from "../features/courses/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    adminPlan: adminPlanReducer,
    adminAbout: adminAboutReducer,
    adminOrders: adminOrderReducer,
    adminCourses: adminCoursesReducer,
    courses: courseReducer
  }
});
