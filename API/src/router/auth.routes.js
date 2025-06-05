import express from "express";
import { createUser, getUserByEmail, login,logout } from "../controller/auth.controller.js";
import passwordRoutes from "./password.routes.js";

const router = express.Router();



// api/auth/....
router.post("/register", createUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);
router.post("/logout", logout);
router.use("/password", passwordRoutes);

export default router;