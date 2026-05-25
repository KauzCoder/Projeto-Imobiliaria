import {
  addFavoriteProperty as addFavoritePropertyService,
  createUser as createUserService,
  deleteUser as deleteUserService,
  getFavoriteProperties as getFavoritePropertiesService,
  getUserById,
  listUsers as listUsersService,
  removeFavoriteProperty as removeFavoritePropertyService,
  updateUser as updateUserService,
} from "../services/userService.js";

export async function listUsers(req, res, next) {
  try {
    const users = await listUsersService();
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
    const favorites = await getFavoritePropertiesService(req.params.id);
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
    const favorites = await addFavoritePropertyService(
      req.params.id,
      propertyId,
    );
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
    const favorites = await removeFavoritePropertyService(
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
    await deleteUserService(req.params.id);
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
    const user = await updateUserService(req.params.id, req.body);
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
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
