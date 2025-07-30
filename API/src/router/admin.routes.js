import express from "express";
import {
  getAdminStats,
  getAllArticlesAdmin,
  deleteArticleAdmin,
  updateArticleAdmin,
  getAllUsersAdmin,
  promoteToAdmin
} from "../controller/admin.controller.js";
import { authenticate, authorize } from "../middelwares/auth.middleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize(['admin']));

// Admin dashboard
router.get('/stats', getAdminStats);

// Admin article management
router.get('/articles', getAllArticlesAdmin);
router.put('/articles/:id', updateArticleAdmin);
router.delete('/articles/:id', deleteArticleAdmin);

// Admin user management
router.get('/users', getAllUsersAdmin);
router.post('/promote/:userId', promoteToAdmin);

export default router;