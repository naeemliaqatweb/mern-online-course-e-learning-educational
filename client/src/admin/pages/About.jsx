import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Trash2, Edit, Plus, ImageIcon, Upload, Trophy, Target, X } from 'lucide-react';
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbouts, addAbout, updateAbout, deleteAbout } from "../../features/admin/about/aboutSlice";
import { useEffect } from "react";

const AdminAboutPage = () => {
  // state only for modals
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    type: ""
  });

  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.adminAbout);

  useEffect(() => {
    dispatch(fetchAbouts());
  }, [dispatch]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    // save first file to state
    setFormData((prev) => ({ ...prev, image: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  // Cancel button
  const handleCancel = () => {
    setOpenDialog(false);
    setFormData({ title: "", description: "", image: null }); // reset
  };

  const confirmDelete = () => {
    dispatch(deleteAbout(formData._id));
    setOpenDelete(false);
  };


  const handleSave = () => {
    console.log(formData, 'formData');

    if (!formData.title || !formData.description || !formData.type) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("type", formData.type);
    if (formData.image) data.append("image", formData.image);

    if (formData._id) {
      dispatch(updateAbout({ id: formData._id, formData: data }));
    } else {
      dispatch(addAbout(data));
    }

    setOpenDialog(false);
    setFormData({ title: "", description: "", image: null, type: "" });
  };

  return (
    <div className="p-6 mx-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your company's achievements and goals
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-end gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setFormData({ title: "", description: "", image: null, type: "achievement" });
              setOpenDialog(true);
            }}>
            <Plus className="w-4 h-4 mr-2 " />
            Add Achievement
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              setFormData({ title: "", description: "", image: null, type: "goal" });
              setOpenDialog(true);
            }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Achievements Section */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-blue-50 py-4">
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl text-blue-800">Our Achievements</CardTitle>
              </div>
              <CardDescription>
                Showcase your company's milestones and successes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-[80px] py-4 text-gray-600 font-medium">Image</TableHead>
                    <TableHead className="py-4 text-gray-600 font-medium">Title</TableHead>
                    <TableHead className="py-4 text-gray-600 font-medium">Description</TableHead>
                    <TableHead className="text-right py-4 text-gray-600 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Map achievements here */}

                  {items.filter(i => i.type === "achievement").map(item => (
                    <TableRow key={item._id}>
                      <TableCell className="py-3">
                        {item.image ? (
                          <img src={`http://localhost:5000${item.image}`} alt="thumb" className="h-12 w-12 rounded-md object-cover" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="bg-blue-500 text-white me-2" onClick={() => { setFormData(item); setOpenDialog(true); }}>Edit</Button>
                        <Button size="sm" className="bg-red-500" variant="destructive" onClick={() => { setFormData(item); setOpenDelete(true); }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Goals Section */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-green-50 py-4">
              <div className="flex items-center">
                <Target className="h-6 w-6 text-green-600 mr-2" />
                <CardTitle className="text-xl text-green-800">Our Goals</CardTitle>
              </div>
              <CardDescription>
                Highlight your company's vision and future objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-[80px] py-4 text-gray-600 font-medium">Image</TableHead>
                    <TableHead className="py-4 text-gray-600 font-medium">Title</TableHead>
                    <TableHead className="py-4 text-gray-600 font-medium">Description</TableHead>
                    <TableHead className="text-right py-4 text-gray-600 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Map goals here */}

                  {items.filter(i => i.type === "goal").map(item => (
                    <TableRow key={item._id}>
                      <TableCell className="py-3">
                        {item.image ? (
                          <img src={`${import.meta.env.VITE_SERVER_API_URL}${item.image}`} alt="thumb" className="h-12 w-12 rounded-md object-cover" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="bg-blue-500 text-white me-2" onClick={() => { setFormData(item); setOpenDialog(true); }}>Edit</Button>
                        <Button size="sm" className="bg-red-500" variant="destructive" onClick={() => { setFormData(item); setOpenDelete(true); }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {formData.type === "achievement" ? "Add/Edit Achievement" : "Add/Edit Goal"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in the details to add or edit an item
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 py-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">Title</Label>
              <Input id="title" name="title" placeholder="Enter a title" value={formData.title}
                onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter a description" rows={3} value={formData.description}
                onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Image</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
              >
                <input {...getInputProps()} />
                {formData.image ? (
                  <div>
                    <img
                      src={
                        formData.image instanceof File
                          ? URL.createObjectURL(formData.image) // preview new upload
                          : `${import.meta.env.VITE_SERVER_API_URL}${formData.image}` // show existing image from DB
                      }
                      alt="Preview"
                      className="mx-auto h-24 w-auto object-contain"
                    />

                    <p className="mt-2 text-sm text-gray-600">      {formData.image instanceof File ? formData.image.name : ""}
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag & drop an image here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete the item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminAboutPage;
