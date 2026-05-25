import { Property } from "../models/Property.js";

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function buildPropertyFilters(query = {}) {
  const {
    status,
    type,
    featured,
    city,
    region,
    neighborhood,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    garage,
    minArea,
    maxArea,
  } = query;

  const filters = {};

  if (status) filters.status = status;
  if (type) filters.type = type;
  if (featured) filters.featured = featured === "true";
  if (city) filters["address.city"] = city;
  if (region) filters["address.state"] = region;
  if (neighborhood) filters["address.district"] = neighborhood;
  if (bedrooms) filters.bedrooms = { $gte: Number(bedrooms) };
  if (bathrooms) filters.bathrooms = { $gte: Number(bathrooms) };
  if (garage) filters.parkingSpaces = { $gte: Number(garage) };

  if (minPrice) {
    filters.price = { ...filters.price, $gte: Number(minPrice) };
  }
  if (maxPrice) {
    filters.price = { ...filters.price, $lte: Number(maxPrice) };
  }
  if (minArea) {
    filters.area = { ...filters.area, $gte: Number(minArea) };
  }
  if (maxArea) {
    filters.area = { ...filters.area, $lte: Number(maxArea) };
  }

  return filters;
}

export async function listProperties(query) {
  const filters = buildPropertyFilters(query);
  return Property.find(filters);
}

export async function getPropertyById(id) {
  const property = await Property.findById(id);

  if (!property) {
    throw createServiceError(404, "Imovel nao encontrado.");
  }

  return property;
}

export async function createProperty(data) {
  return Property.create(data);
}

export async function updateProperty(id, data) {
  const property = await Property.findByIdAndUpdate(id, data);

  if (!property) {
    throw createServiceError(404, "Imovel nao encontrado.");
  }

  return property;
}

export async function deleteProperty(id) {
  const property = await Property.findByIdAndDelete(id);

  if (!property) {
    throw createServiceError(404, "Imovel nao encontrado.");
  }

  return property;
}
