import {
  addFavoriteProperty,
  createUser,
  deleteUser,
  getFavoriteProperties,
  getUserById,
  listUsers,
  removeFavoriteProperty,
  updateUser,
} from "../services/userService.js";

export async function listUsers(req, res, next) {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function getFavoriteProperties(req, res, next) {
  try {
    const favorites = await getFavoriteProperties(req.params.id);
    res.json(favorites);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function addFavoriteProperty(req, res, next) {
  try {
    const propertyId = req.body.propertyId || req.params.propertyId;
    const favorites = await addFavoriteProperty(req.params.id, propertyId);
    res.json(favorites);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function removeFavoriteProperty(req, res, next) {
  try {
    const favorites = await removeFavoriteProperty(
      req.params.id,
      req.params.propertyId,
    );
    res.json(favorites);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
