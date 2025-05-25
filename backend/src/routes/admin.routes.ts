import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller";
import { verifyJWT } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: User management for administrators
 */

router.use(verifyJWT, requireRole("admin"));

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary:   List all users
 *     tags:      [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of users with their article counts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSummary'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}/role:
 *   patch:
 *     summary:   Change a user’s role
 *     tags:      [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the user
 *     requestBody:
 *       description: New role for the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, author, user, pending]
 *     responses:
 *       200:
 *         description: Updated user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role supplied
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: User not found
 */
router.patch("/users/:id/role", updateUserRole);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary:   Remove a user
 *     tags:      [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully, no content
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", deleteUser);

export default router;
