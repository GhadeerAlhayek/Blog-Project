import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import SignIn from "../Auth/SignIn.jsx";
import SignUp from "../Auth/SignUp.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    setIsMenuOpen(false); // Close menu after logout
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>DOM NEWS</h1>
          </div>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <span className="nav-link">Loading...</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>DOM NEWS</h1>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Navigation Menu */}
          <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  🏠 Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      📊 Dashboard
                    </Link>
                  </li>
                  {/* Add Admin Panel link for admin users */}
                  {user?.role === "admin" && (
                    <li className="nav-item">
                      <Link
                        to="/admin"
                        className="nav-link"
                        onClick={closeMenu}
                      >
                        ⚙️ Admin Panel
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <span className="nav-link user-welcome">
                      👋 Welcome, {user?.name || "User"}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link logout-btn"
                      onClick={handleSignOut}
                    >
                      🚪 Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link signin-btn"
                    onClick={() => {
                      setShowSignIn(true);
                      closeMenu();
                    }}
                  >
                    🔐 Sign In
                  </button>
                </li>
              )}
              <li className="nav-item">
                <a href="#about" className="nav-link" onClick={closeMenu}>
                  📖 About
                </a>
              </li>
            </ul>
          </nav>

          {/* Menu Overlay */}
          {isMenuOpen && (
            <div className="menu-overlay" onClick={closeMenu}></div>
          )}
        </div>
      </header>

      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </>
  );
}
