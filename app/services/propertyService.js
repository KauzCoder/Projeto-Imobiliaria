import axios from "axios";
import { fallbackProperties } from "../data/properties";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

function buildQueryString(filters) {
  const query = new URLSearchParams();

  if (filters.city) query.set("city", filters.city);
  if (filters.region) query.set("region", filters.region);
  if (filters.neighborhood) query.set("neighborhood", filters.neighborhood);
  if (filters.minPrice && Number(filters.minPrice) > 0) query.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice && Number(filters.maxPrice) > 0) query.set("maxPrice", String(filters.maxPrice));
  if (filters.bedrooms && Number(filters.bedrooms) > 0) query.set("bedrooms", String(filters.bedrooms));
  if (filters.bathrooms && Number(filters.bathrooms) > 0) query.set("bathrooms", String(filters.bathrooms));
  if (filters.garage && Number(filters.garage) > 0) query.set("garage", String(filters.garage));
  if (filters.minArea && Number(filters.minArea) > 0) query.set("minArea", String(filters.minArea));
  if (filters.maxArea && Number(filters.maxArea) > 0 && Number(filters.maxArea) < 1000) {
    query.set("maxArea", String(filters.maxArea));
  }

  return query.toString();
}

export async function getProperties(filters = {}) {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString ? `${apiUrl}/properties?${queryString}` : `${apiUrl}/properties`;
    console.log("Fetching from:", url);
    const { data } = await axios.get(url);

    console.log("API response:", data);
    if (!Array.isArray(data) || data.length === 0) {
      console.log("API retornou vazio, usando fallback");
      return fallbackProperties;
    }

    const mapped = data.map((property) => ({
      ...property,
      id: property._id ?? property.id ?? crypto.randomUUID(),
    }));
    console.log("Properties mapeadas:", mapped);
    return mapped;
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error.message);
    console.log("Usando fallback properties");
    return fallbackProperties;
  }
}
