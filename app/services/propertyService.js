import axios from "axios";
import { fallbackProperties } from "../data/properties";
import { normalizeProperty } from "../utils/propertyUtils";
import { getApiUrl } from "./apiConfig";

<<<<<<< HEAD
const apiUrl = getApiUrl();
=======
const apiUrl = normalizeApiUrl(import.meta.env.DEV ? import.meta.env.VITE_API_URL || "/api" : "/api");
>>>>>>> feature/mongodb-seed

export async function getProperties({ useFallback = true } = {}) {
  try {
    const { data } = await axios.get(`${apiUrl}/properties`);
    const properties = Array.isArray(data) ? data : data.properties ?? [];

    return properties.map((property) => ({
      ...property,
      id: property._id ?? property.id ?? crypto.randomUUID(),
    }));
  } catch (error) {
    if (!useFallback) {
      throw error;
    }

    console.warn("API indisponivel. Usando dados locais.", error);
    return fallbackProperties;
  }
}

export async function getPropertyById(propertyId) {
  try {
    const { data } = await axios.get(`${apiUrl}/properties/${propertyId}`);
    return normalizeProperty(data, 0);
  } catch (error) {
    const fallbackProperty = fallbackProperties.find((property) => String(property.id) === String(propertyId));

    if (fallbackProperty) {
      return normalizeProperty(fallbackProperty, 0);
    }

    const message = error.response?.data?.message ?? "Imovel nao encontrado.";
    throw new Error(message);
  }
}

function normalizeApiUrl(value) {
  const normalizedValue = value.replace(/\/$/, "");

  if (normalizedValue === "/api" || normalizedValue.endsWith("/api")) {
    return normalizedValue;
  }

  return `${normalizedValue}/api`;
}
