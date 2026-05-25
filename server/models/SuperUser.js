import { prisma } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const SuperUser = {
  async find() {
    const rows = await prisma.superUser.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((row) => mapSuperUserRow(row));
  },

  async findById(id) {
    const row = await prisma.superUser.findUnique({ where: { id: Number(id) } });
    return row ? mapSuperUserRow(row) : null;
  },

  async findByEmail(email) {
    const row = await prisma.superUser.findUnique({ where: { email: email?.trim().toLowerCase() } });
    return row ? mapSuperUserRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    const row = await prisma.superUser.update({
      where: { id: Number(id) },
      data: { lastLoginAt: new Date() },
    });
    return mapSuperUserRow(row);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "super_user");
    const row = await prisma.superUser.create({
      data: {
        ...account,
        permissions: data.permissions ?? ["all"],
        canManageAdmins: data.canManageAdmins === undefined ? true : Boolean(data.canManageAdmins),
        scope: data.scope ?? "global",
      },
    });

    return mapSuperUserRow(row);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildSuperUserUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    try {
      const row = await prisma.superUser.update({
        where: { id: Number(id) },
        data: payload,
      });
      return mapSuperUserRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async findByIdAndDelete(id) {
    try {
      const row = await prisma.superUser.delete({ where: { id: Number(id) } });
      return mapSuperUserRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },
};

function buildSuperUserUpdatePayload(data) {
  const account = normalizeAccountFields(data, "super_user");
  return compact({
    name: account.name,
    email: account.email,
    passwordHash: account.passwordHash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    lastLoginAt: account.lastLoginAt,
    permissions: data.permissions,
    canManageAdmins: data.canManageAdmins === undefined ? undefined : Boolean(data.canManageAdmins),
    scope: data.scope,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapSuperUserRow(row, { includePassword = false } = {}) {
  const superUser = {
    ...mapAccountRow(row),
    permissions: row.permissions ?? [],
    canManageAdmins: Boolean(row.canManageAdmins),
    scope: row.scope,
  };

  if (includePassword) {
    superUser.passwordHash = row.passwordHash;
  }

  return superUser;
}
