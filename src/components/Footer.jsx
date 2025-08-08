import React from 'react';

/**
 * A simple, reusable footer component for the DeepLearn application.
 *
 * How to use:
 * 1. Import this component into your main layout or individual page components:
 * `import Footer from './Footer';` (adjust path as needed)
 * 2. Place the `<Footer />` tag at the bottom of your page's JSX structure.
 */
const Footer = () => {
  return (
    <>
      <style>{`
        .app-footer {
          font-family: 'VT323', monospace;
          background-color: #ffffff; /* White background */
          color: #666; /* Darker text for readability */
          padding: clamp(20px, 4vw, 30px) clamp(20px, 5vw, 50px);
          margin-top: clamp(40px, 8vw, 80px);
          border-top: 2px dashed #ccc; /* Subtle dashed top border */
          display: flex;
          justify-content: center; /* Center the content */
          align-items: center;
          text-align: center;
        }
        .footer-brand .app-name {
          font-family: 'Press Start 2P', cursive;
          font-size: clamp(16px, 2.5vw, 20px);
          color: #444; /* Darker color for the app name */
          margin: 0 0 8px 0;
        }
        .footer-brand .copyright-text {
          font-size: clamp(14px, 2vw, 16px);
          margin: 0;
          color: #888;
        }
      `}</style>
      <footer className="app-footer">
        <div className="footer-brand">
          <p className="app-name">DeepLearn</p>
          <p className="copyright-text">© 2024 Neuronauts</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
