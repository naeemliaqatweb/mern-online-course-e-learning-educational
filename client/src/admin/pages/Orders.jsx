import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Trash, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // adjust import path as needed

import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchDeletedOrders, softDeleteOrder, deleteOrder, updateOrderStatus } from "../../features/admin/orders/adminOrderSlice";
import { toast } from "sonner";
const AdminPanelOrders = () => {
  const [isTrashView, setIsTrashView] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  const dispatch = useDispatch();
  const { items: getOrders, loading } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (isTrashView) {
      dispatch(fetchDeletedOrders());
    } else {
      dispatch(fetchOrders());
    }
  }, [dispatch, isTrashView]);
  // Dummy data
  const orders = getOrders?.orders || [];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleUpdate = () => {
    dispatch(updateOrderStatus({ id: editingOrder._id, status: editingOrder.status })).then((action) => {

      if (action.meta.requestStatus === "fulfilled") {
        toast.success("User Added 🎉", {
          description: `Order updated to status: ${editingOrder.status}`,
        });
        dispatch(fetchOrders());
      } else {
        toast.error("Failed to update order");
      }
      setEditingOrder(null);
    });
    // alert(`Order updated to status: ${editingOrder.status}`);

  };

  const handleSoftDelete = () => {

    dispatch(softDeleteOrder(deletingOrder._id)).then((action) => {

      if (action.meta.requestStatus === "fulfilled") {
        toast.success("User Added 🎉", {
          description: `Order moved to trash: ${deletingOrder._id}`,
        });
        dispatch(fetchOrders());
      } else {
        toast.error("Failed to update order");
      }
    });
    setDeletingOrder(null);
  };

  const handlePermanentDelete = () => {
    dispatch(deleteOrder(deletingOrder._id)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        toast.success("Order Deleted 🎉", {
          description: `Order permanently deleted: ${deletingOrder._id}`,
        });
        dispatch(fetchDeletedOrders());
      } else {
        toast.error("Failed to delete order");
      }
    });
    setDeletingOrder(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          {isTrashView ? "Trashed Orders" : "Orders"}
        </h1>
        <button
          onClick={() => setIsTrashView(!isTrashView)}
          className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${isTrashView
            ? "bg-gray-600 text-white hover:bg-gray-700"
            : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          {isTrashView ? (
            <RefreshCw className="w-4 h-4" />
          ) : (
            <Trash className="w-4 h-4" />
          )}
          {isTrashView ? "Back to Orders" : "View Trash"}
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="p-4">#</th>
              <th className="p-4">User</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Billing</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="border-t border-gray-200 text-sm">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{order?.userId?.name}</td>
                  <td className="p-4">{order?.planId?.name}</td>
                  <td className="p-4">${order.amount}</td>
                  <td className="p-4 capitalize">{order.billingCycle}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center flex justify-center gap-3">
                    {!isTrashView ? (
                      <>
                        <button
                          onClick={() => setEditingOrder(order)}
                          className="text-blue-600 hover:text-blue-800 border p-1 rounded-sm cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrder(order)}
                          className="text-red-600 hover:text-red-800 border p-1 rounded-sm cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeletingOrder(order)}
                        className="text-red-600 hover:text-red-800 border p-1 rounded-sm cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={!!editingOrder} onOpenChange={(open) => !open && setEditingOrder(null)}>
        <DialogContent className="bg-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>Update order status below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <select
              className="w-full p-2 border rounded"
              value={editingOrder?.status || "pending"}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete/Trash Dialog */}
      <Dialog open={!!deletingOrder} onOpenChange={(open) => !open && setDeletingOrder(null)}>
        <DialogContent className="bg-white rounded-lg p-6 text-center">
          <DialogHeader>
            <DialogTitle>
              {isTrashView ? "Permanently Delete Order" : "Move to Trash"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {isTrashView ? "permanently delete" : "move"} this order?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-3">
            <DialogClose asChild>
              <button className="px-4 py-2 border rounded cursor-pointer">
                Cancel
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                onClick={isTrashView ? handlePermanentDelete : handleSoftDelete}
                className={`px-4 py-2 rounded text-white cursor-pointer ${isTrashView
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
              >
                {isTrashView ? "Delete Permanently" : "Move to Trash"}
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanelOrders;
