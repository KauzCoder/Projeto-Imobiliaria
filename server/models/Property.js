import { prisma } from "../config/database.js";

const allowedTypes = new Set(["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"]);
const allowedStatuses = new Set(["Venda", "Aluguel"]);
const allowedCreatedByModels = new Set(["Admin", "SuperUser"]);

export const Property = {
  async find(filters = {}) {
    const where = buildWhere(filters);
    const rows = await prisma.property.findMany({
      where,
      include: { broker: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return rows.map(mapPropertyRow);
  },

  async findById(id) {
    const row = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: { broker: true },
    });
    return row ? mapPropertyRow(row) : null;
  },

  async create(data) {
    const payload = normalizePropertyPayload(data, { partial: false });
    const row = await prisma.property.create({
      data: payload,
      include: { broker: true },
    });
    return mapPropertyRow(row);
  },

  async findByIdAndUpdate(id, data) {
    const payload = normalizePropertyPayload(data, { partial: true });

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    try {
      const row = await prisma.property.update({
        where: { id: Number(id) },
        data: payload,
        include: { broker: true },
      });
      return mapPropertyRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async findByIdAndDelete(id) {
    try {
      const row = await prisma.property.delete({
        where: { id: Number(id) },
        include: { broker: true },
      });
      return mapPropertyRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async deleteMany() {
    await prisma.property.deleteMany();
  },

  async insertMany(properties) {
    const data = properties.map((item) => normalizePropertyPayload(item, { partial: false }));
    await prisma.property.createMany({ data });
    return this.find();
  },
};

function buildWhere(filters) {
  const where = {};

  if (filters.status) where.status = filters.status;
  if (filters.type) where.type = filters.type;
  if (filters.featured !== undefined) where.featured = Boolean(filters.featured);
  if (filters.broker !== undefined) where.brokerId = Number(filters.broker);
  if (filters.owner !== undefined) where.ownerId = Number(filters.owner);
  if (filters["address.city"] !== undefined) where.addressCity = filters["address.city"];
  if (filters["address.district"] !== undefined) where.addressDistrict = filters["address.district"];
  if (filters["address.state"] !== undefined) where.addressState = filters["address.state"];

  for (const field of ["price", "bedrooms", "bathrooms", "area"]) {
    if (filters[field]?.$gte !== undefined || filters[field]?.$lte !== undefined) {
      where[field] = {};

      if (filters[field].$gte !== undefined) {
        where[field].gte = Number(filters[field].$gte);
      }

      if (filters[field].$lte !== undefined) {
        where[field].lte = Number(filters[field].$lte);
      }
    }
  }

  if (filters.parkingSpaces?.$gte !== undefined) {
    where.parkingSpaces = { gte: Number(filters.parkingSpaces.$gte) };
  }

  return where;
}

function normalizePropertyPayload(data, { partial }) {
  const flattened = flattenProperty(data);
  const payload = {};

  const fields = {
    title: "title",
    description: "description",
    type: "type",
    status: "status",
    price: "price",
    bedrooms: "bedrooms",
    bathrooms: "bathrooms",
    area: "area",
    parkingSpaces: "parkingSpaces",
    imageUrl: "imageUrl",
    broker: "brokerId",
    owner: "ownerId",
    featured: "featured",
    "address.street": "addressStreet",
    "address.district": "addressDistrict",
    "address.city": "addressCity",
    "address.state": "addressState",
    "address.country": "addressCountry",
    country: "addressCountry",
    "location.lat": "locationLat",
    "location.lng": "locationLng",
    "createdBy.id": "createdById",
    "createdBy.model": "createdByModel",
  };

  for (const [key, field] of Object.entries(fields)) {
    if (flattened[key] !== undefined) {
      payload[field] = normalizeValue(key, flattened[key]);
    }
  }

  if (!partial) {
    payload.addressCountry ??= "Brasil";
    ensureRequired(payload);
    payload.status ??= "Venda";
    payload.parkingSpaces ??= 0;
    payload.featured ??= false;
    payload.brokerId ??= null;
    payload.ownerId ??= null;
    payload.createdById ??= null;
    payload.createdByModel ??= null;
  }

  return payload;
}

function flattenProperty(data) {
  return {
    ...data,
    "address.street": data.address?.street,
    "address.district": data.address?.district,
    "address.city": data.address?.city,
    "address.state": data.address?.state,
    "address.country": data.address?.country,
    "location.lat": data.location?.lat,
    "location.lng": data.location?.lng,
    "createdBy.id": data.createdBy?.id,
    "createdBy.model": data.createdBy?.model,
  };
}

function normalizeValue(key, value) {
  if (typeof value === "string") {
    value = value.trim();
  }

  if (key === "type" && !allowedTypes.has(value)) {
    throw validationError("Tipo de imovel invalido.");
  }

  if (key === "status" && !allowedStatuses.has(value)) {
    throw validationError("Status de imovel invalido.");
  }

  if (key === "createdBy.model" && value && !allowedCreatedByModels.has(value)) {
    throw validationError("Modelo do criador invalido.");
  }

  if (["price", "bedrooms", "bathrooms", "area", "parkingSpaces", "broker", "owner", "createdBy.id"].includes(key)) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 0) {
      throw validationError("Campos numericos devem ser maiores ou iguais a zero.");
    }

    return numberValue;
  }

  if (["location.lat", "location.lng"].includes(key)) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      throw validationError("Localizacao invalida.");
    }

    return numberValue;
  }

  if (key === "featured") {
    return Boolean(value);
  }

  return value || null;
}

function ensureRequired(payload) {
  const required = [
    "title",
    "description",
    "type",
    "price",
    "addressStreet",
    "addressDistrict",
    "addressCity",
    "addressState",
    "addressCountry",
    "locationLat",
    "locationLng",
    "bedrooms",
    "bathrooms",
    "area",
    "imageUrl",
  ];

  for (const field of required) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      throw validationError(`Campo obrigatorio ausente: ${field}.`);
    }
  }
}

function mapPropertyRow(row) {
  return {
    id: row.id,
    _id: String(row.id),
    title: row.title,
    description: row.description,
    type: row.type,
    status: row.status,
    price: Number(row.price),
    address: {
      street: row.addressStreet,
      district: row.addressDistrict,
      city: row.addressCity,
      state: row.addressState,
      country: row.addressCountry,
    },
    country: row.addressCountry,
    location: {
      lat: row.locationLat,
      lng: row.locationLng,
    },
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    area: Number(row.area),
    parkingSpaces: row.parkingSpaces,
    imageUrl: row.imageUrl,
    broker: mapBrokerSummary(row.broker),
    brokerId: row.brokerId,
    owner: row.ownerId,
    createdBy:
      row.createdById || row.createdByModel
        ? { id: row.createdById, model: row.createdByModel }
        : undefined,
    featured: Boolean(row.featured),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapBrokerSummary(broker) {
  if (!broker) return null;

  return {
    id: broker.id,
    name: broker.name,
    email: broker.email,
    phone: broker.phone,
    creci: broker.creci,
    bio: broker.bio,
    photo: brokerPhotoFor(broker.id),
  };
}

function brokerPhotoFor(id) {
  const photos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  ];

  return photos[Math.abs(Number(id) || 0) % photos.length];
}

function validationError(message) {
  const error = new Error(message);
  error.name = "ValidationError";
  return error;
}
