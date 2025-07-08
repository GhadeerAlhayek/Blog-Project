import React, { useState, useEffect } from 'react';
import SignIn from '../Auth/SignIn.jsx';
import SignUp from '../Auth/SignUp.jsx';

export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>DOM NEWS</h1>
          </div>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#home" className="nav-link">Home</a>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Welcome, {user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setShowSignIn(true)}>
                    Sign In
                  </button>
                </li>
              )}
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {showSignIn && (
        <SignIn 
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={switchToSignUp}
        />
      )}

      {showSignUp && (
        <SignUp 
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={switchToSignIn}
        />
      )}
    </>
  );
}