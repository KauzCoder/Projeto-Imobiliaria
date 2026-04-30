import { Router } from "express";
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
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
