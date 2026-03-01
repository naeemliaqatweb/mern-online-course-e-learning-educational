import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  Pencil,
  Plus,
  X,
  Check,
  Star,
  Crown,
  Zap,
  Settings,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Save
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, createPlan, updatePlan, deletePlan } from "../../features/admin/plans/planSlice";
import { fetchPublishedCourses } from "../../features/courses/courseSlice";
import { Checkbox } from "@/components/ui/checkbox";

const AdminPricingPanel = () => {
  const dispatch = useDispatch();
  const { items: getPlans, loading } = useSelector((state) => state.adminPlan);
  const { items: courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchPublishedCourses());
  }, [dispatch]);


  const [open, setOpen] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [form, setForm] = useState({
    name: "",
    monthly: "",
    yearly: "",
    popular: false,
    active: true,
    features: [""],
    courses: [],
    level: "free",
  });

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setForm({
      name: plan.name,
      monthly: plan.monthly.toString(),
      yearly: plan.yearly.toString(),
      popular: plan.popular,
      active: plan.active,
      features: [...plan.features, ""],
      courses: plan.courses || [],
      level: plan.level || "free",
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePlan(id));
  };

  const togglePlanStatus = (plan) => {
    dispatch(updatePlan({ id: plan._id, data: { ...plan, active: !plan.active } }));
  };

  const handleSave = () => {
    const filteredFeatures = form.features.filter((f) => f.trim() !== "");
    const newPlan = {
      ...form,
      monthly: Number(form.monthly),
      yearly: Number(form.yearly),
      features: filteredFeatures,
    };

    if (editPlan) {
      dispatch(updatePlan({ id: editPlan._id, data: newPlan }));
    } else {
      dispatch(createPlan(newPlan));
    }
    resetForm();
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures.length > 0 ? newFeatures : [""] });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const resetForm = () => {
    setForm({ name: "", monthly: "", yearly: "", popular: false, active: true, features: [""], courses: [], level: "free" });
    setEditPlan(null);
    setOpen(false);
  };

  const toggleCourse = (courseId) => {
    const currentCourses = form.courses;
    if (currentCourses.includes(courseId)) {
      setForm({ ...form, courses: currentCourses.filter(id => id !== courseId) });
    } else {
      setForm({ ...form, courses: [...currentCourses, courseId] });
    }
  };

  const getPlanIcon = (plan) => {
    if (plan.monthly === 0) return <Zap className="h-5 w-5 text-emerald-500" />;
    if (plan.popular) return <Crown className="h-5 w-5 text-amber-500" />;
    return <Star className="h-5 w-5 text-blue-500" />;
  };

  const getYearlySavings = (monthly, yearly) => {
    if (monthly === 0) return 0;
    const monthlyCost = monthly * 12;
    return Math.max(0, monthlyCost - yearly);
  };

  const totalSubscribers = getPlans ? getPlans.reduce((sum, plan) => sum + plan.subscribers, 0) : 0;
  const totalRevenue = getPlans ? getPlans.reduce((sum, plan) => sum + (plan.monthly * plan.subscribers), 0) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Pricing Management</h1>
              <p className="text-sm text-slate-600">Manage your subscription plans and pricing</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> New Plan
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* Subscribers */}
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-slate-900">{totalSubscribers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Revenue */}
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Active plans */}
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 ">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Plans</p>
                  <p className="text-2xl font-bold text-slate-900">{getPlans && getPlans.filter(p => p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plans Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Subscription Plans</h2>
            <Badge variant="secondary" className="px-3 py-1">
              {getPlans && getPlans.length} Plan{getPlans && getPlans.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {getPlans && getPlans.map((plan) => (
              <Card
                key={plan._id}
                className={`relative transition-all duration-200 border border-gray-300 hover:shadow-lg ${!plan.active ? 'opacity-60' : ''
                  } ${plan.popular ? 'ring-2 ring-amber-400 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-4">
                    <Badge className="bg-amber-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getPlanIcon(plan)}
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <Badge variant="outline" className={`ml-2 capitalize ${plan.level === 'premium' ? 'border-amber-500 text-amber-500' :
                          plan.level === 'advance' ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'
                        }`}>
                        {plan.level || 'free'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={plan.active}
                        onCheckedChange={() => togglePlanStatus(plan)}
                      />
                      <span className={`text-xs font-medium ${plan.active ? 'text-green-600' : 'text-slate-400'}`}>
                        {plan.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        ${plan.monthly}
                      </span>
                      <span className="text-slate-600">/month</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      ${plan.yearly}/year
                      {getYearlySavings(plan.monthly, plan.yearly) > 0 && (
                        <Badge variant="outline" className="ml-2 text-green-600 border-green-200">
                          Save ${getYearlySavings(plan.monthly, plan.yearly)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Subscribers */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{plan.subscribers} subscribers</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Features ({plan.features.length})</p>
                    <div className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-slate-600 line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <p className="text-xs text-slate-500 pl-5">
                          +{plan.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(plan)}
                      className="flex-1 border border-gray-300"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(plan._id)}
                      className="px-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                {editPlan ? (
                  <>
                    <Pencil className="h-5 w-5" />
                    Edit Plan: {editPlan.name}
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Create New Plan
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {/* FORM */}
            <div className="space-y-6 py-4 bg-white">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Plan Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Premium Plan"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Access Level *</Label>
                      <select
                        id="level"
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                      >
                        <option value="free">Free</option>
                        <option value="advance">Advance</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly">Monthly Price ($) *</Label>
                    <Input
                      id="monthly"
                      type="number"
                      min="0"
                      value={form.monthly}
                      onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearly">Yearly Price ($) *</Label>
                    <Input
                      id="yearly"
                      type="number"
                      min="0"
                      value={form.yearly}
                      onChange={(e) => setForm({ ...form, yearly: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Plan Settings</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label>Mark as Popular Plan</Label>
                  <Switch
                    checked={form.popular}
                    onCheckedChange={(checked) => setForm({ ...form, popular: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label>Plan Status</Label>
                  <Switch
                    checked={form.active}
                    onCheckedChange={(checked) => setForm({ ...form, active: checked })}
                  />
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Plan Features</h3>
                  <Button size="sm" onClick={addFeature} variant="outline">
                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                  </Button>
                </div>

                {form.features.map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Input
                      placeholder={`Feature ${index + 1}...`}
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {form.features.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              {/* Courses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Included Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
                  {courses && courses.map(course => (
                    <div key={course._id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded">
                      <Checkbox
                        id={course._id}
                        checked={form.courses.includes(course._id)}
                        onCheckedChange={() => toggleCourse(course._id)}
                      />
                      <Label htmlFor={course._id} className="cursor-pointer flex-1">{course.title}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.monthly || !form.yearly || form.features.every(f => !f.trim())}
                className="bg-indigo-600 text-white border border-gray-300"
              >
                <Save className="h-4 w-4 mr-2" />
                {editPlan ? "Update Plan" : "Create Plan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPricingPanel;
