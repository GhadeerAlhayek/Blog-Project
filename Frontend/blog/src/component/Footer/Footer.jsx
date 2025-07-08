import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <p className="tagline">Document Your Development Journey</p>
            <p className="copyright">© 2025 Ghadeer Alhayek. All rights reserved.</p>
          </div>
          
          <div className="footer-center">
            <button className="signup-btn">Sign Up</button>
          </div>
          
          <div className="footer-right">
            <button className="scroll-to-top" onClick={scrollToTop}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}