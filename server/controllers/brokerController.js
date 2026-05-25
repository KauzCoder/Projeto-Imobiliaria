import {
  createBroker,
  deleteBroker,
  getBrokerById,
  listBrokerProperties,
  listBrokers,
  updateBroker,
} from "../services/brokerService.js";

export async function listBrokers(req, res, next) {
  try {
    const brokers = await listBrokers(req.query);
    res.json(brokers);
  } catch (error) {
    next(error);
  }
}

export async function getBroker(req, res, next) {
  try {
    const broker = await getBrokerById(req.params.id);
    res.json(broker);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function createBroker(req, res, next) {
  try {
    const broker = await createBroker(req.body);
    res.status(201).json(broker);
  } catch (error) {
    next(error);
  }
}

export async function updateBroker(req, res, next) {
  try {
    const broker = await updateBroker(req.params.id, req.body);
    res.json(broker);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteBroker(req, res, next) {
  try {
    await deleteBroker(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function listBrokerProperties(req, res, next) {
  try {
    const properties = await listBrokerProperties(req.params.id);
    res.json(properties);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}
