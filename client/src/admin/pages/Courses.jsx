import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Book, Clock, User, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { createCourses, fetchCourses, updateCourse, deleteCourse, duplicateCourse, togglePublishStatus } from "../../features/admin/courses/adminCourseSlice";
import { Copy, CheckCircle, XCircle } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ReactPlayer from 'react-player';
const AdminCourses = () => {
  const dispatch = useDispatch();
  const { items: courses, loading } = useSelector((state) => state.adminCourses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    images: [],
    created_by: '',
    level: 'free',
    curriculum: []
  });

  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, {
        section: '',
        lessons: []
      }]
    }));
  };

  const updateSection = (index, value) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[index].section = value;
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const deleteSection = (index) => {
    const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const addLesson = (sectionIndex) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[sectionIndex].lessons.push({
      name: '',
      title: '',
      duration: '',
      video_url: '',
      description: '',
      resources: []
    });
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const updateLesson = (sectionIndex, lessonIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((section, sIdx) =>
        sIdx === sectionIndex ? {
          ...section,
          lessons: section.lessons.map((lesson, lIdx) =>
            lIdx === lessonIndex ? { ...lesson, [field]: value } : lesson
          )
        } : section
      )
    }));
  };

  const deleteLesson = (sectionIndex, lessonIndex) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[sectionIndex].lessons = newCurriculum[sectionIndex].lessons.filter((_, i) => i !== lessonIndex);
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.created_by) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingCourse) {
        await dispatch(updateCourse({ id: editingCourse._id, data: formData })).unwrap();
      } else {
        await dispatch(createCourses(formData)).unwrap();
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course: ' + error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: [],
      images: [],
      created_by: '',
      level: 'free',
      curriculum: []
    });
    setNewTag('');
    setNewImage('');
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await dispatch(deleteCourse(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course: ' + error);
      }
    }
  };

  const handleDuplicate = async (id) => {
    if (window.confirm('Are you sure you want to duplicate this course?')) {
      try {
        await dispatch(duplicateCourse(id)).unwrap();
      } catch (error) {
        console.error('Failed to duplicate course:', error);
        alert('Failed to duplicate course: ' + error);
      }
    }
  };

  const handlePublishToggle = async (id) => {
    try {
      await dispatch(togglePublishStatus(id)).unwrap();
    } catch (error) {
      console.error('Failed to update publish status:', error);
      alert('Failed to update publish status: ' + error);
    }
  };

  const handleView = (course) => {
    setSelectedCourse(course);
    setViewMode('view');
  };

  const calculateTotalLessons = (curriculum) => {
    if (!curriculum) return 0;
    return curriculum.reduce((total, section) => total + (section.lessons ? section.lessons.length : 0), 0);
  };

  if (viewMode === 'view' && selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setViewMode('list')}
            className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-2"
          >
            ← Back to Courses
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Course Header with Image */}
            <div className="relative">
              {selectedCourse.images && selectedCourse.images.length > 0 ? (
                <div className="h-64 overflow-hidden">
                  <img
                    src={selectedCourse.images[0]}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{selectedCourse.title}</h1>
                <div
                  className="text-white text-lg mb-6 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedCourse.description }}
                />
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.tags && selectedCourse.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-2">
                  <User size={16} />
                  {selectedCourse.created_by}
                </p>
              </div>
            </div>

            {/* Additional Images Gallery */}
            {selectedCourse.images && selectedCourse.images.length > 1 && (
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">Course Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedCourse.images.slice(1).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border">
                      <img
                        src={image}
                        alt={`${selectedCourse.title} ${index + 2}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Course Curriculum</h2>
              <div className="space-y-6">
                {selectedCourse.curriculum.map((section, sIdx) => (
                  <div key={sIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Book size={20} className="text-indigo-600" />
                        {section.section}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {section.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                                {lesson.name}
                              </span>
                              <h4 className="text-lg font-medium text-gray-800 mt-1">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 ml-4">
                              <Clock size={14} />
                              {lesson.duration}
                            </div>
                          </div>
                          {lesson.video_url && (
                            <div className="mt-3 rounded-lg overflow-hidden">
                              <ReactPlayer
                                url={lesson.video_url}
                                width="100%"
                                height="360px"
                                controls
                              />
                            </div>
                          )}
                          {lesson.resources && lesson.resources.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Resources:</p>
                              {lesson.resources.map((resource, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={resource}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-indigo-600 hover:underline block"
                                >
                                  {resource}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Course Management</h1>
            <p className="text-gray-600 mt-2">Manage your courses and curriculum</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Course Image */}
              {course.images && course.images.length > 0 ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={course.images[0]}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{course.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${course.level === 'premium' ? 'bg-amber-100 text-amber-700' :
                      course.level === 'advance' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {course.level || 'free'}
                  </span>
                </div>
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: course.description?.replace(/<[^>]+>/g, '') }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags && course.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Book size={16} />
                  <span>{course.curriculum?.length || 0} sections</span>
                  <span>•</span>
                  <span>{calculateTotalLessons(course.curriculum || [])} lessons</span>
                </div>

                <p className="text-sm text-gray-500 mb-4">{course.created_by}</p>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleView(course)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDuplicate(course._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    title="Duplicate"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handlePublishToggle(course._id)}
                    className={`flex-1 flex items-center justify-center gap-2 ${course.isPublished ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-3 py-2 rounded-lg transition-colors text-sm`}
                    title={course.isPublished ? "Unpublish" : "Publish"}
                  >
                    {course.isPublished ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <Book size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses yet</h3>
            <p className="text-gray-500">Click "Add New Course" to create your first course</p>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <h2 className="text-2xl font-bold">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h2>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter course title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Level</label>
                    <select
                      name="level"
                      value={formData.level || 'free'}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="free">Free</option>
                      <option value="advance">Advance</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                      className="bg-white"
                    />
                  </div>

                  {/* Tags Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add a tag (e.g., Beginner, 4 Weeks)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-indigo-900"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Images Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                        placeholder="Add image URL"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Course image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Created By *</label>
                    <input
                      type="text"
                      name="created_by"
                      value={formData.created_by}
                      onChange={handleInputChange}
                      placeholder="By John Smith"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Curriculum Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">Curriculum</label>
                      <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Add Section
                      </button>
                    </div>

                    {formData.curriculum.map((section, sIdx) => (
                      <div key={sIdx} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={section.section}
                            onChange={(e) => updateSection(sIdx, e.target.value)}
                            placeholder="Section Name (e.g., Introduction to HTML)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => deleteSection(sIdx)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => addLesson(sIdx)}
                          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors mb-3"
                        >
                          <Plus size={14} />
                          Add Lesson
                        </button>

                        {section.lessons.map((lesson, lIdx) => (
                          <div key={lIdx} className="bg-gray-50 rounded-lg p-3 mb-2">
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <input
                                type="text"
                                value={lesson.name}
                                onChange={(e) => updateLesson(sIdx, lIdx, 'name', e.target.value)}
                                placeholder="Lesson 01"
                                className="px-3 py-2 border border-gray-300 rounded text-sm"
                              />
                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => updateLesson(sIdx, lIdx, 'duration', e.target.value)}
                                placeholder="10 Min"
                                className="px-3 py-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => updateLesson(sIdx, lIdx, 'title', e.target.value)}
                              placeholder="Lesson Title"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                            />
                            <textarea
                              value={lesson.description}
                              onChange={(e) => updateLesson(sIdx, lIdx, 'description', e.target.value)}
                              placeholder="Lesson Description"
                              rows="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                            />
                            <input
                              type="text"
                              value={lesson.video_url}
                              onChange={(e) => updateLesson(sIdx, lIdx, 'video_url', e.target.value)}
                              placeholder="Video URL (YouTube embed link)"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                            />
                            <button
                              type="button"
                              onClick={() => deleteLesson(sIdx, lIdx)}
                              className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              Remove Lesson
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;