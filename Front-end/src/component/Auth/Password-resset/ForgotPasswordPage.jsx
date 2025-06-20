import React, { useState } from "react";

const ForgotPassword = ({ onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      onForgotPassword?.(formData);
      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: "Failed to send reset link. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="signin-container">
        <div className="signin-card">
          <h2>Check Your Email</h2>
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>We've sent a password reset link to:</p>
            <div className="email-display">{formData.email}</div>
            <p className="success-note">
              Please check your email and follow the instructions to reset your password.
            </p>
            <p className="success-note">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
          <div className="signin-footer">
            <a href="/" className="btn-link">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Reset Password</h2>
        <div className="forgot-password-info">
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signin-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter your email address"
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="signin-footer">
          <span>
            Remember your password?{" "}
            <a href="/" className="btn-link">
              Back to Sign In
            </a>
          </span>
          <span>
            Don't have an account?{" "}
            <a href="/signup" className="btn-link">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;