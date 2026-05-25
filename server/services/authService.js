import { Admin, Broker, SuperUser, User } from "../models/index.js";
import { buildAccountPayload, verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

const authModels = {
  admin: Admin,
  corretor: Broker,
  super_user: SuperUser,
  usuario: User,
};

function createAuthError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function getAuthModel(role) {
  return authModels[role];
}

export async function findAccountByEmail(email) {
  const normalizedEmail = email?.trim().toLowerCase();

  for (const [role, Model] of Object.entries(authModels)) {
    try {
      const account = await Model.findByEmail(normalizedEmail);

      if (account) {
        return { account, Model, role };
      }
    } catch (error) {
      error.context = {
        ...error.context,
        stage: "findByEmail",
        role,
        email: normalizedEmail,
      };
      throw error;
    }
  }

  return null;
}

export async function registerAccount({ role, data }) {
  const Model = getAuthModel(role);

  if (!Model) {
    throw createAuthError(400, "Tipo de conta invalido.");
  }

  const existingAccount = await findAccountByEmail(data?.email);

  if (existingAccount) {
    throw createAuthError(409, "Email ja cadastrado.");
  }

  return Model.create(buildAccountPayload(data));
}

export async function loginAccount({ email, password }) {
  if (!email || !password) {
    throw createAuthError(400, "Email e senha sao obrigatorios.");
  }

  const result = await findAccountByEmail(email);
  const account = result?.account;

  if (!account || !verifyPassword(password, account.passwordHash)) {
    throw createAuthError(401, "Credenciais invalidas.");
  }

  if (!account.active) {
    throw createAuthError(403, "Conta desativada.");
  }

  await result.Model.updateLastLogin(account.id);

  const safeAccount = { ...account };
  delete safeAccount.passwordHash;

  const token = generateToken(account);

  return {
    account: safeAccount,
    token,
  };
}
