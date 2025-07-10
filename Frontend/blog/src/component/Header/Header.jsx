import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import SignIn from "../Auth/SignIn.jsx";
import SignUp from "../Auth/SignUp.jsx";
import { Link } from "react-router-dom";



export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignOut = () => {
    logout();
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
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      📊 Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      Welcome, {user?.name || "User"}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => setShowSignIn(true)}
                  >
                    Sign In
                  </button>
                </li>
              )}
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
            </ul>
          </nav>
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
