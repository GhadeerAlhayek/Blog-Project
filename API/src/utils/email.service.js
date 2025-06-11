import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Blog App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - Blog App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333;">Blog App</h1>
            <h2 style="color: #666; font-weight: normal;">Password Reset Request</h2>
          </div>
          
          <p style="color: #555; line-height: 1.6;">Hello,</p>
          
          <p style="color: #555; line-height: 1.6;">
            You requested to reset your password. Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset My Password
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            If the button doesn't work, copy and paste this link:
          </p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; word-break: break-all;">
            <a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px;">
              <strong>Important:</strong> This link expires in 1 hour.
            </p>
            <p style="color: #888; font-size: 14px;">
              If you didn't request this, please ignore this email.
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', result.messageId);
    return result;
    
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};