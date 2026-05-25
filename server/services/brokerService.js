import { Broker } from "../models/Broker.js";
import { Property } from "../models/Property.js";
import { buildAccountPayload } from "../utils/password.js";

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listBrokers(query = {}) {
  const { verified, specialty } = query;
  const filters = {};

  if (verified) filters.verified = verified === "true";
  if (specialty) filters.specialties = specialty;

  return Broker.find(filters);
}

export async function getBrokerById(id) {
  const broker = await Broker.findById(id);

  if (!broker) {
    throw createServiceError(404, "Corretor nao encontrado.");
  }

  return broker;
}

export async function createBroker(data) {
  return Broker.create(buildAccountPayload(data));
}

export async function updateBroker(id, data) {
  const broker = await Broker.findByIdAndUpdate(id, buildAccountPayload(data));

  if (!broker) {
    throw createServiceError(404, "Corretor nao encontrado.");
  }

  return broker;
}

export async function deleteBroker(id) {
  const broker = await Broker.findByIdAndDelete(id);

  if (!broker) {
    throw createServiceError(404, "Corretor nao encontrado.");
  }

  return broker;
}

export async function listBrokerProperties(id) {
  const broker = await Broker.findById(id);

  if (!broker) {
    throw createServiceError(404, "Corretor nao encontrado.");
  }

  return Property.find({ broker: id });
}
