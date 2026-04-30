import { Property } from "../models/Property.js";

export async function listProperties(req, res, next) {
  try {
    const { status, type, featured } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (featured) filters.featured = featured === "true";

    const properties = await Property.find(filters).sort({ featured: -1, createdAt: -1 });
    res.json(properties);
  } catch (error) {
    next(error);
  }
}

export async function getProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Imovel nao encontrado." });
    }

    res.json(property);
  } catch (error) {
    next(error);
  }
}

export async function createProperty(req, res, next) {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Imovel nao encontrado." });
    }

    res.json(property);
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Imovel nao encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
