import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controller/user.controller.js";
// import { authenticate } from "../middleware/auth.js";

const router = express.Router();




router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);



export default router;
