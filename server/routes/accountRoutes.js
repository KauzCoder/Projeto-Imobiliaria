import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

import {
  createAccount,
  deleteAccount,
  getAccount,
  listAccounts,
  listAccountTypes,
  updateAccount,
} from "../controllers/accountController.js";

const router = Router();

router.get("/", authMiddleware, allowRoles("admin", "super_user"), listAccountTypes);
router.get("/:accountType", authMiddleware, allowRoles("admin", "super_user"), listAccounts);
router.get("/:accountType/:id", authMiddleware, allowRoles("admin", "super_user"), getAccount);
router.post("/:accountType", authMiddleware, allowRoles("super_user"), createAccount);
router.put("/:accountType/:id", authMiddleware, allowRoles("admin", "super_user"), updateAccount);
router.delete("/:accountType/:id", authMiddleware, allowRoles("super_user"), deleteAccount);

export default router;
