import React, { useEffect } from 'react';
import {
  BarChart2,
  BookOpen,
  Layers,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  countUsers
} from '../../features/admin/auth/adminAuthSlice';
import { fetchTotalCountOrders } from '@/features/admin/orders/adminOrderSlice';
const Dashboard = () => {
    const dispatch = useDispatch();
    const { total, loading, error } = useSelector(
      (state) => state.adminAuth
    );

    const { items:TotalOrder } = useSelector(
      (state) => state.adminOrders
    );
    
    // fetch users on load
    useEffect(() => {
      dispatch(countUsers());
    }, [dispatch]);

    // fetch users on load
    useEffect(() => {
      dispatch(fetchTotalCountOrders());
    }, [dispatch]);
    
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Orders */}
        <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Orders</h2>
            <p className="text-2xl font-semibold text-gray-800">{TotalOrder.totalOrders}</p>
          </div>
          <ShoppingCart className="text-blue-500 w-8 h-8" />
        </div>

        {/* Courses */}
        <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Courses</h2>
            <p className="text-2xl font-semibold text-gray-800">342</p>
          </div>
          <BookOpen className="text-green-500 w-8 h-8" />
        </div>

        {/* Types */}
        <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Types</h2>
            <p className="text-2xl font-semibold text-gray-800">12</p>
          </div>
          <Layers className="text-purple-500 w-8 h-8" />
        </div>

        {/* Users */}
        <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Users</h2>
            <p className="text-2xl font-semibold text-gray-800">{total}</p>
          </div>
          <Users className="text-pink-500 w-8 h-8" />
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Course Enrollment Overview</h2>
          <BarChart2 className="text-indigo-600 w-6 h-6" />
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          {/* Replace with actual chart later */}
          Graph Placeholder (e.g. Recharts, Chart.js)
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

