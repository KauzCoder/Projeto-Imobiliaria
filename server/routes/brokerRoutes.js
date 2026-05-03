import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { allowRoles, allowSelfOrRoles } from "../middlewares/roleMiddleware.js";

import {
  createBroker,
  deleteBroker,
  getBroker,
  listBrokerProperties,
  listBrokers,
  updateBroker,
} from "../controllers/brokerController.js";

const router = Router();

router.get("/", listBrokers);
router.get("/:id", getBroker);
router.get("/:id/properties", listBrokerProperties);
router.post("/", authMiddleware, allowRoles("admin", "super_user"), createBroker);
router.put("/:id", authMiddleware, allowSelfOrRoles("admin", "super_user"), updateBroker);
router.delete("/:id", authMiddleware, allowRoles("admin", "super_user"), deleteBroker);

export default router;
