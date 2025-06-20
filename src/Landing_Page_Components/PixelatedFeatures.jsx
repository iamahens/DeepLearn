import React, { useState, useEffect } from 'react';

const PixelatedFeatures = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Trigger random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 1,
      icon: '🤖',
      title: 'AI-Powered Tools',
      description: 'Advanced algorithms that understand context and create interactive learning materials from your documents and content.',
      color: '#ff6b35',
      pixelColor: '#ff4500'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Focus Enhancement',
      description: 'Structured methods to improve concentration and productivity with our Pomodoro timer featuring day streaks and task management.',
      color: '#4a90e2',
      pixelColor: '#1e90ff'
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Gamified Learning',
      description: 'Track achievements, gain experience levels, and maintain learning streaks with our gamified study tools to stay motivated.',
      color: '#ff6b35',
      pixelColor: '#ff8c00'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%)',
      fontFamily: '"Press Start 2P", monospace, Arial, sans-serif',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating pixels background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255, 107, 53, 0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(74, 144, 226, 0.3), transparent),
          radial-gradient(2px 2px at 90px 40px, rgba(255, 140, 0, 0.3), transparent),
          radial-gradient(2px 2px at 130px 80px, rgba(255, 69, 0, 0.3), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(30, 144, 255, 0.3), transparent)
        `,
        backgroundSize: '200px 100px',
        animation: 'floatPixels 20s linear infinite',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            color: '#2c2c2c',
            marginBottom: '20px',
            textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            filter: glitchActive ? 'hue-rotate(90deg)' : 'none',
            transition: 'filter 0.1s ease'
          }}>
            Why Choose DeepTerm?
          </h1>
          <div style={{
            width: '80px',
            height: '8px',
            background: 'linear-gradient(90deg, #ff6b35, #ff8c00)',
            margin: '0 auto',
            imageRendering: 'pixelated',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
          }} />
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#ffffff',
                border: '6px solid #2c2c2c',
                borderRadius: '0',
                padding: '40px 30px',
                position: 'relative',
                cursor: 'pointer',
                transform: hoveredCard === feature.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: hoveredCard === feature.id 
                  ? `20px 20px 0px ${feature.pixelColor}, 0 0 40px rgba(0,0,0,0.3)`
                  : '10px 10px 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
                animation: `cardFloat${index + 1} 6s ease-in-out infinite`
              }}
            >
              {/* Pixel corners */}
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                width: '12px',
                height: '12px',
                background: feature.color,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '12px',
                height: '12px',
                background: feature.color,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-3px',
                left: '-3px',
                width: '12px',
                height: '12px',
                background: feature.color,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-3px',
                right: '-3px',
                width: '12px',
                height: '12px',
                background: feature.color,
                imageRendering: 'pixelated'
              }} />

              {/* Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, ${feature.color}, ${feature.pixelColor})`,
                border: '4px solid #2c2c2c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '30px',
                imageRendering: 'pixelated',
                transform: hoveredCard === feature.id ? 'rotate(360deg)' : 'rotate(0deg)',
                transition: 'transform 0.6s ease',
                boxShadow: `inset 0 0 0 4px ${feature.color}40`
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '18px',
                color: '#2c2c2c',
                marginBottom: '20px',
                lineHeight: '1.4',
                textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.8',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.5px'
              }}>
                {feature.description}
              </p>

              {/* Hover effect particles */}
              {hoveredCard === feature.id && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '8px',
                  height: '8px',
                  background: feature.color,
                  animation: 'sparkle 1s ease-in-out infinite',
                  imageRendering: 'pixelated'
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Achievement badge */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
          border: '4px solid #2c2c2c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          animation: 'badge 3s ease-in-out infinite',
          cursor: 'pointer',
          imageRendering: 'pixelated',
          zIndex: 1000
        }}>
          ⭐
        </div>
      </div>

      <style jsx>{`
        @keyframes floatPixels {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }

        @keyframes cardFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes cardFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
        }

        @keyframes cardFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes badge {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
        }

       /* Default (desktop) is already handled inline */

/* Large tablets and small laptops */
@media (max-width: 1024px) and (min-width: 769px) {
  [style*="gridTemplateColumns"] {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  h1 {
    font-size: 36px !important;
  }

  h3 {
    font-size: 16px !important;
  }

  p {
    font-size: 11px !important;
  }
}

/* Tablets and large phones */
@media (max-width: 768px) {
  [style*="gridTemplateColumns"] {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  h1 {
    font-size: 28px !important;
  }

  h3 {
    font-size: 14px !important;
  }

  p {
    font-size: 10px !important;
  }

  [style*="padding: 40px 30px"] {
    padding: 30px 20px !important;
  }

  [style*="width: 80px"][style*="height: 80px"] {
    width: 60px !important;
    height: 60px !important;
    font-size: 24px !important;
    margin-bottom: 20px !important;
  }
}

/* Small phones */
@media (max-width: 480px) {
  h1 {
    font-size: 22px !important;
  }

  h3 {
    font-size: 12px !important;
  }

  p {
    font-size: 9px !important;
  }

  [style*="padding: 40px 30px"] {
    padding: 20px 15px !important;
  }

  [style*="width: 80px"][style*="height: 80px"] {
    width: 50px !important;
    height: 50px !important;
    font-size: 20px !important;
  }

  [style*="position: absolute"][style*="top: 20px"][style*="right: 20px"] {
    width: 40px !important;
    height: 40px !important;
    font-size: 18px !important;
  }
}

/* Very small devices */
@media (max-width: 360px) {
  h1 {
    font-size: 18px !important;
  }

  h3 {
    font-size: 10px !important;
  }

  p {
    font-size: 8px !important;
  }

  [style*="padding: 40px 30px"] {
    padding: 16px 12px !important;
  }

  [style*="width: 80px"][style*="height: 80px"] {
    width: 40px !important;
    height: 40px !important;
    font-size: 16px !important;
  }
}

      `}</style>
    </div>
  );
};

export default PixelatedFeatures;