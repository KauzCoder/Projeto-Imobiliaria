import { dbAll, dbGet, dbRun } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const Broker = {
  async find(filters = {}) {
    const clauses = [];
    const params = {};

    if (filters.verified !== undefined) {
      clauses.push("verified = @verified");
      params.verified = Boolean(filters.verified);
    }

    if (filters.specialties) {
      clauses.push("specialties @> @specialties::jsonb");
      params.specialties = JSON.stringify([filters.specialties]);
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const rows = await dbAll(
      `SELECT * FROM brokers ${where} ORDER BY verified DESC, created_at DESC`,
      params
    );

    return rows.map((row) => mapBrokerRow(row));
  },

  async findById(id) {
    const row = await dbGet("SELECT * FROM brokers WHERE id = ?", [id]);
    return row ? mapBrokerRow(row) : null;
  },

  async findByEmail(email) {
    const row = await dbGet("SELECT * FROM brokers WHERE email = ?", [email?.trim().toLowerCase()]);
    return row ? mapBrokerRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    await dbRun("UPDATE brokers SET last_login_at = NOW(), updated_at = NOW() WHERE id = ?", [id]);
    return this.findById(id);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "corretor");
    const now = new Date().toISOString();

    const result = await dbRun(
      `
        INSERT INTO brokers (
          name, email, password_hash, phone, document, role, active, last_login_at,
          creci, bio, specialties, service_areas, commission_rate, verified, social_links,
          created_at, updated_at
        )
        VALUES (
          @name, @email, @password_hash, @phone, @document, @role, @active, @last_login_at,
          @creci, @bio, @specialties, @service_areas, @commission_rate, @verified, @social_links,
          @created_at, @updated_at
        )
        RETURNING id
      `,
      {
        ...account,
        creci: data.creci?.trim().toUpperCase(),
        bio: data.bio?.trim() ?? null,
        specialties: JSON.stringify(data.specialties ?? []),
        service_areas: JSON.stringify(data.serviceAreas ?? []),
        commission_rate: data.commissionRate ?? null,
        verified: Boolean(data.verified),
        social_links: JSON.stringify(data.socialLinks ?? {}),
        created_at: now,
        updated_at: now,
      }
    );

    return this.findById(result.lastInsertRowid);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildBrokerUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    const assignments = Object.keys(payload).map((key) => `${key} = @${key}`).join(", ");
    const result = await dbRun(
      `UPDATE brokers SET ${assignments}, updated_at = NOW() WHERE id = @id`,
      { ...payload, id }
    );

    return result.changes > 0 ? this.findById(id) : null;
  },

  async findByIdAndDelete(id) {
    const account = await this.findById(id);

    if (!account) {
      return null;
    }

    await dbRun("DELETE FROM brokers WHERE id = ?", [id]);
    return account;
  },
};

function buildBrokerUpdatePayload(data) {
  const account = normalizeAccountFields(data, "corretor");
  return compact({
    name: account.name,
    email: account.email,
    password_hash: account.password_hash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    last_login_at: account.last_login_at,
    creci: data.creci?.trim().toUpperCase(),
    bio: data.bio?.trim(),
    specialties: data.specialties ? JSON.stringify(data.specialties) : undefined,
    service_areas: data.serviceAreas ? JSON.stringify(data.serviceAreas) : undefined,
    commission_rate: data.commissionRate,
    verified: data.verified === undefined ? undefined : Boolean(data.verified),
    social_links: data.socialLinks ? JSON.stringify(data.socialLinks) : undefined,
  });
}

function compact(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function mapBrokerRow(row, { includePassword = false } = {}) {
  const broker = {
    ...mapAccountRow(row),
    creci: row.creci,
    bio: row.bio,
    specialties: parseJsonValue(row.specialties, []),
    serviceAreas: parseJsonValue(row.service_areas, []),
    commissionRate: row.commission_rate === null ? null : Number(row.commission_rate),
    verified: Boolean(row.verified),
    socialLinks: parseJsonValue(row.social_links, {}),
  };

  if (includePassword) {
    broker.passwordHash = row.password_hash;
  }

  return broker;
}

function parseJsonValue(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
}
