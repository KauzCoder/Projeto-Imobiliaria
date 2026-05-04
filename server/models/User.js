import mongoose from "mongoose";
import { createAccountFields } from "./accountFields.js";

const userSchema = new mongoose.Schema(
  {
    ...createAccountFields("usuario"),
    address: {
      street: { type: String, trim: true },
      district: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    savedSearches: [
      {
        name: { type: String, required: true, trim: true },
        filters: {
          status: { type: String, enum: ["Venda", "Aluguel"] },
          type: { type: String, enum: ["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"] },
          city: { type: String, trim: true },
          minPrice: { type: Number, min: 0 },
          maxPrice: { type: Number, min: 0 },
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
