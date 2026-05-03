import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Venda", "Aluguel"],
      default: "Venda",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      street: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    parkingSpaces: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    broker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "createdBy.model",
      },
      model: {
        type: String,
        enum: ["Admin", "SuperUser"],
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

propertySchema.index({ broker: 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ featured: -1, createdAt: -1 });

export const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
