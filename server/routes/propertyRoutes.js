import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

import {
  createProperty,
  deleteProperty,
  getProperty,
  listProperties,
  updateProperty,
} from "../controllers/propertyController.js";

const router = Router();

router.get("/", listProperties);
router.get("/:id", getProperty);
router.post("/", authMiddleware, allowRoles("admin", "super_user", "corretor"), createProperty);
router.put("/:id", authMiddleware, allowRoles("admin", "super_user", "corretor"), updateProperty);
router.delete("/:id", authMiddleware, allowRoles("admin", "super_user"), deleteProperty);

export default router;
