import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, PlusCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../../features/admin/auth/adminAuthSlice';
import { impersonateUser } from '../../features/auth/authSlice';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from "sonner";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, page, totalPages } = useSelector(
    (state) => state.adminAuth
  );
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    isVerified: false,
  });
  console.log(newUser, 'newUser');


  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // fetch users on load
  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // handlers
  const handleAdd = async () => {
    try {
      await dispatch(addUser(newUser)).unwrap();
      setNewUser({ name: '', email: '', password: '', role: 'user', isVerified: false });

      toast.success("User Added 🎉", {
        description: "Account created! Please review in the table.",
      });
    } catch (error) {
      toast.error("Failed to add user ❌", {
        description: error?.message || "Something went wrong while creating user.",
      });
    }
  };

  const handleUpdate = async () => {
    if (editingUser) {
      try {
        await dispatch(updateUser({ id: editingUser._id, updates: editingUser })).unwrap();
        setEditingUser(null);

        toast.success("User Updated ✅", {
          description: "User details have been successfully updated.",
        });
      } catch (error) {
        toast.error("Update Failed ❌", {
          description: error?.message || "Could not update the user.",
        });
      }
    }
  };

  const handleDelete = async () => {
    if (deletingUser) {
      try {
        await dispatch(deleteUser(deletingUser._id)).unwrap();
        setDeletingUser(null);

        toast.success("User Deleted 🗑️", {
          description: "The user has been removed from the system.",
        });
      } catch (error) {
        toast.error("Delete Failed ❌", {
          description: error?.message || "Could not delete the user.",
        });
      }
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      try {
        await dispatch(getUsers({ page: newPage, limit: 10 })).unwrap();

        toast.success("Page Loaded 📄", {
          description: `Showing results for page ${newPage}.`,
        });
      } catch (error) {
        toast.error("Failed to load page ❌", {
          description: error?.message || "Something went wrong while fetching users.",
        });
      }
    }
  };

  const handleImpersonate = async (userId) => {
    try {
      await dispatch(impersonateUser(userId)).unwrap();
      toast.success("Login Successful 🔓", {
        description: "You are now logged in as the selected user.",
      });
      navigate('/home');
    } catch (error) {
      toast.error("Impersonation Failed ❌", {
        description: error?.message || "Could not log in as user.",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Users</h1>

        {/* Add User Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              Add User
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Fill in the user details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <input
                type='text'
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type='email'
                className="w-full p-2 border rounded"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type='password'
                className="w-full p-2 border rounded"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <select
                name='isVerified'
                className="w-full p-2 border rounded"
                value={newUser.isVerified ? '1' : '0'}
                onChange={(e) =>
                  setNewUser({ ...newUser, isVerified: e.target.value === '1' })
                }
              >
                <option value="0">Pending</option>
                <option value="1">Active</option>
              </select>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Verified</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t border-gray-300 text-sm">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.isVerified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {user.isVerified ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-3">
                  {/* Edit button */}
                  <button
                    onClick={() => setEditingUser({ ...user })}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer border-blue-600 border p-1 rounded-sm"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => setDeletingUser(user)}
                    className="text-red-600 hover:text-red-800 cursor-pointer border p-1 rounded-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Login as button */}
                  <button
                    onClick={() => handleImpersonate(user._id)}
                    className="text-green-600 hover:text-green-800 cursor-pointer border-green-600 border p-1 rounded-sm"
                    title={`Login as ${user.name}`}
                  >
                    <LogIn className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
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

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <input
              type='text'
              name='name'
              className="w-full p-2 border rounded"
              placeholder="Name"
              value={editingUser?.name || ''}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              type='email'
              name='email'
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={editingUser?.email || ''}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <select
              name='isVerified'
              className="w-full p-2 border rounded"
              value={editingUser?.isVerified ? '1' : '0'}
              onChange={(e) =>
                setEditingUser({ ...editingUser, isVerified: e.target.value === '1' })
              }
            >
              <option value="1">Active</option>
              <option value="0">Pending</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Update
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <DialogContent className="bg-white rounded-lg p-6 text-center">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{deletingUser?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-center">
            <DialogClose asChild>
              <button className="px-4 py-2 border rounded cursor-pointer">Cancel</button>
            </DialogClose>
            <DialogClose asChild>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
