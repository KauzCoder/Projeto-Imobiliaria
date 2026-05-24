import { Broker } from "../models/Broker.js";
import { Property } from "../models/Property.js";
import { buildAccountPayload } from "../utils/password.js";

export async function listBrokers(req, res, next) {
  try {
    const { verified, specialty } = req.query;
    const filters = {};

    if (verified) filters.verified = verified === "true";
    if (specialty) filters.specialties = specialty;

    const brokers = await Broker.find(filters);
    res.json(brokers);
  } catch (error) {
    next(error);
  }
}

export async function getBroker(req, res, next) {
  try {
    const broker = await Broker.findById(req.params.id);

    if (!broker) {
      return res.status(404).json({ message: "Corretor nao encontrado." });
    }

    res.json(broker);
  } catch (error) {
    next(error);
  }
}

export async function createBroker(req, res, next) {
  try {
    const broker = await Broker.create(buildAccountPayload(req.body));
    res.status(201).json(broker);
  } catch (error) {
    next(error);
  }
}

export async function updateBroker(req, res, next) {
  try {
    const broker = await Broker.findByIdAndUpdate(req.params.id, buildAccountPayload(req.body));

    if (!broker) {
      return res.status(404).json({ message: "Corretor nao encontrado." });
    }

    res.json(broker);
  } catch (error) {
    next(error);
  }
}

export async function deleteBroker(req, res, next) {
  try {
    const broker = await Broker.findByIdAndDelete(req.params.id);

    if (!broker) {
      return res.status(404).json({ message: "Corretor nao encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listBrokerProperties(req, res, next) {
  try {
    const broker = await Broker.findById(req.params.id);

    if (!broker) {
      return res.status(404).json({ message: "Corretor nao encontrado." });
    }

    const properties = await Property.find({ broker: req.params.id });
    res.json(properties);
  } catch (error) {
    next(error);
  }
}
