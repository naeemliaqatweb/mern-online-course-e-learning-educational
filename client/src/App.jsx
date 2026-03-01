import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import AuthCheck from './common/auth-check';
import Layout from './components/Common/Layout';
import AdminLayout from './admin/components/Common/Layout';
import Dashboard from './admin/pages/Dashboard';
import Users from './admin/pages/Users';
import AdminAbout from './admin/pages/About';
import AdminContactPanel from './admin/pages/ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './features/auth/authSlice';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Prices from './admin/pages/Prices';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminPanelOrders from './admin/pages/Orders';
import Profile from './components/Home/Profile';
import AdminCourses from './admin/pages/Courses';
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (

    <Router> {/* ✅ Wrap Everything */}
      <Routes>
        <Route path="/" element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
          </AuthCheck>
        } />
        <Route path="/auth" element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </AuthCheck>
        }>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </AuthCheck>
        }>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/my-account" element={<Profile />} />



          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/view-course/:id" element={<CourseDetails />} />

        </Route>
        {/* //admin panel */}
        {/* <Route path="/admin" element={<Layout />} /> */}

        <Route path="/admin" element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </AuthCheck>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="pricing" element={<Prices />} />
          <Route path="about-us" element={<AdminAbout />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="contact-us" element={<AdminContactPanel />} />
          <Route path="orders" element={<AdminPanelOrders />} />
        </Route>
      </Routes>
      {/* ✅ Footer is inside Router */}
    </Router>
  );
}

export default App;
