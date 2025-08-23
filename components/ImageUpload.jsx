import React, { useState } from "react";
import Image from "next/image";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 5,
  title = "Images",
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const handleFileUpload = async (file, index = null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    if (index !== null) {
      setUploadingIndex(index);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        let newImages = [...images];

        if (index !== null) {
          // Replace existing image
          newImages[index] = {
            url: result.url,
            public_id: result.public_id,
          };
        } else {
          // Add new image
          newImages.push({
            url: result.url,
            public_id: result.public_id,
          });
        }

        onImagesChange(newImages);
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadingIndex(null);
    }
  };

  const handleFileChange = (e, index = null) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file, index);
    }
  };

  const removeImage = async (index) => {
    const imageToRemove = images[index];

    // Delete from Cloudinary if it has a public_id
    if (imageToRemove?.public_id) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: imageToRemove.public_id }),
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const addImageSlot = () => {
    if (images.length < maxImages) {
      const newImages = [...images, null];
      onImagesChange(newImages);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {title} ({images.length}/{maxImages})
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              {image?.url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {uploadingIndex === index ? (
                    <FaSpinner className="animate-spin text-2xl text-gray-400 mb-2" />
                  ) : (
                    <FaUpload className="text-2xl text-gray-400 mb-2" />
                  )}
                  <span className="text-sm text-gray-500 mb-2">
                    {uploadingIndex === index ? "Uploading..." : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                </div>
              )}
            </div>
            {image?.url && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                  className="hidden"
                  id={`replace-${index}`}
                  disabled={uploading}
                />
                <label
                  htmlFor={`replace-${index}`}
                  className="text-xs text-brown-600 hover:text-brown-800 cursor-pointer"
                >
                  Replace
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length < maxImages && (
        <button
          type="button"
          onClick={addImageSlot}
          className="flex items-center text-brown-600 hover:text-brown-800 disabled:opacity-50"
          disabled={uploading}
        >
          <FaUpload className="mr-2" />
          Add Image Slot
        </button>
      )}

      <div className="mt-2 text-sm text-gray-500">
        <p>• Maximum {maxImages} images</p>
        <p>• Supported formats: JPG, PNG, GIF, WebP</p>
        <p>• Maximum size: 5MB per image</p>
        <p>• Images will be automatically optimized</p>
      </div>
    </div>
  );
};

export default ImageUpload;
