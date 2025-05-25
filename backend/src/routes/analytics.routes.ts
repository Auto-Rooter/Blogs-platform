import express from "express";
import { getTopArticles, getSummary, getViewsByCountry } from "../controllers/analytics.controller";
import { verifyJWT } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = express.Router();

router.use(verifyJWT, requireRole("admin"));
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Read-only analytics endpoints (admin only)
 */

/**
 * @swagger
 * /api/analytics/top:
 *   get:
 *     summary: Get the top viewed articles
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of articles sorted by view count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TopArticle'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/top", getTopArticles);

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get overall article statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A summary object with total counts and averages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/summary", getSummary);


/**
 * @swagger
 * /api/analytics/views-by-country:
 *   get:
 *     summary: Get article views aggregated by country
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of country‐view pairs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CountryView'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/views-by-country", getViewsByCountry)

export default router;
