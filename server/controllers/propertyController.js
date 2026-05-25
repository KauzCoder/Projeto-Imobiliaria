import {
  createProperty,
  deleteProperty,
  getPropertyById,
  listProperties,
  updateProperty,
} from "../services/propertyService.js";

export async function listProperties(req, res, next) {
  try {
    const properties = await listProperties(req.query);
    res.json(properties);
  } catch (error) {
    next(error);
  }
}

export async function getProperty(req, res, next) {
  try {
    const property = await getPropertyById(req.params.id);
    res.json(property);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function createProperty(req, res, next) {
  try {
    const property = await createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const property = await updateProperty(req.params.id, req.body);
    res.json(property);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteProperty(req, res, next) {
  try {
    await deleteProperty(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}
