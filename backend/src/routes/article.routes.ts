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

/**
 * @swagger
 * /api/articles/export:
 *   get:
 *     summary: Export all articles as JSON
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A JSON file download of all articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get('/export', verifyJWT, requireRole("admin"), asyncHandler(exportAllArticles));

/**
 * @swagger
 * /api/articles/import:
 *   post:
 *     summary: Import articles from a JSON file
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Articles imported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       400:
 *         description: No file uploaded
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         description: Import failed
 */
router.post('/import', verifyJWT, requireRole("admin"), upload.single('file'), asyncHandler(importAllArticles));

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get paginated list of articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of articles per page
 *     responses:
 *       200:
 *         description: Paginated articles response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing fields
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/", asyncHandler(getArticles));
router.post("/", verifyJWT, requireRole("author"), asyncHandler(createArticle));

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get a single article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       204:
 *         description: Deleted successfully (no content)
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Not found
 */
router.get("/:id", asyncHandler(getArticleById));
router.delete("/:id", verifyJWT, requireRole("admin"), asyncHandler(deleteArticle));

/**
 * @swagger
 * /api/articles/{id}/time-spent:
 *   post:
 *     summary: Submit time spent reading an article
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
 *         description: Time recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
router.post("/:id/time-spent", asyncHandler(submitTimeSpent));

export default router;