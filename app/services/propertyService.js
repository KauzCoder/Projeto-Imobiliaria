const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function getProperties(filters = {}) {
  const queryParams = new URLSearchParams(filters);
  const url = `${API_BASE_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao buscar propriedades: ${response.statusText}`);
  }

  return response.json();
}

export async function getPropertyById(id) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Propriedade não encontrada');
    }
    throw new Error(`Erro ao buscar propriedade: ${response.statusText}`);
  }

  return response.json();
}