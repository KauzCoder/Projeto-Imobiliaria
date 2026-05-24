import { dbAll, dbGet, dbRun } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";
import { Property } from "./Property.js";

export const User = {
  async find() {
    const rows = await dbAll("SELECT * FROM users ORDER BY created_at DESC");
    return rows.map((row) => mapUserRow(row));
  },

  async findById(id) {
    const row = await dbGet("SELECT * FROM users WHERE id = ?", [id]);
    return row ? mapUserRow(row) : null;
  },

  async findByEmail(email) {
    const row = await dbGet("SELECT * FROM users WHERE email = ?", [email?.trim().toLowerCase()]);
    return row ? mapUserRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    await dbRun("UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = ?", [id]);
    return this.findById(id);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "usuario");
    const now = new Date().toISOString();
    const address = data.address ?? {};

    const result = await dbRun(
      `
        INSERT INTO users (
          name, email, password_hash, phone, document, role, active, last_login_at,
          address_street, address_district, address_city, address_state, address_zip_code,
          favorites, saved_searches, created_at, updated_at
        )
        VALUES (
          @name, @email, @password_hash, @phone, @document, @role, @active, @last_login_at,
          @address_street, @address_district, @address_city, @address_state, @address_zip_code,
          @favorites, @saved_searches, @created_at, @updated_at
        )
        RETURNING id
      `,
      {
        ...account,
        address_street: address.street ?? null,
        address_district: address.district ?? null,
        address_city: address.city ?? null,
        address_state: address.state ?? null,
        address_zip_code: address.zipCode ?? null,
        favorites: JSON.stringify(data.favorites ?? []),
        saved_searches: JSON.stringify(data.savedSearches ?? []),
        created_at: now,
        updated_at: now,
      }
    );

    return this.findById(result.lastInsertRowid);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildUserUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    const assignments = Object.keys(payload).map((key) => `${key} = @${key}`).join(", ");
    const result = await dbRun(
      `UPDATE users SET ${assignments}, updated_at = NOW() WHERE id = @id`,
      { ...payload, id }
    );

    return result.changes > 0 ? this.findById(id) : null;
  },

  async findByIdAndDelete(id) {
    const account = await this.findById(id);

    if (!account) {
      return null;
    }

    await dbRun("DELETE FROM users WHERE id = ?", [id]);
    return account;
  },

  async getFavoriteProperties(id) {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    const properties = await Promise.all(user.favorites.map((propertyId) => Property.findById(propertyId)));
    return properties.filter(Boolean);
  },

  async addFavoriteProperty(id, propertyId) {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    const favorites = [...new Set([...user.favorites.map(String), String(propertyId)])];
    await dbRun("UPDATE users SET favorites = @favorites, updated_at = NOW() WHERE id = @id", {
      id,
      favorites: JSON.stringify(favorites),
    });

    return this.getFavoriteProperties(id);
  },

  async removeFavoriteProperty(id, propertyId) {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    const favorites = user.favorites.map(String).filter((favoriteId) => favoriteId !== String(propertyId));
    await dbRun("UPDATE users SET favorites = @favorites, updated_at = NOW() WHERE id = @id", {
      id,
      favorites: JSON.stringify(favorites),
    });

    return this.getFavoriteProperties(id);
  },
};

function buildUserUpdatePayload(data) {
  const account = normalizeAccountFields(data, "usuario");
  const address = data.address ?? {};

  return compact({
    name: account.name,
    email: account.email,
    password_hash: account.password_hash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    last_login_at: account.last_login_at,
    address_street: address.street,
    address_district: address.district,
    address_city: address.city,
    address_state: address.state,
    address_zip_code: address.zipCode,
    favorites: data.favorites ? JSON.stringify(data.favorites) : undefined,
    saved_searches: data.savedSearches ? JSON.stringify(data.savedSearches) : undefined,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapUserRow(row, { includePassword = false } = {}) {
  const user = {
    ...mapAccountRow(row),
    address: {
      street: row.address_street,
      district: row.address_district,
      city: row.address_city,
      state: row.address_state,
      zipCode: row.address_zip_code,
    },
    favorites: parseJsonValue(row.favorites, []),
    savedSearches: parseJsonValue(row.saved_searches, []),
  };

  if (includePassword) {
    user.passwordHash = row.password_hash;
  }

  return user;
}

function parseJsonValue(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
}
