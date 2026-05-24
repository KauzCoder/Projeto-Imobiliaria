import pg from "pg";

const { Pool } = pg;
const databaseUrlPlaceholder = "postgresql://usuario:senha@host/neondb?sslmode=require";

let pool;

export function getDatabase() {
  if (!pool) {
    throw new Error("Banco PostgreSQL ainda nao foi conectado.");
  }

  return pool;
}

export async function connectDatabase() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || connectionString === databaseUrlPlaceholder) {
    throw new Error("DATABASE_URL nao foi definida. Cole a connection string do Neon no .env.");
  }

  pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
  });

  await initializeSchema();
  console.log("PostgreSQL conectado");
  return pool;
}

export async function closeDatabase() {
  if (!pool) {
    return;
  }

  await pool.end();
  pool = undefined;
}

export async function dbAll(sql, args = {}) {
  const query = buildQuery(sql, args);
  const result = await getDatabase().query(query.text, query.values);
  return result.rows;
}

export async function dbGet(sql, args = {}) {
  const rows = await dbAll(sql, args);
  return rows[0] ?? null;
}

export async function dbRun(sql, args = {}) {
  const query = buildQuery(sql, args);
  const result = await getDatabase().query(query.text, query.values);

  return {
    changes: result.rowCount,
    lastInsertRowid: result.rows[0]?.id,
  };
}

export async function dbBatch(statements) {
  const client = await getDatabase().connect();

  try {
    await client.query("BEGIN");

    for (const statement of statements) {
      const query = buildQuery(statement.sql, statement.args ?? {});
      await client.query(query.text, query.values);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

function buildQuery(sql, args = {}) {
  if (Array.isArray(args)) {
    let index = 0;

    return {
      text: sql.replace(/\?/g, () => `$${++index}`),
      values: args,
    };
  }

  const values = [];
  const positions = new Map();

  const text = sql.replace(/@([a-zA-Z_][a-zA-Z0-9_]*)/g, (_match, key) => {
    if (!positions.has(key)) {
      values.push(args[key]);
      positions.set(key, values.length);
    }

    return `$${positions.get(key)}`;
  });

  return { text, values };
}

async function initializeSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('Apartamento', 'Casa', 'Cobertura', 'Comercial', 'Terreno')),
      status TEXT NOT NULL DEFAULT 'Venda' CHECK (status IN ('Venda', 'Aluguel')),
      price NUMERIC NOT NULL CHECK (price >= 0),
      address_street TEXT NOT NULL,
      address_district TEXT NOT NULL,
      address_city TEXT NOT NULL,
      address_state TEXT NOT NULL,
      location_lat DOUBLE PRECISION NOT NULL,
      location_lng DOUBLE PRECISION NOT NULL,
      bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
      bathrooms INTEGER NOT NULL CHECK (bathrooms >= 0),
      area NUMERIC NOT NULL CHECK (area >= 0),
      parking_spaces INTEGER NOT NULL DEFAULT 0 CHECK (parking_spaces >= 0),
      image_url TEXT NOT NULL,
      broker_id INTEGER,
      owner_id INTEGER,
      created_by_id INTEGER,
      created_by_model TEXT CHECK (created_by_model IN ('Admin', 'SuperUser') OR created_by_model IS NULL),
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_properties_broker_id ON properties (broker_id);
    CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties (owner_id);
    CREATE INDEX IF NOT EXISTS idx_properties_featured_created_at ON properties (featured DESC, created_at DESC);

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      phone TEXT,
      document TEXT,
      role TEXT NOT NULL DEFAULT 'usuario' CHECK (role = 'usuario'),
      active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMPTZ,
      address_street TEXT,
      address_district TEXT,
      address_city TEXT,
      address_state TEXT,
      address_zip_code TEXT,
      favorites JSONB NOT NULL DEFAULT '[]'::jsonb,
      saved_searches JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS brokers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      phone TEXT,
      document TEXT,
      role TEXT NOT NULL DEFAULT 'corretor' CHECK (role = 'corretor'),
      active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMPTZ,
      creci TEXT NOT NULL UNIQUE,
      bio TEXT,
      specialties JSONB NOT NULL DEFAULT '[]'::jsonb,
      service_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
      commission_rate NUMERIC CHECK (commission_rate >= 0 AND commission_rate <= 100),
      verified BOOLEAN NOT NULL DEFAULT false,
      social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      phone TEXT,
      document TEXT,
      role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
      active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMPTZ,
      department TEXT,
      permissions JSONB NOT NULL DEFAULT '["properties","brokers","users"]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS super_users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      phone TEXT,
      document TEXT,
      role TEXT NOT NULL DEFAULT 'super_user' CHECK (role = 'super_user'),
      active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMPTZ,
      permissions JSONB NOT NULL DEFAULT '["all"]'::jsonb,
      can_manage_admins BOOLEAN NOT NULL DEFAULT true,
      scope TEXT NOT NULL DEFAULT 'global' CHECK (scope = 'global'),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
