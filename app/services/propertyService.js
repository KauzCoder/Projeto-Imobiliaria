import axios from "axios";
import { fallbackProperties } from "../data/properties";
import { normalizeProperty } from "../utils/propertyUtils";
import { getApiUrl } from "./apiConfig";

const apiUrl = getApiUrl();

export async function getProperties() {
  try {
    const { data } = await axios.get(`${apiUrl}/properties`);

    return data.map((property) => ({
      ...property,
      id: property._id ?? property.id ?? crypto.randomUUID(),
    }));
  } catch (error) {
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
