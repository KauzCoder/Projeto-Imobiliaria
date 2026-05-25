import { prisma } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const Admin = {
  async find() {
    const rows = await prisma.admin.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((row) => mapAdminRow(row));
  },

  async findById(id) {
    const row = await prisma.admin.findUnique({ where: { id: Number(id) } });
    return row ? mapAdminRow(row) : null;
  },

  async findByEmail(email) {
    const row = await prisma.admin.findUnique({ where: { email: email?.trim().toLowerCase() } });
    return row ? mapAdminRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    const row = await prisma.admin.update({
      where: { id: Number(id) },
      data: { lastLoginAt: new Date() },
    });
    return mapAdminRow(row);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "admin");
    const row = await prisma.admin.create({
      data: {
        ...account,
        department: data.department?.trim() ?? null,
        permissions: data.permissions ?? ["properties", "brokers", "users"],
      },
    });

    return mapAdminRow(row);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildAdminUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    try {
      const row = await prisma.admin.update({
        where: { id: Number(id) },
        data: payload,
      });
      return mapAdminRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async findByIdAndDelete(id) {
    try {
      const row = await prisma.admin.delete({ where: { id: Number(id) } });
      return mapAdminRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },
};

function buildAdminUpdatePayload(data) {
  const account = normalizeAccountFields(data, "admin");
  return compact({
    name: account.name,
    email: account.email,
    passwordHash: account.passwordHash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    lastLoginAt: account.lastLoginAt,
    department: data.department?.trim(),
    permissions: data.permissions,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapAdminRow(row, { includePassword = false } = {}) {
  const admin = {
    ...mapAccountRow(row),
    department: row.department,
    permissions: row.permissions ?? [],
  };

  if (includePassword) {
    admin.passwordHash = row.passwordHash;
  }

  return admin;
}
