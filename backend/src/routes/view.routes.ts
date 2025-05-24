import express from "express";
import { trackView } from "../controllers/view.controller";

const router = express.Router();
router.post("/", trackView);
export default router;
