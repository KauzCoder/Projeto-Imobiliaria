import mongoose from "mongoose";
import { createAccountFields } from "./accountFields.js";

const adminSchema = new mongoose.Schema(
  {
    ...createAccountFields("admin"),
    department: {
      type: String,
      trim: true,
    },
    permissions: {
      type: [String],
      enum: ["properties", "brokers", "users", "reports", "content"],
      default: ["properties", "brokers", "users"],
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
