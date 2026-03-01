import React, { useEffect, useState } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import testimonial1 from "/images/HomeTestimonials/testimonial1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "@/features/admin/orders/adminOrderSlice";

const Profile = () => {

    const dispatch = useDispatch();
    const { items: orders, loading } = useSelector((state) => state.adminOrders);
    const { user } = useSelector((state) => state.auth);
    console.log(orders, 'orders');


    useEffect(() => {
        dispatch(fetchUserOrders(user._id));
    }, [dispatch, user._id]);

    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Updated profile:", userData);
    };


    const [selectedOrder, setSelectedOrder] = useState(null);


    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-orange-400">My Account</h1>
            </div>
            <Tabs defaultValue="profile" className="flex flex-col md:flex-row w-full container mx-auto my-12 gap-6">
                {/* Sidebar */}
                <TabsList className="flex flex-row h-full md:flex-col w-full md:w-1/4 bg-white border border-gray-200 rounded-lg shadow-sm p-2 space-x-2 md:space-x-0 md:space-y-2">
                    <TabsTrigger
                        value="profile"
                        className="justify-start w-full px-4 cursor-pointer py-3 text-left font-bold rounded-md data-[state=active]:bg-orange-400 data-[state=active]:text-white hover:bg-gray-50"
                    >
                        Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="orders"
                        className="justify-start w-full px-4 cursor-pointer py-3 text-left font-bold rounded-md data-[state=active]:bg-orange-400 data-[state=active]:text-white hover:bg-gray-50"
                    >
                        Orders
                    </TabsTrigger>
                </TabsList>

                {/* Content */}
                <div className="w-full md:w-3/4 bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <img
                                src={image || testimonial1}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border border-orange-300"
                            />
                            <div>
                                <input
                                    id="upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById("upload").click()}
                                    className="cursor-pointer border border-orange-300"
                                >
                                    Upload Image
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    className="border border-orange-300"
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="border border-orange-300"
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>Old Password (optional)</Label>
                                <Input
                                    name="oldPassword"
                                    type="password"
                                    value={userData.oldPassword}
                                    className="border border-orange-300"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>New Password</Label>
                                <Input
                                    name="newPassword"
                                    type="password"
                                    value={userData.newPassword}
                                    className="border border-orange-300"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Confirm Password</Label>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    value={userData.confirmPassword}
                                    className="border border-orange-300"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button onClick={handleSave} className="bg-orange-400 text-white cursor-pointer">Save Changes</Button>
                        </div>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                        <div>
                            {orders.length > 0 ? (
                                <div className="overflow-x-auto border rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Billing</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount ($)</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-700">{order._id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{order?.planId?.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">{order.billingCycle}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">${order.amount}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${order.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : order.status === "failed"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                                }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setSelectedOrder(order)}
                                                        >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <p>No orders yet.</p>
                                </div>
                            )}

                            {/* Modal for Order Details */}
                            {selectedOrder && (
                                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                        <button
                                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                            onClick={() => setSelectedOrder(null)}
                                        >
                                            ✕
                                        </button>
                                        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                            <p><strong>Plan:</strong> {selectedOrder?.planId?.name}</p>
                                            <p><strong>Billing Cycle:</strong> {selectedOrder.billingCycle}</p>
                                            <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
                                            <p><strong>Status:</strong>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${selectedOrder.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : selectedOrder.status === "failed"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {selectedOrder.status}
                                                </span>
                                            </p>
                                            <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="mt-4 text-right">
                                            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                </div>
            </Tabs>
        </>

    );
};

export default Profile;
