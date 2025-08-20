import express from "express";
import {
  createUser,
  getUserByEmail,
  login,
  logout,
  changePassword,
} from "../controller/auth.controller.js";
import { authenticate } from "../middelwares/auth.middleware.js";
import passwordRoutes from "./password.routes.js";

const router = express.Router();

// api/auth/....
router.post("/register", createUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);
router.post("/logout", logout);
router.use("/password", passwordRoutes);
router.use(authenticate);
router.post("/password/change", changePassword);
export default router;
