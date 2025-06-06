import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto"; // it is biuld in library

/*********************************
 * Request a password reset
 * POST /api/auth/password/forgot
 *********************************/
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
  
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }
    

    const user = await UserModel.findByEmail(email);
    
    // For security reasons, always return success even if email doesn't exist
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If your email exists in our system, you will receive a password reset link"
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Generate reset JWT token that expires in 1 hour
    const resetJwt = jwt.sign(
      { userId: user.id, token: resetToken },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // In a production environment, send an email with the reset link
    // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetJwt}`;
    // await sendEmail(user.email, resetUrl);
    
    // For testing purposes, return the token
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email address",
      // Remove in production:
      resetToken: resetJwt
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process password reset request",
      error: error.message
    });
  }
};

/**********************************
 * Reset password with token
 * POST /api/auth/password/reset
 *********************************/
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required"
      });
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }
    
    // Verify token
   let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    
    // Force convert userId to number
    const userId = Number(decoded.userId);
    console.log("User ID for reset:", userId, "Type:", typeof userId);
    
    // Get user
    const user = await UserModel.findById(userId);
    console.log("User found:", user);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Only pass the password to update - don't pass other undefined fields
    const updatedUser = await UserModel.update(userId, { password: newPassword });
    
    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to update password"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};