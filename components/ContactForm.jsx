import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const ContactForm = ({ contact, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    contact || {
      type: "phone",
      label: "",
      value: "",
      isActive: true,
      order: 0,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactTypes = [
    { value: "phone", label: "Phone" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "viber", label: "Viber" },
    { value: "wechat", label: "WeChat" },
    { value: "telegram", label: "Telegram" },
    { value: "email", label: "Email" },
    { value: "address", label: "Address" },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent double submission

    console.log("🟢 ContactForm: Starting save...");
    console.log("🟢 Button click handler called");

    setIsSubmitting(true);

    // Don't use await here - let the promise resolve independently
    onSave(formData)
      .then((result) => {
        console.log("🟢 ContactForm: Save completed successfully", result);
        // Don't automatically close form - let user see success and close manually
        console.log("🟢 ContactForm: Save successful - form stays open");
      })
      .catch((error) => {
        console.error("🔴 ContactForm: Error saving contact:", error);
        // Don't close form on error - let user retry
      })
      .finally(() => {
        console.log("🟢 ContactForm: Finalizing...");
        setIsSubmitting(false);
      });
  };

  const getPlaceholderText = (type) => {
    switch (type) {
      case "phone":
        return "e.g., +63 917 123 4567";
      case "whatsapp":
        return "e.g., +63 917 123 4567";
      case "viber":
        return "e.g., +63 917 123 4567";
      case "wechat":
        return "e.g., miracle_touch_spa";
      case "telegram":
        return "e.g., @miracle_touch_spa";
      case "email":
        return "e.g., info@miracletouchspa.com";
      case "address":
        return "e.g., 123 Ayala Ave, Makati City";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {contact ? "Edit Contact" : "Add New Contact"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form className="space-y-4">
          {/* Contact Type - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Type
            </label>
            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
              {contactTypes.find((t) => t.value === formData.type)?.label ||
                formData.type}
            </div>
          </div>

          {/* Label - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
              {formData.label}
            </div>
          </div>

          {/* Value - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Value *
            </label>
            <input
              type={formData.type === "email" ? "email" : "text"}
              value={formData.value}
              onChange={(e) => handleInputChange("value", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
              placeholder={getPlaceholderText(formData.type)}
            />
          </div>

          {/* Active Status - Editable */}
          <div>
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
                Active (visible to users)
              </span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 flex items-center transition-colors ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Contact
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
