import { prisma } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";
import { Property } from "./Property.js";

export const User = {
  async find() {
    const rows = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((row) => mapUserRow(row));
  },

  async findById(id) {
    const row = await prisma.user.findUnique({ where: { id: Number(id) } });
    return row ? mapUserRow(row) : null;
  },

  async findByEmail(email) {
    const row = await prisma.user.findUnique({ where: { email: email?.trim().toLowerCase() } });
    return row ? mapUserRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    const row = await prisma.user.update({
      where: { id: Number(id) },
      data: { lastLoginAt: new Date() },
    });
    return mapUserRow(row);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "usuario");
    const address = data.address ?? {};
    const row = await prisma.user.create({
      data: {
        ...account,
        addressStreet: address.street ?? null,
        addressDistrict: address.district ?? null,
        addressCity: address.city ?? null,
        addressState: address.state ?? null,
        addressZipCode: address.zipCode ?? null,
        favorites: data.favorites ?? [],
        savedSearches: data.savedSearches ?? [],
      },
    });

    return mapUserRow(row);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildUserUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    try {
      const row = await prisma.user.update({
        where: { id: Number(id) },
        data: payload,
      });
      return mapUserRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async findByIdAndDelete(id) {
    try {
      const row = await prisma.user.delete({ where: { id: Number(id) } });
      return mapUserRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
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
    await prisma.user.update({
      where: { id: Number(id) },
      data: { favorites },
    });

    return this.getFavoriteProperties(id);
  },

  async removeFavoriteProperty(id, propertyId) {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    const favorites = user.favorites.map(String).filter((favoriteId) => favoriteId !== String(propertyId));
    await prisma.user.update({
      where: { id: Number(id) },
      data: { favorites },
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
    passwordHash: account.passwordHash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    lastLoginAt: account.lastLoginAt,
    addressStreet: address.street,
    addressDistrict: address.district,
    addressCity: address.city,
    addressState: address.state,
    addressZipCode: address.zipCode,
    favorites: data.favorites,
    savedSearches: data.savedSearches,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapUserRow(row, { includePassword = false } = {}) {
  const user = {
    ...mapAccountRow(row),
    address: {
      street: row.addressStreet,
      district: row.addressDistrict,
      city: row.addressCity,
      state: row.addressState,
      zipCode: row.addressZipCode,
    },
    favorites: row.favorites ?? [],
    savedSearches: row.savedSearches ?? [],
  };

  if (includePassword) {
    user.passwordHash = row.passwordHash;
  }

  return user;
}
