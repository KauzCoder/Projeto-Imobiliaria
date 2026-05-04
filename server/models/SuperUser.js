import mongoose from "mongoose";
import { createAccountFields } from "./accountFields.js";

const superUserSchema = new mongoose.Schema(
  {
    ...createAccountFields("super_user"),
    permissions: {
      type: [String],
      enum: ["all", "admins", "properties", "brokers", "users", "reports", "settings"],
      default: ["all"],
    },
    canManageAdmins: {
      type: Boolean,
      default: true,
    },
    scope: {
      type: String,
      enum: ["global"],
      default: "global",
      immutable: true,
    },
  },
  { timestamps: true }
);

export const SuperUser = mongoose.models.SuperUser || mongoose.model("SuperUser", superUserSchema);
