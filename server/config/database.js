import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const { Pool } = pg;

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL nao foi definida. Cole a connection string do Neon no .env.");
  }

  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=") ? { rejectUnauthorized: false } : undefined,
  });

  return new PrismaClient({
    adapter: new PrismaPg(pool),
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function getDatabase() {
  return prisma;
}

export async function connectDatabase() {
  await prisma.$connect();
  console.log("PostgreSQL conectado via Prisma");
  return prisma;
}

export async function closeDatabase() {
  await prisma.$disconnect();
}
