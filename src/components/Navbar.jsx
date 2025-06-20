import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{`
        /* Import a pixelated font from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        * {
          box-sizing: border-box;
        }

        .pixel-navbar {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 4px solid #333;
          box-shadow: 
            0 4px 0 #222,
            0 8px 0 #111,
            0 12px 20px rgba(0, 0, 0, 0.3);
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 10px;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          position: relative;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          position: relative;
        }

        /* Logo Styles */
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          perspective: 100px;
        }

        .pixel-cube {
          position: relative;
          width: 40px;
          height: 40px;
          transform-style: preserve-3d;
          animation: float 3s ease-in-out infinite;
        }

        .cube-face {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          box-shadow: inset 0 0 0 2px #fff;
        }

        .cube-front {
          background: linear-gradient(45deg, #ffc107 0%, #ff8f00 100%);
          transform: translateZ(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #333;
          font-size: 8px;
        }

        .cube-top {
          background: linear-gradient(45deg, #ffeb3b 0%, #ffc107 100%);
          transform: rotateX(90deg) translateZ(20px);
        }

        .cube-right {
          background: linear-gradient(45deg, #ff9800 0%, #f57c00 100%);
          transform: rotateY(90deg) translateZ(20px);
        }

        .logo-text {
          font-size: 16px;
          font-weight: bold;
          background: linear-gradient(45deg, #333, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
        }

        /* Navigation Links */
        .nav-links {
        margin-left:2px;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .nav-btn, .mobile-nav-btn {
        margin:10px;
          padding: 12px 16px;
          border: 3px solid #333;
          border-radius: 0;
          font-family: inherit;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 
            3px 3px 0 #222,
            6px 6px 0 #111;
        }

        .nav-btn:hover, .mobile-nav-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            5px 5px 0 #222,
            8px 8px 0 #111;
        }

        .nav-btn:active, .mobile-nav-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 
            1px 1px 0 #222,
            2px 2px 0 #111;
        }

        .btn-icon {
          font-size: 12px;
          filter: 
            contrast(1.2) 
            saturate(1.3)
            drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.3));
        }

        /* Button Color Themes */
        .home-btn {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          color: #333;
          border-color: #6c757d;
        }

        .home-btn:hover {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
        }

        .reviewer-btn {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          color: white;
          border-color: #0c5460;
        }

        .reviewer-btn:hover {
          background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
        }

        .pomodoro-btn {
          background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
          color: #333;
          border-color: #b8860b;
        }

        .pomodoro-btn:hover {
          background: linear-gradient(135deg, #ffcd39 0%, #ffc107 100%);
        }

        .study-btn {
          background: linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%);
          color: white;
          border-color: #4c1d7a;
        }

        .study-btn:hover {
          background: linear-gradient(135deg, #8a63d2 0%, #6f42c1 100%);
        }

        .dashboard-btn {
          background: linear-gradient(135deg, #fd7e14 0%, #e8590c 100%);
          color: white;
          border-color: #c44500;
        }

        .dashboard-btn:hover {
          background: linear-gradient(135deg, #fd9843 0%, #fd7e14 100%);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: #333;
          border: 3px solid #666;
          padding: 12px;
          cursor: pointer;
          box-shadow: 3px 3px 0 #222;
        }

        .mobile-menu-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #222;
        }

        .hamburger {
          width: 24px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger-line {
          width: 100%;
          height: 3px;
          background: #fff;
          transition: all 0.3s ease;
        }

        .hamburger.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Navigation */
        .mobile-nav {
          display: none;
          flex-direction: column;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-top: 3px solid #333;
          box-shadow: inset 0 3px 0 #666;
          padding: 16px;
          gap: 12px;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .mobile-nav.active {
          display: flex;
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-nav-btn {
          width: 100%;
          justify-content: flex-start;
          padding: 16px 20px;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-8px) rotateY(180deg); }
        }

        /* Pixel Grid Background Effect */
        .pixel-navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 8px 8px;
          pointer-events: none;
          z-index: -1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .logo-text {
            font-size: 12px;
          }
          
          .pixel-cube {
            width: 32px;
            height: 32px;
          }
          
          .cube-face {
            width: 32px;
            height: 32px;
          }
          
          .cube-front {
            transform: translateZ(16px);
            font-size: 6px;
          }
          
          .cube-top {
            transform: rotateX(90deg) translateZ(16px);
          }
          
          .cube-right {
            transform: rotateY(90deg) translateZ(16px);
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 8px 12px;
          }
          
          .logo-text {
            font-size: 10px;
          }
          
          .mobile-nav {
            padding: 12px;
            gap: 8px;
          }
          
          .mobile-nav-btn {
            padding: 12px 16px;
            font-size: 9px;
          }
        }

        /* Glitch effect for extra pixel flair */
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .logo:hover .logo-text {
          animation: glitch 0.3s ease-in-out;
        }
      `}</style>
    <nav className="pixel-navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <div className="pixel-cube">
              <div className="cube-face cube-front">3D</div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-right"></div>
            </div>
          </div>
          <span className="logo-text">DeepTerm</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/" className="nav-btn home-btn">
            <span className="btn-icon">🏠</span>
            Home
          </Link>
          <Link to="/reviewer" className="nav-btn reviewer-btn">
            <span className="btn-icon">📋</span>
            Reviewer
          </Link>
          <Link to="/pomodora" className="nav-btn pomodoro-btn">
            <span className="btn-icon">🍅</span>
            Pomodoro
          </Link>
          <Link to="/study-center" className="nav-btn study-btn">
            <span className="btn-icon">📚</span>
            Study Center
          </Link>
          <Link to="/dashboard" className="nav-btn dashboard-btn">
            <span className="btn-icon">📊</span>
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="mobile-nav-btn home-btn" onClick={() => setIsMenuOpen(false)}>
            <span className="btn-icon">🏠</span>
            Home
          </Link>
          <Link to="/reviewer" className="mobile-nav-btn reviewer-btn" onClick={() => setIsMenuOpen(false)}>
            <span className="btn-icon">📋</span>
            Reviewer
          </Link>
          <Link to="/pomodora" className="mobile-nav-btn pomodoro-btn" onClick={() => setIsMenuOpen(false)}>
            <span className="btn-icon">🍅</span>
            Pomodoro
          </Link>
          <Link to="/study-center" className="mobile-nav-btn study-btn" onClick={() => setIsMenuOpen(false)}>
            <span className="btn-icon">📚</span>
            Study Center
          </Link>
          <Link to="/dashboard" className="mobile-nav-btn dashboard-btn" onClick={() => setIsMenuOpen(false)}>
            <span className="btn-icon">📊</span>
            Dashboard
          </Link>
        </div>
    </nav>
    </>
  );
};

export default NavBar;