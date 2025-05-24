import express from "express";
import { submitRating } from "../controllers/rating.controller";

const router = express.Router();
router.post("/:id/rate", submitRating);
export default router;