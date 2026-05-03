import { User } from "../models/User.js";
import { buildAccountPayload } from "../utils/password.js";

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
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
    const user = await User.findById(req.params.id).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
}

export async function addFavoriteProperty(req, res, next) {
  try {
    const propertyId = req.body.propertyId || req.params.propertyId;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favorites: propertyId } },
      { new: true, runValidators: true }
    ).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
}

export async function removeFavoriteProperty(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { favorites: req.params.propertyId } },
      { new: true }
    ).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    res.json(user.favorites);
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
    const user = await User.findByIdAndUpdate(req.params.id, buildAccountPayload(req.body), {
      new: true,
      runValidators: true,
    });

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
