import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controller/user.controller.js";
import { authenticate, checkUserOwnership } from "../middelwares/auth.middleware.js";


const router = express.Router();

router.get("/:id", getUserById);
router.use(authenticate);
router.get("/", getAllUsers);
router.put("/:id", checkUserOwnership, updateUser);
router.delete("/:id", checkUserOwnership, deleteUser);

export default router;
