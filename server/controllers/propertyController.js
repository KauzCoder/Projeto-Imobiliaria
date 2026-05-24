import { Property } from "../models/Property.js";

export async function listProperties(req, res, next) {
  try {
    const {
      status,
      type,
      featured,
      city,
      region,
      neighborhood,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      garage,
      minArea,
      maxArea,
    } = req.query;

    const filters = {};

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (featured) filters.featured = featured === "true";
    if (city) filters["address.city"] = city;
    if (region) filters["address.state"] = region;
    if (neighborhood) filters["address.district"] = neighborhood;
    if (bedrooms) filters.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filters.bathrooms = { $gte: Number(bathrooms) };
    if (garage) filters.parkingSpaces = { $gte: Number(garage) };

    if (minPrice) {
      filters.price = { ...filters.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }
    if (minArea) {
      filters.area = { ...filters.area, $gte: Number(minArea) };
    }
    if (maxArea) {
      filters.area = { ...filters.area, $lte: Number(maxArea) };
    }

    const properties = await Property.find(filters);
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
    const property = await Property.findByIdAndUpdate(req.params.id, req.body);

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
