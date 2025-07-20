import React from 'react';

const HeroSection = () => {
  const styles = {
    container: {
      fontFamily: '"Press Start 2P", cursive',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5vh 5vw',
      position: 'relative',
      overflow: 'hidden',
    },
    pixelBackground: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #d0e7ff 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #b8d4ff 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      opacity: 0.3,
      zIndex: 1
    },
    background: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: `
        radial-gradient(2px 2px at 20px 30px, rgba(255, 107, 53, 0.3), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(74, 144, 226, 0.3), transparent),
        radial-gradient(2px 2px at 90px 40px, rgba(255, 140, 0, 0.3), transparent),
        radial-gradient(2px 2px at 130px 80px, rgba(255, 69, 0, 0.3), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(30, 144, 255, 0.3), transparent)
      `,
      backgroundSize: '200px 100px',
      animation: 'floatPixels 20s linear infinite',
      pointerEvents: 'none',
    },
    header: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      maxWidth: '90vw',
    },
    badge: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      padding: '0.4em 1em',
      borderRadius: '0px',
      border: '3px solid #2c3e50',
      boxShadow: '4px 4px 0px #2c3e50',
      fontSize: '0.6rem',
      marginBottom: '2rem',
      display: 'inline-block',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    title: {
      fontSize: '2.5rem',
      color: '#2c3e50',
      marginBottom: '1.5rem',
      lineHeight: '1.4',
      letterSpacing: '2px',
    },
    titleHighlight: {
      color: '#e74c3c',
      textShadow: '4px 4px 0px #c0392b',
    },
    description: {
      fontSize: '1rem',
      color: '#5a6c7d',
      lineHeight: '1.8',
      marginBottom: '2rem',
      maxWidth: '90vw',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2,
    },
    button: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '0.8rem',
      padding: '1rem 1.5rem',
      border: '3px solid #2c3e50',
      borderRadius: '0px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '4px 4px 0px #2c3e50',
      transition: 'all 0.1s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },
    buttonPrimary: {
      backgroundColor: '#f39c12',
      color: '#2c3e50',
    },
    buttonSecondary: {
      backgroundColor: '#9b59b6',
      color: '#fff',
    },
    buttonTertiary: {
      backgroundColor: '#3498db',
      color: '#fff',
    },
    starIcon: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '32px',
      height: '32px',
      backgroundColor: '#f39c12',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      border: '2px solid #2c3e50',
      zIndex: 3,
    },
    decorativePixels: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: '#e74c3c',
      boxShadow: '0 0 0 2px #2c3e50'
    },
    pixel1: { top: '20%', left: '10%', animationDelay: '0s' },
    pixel2: { top: '30%', right: '15%', animationDelay: '0.5s' },
    pixel3: { bottom: '25%', left: '20%', animationDelay: '1s' },
    pixel4: { bottom: '35%', right: '10%', animationDelay: '1.5s' },
  };

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked!`);
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translate(-2px, -2px)';
    e.target.style.boxShadow = '6px 6px 0px #2c3e50';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translate(0px, 0px)';
    e.target.style.boxShadow = '4px 4px 0px #2c3e50';
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      <div style={styles.pixelBackground}>
        <div style={styles.background}></div>
      </div>

      <div style={styles.starIcon}></div>

      {/* Decorative pixels */}
      <div style={{ ...styles.decorativePixels, ...styles.pixel1 }}></div>
      <div style={{ ...styles.decorativePixels, ...styles.pixel2 }}></div>
      <div style={{ ...styles.decorativePixels, ...styles.pixel3 }}></div>
      <div style={{ ...styles.decorativePixels, ...styles.pixel4 }}></div>

      <div style={styles.header}>
        <div style={styles.badge}>⚡ 100% FREE • No Paywalls • No Account Required</div>
        <h1 style={styles.title}>
          Boost your <span style={styles.titleHighlight}>productivity</span> with<br />
          DeepLearn
        </h1>
        <p style={styles.description}>
          Our AI-powered tools help you learn efficiently, create custom quizzes, extract
          organized notes, track progress, and maintain focus with our Pomodoro timer — all completely free.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick("Dashboard")}
          >
            Dashboard →
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick("Study Center")}
          >
            Study Center →
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonTertiary }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={() => handleButtonClick("Try Now")}
          >
            Try Now →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        div[style*="decorativePixels"] {
          animation: float 3s ease-in-out infinite;
        }

        div[style*="starIcon"] {
          animation: pulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.6rem !important;
          }
          p {
            font-size: 0.85rem !important;
          }
          .button {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
