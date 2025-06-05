import express from "express";
import { forgotPassword, resetPassword } from "../controller/password.controller.js";

const router = express.Router();

// api/auth/password/.....
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);



export default router;





/*

Testing with Postman
-----
 For "Forgot Password":
1) POST to http://localhost:3000/api/auth/password/forgot
2) Body:

{
  "email": "user@example.com"
}

3) Expected response:

{
  "success": true,
  "message": "Password reset link has been sent to your email address",
  "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

------
For "Reset Password":
1) POST to http://localhost:3000/api/auth/password/reset
2) Body:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"newPassword": "newPassword123"
}
 










*/