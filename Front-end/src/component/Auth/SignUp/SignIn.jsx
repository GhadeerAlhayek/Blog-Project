import React, { useState } from "react";
import { toast } from 'react-hot-toast';
// Remove this line: import { useNavigate } from 'react-router-dom';
import "./SignIn.scss";

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  
  // Remove this line: const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

    setErrors({});
    const toastId = toast.loading("Connexion en cours...");
    
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur de connexion");

      // Save token and user
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      toast.success(`Bienvenue ${data.data.user.name}!`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });

      // Call parent callback with navigation info
      onSignIn?.(data.data);

      // Use window.location for navigation instead of useNavigate
      const redirectPath = data.data.user.role === "admin" 
        ? "/admin/dashboard" 
        : "/user/dashboard";
      
      window.location.href = redirectPath;

    } catch (err) {
      toast.error("Échec de la connexion", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
          width: "200px",
        },
      });
      setErrors({ general: err.message });
    }
  };

  // Rest of your component...
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="signin-footer">
          <a href="#forgot">Forgot Password?</a>
          <span>
            Don't have an account? <a href="#signup">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;