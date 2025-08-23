import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { FaSave, FaTimes } from "react-icons/fa";

const ServiceForm = ({ service, onSave, onCancel }) => {
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
    service
      ? {
          ...service,
          images: convertImages(service.images),
        }
      : {
          name: "",
          description: "",
          category: "professional",
          images: [],
          duration: "",
          price: "",
          isActive: true,
          order: 0,
        }
  );

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImagesChange = (newImages) => {
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {service ? "Edit Service" : "Add New Service"}
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
                Service Name *
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
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              >
                <option value="sensual">Sensual</option>
                <option value="professional">Professional</option>
                <option value="specialty">Specialty</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="e.g., 60 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="e.g., ₱2000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              rows="4"
              required
            />
          </div>

          {/* Images Section */}
          <ImageUpload
            images={formData.images}
            onImagesChange={handleImagesChange}
            maxImages={5}
            title="Service Images"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  handleInputChange("order", parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                min="0"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active (visible to clients)
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 flex items-center"
            >
              <FaSave className="mr-2" />
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
