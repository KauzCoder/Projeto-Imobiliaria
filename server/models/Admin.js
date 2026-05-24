import { dbAll, dbGet, dbRun } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const Admin = {
  async find() {
    const rows = await dbAll("SELECT * FROM admins ORDER BY created_at DESC");
    return rows.map((row) => mapAdminRow(row));
  },

  async findById(id) {
    const row = await dbGet("SELECT * FROM admins WHERE id = ?", [id]);
    return row ? mapAdminRow(row) : null;
  },

  async findByEmail(email) {
    const row = await dbGet("SELECT * FROM admins WHERE email = ?", [email?.trim().toLowerCase()]);
    return row ? mapAdminRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    await dbRun("UPDATE admins SET last_login_at = NOW(), updated_at = NOW() WHERE id = ?", [id]);
    return this.findById(id);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "admin");
    const now = new Date().toISOString();

    const result = await dbRun(
      `
        INSERT INTO admins (
          name, email, password_hash, phone, document, role, active, last_login_at,
          department, permissions, created_at, updated_at
        )
        VALUES (
          @name, @email, @password_hash, @phone, @document, @role, @active, @last_login_at,
          @department, @permissions, @created_at, @updated_at
        )
        RETURNING id
      `,
      {
        ...account,
        department: data.department?.trim() ?? null,
        permissions: JSON.stringify(data.permissions ?? ["properties", "brokers", "users"]),
        created_at: now,
        updated_at: now,
      }
    );

    return this.findById(result.lastInsertRowid);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildAdminUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    const assignments = Object.keys(payload).map((key) => `${key} = @${key}`).join(", ");
    const result = await dbRun(
      `UPDATE admins SET ${assignments}, updated_at = NOW() WHERE id = @id`,
      { ...payload, id }
    );

    return result.changes > 0 ? this.findById(id) : null;
  },

  async findByIdAndDelete(id) {
    const account = await this.findById(id);

    if (!account) {
      return null;
    }

    await dbRun("DELETE FROM admins WHERE id = ?", [id]);
    return account;
  },
};

function buildAdminUpdatePayload(data) {
  const account = normalizeAccountFields(data, "admin");
  const payload = compact({
    name: account.name,
    email: account.email,
    password_hash: account.password_hash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    last_login_at: account.last_login_at,
    department: data.department?.trim(),
    permissions: data.permissions ? JSON.stringify(data.permissions) : undefined,
  });

  return payload;
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapAdminRow(row, { includePassword = false } = {}) {
  const admin = {
    ...mapAccountRow(row),
    department: row.department,
    permissions: parseJsonValue(row.permissions, []),
  };

  if (includePassword) {
    admin.passwordHash = row.password_hash;
  }

  return admin;
}

function parseJsonValue(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
}
