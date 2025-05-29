import express from "express";
import { getUserById } from "../controller/user.controller.js";
// import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
// router.use(authenticate);

// router.get("/", getAllUsers);
// router.get("/by-email", getUserByEmail);
router.get("/:id", getUserById);
// router.post("/", createUser);

export default router;
