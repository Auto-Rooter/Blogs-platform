import express from "express";
import { getTopArticles, getSummary } from "../controllers/analytics.controller";
import { verifyJWT } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = express.Router();

router.use(verifyJWT, requireRole("admin"));

/**
 * @swagger
 * /api/analytics/top:
 *   get:
 *     summary: Get top viewed articles
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of top articles
 */
router.get("/top", getTopArticles);

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get article stats
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Summary object
 */
router.get("/summary", getSummary);

export default router;
