import { dbAll, dbBatch, dbGet, dbRun } from "../config/database.js";

const allowedTypes = new Set(["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"]);
const allowedStatuses = new Set(["Venda", "Aluguel"]);
const allowedCreatedByModels = new Set(["Admin", "SuperUser"]);

const columnMap = {
  title: "title",
  description: "description",
  type: "type",
  status: "status",
  price: "price",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  area: "area",
  parkingSpaces: "parking_spaces",
  imageUrl: "image_url",
  broker: "broker_id",
  owner: "owner_id",
  featured: "featured",
  "address.street": "address_street",
  "address.district": "address_district",
  "address.city": "address_city",
  "address.state": "address_state",
  "location.lat": "location_lat",
  "location.lng": "location_lng",
  "createdBy.id": "created_by_id",
  "createdBy.model": "created_by_model",
};

export const Property = {
  async find(filters = {}) {
    const { clauses, params } = buildFilters(filters);
    const rows = await dbAll(
      `SELECT * FROM properties ${clauses} ORDER BY featured DESC, created_at DESC`,
      params
    );

    return rows.map(mapPropertyRow);
  },

  async findById(id) {
    const row = await dbGet("SELECT * FROM properties WHERE id = ?", [id]);
    return row ? mapPropertyRow(row) : null;
  },

  async create(data) {
    const payload = normalizePropertyPayload(data, { partial: false });
    const now = new Date().toISOString();

    const result = await dbRun(
      `
        INSERT INTO properties (
          title, description, type, status, price,
          address_street, address_district, address_city, address_state,
          location_lat, location_lng,
          bedrooms, bathrooms, area, parking_spaces, image_url,
          broker_id, owner_id, created_by_id, created_by_model, featured,
          created_at, updated_at
        )
        VALUES (
          @title, @description, @type, @status, @price,
          @address_street, @address_district, @address_city, @address_state,
          @location_lat, @location_lng,
          @bedrooms, @bathrooms, @area, @parking_spaces, @image_url,
          @broker_id, @owner_id, @created_by_id, @created_by_model, @featured,
          @created_at, @updated_at
        )
        RETURNING id
      `,
      { ...payload, created_at: now, updated_at: now }
    );

    return this.findById(result.lastInsertRowid);
  },

  async findByIdAndUpdate(id, data) {
    const payload = normalizePropertyPayload(data, { partial: true });
    const entries = Object.entries(payload);

    if (entries.length === 0) {
      return this.findById(id);
    }

    const assignments = entries.map(([key]) => `${key} = @${key}`).join(", ");
    const result = await dbRun(
      `UPDATE properties SET ${assignments}, updated_at = @updated_at WHERE id = @id`,
      { ...payload, id, updated_at: new Date().toISOString() }
    );

    return result.changes > 0 ? this.findById(id) : null;
  },

  async findByIdAndDelete(id) {
    const property = await this.findById(id);

    if (!property) {
      return null;
    }

    await dbRun("DELETE FROM properties WHERE id = ?", [id]);
    return property;
  },

  async deleteMany() {
    await dbRun("TRUNCATE TABLE properties RESTART IDENTITY");
  },

  async insertMany(properties) {
    const now = new Date().toISOString();
    const statements = properties.map((item) => {
      const payload = normalizePropertyPayload(item, { partial: false });

      return {
        sql: `
          INSERT INTO properties (
            title, description, type, status, price,
            address_street, address_district, address_city, address_state,
            location_lat, location_lng,
            bedrooms, bathrooms, area, parking_spaces, image_url,
            broker_id, owner_id, created_by_id, created_by_model, featured,
            created_at, updated_at
          )
          VALUES (
            @title, @description, @type, @status, @price,
            @address_street, @address_district, @address_city, @address_state,
            @location_lat, @location_lng,
            @bedrooms, @bathrooms, @area, @parking_spaces, @image_url,
            @broker_id, @owner_id, @created_by_id, @created_by_model, @featured,
            @created_at, @updated_at
          )
        `,
        args: { ...payload, created_at: now, updated_at: now },
      };
    });

    await dbBatch(statements);
    return this.find();
  },
};

const filterColumnMap = {
  broker: "broker_id",
  owner: "owner_id",
  parkingSpaces: "parking_spaces",
  "address.city": "address_city",
  "address.district": "address_district",
  "address.state": "address_state",
};

function buildFilters(filters) {
  const clauses = [];
  const params = {};

  if (filters.status) {
    clauses.push("status = @status");
    params.status = filters.status;
  }

  if (filters.type) {
    clauses.push("type = @type");
    params.type = filters.type;
  }

  if (filters.featured !== undefined) {
    clauses.push("featured = @featured");
    params.featured = Boolean(filters.featured);
  }

  for (const [key, column] of Object.entries(filterColumnMap)) {
    if (filters[key] !== undefined) {
      clauses.push(`${column} = @${column}`);
      params[column] = filters[key];
    }
  }

  for (const field of ["price", "bedrooms", "bathrooms", "area"]) {
    if (filters[field]?.$gte !== undefined) {
      clauses.push(`${field} >= @${field}_gte`);
      params[`${field}_gte`] = Number(filters[field].$gte);
    }

    if (filters[field]?.$lte !== undefined) {
      clauses.push(`${field} <= @${field}_lte`);
      params[`${field}_lte`] = Number(filters[field].$lte);
    }
  }

  if (filters.parkingSpaces?.$gte !== undefined) {
    clauses.push("parking_spaces >= @parking_spaces_gte");
    params.parking_spaces_gte = Number(filters.parkingSpaces.$gte);
  }

  return {
    clauses: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

function normalizePropertyPayload(data, { partial }) {
  const flattened = flattenProperty(data);
  const payload = {};

  for (const [key, column] of Object.entries(columnMap)) {
    if (flattened[key] !== undefined) {
      payload[column] = normalizeValue(key, flattened[key]);
    }
  }

  if (!partial) {
    ensureRequired(payload);
    payload.status ??= "Venda";
    payload.parking_spaces ??= 0;
    payload.featured ??= 0;
    payload.broker_id ??= null;
    payload.owner_id ??= null;
    payload.created_by_id ??= null;
    payload.created_by_model ??= null;
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

  if (["price", "bedrooms", "bathrooms", "area", "parkingSpaces"].includes(key)) {
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
    "address_street",
    "address_district",
    "address_city",
    "address_state",
    "location_lat",
    "location_lng",
    "bedrooms",
    "bathrooms",
    "area",
    "image_url",
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
      street: row.address_street,
      district: row.address_district,
      city: row.address_city,
      state: row.address_state,
    },
    location: {
      lat: row.location_lat,
      lng: row.location_lng,
    },
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    area: Number(row.area),
    parkingSpaces: row.parking_spaces,
    imageUrl: row.image_url,
    broker: row.broker_id,
    owner: row.owner_id,
    createdBy:
      row.created_by_id || row.created_by_model
        ? { id: row.created_by_id, model: row.created_by_model }
        : undefined,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validationError(message) {
  const error = new Error(message);
  error.name = "ValidationError";
  return error;
}
