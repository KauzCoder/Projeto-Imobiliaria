import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { allowRoles, allowSelfOrRoles } from "../middlewares/roleMiddleware.js";

import {
  addFavoriteProperty,
  createUser,
  deleteUser,
  getFavoriteProperties,
  getUser,
  listUsers,
  removeFavoriteProperty,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", authMiddleware, allowRoles("admin", "super_user"), listUsers);
router.get("/:id", authMiddleware, allowSelfOrRoles("admin", "super_user"), getUser);
router.get("/:id/favorites", authMiddleware, allowSelfOrRoles("admin", "super_user"), getFavoriteProperties);
router.post("/", authMiddleware, allowRoles("admin", "super_user"), createUser);
router.post("/:id/favorites", authMiddleware, allowSelfOrRoles("admin", "super_user"), addFavoriteProperty);
router.delete(
  "/:id/favorites/:propertyId",
  authMiddleware,
  allowSelfOrRoles("admin", "super_user"),
  removeFavoriteProperty
);
router.put("/:id", authMiddleware, allowSelfOrRoles("admin", "super_user"), updateUser);
router.delete("/:id", authMiddleware, allowSelfOrRoles("admin", "super_user"), deleteUser);

export default router;
