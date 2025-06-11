import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  getMyArticles,
  updateArticle,
  deleteArticle
} from "../controller/article.controller.js";
import { authenticate,checkArticleOwnership } from "../middelwares/auth.middleware.js";

const router = express.Router();

//GET /api/articles/....
router.use(authenticate);
router.post("/create", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.get("/user/my-articles", getMyArticles);
router.put("/:id", checkArticleOwnership, updateArticle); 
router.delete("/:id", checkArticleOwnership, deleteArticle);

export default router;
