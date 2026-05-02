import mongoose from "mongoose";
import { createAccountFields } from "./accountFields.js";

const brokerSchema = new mongoose.Schema(
  {
    ...createAccountFields("corretor"),
    creci: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 1200,
    },
    specialties: {
      type: [String],
      enum: ["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno", "Aluguel", "Venda"],
      default: [],
    },
    serviceAreas: {
      type: [String],
      default: [],
    },
    commissionRate: {
      type: Number,
      min: 0,
      max: 100,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      whatsapp: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

export const Broker = mongoose.models.Broker || mongoose.model("Broker", brokerSchema);
