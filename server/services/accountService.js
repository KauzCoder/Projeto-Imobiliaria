import { Admin, Broker, SuperUser, User } from "../models/index.js";
import { buildAccountPayload } from "../utils/password.js";

const accountModels = {
  admins: Admin,
  brokers: Broker,
  "super-users": SuperUser,
  users: User,
};

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function listAccountTypes() {
  return Object.keys(accountModels);
}

export function getAccountModel(accountType) {
  return accountModels[accountType];
}

function requireAccountModel(accountType) {
  const Model = getAccountModel(accountType);

  if (!Model) {
    throw createServiceError(404, "Tipo de conta nao encontrado.");
  }

  return Model;
}

export async function listAccounts(accountType) {
  const Model = requireAccountModel(accountType);
  return Model.find();
}

export async function getAccount(accountType, id) {
  const Model = requireAccountModel(accountType);
  const account = await Model.findById(id);

  if (!account) {
    throw createServiceError(404, "Conta nao encontrada.");
  }

  return account;
}

export async function createAccount(accountType, data) {
  const Model = requireAccountModel(accountType);
  return Model.create(buildAccountPayload(data));
}

export async function updateAccount(accountType, id, data) {
  const Model = requireAccountModel(accountType);
  const account = await Model.findByIdAndUpdate(id, buildAccountPayload(data));

  if (!account) {
    throw createServiceError(404, "Conta nao encontrada.");
  }

  return account;
}

export async function deleteAccount(accountType, id) {
  const Model = requireAccountModel(accountType);
  const account = await Model.findByIdAndDelete(id);

  if (!account) {
    throw createServiceError(404, "Conta nao encontrada.");
  }

  return account;
}
