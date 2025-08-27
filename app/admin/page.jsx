"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ServiceForm from "../../components/ServiceForm";
import TherapistForm from "../../components/TherapistForm";
import ContactForm from "../../components/ContactForm";
import TherapistImageLoader from "../../components/TherapistImageLoader";
import TherapistCardSkeleton from "../../components/TherapistCardSkeleton";
import AdminLoadingSkeleton from "../../components/AdminLoadingSkeleton";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUser,
  FaPhone,
  FaCog,
  FaImages,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaSignOutAlt,
  FaLock,
  FaShieldAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

// Enhanced Login Form Component
const LoadingButton = ({
  children,
  loading,
  disabled,
  onClick,
  className,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`${className} ${
      loading ? "opacity-75 cursor-wait" : ""
    } transition-opacity`}
    {...props}
  >
    {loading && (
      <div className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
    )}
    {children}
  </button>
);

// Enhanced Login Form Component
const EnhancedLoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await onLogin();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-200 to-brown-300">
      <div className="absolute inset-0 bg-brown-800/20"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-brown-200/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-700 rounded-full mb-4">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-brown-800 mb-2 font-playfair">
            Miracle Touch Spa — Admin
          </h1>
          <p className="text-brown-600">
            Relaxation Redefined — Admin access only
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-brown-500" />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-brown-50 border border-brown-200 rounded-lg text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-all duration-200"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-brown-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-brown-50 border border-brown-200 rounded-lg text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-all duration-200"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-brown-500 hover:text-brown-700 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brown-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 bg-brown-300 rounded mr-2 animate-pulse"></div>
                Authenticating...
              </div>
            ) : (
              "Access Admin Panel"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-brown-500">Authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const {
    isAuthenticated,
    loading: authLoading,
    login,
    logout,
    user,
  } = useAuth();
  const toast = useToast();

  // Fallback: if auth loading stalls for more than 3s, allow showing login
  const [authStale, setAuthStale] = useState(false);

  useEffect(() => {
    setAuthStale(false);
    const t = setTimeout(() => setAuthStale(true), 3000);
    return () => clearTimeout(t);
  }, [authLoading]);

  // All hooks must be at the top level, before any conditional returns
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editingTherapist, setEditingTherapist] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showTherapistForm, setShowTherapistForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({
    services: false,
    therapists: false,
    contacts: false,
    operations: new Set(), // Track individual operation IDs
  });

  // Helper functions to manage loading states
  const addOperation = (operationId) => {
    setLoadingStates((prev) => ({
      ...prev,
      operations: new Set([...prev.operations, operationId]),
    }));
  };

  const removeOperation = (operationId) => {
    setLoadingStates((prev) => {
      const newOperations = new Set(prev.operations);
      newOperations.delete(operationId);
      return {
        ...prev,
        operations: newOperations,
      };
    });
  };

  // Load functions - defined at component level to avoid hook order issues
  const loadServices = useCallback(
    async (clearCache = false) => {
      try {
        const url = clearCache
          ? "/api/services?clearCache=true"
          : "/api/services";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          setServices([]);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setServices(data.data || []);
          if (clearCache) {
            toast.success("Services data refreshed");
          }
        } else {
          setServices([]);
        }
      } catch (error) {
        setServices([]);
      }
    },
    [toast]
  );

  const loadTherapists = useCallback(
    async (clearCache = false) => {
      try {
        const url = clearCache
          ? "/api/therapists?clearCache=true"
          : "/api/therapists";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          setTherapists([]);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setTherapists(data.data || []);
          if (clearCache) {
            toast.success("Therapists data refreshed");
          }
        } else {
          setTherapists([]);
        }
      } catch (error) {
        setTherapists([]);
      }
    },
    [toast]
  );

  const loadContacts = useCallback(async () => {
    try {
      const response = await fetch("/api/contacts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setContacts([]);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.data || []);
      } else {
        setContacts([]);
      }
    } catch (error) {
      setContacts([]);
    }
  }, []);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([loadServices(), loadTherapists(), loadContacts()]);
    } finally {
      setLoading(false);
    }
  }, [loadContacts, loadServices, loadTherapists]);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadAllData();
    }
  }, [isAuthenticated, authLoading, loadAllData]);

  // Show loading screen while checking authentication, unless it has stalled
  if (authLoading && !authStale) {
    return <AdminLoadingSkeleton type="auth" />;
  }

  // Show login form if not authenticated (either auth completed or stalled)
  if (!isAuthenticated) {
    return <EnhancedLoginForm onLogin={login} />;
  }

  const saveService = async (serviceData) => {
    const operationId = `save-service-${Date.now()}`;
    try {
      addOperation(operationId);
      if (editingService) {
        // Optimistically update UI first
        const optimisticUpdate = services.map((s) =>
          s._id === serviceData._id ? { ...s, ...serviceData } : s
        );
        setServices(optimisticUpdate);

        const response = await fetch(`/api/services/${serviceData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(serviceData),
        });
        const data = await response.json();
        if (data.success) {
          // Update with actual server data
          setServices(
            services.map((s) => (s._id === serviceData._id ? data.data : s))
          );
          toast.success("Service updated successfully");
        } else {
          // Revert optimistic update on failure
          setServices(services);
          toast.error(data.message || "Failed to update service");
        }
      } else {
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(serviceData),
        });
        const data = await response.json();
        if (data.success) {
          // Add new service to existing list
          setServices([...services, data.data]);
          toast.success("Service created successfully");
        } else {
          toast.error(data.message || "Failed to create service");
        }
      }
      setEditingService(null);
      setShowServiceForm(false);
    } catch (error) {
      // Revert optimistic update on error
      if (editingService) {
        setServices(services);
      }
      toast.error("Failed to save service");
    } finally {
      removeOperation(operationId);
    }
  };

  const deleteService = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        // Optimistically remove from UI
        const originalServices = [...services];
        setServices(services.filter((s) => s._id !== id));

        const response = await fetch(`/api/services/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Service deleted successfully");
        } else {
          // Revert on failure
          setServices(originalServices);
          toast.error(data.message || "Failed to delete service");
        }
      } catch (error) {
        // Revert on error
        setServices(services);
        toast.error("Failed to delete service");
      }
    }
  };

  // Therapist CRUD functions
  const saveTherapist = async (therapistData) => {
    try {
      if (editingTherapist) {
        // Optimistically update UI
        const optimisticUpdate = therapists.map((t) =>
          t._id === therapistData._id ? { ...t, ...therapistData } : t
        );
        setTherapists(optimisticUpdate);

        const response = await fetch(`/api/therapists/${therapistData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(therapistData),
        });
        const data = await response.json();
        if (data.success) {
          setTherapists(
            therapists.map((t) => (t._id === therapistData._id ? data.data : t))
          );
          toast.success("Therapist updated successfully");
        } else {
          // Revert on failure
          setTherapists(therapists);
          toast.error(data.message || "Failed to update therapist");
        }
      } else {
        const response = await fetch("/api/therapists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(therapistData),
        });
        const data = await response.json();
        if (data.success) {
          setTherapists([...therapists, data.data]);
          toast.success("Therapist created successfully");
        } else {
          toast.error(data.message || "Failed to create therapist");
        }
      }
      setEditingTherapist(null);
      setShowTherapistForm(false);
    } catch (error) {
      if (editingTherapist) {
        setTherapists(therapists);
      }
      toast.error("Failed to save therapist");
    }
  };

  const deleteTherapist = async (id) => {
    if (confirm("Are you sure you want to delete this therapist?")) {
      try {
        // Optimistically remove from UI
        const originalTherapists = [...therapists];
        setTherapists(therapists.filter((t) => t._id !== id));

        const response = await fetch(`/api/therapists/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Therapist deleted successfully");
        } else {
          // Revert on failure
          setTherapists(originalTherapists);
          toast.error(data.message || "Failed to delete therapist");
        }
      } catch (error) {
        // Revert on error
        setTherapists(therapists);
        toast.error("Failed to delete therapist");
      }
    }
  };

  const toggleTherapistStatus = async (id) => {
    try {
      const therapist = therapists.find((t) => t._id === id);
      if (!therapist) return;

      // Optimistically update UI
      const optimisticUpdate = therapists.map((t) =>
        t._id === id ? { ...t, isActive: !t.isActive } : t
      );
      setTherapists(optimisticUpdate);

      const response = await fetch(`/api/therapists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...therapist, isActive: !therapist.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        setTherapists(therapists.map((t) => (t._id === id ? data.data : t)));
        toast.success(
          `Therapist ${data.data.isActive ? "activated" : "deactivated"}`
        );
      } else {
        // Revert on failure
        setTherapists(therapists);
        toast.error(data.message || "Failed to update therapist status");
      }
    } catch (error) {
      // Revert on error
      setTherapists(therapists);
      toast.error("Failed to update therapist status");
    }
  };

  const updateTherapistGender = async (id, newGender) => {
    try {
      const therapist = therapists.find((t) => t._id === id);
      if (!therapist) return;

      // Optimistically update UI
      const optimisticUpdate = therapists.map((t) =>
        t._id === id ? { ...t, gender: newGender } : t
      );
      setTherapists(optimisticUpdate);

      const response = await fetch(`/api/therapists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...therapist, gender: newGender }),
      });
      const data = await response.json();
      if (data.success) {
        setTherapists(therapists.map((t) => (t._id === id ? data.data : t)));
        toast.success(`Therapist gender updated to ${newGender}`);
      } else {
        // Revert on failure
        setTherapists(therapists);
        toast.error(data.message || "Failed to update therapist gender");
      }
    } catch (error) {
      // Revert on error
      setTherapists(therapists);
      toast.error("Failed to update therapist gender");
    }
  };

  // Contact CRUD functions
  const saveContact = async (contactData) => {
    try {
      if (editingContact) {
        // Optimistically update UI
        const optimisticUpdate = contacts.map((c) =>
          c._id === contactData._id ? { ...c, ...contactData } : c
        );
        setContacts(optimisticUpdate);

        const response = await fetch(`/api/contacts/${contactData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(contactData),
        });
        const data = await response.json();
        if (data.success) {
          setContacts(
            contacts.map((c) => (c._id === contactData._id ? data.data : c))
          );
          toast.success("Contact updated successfully");
        } else {
          // Revert on failure
          setContacts(contacts);
          toast.error(data.message || "Failed to update contact");
        }
      } else {
        const response = await fetch("/api/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(contactData),
        });
        const data = await response.json();
        if (data.success) {
          setContacts([...contacts, data.data]);
          toast.success("Contact created successfully");
        } else {
          toast.error(data.message || "Failed to create contact");
        }
      }
      setEditingContact(null);
      setShowContactForm(false);
    } catch (error) {
      if (editingContact) {
        setContacts(contacts);
      }
      toast.error("Failed to save contact");
    }
  };

  const deleteContact = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        // Optimistically remove from UI
        const originalContacts = [...contacts];
        setContacts(contacts.filter((c) => c._id !== id));

        const response = await fetch(`/api/contacts/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Contact deleted successfully");
        } else {
          // Revert on failure
          setContacts(originalContacts);
          toast.error(data.message || "Failed to delete contact");
        }
      } catch (error) {
        // Revert on error
        setContacts(contacts);
        toast.error("Failed to delete contact");
      }
    }
  };

  const toggleContactStatus = async (id) => {
    try {
      const contact = contacts.find((c) => c._id === id);
      if (!contact) return;

      // Optimistically update UI
      const optimisticUpdate = contacts.map((c) =>
        c._id === id ? { ...c, isActive: !c.isActive } : c
      );
      setContacts(optimisticUpdate);

      const response = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...contact, isActive: !contact.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.map((c) => (c._id === id ? data.data : c)));
        toast.success(
          `Contact ${data.data.isActive ? "activated" : "deactivated"}`
        );
      } else {
        // Revert on failure
        setContacts(contacts);
        toast.error(data.message || "Failed to update contact status");
      }
    } catch (error) {
      // Revert on error
      setContacts(contacts);
      toast.error("Failed to update contact status");
    }
  };

  // Contact ordering functions
  const moveContactUp = async (id) => {
    const contactIndex = contacts.findIndex((c) => c._id === id);
    if (contactIndex <= 0) return; // Already at top or not found

    const currentContact = contacts[contactIndex];
    const previousContact = contacts[contactIndex - 1];

    try {
      // Optimistically update UI by swapping orders
      const optimisticContacts = [...contacts];
      optimisticContacts[contactIndex] = {
        ...currentContact,
        order: previousContact.order,
      };
      optimisticContacts[contactIndex - 1] = {
        ...previousContact,
        order: currentContact.order,
      };
      optimisticContacts.sort((a, b) => a.order - b.order);
      setContacts(optimisticContacts);

      // Update both contacts on server
      await Promise.all([
        fetch(`/api/contacts/${currentContact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...currentContact,
            order: previousContact.order,
          }),
        }),
        fetch(`/api/contacts/${previousContact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...previousContact,
            order: currentContact.order,
          }),
        }),
      ]);

      toast.success("Contact moved up");
    } catch (error) {
      // Revert on error
      setContacts(contacts);
      toast.error("Failed to reorder contact");
    }
  };

  const moveContactDown = async (id) => {
    const contactIndex = contacts.findIndex((c) => c._id === id);
    if (contactIndex >= contacts.length - 1 || contactIndex === -1) return; // Already at bottom or not found

    const currentContact = contacts[contactIndex];
    const nextContact = contacts[contactIndex + 1];

    try {
      // Optimistically update UI by swapping orders
      const optimisticContacts = [...contacts];
      optimisticContacts[contactIndex] = {
        ...currentContact,
        order: nextContact.order,
      };
      optimisticContacts[contactIndex + 1] = {
        ...nextContact,
        order: currentContact.order,
      };
      optimisticContacts.sort((a, b) => a.order - b.order);
      setContacts(optimisticContacts);

      // Update both contacts on server
      await Promise.all([
        fetch(`/api/contacts/${currentContact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...currentContact, order: nextContact.order }),
        }),
        fetch(`/api/contacts/${nextContact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...nextContact, order: currentContact.order }),
        }),
      ]);

      toast.success("Contact moved down");
    } catch (error) {
      // Revert on error
      setContacts(contacts);
      toast.error("Failed to reorder contact");
    }
  };

  if (loading) {
    return <AdminLoadingSkeleton type="panel" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <span className="text-sm text-gray-500 font-medium">
                  Miracle Touch Spa Management System
                  {loadingStates.operations.size > 0 && (
                    <span className="ml-2 text-blue-600 animate-pulse">
                      • Processing ({loadingStates.operations.size} operation
                      {loadingStates.operations.size !== 1 ? "s" : ""})...
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                  <FaUser className="text-white text-sm" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.username || "Admin"}
                  </span>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("therapists")}
              className={`flex-1 flex items-center justify-center py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === "therapists"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaUser className="mr-2" />
              Therapists
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 flex items-center justify-center py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaCog className="mr-2" />
              Services
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex-1 flex items-center justify-center py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === "contacts"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaPhone className="mr-2" />
              Contacts
            </button>
          </nav>
        </div>

        {activeTab === "therapists" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Therapist Management
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => loadTherapists(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  title="Refresh therapist data"
                >
                  <FaCog className="mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setEditingTherapist(null);
                    setShowTherapistForm(true);
                  }}
                  className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add New Therapist
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setGenderFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    genderFilter === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setGenderFilter("male")}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    genderFilter === "male"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGenderFilter("female")}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    genderFilter === "female"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Female
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing: {genderFilter}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <TherapistCardSkeleton key={index} />
                ))
              ) : (
                <>
                  {therapists
                    .filter((t) =>
                      genderFilter === "all"
                        ? true
                        : (t.gender || "").toLowerCase() === genderFilter
                    )
                    .map((therapist) => (
                      <div
                        key={therapist._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 bg-gray-200">
                          <TherapistImageLoader
                            src={
                              therapist.images && therapist.images.length > 0
                                ? therapist.images[0]
                                : null
                            }
                            alt={therapist.name}
                            className="h-full w-full"
                            fill={true}
                            fallbackIcon={true}
                            showSkeleton={false}
                          />
                          <div className="absolute top-2 right-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                therapist.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {therapist.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="absolute top-2 left-2">
                            <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                              <FaStar className="mr-1" size={10} />
                              {therapist.rating || 5.0}
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {therapist.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {therapist.gender} •{" "}
                            {therapist.age
                              ? `${therapist.age} years old`
                              : "Age not specified"}{" "}
                            • {therapist.experience}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            📍 {therapist.location}
                          </p>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {therapist.description}
                          </p>

                          {therapist.specialties &&
                            therapist.specialties.length > 0 && (
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                  {therapist.specialties
                                    .slice(0, 3)
                                    .map((specialty, index) => (
                                      <span
                                        key={index}
                                        className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded-full"
                                      >
                                        {specialty}
                                      </span>
                                    ))}
                                  {therapist.specialties.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{therapist.specialties.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-brown-600">
                              {therapist.price || "Price not set"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {therapist.images ? therapist.images.length : 0}{" "}
                              photos
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingTherapist(therapist);
                                setShowTherapistForm(true);
                              }}
                              className="flex-1 bg-brown-600 text-white px-3 py-2 rounded-md hover:bg-brown-700 flex items-center justify-center text-sm"
                            >
                              <FaEdit className="mr-1" size={12} />
                              Edit
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                title="Mark as Male"
                                onClick={() =>
                                  updateTherapistGender(therapist._id, "male")
                                }
                                className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-100 rounded-md text-sm hover:bg-blue-100"
                              >
                                Male
                              </button>
                              <button
                                title="Mark as Female"
                                onClick={() =>
                                  updateTherapistGender(therapist._id, "female")
                                }
                                className="px-3 py-1 bg-pink-50 text-pink-800 border border-pink-100 rounded-md text-sm hover:bg-pink-100"
                              >
                                Female
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                toggleTherapistStatus(therapist._id)
                              }
                              className={`flex-1 px-3 py-2 rounded-md text-sm flex items-center justify-center ${
                                therapist.isActive
                                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {therapist.isActive ? (
                                <>
                                  <FaEyeSlash className="mr-1" size={12} />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <FaEye className="mr-1" size={12} />
                                  Show
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteTherapist(therapist._id)}
                              className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Empty State */}
                  {therapists.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <FaUser
                        className="mx-auto text-gray-400 mb-4"
                        size={48}
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No therapists yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Add your first therapist with image upload capability.
                      </p>
                      <button
                        onClick={() => {
                          setEditingTherapist(null);
                          setShowTherapistForm(true);
                        }}
                        className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                      >
                        Add First Therapist
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Services Management
              </h2>
              <button
                onClick={() => {
                  setEditingService(null);
                  setShowServiceForm(true);
                }}
                className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
                    {service.images && service.images.length > 0 ? (
                      <Image
                        src={service.images[0]}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <FaImages size={48} />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded-full">
                        {service.category}
                      </span>
                      {service.price && (
                        <span className="text-sm font-semibold text-brown-600">
                          {service.price}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setShowServiceForm(true);
                        }}
                        className="flex-1 bg-brown-600 text-white px-3 py-2 rounded-md hover:bg-brown-700 flex items-center justify-center text-sm"
                      >
                        <FaEdit className="mr-1" size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteService(service._id)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {services.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FaImages className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No services yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add your first service with image upload capability.
                  </p>
                  <button
                    onClick={() => {
                      setEditingService(null);
                      setShowServiceForm(true);
                    }}
                    className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                  >
                    Add First Service
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Management
              </h2>
              <button
                onClick={() => {
                  setEditingContact(null);
                  setShowContactForm(true);
                }}
                className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New Contact
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Contact Information ({contacts.length} items)
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Drag contacts up/down to reorder them. Lower numbers appear
                  first.
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {contacts
                  .sort((a, b) => a.order - b.order)
                  .map((contact, index) => (
                    <div
                      key={contact._id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center space-y-1">
                          <button
                            onClick={() => moveContactUp(contact._id)}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                            } transition-colors`}
                            title="Move up"
                          >
                            <FaArrowUp size={12} />
                          </button>
                          <span className="text-xs text-gray-400 font-mono">
                            {contact.order}
                          </span>
                          <button
                            onClick={() => moveContactDown(contact._id)}
                            disabled={index === contacts.length - 1}
                            className={`p-1 rounded ${
                              index === contacts.length - 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                            } transition-colors`}
                            title="Move down"
                          >
                            <FaArrowDown size={12} />
                          </button>
                        </div>

                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            contact.type === "phone"
                              ? "bg-blue-100 text-blue-600"
                              : contact.type === "whatsapp"
                              ? "bg-green-100 text-green-600"
                              : contact.type === "viber"
                              ? "bg-purple-100 text-purple-600"
                              : contact.type === "wechat"
                              ? "bg-green-100 text-green-600"
                              : contact.type === "telegram"
                              ? "bg-blue-100 text-blue-600"
                              : contact.type === "email"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <FaPhone size={16} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {contact.label}
                            </p>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                contact.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {contact.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-gray-600 truncate">
                              {contact.value}
                            </p>
                            <span className="text-xs text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">
                              {contact.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingContact(contact);
                            setShowContactForm(true);
                          }}
                          className="text-brown-600 hover:text-brown-700 p-2 hover:bg-brown-50 rounded transition-colors"
                          title="Edit Contact"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => toggleContactStatus(contact._id)}
                          className={`p-2 rounded transition-colors ${
                            contact.isActive
                              ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                          }`}
                          title={
                            contact.isActive ? "Hide Contact" : "Show Contact"
                          }
                        >
                          {contact.isActive ? (
                            <FaEyeSlash size={14} />
                          ) : (
                            <FaEye size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => deleteContact(contact._id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete Contact"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                {/* Empty State */}
                {contacts.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <FaPhone className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No contacts yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Add your first contact information to help customers reach
                      you.
                    </p>
                    <button
                      onClick={() => {
                        setEditingContact(null);
                        setShowContactForm(true);
                      }}
                      className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                    >
                      Add First Contact
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showServiceForm && (
        <ServiceForm
          service={editingService}
          onSave={saveService}
          onCancel={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
        />
      )}

      {showTherapistForm && (
        <TherapistForm
          therapist={editingTherapist}
          onSave={saveTherapist}
          onCancel={() => {
            setShowTherapistForm(false);
            setEditingTherapist(null);
          }}
        />
      )}

      {showContactForm && (
        <ContactForm
          contact={editingContact}
          onSave={saveContact}
          onCancel={() => {
            setShowContactForm(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;
