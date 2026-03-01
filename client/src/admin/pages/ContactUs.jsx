import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Trash2, Edit2, Plus, Save, X, Eye, EyeOff, Globe } from "lucide-react";
import axios from "axios";

// Contact Us Component
const ContactUs = ({ email, phone, address, socialLinks }) => (
  <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-6 md:px-16 rounded-3xl">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-4">
        Contact Us
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        Get in touch with us for inquiries, collaborations, or support.
      </p>

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="group flex flex-col items-center bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Mail className="text-white w-8 h-8" />
          </div>
          <p className="font-semibold text-slate-800 mb-2">Email</p>
          <a href={`mailto:${email}`} className="text-slate-600 hover:text-indigo-500 transition-colors">
            {email}
          </a>
        </div>

        <div className="group flex flex-col items-center bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Phone className="text-white w-8 h-8" />
          </div>
          <p className="font-semibold text-slate-800 mb-2">Phone</p>
          <a href={`tel:${phone}`} className="text-slate-600 hover:text-emerald-500 transition-colors">
            {phone}
          </a>
        </div>

        <div className="group flex flex-col items-center bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="text-white w-8 h-8" />
          </div>
          <p className="font-semibold text-slate-800 mb-2">Address</p>
          <p className="text-slate-600">{address}</p>
        </div>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl hover:scale-110 transition-all duration-300"
              title={item.name}
            >
              {item.icon.startsWith('http') ? (
                <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
              ) : (
                <Globe className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  </section>
);

// Admin Panel Component
const AdminContactPanel = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const API_URL = "http://localhost:5000/api/contact";

  const [socialLinks, setSocialLinks] = useState([]);

  const [newSocial, setNewSocial] = useState({ name: "", url: "", icon: "" });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingSocial, setEditingSocial] = useState({ name: "", url: "", icon: "" });
  const [showPreview, setShowPreview] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");

    // Load contact info from API
    useEffect(() => {
      axios.get(API_URL)
        .then(res => {
          if (res.data) {
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setSocialLinks(res.data.socialLinks || []);
          }
        })
        .catch(err => console.error(err));
    }, []);


      // Save contact info to API
  const saveContactInfo = () => {
    axios.post(API_URL, { email, phone, address, socialLinks })
      .then(res => {
        setSavedMessage(res.data.message);
        setTimeout(() => setSavedMessage(""), 3000);
      })
      .catch(err => console.error(err));
  };

  // Add new social link
  const addSocial = () => {
    if (!newSocial.name || !newSocial.url || !newSocial.icon) return;
    setSocialLinks([...socialLinks, { ...newSocial }]);
    setNewSocial({ name: "", url: "", icon: "" });
    showSavedMessage("Social link added successfully!");
  };

  // Delete social link
  const deleteSocial = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
    showSavedMessage("Social link deleted successfully!");
  };

  // Start editing social link
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingSocial({ ...socialLinks[index] });
  };

  // Save edited social link
  const saveEdit = () => {
    if (!editingSocial.name || !editingSocial.url || !editingSocial.icon) return;
    const updated = [...socialLinks];
    updated[editingIndex] = { ...editingSocial };
    setSocialLinks(updated);
    setEditingIndex(-1);
    setEditingSocial({ name: "", url: "", icon: "" });
    showSavedMessage("Social link updated successfully!");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditingSocial({ name: "", url: "", icon: "" });
  };

  // Show saved message
  const showSavedMessage = (message) => {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  // Save contact info
  // const saveContactInfo = () => {
  //   showSavedMessage("Contact information saved successfully!");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-2">
              Contact Management
            </h1>
            <p className="text-slate-600">Manage your contact information and social media links</p>
          </div>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showPreview ? "Hide" : "Show"} Preview
          </button>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-2xl shadow-lg animate-pulse">
            {savedMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Admin Controls */}
          <div className="space-y-6">
            
            {/* Contact Info Edit */}
            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-white/50 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Contact Information</h2>
                <button
                  onClick={saveContactInfo}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>

            {/* Social Links Management */}
            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-white/50 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Social Media Links</h2>

              {/* Existing Social Links */}
              <div className="space-y-3 mb-6">
                {socialLinks.map((link, index) => (
                  <div key={index} className="group p-4 bg-white/50 border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    {editingIndex === index ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingSocial.name}
                          onChange={(e) => setEditingSocial({ ...editingSocial, name: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Social platform name"
                        />
                        <input
                          type="url"
                          value={editingSocial.url}
                          onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="https://..."
                        />
                        <input
                          type="url"
                          value={editingSocial.icon}
                          onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Icon URL"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {link.icon.startsWith('http') ? (
                            <img src={link.icon} alt={link.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <Globe className="w-8 h-8 text-slate-600" />
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">{link.name}</p>
                            <p className="text-sm text-slate-600 truncate max-w-xs">{link.url}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEdit(index)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSocial(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Social Link */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 rounded-2xl">
                <h3 className="font-semibold text-slate-800 mb-3">Add New Social Link</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newSocial.name}
                    onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Platform name (e.g., Facebook, Twitter)"
                  />
                  <input
                    type="url"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Profile URL (https://...)"
                  />
                  <input
                    type="url"
                    value={newSocial.icon}
                    onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Icon URL (https://...)"
                  />
                  <button
                    onClick={addSocial}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Add Social Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <div className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Live Preview</h2>
                <ContactUs 
                  email={email} 
                  phone={phone} 
                  address={address} 
                  socialLinks={socialLinks} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactPanel;