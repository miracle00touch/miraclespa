import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "phone",
        "whatsapp",
        "viber",
        "wechat",
        "telegram",
        "email",
        "address",
      ],
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
