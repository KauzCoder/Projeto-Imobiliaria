import axios from "axios";
import { fallbackProperties } from "../data/properties";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export async function getProperties() {
  try {
    const { data } = await axios.get(`${apiUrl}/properties`);

    return data.map((property) => ({
      ...property,
      id: property._id ?? property.id ?? crypto.randomUUID(),
    }));
  } catch (error) {
    console.warn("API indisponivel. Usando dados locais.", error);
    return [];
  }
}
