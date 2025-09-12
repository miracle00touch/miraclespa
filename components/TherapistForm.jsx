import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { FaSave, FaTimes, FaPlus, FaMinus } from "react-icons/fa";

const TherapistForm = ({ therapist, onSave, onCancel }) => {
  // Convert old string-based images to new object format if needed
  const convertImages = (images) => {
    if (!images) return [];
    return images
      .map((img) => {
        if (typeof img === "string") {
          return img ? { url: img, public_id: null } : null;
        }
        return img;
      })
      .filter(Boolean);
  };

  const [formData, setFormData] = useState(
    therapist
      ? {
          ...therapist,
          images: convertImages(therapist.images),
        }
      : {
          name: "",
          age: "",
          gender: "female",
          location: "",
          experience: "",
          rating: 5.0,
          reviews: 0,
          images: [],
          description: "",
          specialties: [],
          languages: [],
          availability: "",
          bio: "",
          price: "",
          bodyType: "",
          height: "",
          personality: [],
          isActive: true,
          showAge: true,
          showHeight: true,
          showBodyType: true,
          showPersonality: true,
        }
  );

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newPersonality, setNewPersonality] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImagesChange = (newImages) => {
    setFormData({ ...formData, images: newImages });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (index) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  const addPersonality = () => {
    if (newPersonality.trim()) {
      setFormData({
        ...formData,
        personality: [...formData.personality, newPersonality.trim()],
      });
      setNewPersonality("");
    }
  };

  const removePersonality = (index) => {
    setFormData({
      ...formData,
      personality: formData.personality.filter((_, i) => i !== index),
    });
  };

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "name",
      "age",
      "gender",
      "location",
      "experience",
      "price",
      "description",
      "availability",
      "bio",
      "bodyType",
      "height",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== null && value !== undefined && value !== "";
    });
  };

  // Function to get missing required fields
  const getMissingFields = () => {
    const requiredFields = [
      { key: "name", label: "Name" },
      { key: "age", label: "Age" },
      { key: "gender", label: "Gender" },
      { key: "location", label: "Location" },
      { key: "experience", label: "Experience" },
      { key: "price", label: "Price" },
      { key: "description", label: "Description" },
      { key: "availability", label: "Availability" },
      { key: "bio", label: "Bio" },
      { key: "bodyType", label: "Body Type" },
      { key: "height", label: "Height" },
    ];

    return requiredFields.filter((field) => {
      const value = formData[field.key];
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return value === null || value === undefined || value === "";
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if form is valid before submitting
    if (!isFormValid()) {
      setShowValidationModal(true);
      return;
    }

    // Convert images back to URLs for API compatibility
    const processedImages = formData.images
      .filter((img) => img && img.url)
      .map((img) => img.url);

    onSave({
      ...formData,
      images: processedImages,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {therapist ? "Edit Therapist" : "Add New Therapist"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
                min="18"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
                placeholder="e.g., Makati, BGC, Ortigas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience *
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
                placeholder="e.g., 3 years, 5+ years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
                placeholder="e.g., ₱2,500/hour"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              rows="3"
              required
              placeholder="Brief description of the therapist"
            />
          </div>

          {/* Images Section */}
          <ImageUpload
            images={formData.images}
            onImagesChange={handleImagesChange}
            maxImages={8}
            title="Therapist Images"
          />

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="Add specialty (e.g., Deep Tissue, Swedish)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialty())
                }
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-3 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="text-brown-500 hover:text-brown-700"
                  >
                    <FaMinus size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="Add language (e.g., English, Filipino)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addLanguage())
                }
              />
              <button
                type="button"
                onClick={addLanguage}
                className="px-3 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaMinus size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability *
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) =>
                  handleInputChange("availability", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="e.g., 24/7, Weekends only"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Type *
              </label>
              <input
                type="text"
                value={formData.bodyType}
                onChange={(e) => handleInputChange("bodyType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="e.g., Slim, Curvy, Athletic"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height *
              </label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="e.g., 5'4&quot;, 160cm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) =>
                  handleInputChange("rating", parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                min="1"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              rows="4"
              placeholder="Detailed bio and background information"
              required
            />
          </div>

          {/* Status Toggles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="mr-2"
              />
              Active
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.showAge}
                onChange={(e) => handleInputChange("showAge", e.target.checked)}
                className="mr-2"
              />
              Show Age
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.showHeight}
                onChange={(e) =>
                  handleInputChange("showHeight", e.target.checked)
                }
                className="mr-2"
              />
              Show Height
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 flex items-center transition-all duration-200"
            >
              <FaSave className="mr-2" />
              Save Therapist
            </button>
          </div>
        </form>

        {/* Validation Modal */}
        {showValidationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Missing Required Fields
                </h3>
                <button
                  onClick={() => setShowValidationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-3">
                  Please fill in the following required fields before saving:
                </p>
                <ul className="space-y-2">
                  {getMissingFields().map((field) => (
                    <li
                      key={field.key}
                      className="flex items-center text-red-600"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {field.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowValidationModal(false)}
                  className="px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors"
                >
                  OK, Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistForm;
