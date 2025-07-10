import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import ApiService from "../../utils/api.js";

export default function SignIn({ onClose, onSwitchToSignUp }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await ApiService.login(formData.email, formData.password);

      if (!data || !data.user || !data.token) {
        setError("Invalid response from server");
        return;
      }

      login(data.user, data.token);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-overlay" onClick={onClose}></div>
      <div className="auth-modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your DOM NEWS account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?
            <button
              type="button"
              className="link-btn"
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </button>
          </p>
          <button type="button" className="link-btn">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
