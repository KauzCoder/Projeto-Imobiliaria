import { prisma } from "../config/database.js";
import { mapAccountRow, normalizeAccountFields } from "./accountFields.js";

export const Broker = {
  async find(filters = {}) {
    const rows = await prisma.broker.findMany({
      where: filters.verified === undefined ? undefined : { verified: Boolean(filters.verified) },
      orderBy: [{ verified: "desc" }, { createdAt: "desc" }],
    });

    const brokers = rows.map((row) => mapBrokerRow(row));

    if (!filters.specialties) {
      return brokers;
    }

    return brokers.filter((broker) => broker.specialties.includes(filters.specialties));
  },

  async findById(id) {
    const row = await prisma.broker.findUnique({ where: { id: Number(id) } });
    return row ? mapBrokerRow(row) : null;
  },

  async findByEmail(email) {
    const row = await prisma.broker.findUnique({ where: { email: email?.trim().toLowerCase() } });
    return row ? mapBrokerRow(row, { includePassword: true }) : null;
  },

  async updateLastLogin(id) {
    const row = await prisma.broker.update({
      where: { id: Number(id) },
      data: { lastLoginAt: new Date() },
    });
    return mapBrokerRow(row);
  },

  async create(data) {
    const account = normalizeAccountFields(data, "corretor");
    const row = await prisma.broker.create({
      data: {
        ...account,
        creci: data.creci?.trim().toUpperCase(),
        bio: data.bio?.trim() ?? null,
        specialties: data.specialties ?? [],
        serviceAreas: data.serviceAreas ?? [],
        commissionRate: data.commissionRate ?? null,
        verified: Boolean(data.verified),
        socialLinks: data.socialLinks ?? {},
      },
    });

    return mapBrokerRow(row);
  },

  async findByIdAndUpdate(id, data) {
    const payload = buildBrokerUpdatePayload(data);

    if (Object.keys(payload).length === 0) {
      return this.findById(id);
    }

    try {
      const row = await prisma.broker.update({
        where: { id: Number(id) },
        data: payload,
      });
      return mapBrokerRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async findByIdAndDelete(id) {
    try {
      const row = await prisma.broker.delete({ where: { id: Number(id) } });
      return mapBrokerRow(row);
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },
};

function buildBrokerUpdatePayload(data) {
  const account = normalizeAccountFields(data, "corretor");
  return compact({
    name: account.name,
    email: account.email,
    passwordHash: account.passwordHash,
    phone: account.phone,
    document: account.document,
    active: data.active === undefined ? undefined : account.active,
    lastLoginAt: account.lastLoginAt,
    creci: data.creci?.trim().toUpperCase(),
    bio: data.bio?.trim(),
    specialties: data.specialties,
    serviceAreas: data.serviceAreas,
    commissionRate: data.commissionRate,
    verified: data.verified === undefined ? undefined : Boolean(data.verified),
    socialLinks: data.socialLinks,
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
    specialties: row.specialties ?? [],
    serviceAreas: row.serviceAreas ?? [],
    commissionRate: row.commissionRate === null ? null : Number(row.commissionRate),
    verified: Boolean(row.verified),
    socialLinks: row.socialLinks ?? {},
  };

  if (includePassword) {
    broker.passwordHash = row.passwordHash;
  }

  return broker;
}
