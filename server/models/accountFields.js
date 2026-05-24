export function normalizeAccountFields(data, role) {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    password_hash: data.passwordHash ?? data.password_hash,
    phone: data.phone?.trim() ?? null,
    document: data.document?.trim() ?? null,
    role,
    active: data.active === undefined ? true : Boolean(data.active),
    last_login_at: data.lastLoginAt ?? data.last_login_at ?? null,
  };
}

export function mapAccountRow(row) {
  return {
    id: row.id,
    _id: String(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone,
    document: row.document,
    role: row.role,
    active: Boolean(row.active),
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
