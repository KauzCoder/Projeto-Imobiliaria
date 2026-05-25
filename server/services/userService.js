import { User } from "../models/User.js";
import { buildAccountPayload } from "../utils/password.js";

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listUsers() {
  return User.find();
}

export async function getUserById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return user;
}

export async function getFavoriteProperties(userId) {
  const favorites = await User.getFavoriteProperties(userId);

  if (!favorites) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return favorites;
}

export async function addFavoriteProperty(userId, propertyId) {
  const favorites = await User.addFavoriteProperty(userId, propertyId);

  if (!favorites) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return favorites;
}

export async function removeFavoriteProperty(userId, propertyId) {
  const favorites = await User.removeFavoriteProperty(userId, propertyId);

  if (!favorites) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return favorites;
}

export async function deleteUser(userId) {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return user;
}

export async function updateUser(userId, data) {
  const user = await User.findByIdAndUpdate(userId, buildAccountPayload(data));

  if (!user) {
    throw createServiceError(404, "Usuario nao encontrado.");
  }

  return user;
}

export async function createUser(data) {
  return User.create(buildAccountPayload(data));
}
