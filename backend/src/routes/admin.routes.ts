import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller";
import { verifyJWT } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = express.Router();

router.use(verifyJWT, requireRole("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
