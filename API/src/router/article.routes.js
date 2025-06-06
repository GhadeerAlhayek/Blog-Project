import express from "express";
import { createArticle } from "../controller/article.controller.js";
import { authenticate } from "../middelwares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.post("/create", createArticle);

export default router;
