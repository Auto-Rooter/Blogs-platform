import express from "express";
import {
    getArticles,
    getArticleById,
    createArticle,
    deleteArticle,
    exportAllArticles,
    importAllArticles,
    submitTimeSpent,
  } from "../controllers/article.controller";
import multer from "multer";
import { asyncHandler } from "../utils/asyncHandler";
import { requireRole } from "../middlewares/roles";
import { verifyJWT } from '../middlewares/auth';
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.get('/export', verifyJWT, requireRole("admin"), asyncHandler(exportAllArticles));
router.post('/import', verifyJWT, requireRole("admin"), upload.single('file'), asyncHandler(importAllArticles));

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *
 *   post:
 *     summary: Create an article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 */
router.get("/", asyncHandler(getArticles));

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single article
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.get("/:id", asyncHandler(getArticleById));
router.post("/", verifyJWT, requireRole("author"), asyncHandler(createArticle));
router.delete("/:id", verifyJWT, requireRole("admin"), asyncHandler(deleteArticle));

/**
 * @swagger
 * /api/articles/{id}/time:
 *   post:
 *     summary: Submit time spent on article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timeSpent
 *             properties:
 *               timeSpent:
 *                 type: number
 *                 description: Time in seconds
 *     responses:
 *       200:
 *         description: Time logged successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
router.post("/:id/time-spent", asyncHandler(submitTimeSpent));

export default router;