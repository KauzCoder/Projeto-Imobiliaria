import { dbAll, dbGet, dbRun } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const SuperUser = {
  async find() {
    const rows = await dbAll("SELECT * FROM super_users ORDER BY created_at DESC");
    return rows.map((row) => mapSuperUserRow(row));
  },

  async findById(id) {
    const row = await dbGet("SELECT * FROM super_users WHERE id = ?", [id]);
    return row ? mapSuperUserRow(row) : null;
  },

  async findByEmail(email) {
    const row = await dbGet("SELECT * FROM super_users WHERE email = ?", [email?.trim().toLowerCase()]);
    return row ? mapSuperUserRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    await dbRun("UPDATE super_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = ?", [id]);
    return this.findById(id);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "super_user");
    const now = new Date().toISOString();

    const result = await dbRun(
      `
        INSERT INTO super_users (
          name, email, password_hash, phone, document, role, active, last_login_at,
          permissions, can_manage_admins, scope, created_at, updated_at
        )
        VALUES (
          @name, @email, @password_hash, @phone, @document, @role, @active, @last_login_at,
          @permissions, @can_manage_admins, @scope, @created_at, @updated_at
        )
        RETURNING id
      `,
      {
        ...account,
        permissions: JSON.stringify(data.permissions ?? ["all"]),
        can_manage_admins:
          data.canManageAdmins === undefined ? true : Boolean(data.canManageAdmins),
        scope: "global",
        created_at: now,
        updated_at: now,
      }
    );

    return this.findById(result.lastInsertRowid);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildSuperUserUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    const assignments = Object.keys(payload).map((key) => `${key} = @${key}`).join(", ");
    const result = await dbRun(
      `UPDATE super_users SET ${assignments}, updated_at = NOW() WHERE id = @id`,
      { ...payload, id }
    );

    return result.changes > 0 ? this.findById(id) : null;
  },

  async findByIdAndDelete(id) {
    const account = await this.findById(id);

    if (!account) {
      return null;
    }

    await dbRun("DELETE FROM super_users WHERE id = ?", [id]);
    return account;
  },
};

function buildSuperUserUpdatePayload(data) {
  const account = normalizeAccountFields(data, "super_user");
  return compact({
    name: account.name,
    email: account.email,
    password_hash: account.password_hash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    last_login_at: account.last_login_at,
    permissions: data.permissions ? JSON.stringify(data.permissions) : undefined,
    can_manage_admins:
      data.canManageAdmins === undefined ? undefined : Boolean(data.canManageAdmins),
    scope: data.scope,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapSuperUserRow(row, { includePassword = false } = {}) {
  const superUser = {
    ...mapAccountRow(row),
    permissions: parseJsonValue(row.permissions, []),
    canManageAdmins: Boolean(row.can_manage_admins),
    scope: row.scope,
  };

  if (includePassword) {
    superUser.passwordHash = row.password_hash;
  }

  return superUser;
}

function parseJsonValue(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
}
