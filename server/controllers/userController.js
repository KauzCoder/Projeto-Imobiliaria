import { User } from "../models/User.js";
import { buildAccountPayload } from "../utils/password.js";

export async function listUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function getFavoriteProperties(req, res, next) {
  try {
    const favorites = await User.getFavoriteProperties(req.params.id);

    if (!favorites) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(favorites);
  } catch (error) {
    next(error);
  }
}

export async function addFavoriteProperty(req, res, next) {
  try {
    const propertyId = req.body.propertyId || req.params.propertyId;
    const favorites = await User.addFavoriteProperty(req.params.id, propertyId);

    if (!favorites) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(favorites);
  } catch (error) {
    next(error);
  }
}

export async function removeFavoriteProperty(req, res, next) {
  try {
    const favorites = await User.removeFavoriteProperty(req.params.id, req.params.propertyId);

    if (!favorites) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(favorites);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, buildAccountPayload(req.body));

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await User.create(buildAccountPayload(req.body));
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
