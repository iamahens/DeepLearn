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
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
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

        .section-container {
          background: linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%);
          font-family: 'Press Start 2P', monospace, Arial, sans-serif;
          padding: 60px 30px;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .floating-pixels {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(2px 2px at 20px 30px, rgba(255, 107, 53, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(74, 144, 226, 0.3), transparent),
            radial-gradient(2px 2px at 90px 40px, rgba(255, 140, 0, 0.3), transparent),
            radial-gradient(2px 2px at 130px 80px, rgba(255, 69, 0, 0.3), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(30, 144, 255, 0.3), transparent);
          background-size: 200px 100px;
          animation: floatPixels 20s linear infinite;
          pointer-events: none;
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
        }

        .main-title {
          font-size: clamp(18px, 4vw, 48px);
          color: #2c2c2c;
          margin-bottom: 20px;
          text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
          filter: ${glitchActive ? 'hue-rotate(90deg)' : 'none'};
          transition: filter 0.1s ease;
        }

        .title-divider {
          width: 80px;
          height: 8px;
          background: linear-gradient(90deg, #ff6b35, #ff8c00);
          margin: 0 auto;
          image-rendering: pixelated;
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 50px;
          align-items: stretch;
        }

        .feature-card {
          background: #ffffff;
          border: 6px solid #2c2c2c;
          border-radius: 0;
          padding: 40px 30px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 10px 10px 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1);
          image-rendering: pixelated;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .feature-card:nth-child(1) {
          animation: cardFloat1 6s ease-in-out infinite;
        }

        .feature-card:nth-child(2) {
          animation: cardFloat2 6s ease-in-out infinite;
        }

        .feature-card:nth-child(3) {
          animation: cardFloat3 6s ease-in-out infinite;
        }

        .pixel-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          image-rendering: pixelated;
        }

        .pixel-corner.top-left {
          top: -3px;
          left: -3px;
        }

        .pixel-corner.top-right {
          top: -3px;
          right: -3px;
        }

        .pixel-corner.bottom-left {
          bottom: -3px;
          left: -3px;
        }

        .pixel-corner.bottom-right {
          bottom: -3px;
          right: -3px;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          border: 4px solid #2c2c2c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 25px;
          image-rendering: pixelated;
          transition: transform 0.6s ease;
          flex-shrink: 0;
        }

        .feature-icon:hover {
          transform: rotate(360deg);
        }

        .feature-title {
          font-size: 16px;
          color: #2c2c2c;
          margin-bottom: 15px;
          line-height: 1.4;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .feature-description {
          font-size: 11px;
          color: #666;
          line-height: 1.6;
          font-family: Arial, sans-serif;
          letter-spacing: 0.5px;
          flex-grow: 1;
        }

        .sparkle {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 8px;
          height: 8px;
          animation: sparkle 1s ease-in-out infinite;
          image-rendering: pixelated;
        }

        .achievement-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          border: 4px solid #2c2c2c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          animation: badge 3s ease-in-out infinite;
          cursor: pointer;
          image-rendering: pixelated;
          z-index: 1000;
        }

        /* Large desktop styles */
        @media (min-width: 1280px) {
          .content-wrapper {
            max-width: 1600px;
          }
          
          .features-grid {
            gap: 60px;
          }
          
          .feature-card {
            padding: 50px 40px;
            min-height: 380px;
          }
          
          .feature-icon {
            width: 80px;
            height: 80px;
            font-size: 32px;
            margin-bottom: 30px;
          }
          
          .feature-title {
            font-size: 18px;
            margin-bottom: 20px;
          }
          
          .feature-description {
            font-size: 12px;
            line-height: 1.8;
          }
          
          .achievement-badge {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
        }

        /* Tablet styles */
        @media (max-width: 1199px) and (min-width: 769px) {
          .content-wrapper {
            max-width: 1000px;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          
          .feature-card {
            padding: 30px 25px;
            min-height: 280px;
          }
          
          .main-title {
            font-size: clamp(24px, 4vw, 36px);
          }
          
          .feature-title {
            font-size: 14px;
          }
          
          .feature-description {
            font-size: 10px;
          }
          
          .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .section-container {
            padding: 40px 20px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .feature-card {
            padding: 25px 20px;
            min-height: 220px;
          }
          
          .main-title {
            font-size: clamp(16px, 5vw, 28px);
          }
          
          .feature-title {
            font-size: 12px;
            margin-bottom: 12px;
          }
          
          .feature-description {
            font-size: 9px;
            line-height: 1.5;
          }
          
          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
            margin-bottom: 20px;
          }
          
          .achievement-badge {
            width: 40px;
            height: 40px;
            font-size: 16px;
            top: 15px;
            right: 15px;
          }
          
          .header {
            margin-bottom: 40px;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .section-container {
            padding: 30px 15px;
          }
          
          .feature-card {
            padding: 20px 15px;
            min-height: 200px;
          }
          
          .main-title {
            font-size: clamp(14px, 6vw, 22px);
          }
          
          .feature-title {
            font-size: 11px;
          }
          
          .feature-description {
            font-size: 8px;
          }
          
          .feature-icon {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .achievement-badge {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
        }
      `}</style>

      <section className="section-container">
        {/* Floating pixels background */}
        <div className="floating-pixels" />

        <div className="content-wrapper">
          {/* Header */}
          <div className="header">
            <h2 className="main-title">
              Why Choose DeepTerm?
            </h2>
            <div className="title-divider" />
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-card"
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === feature.id 
                    ? `20px 20px 0px ${feature.pixelColor}, 0 0 40px rgba(0,0,0,0.3)`
                    : '10px 10px 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1)'
                }}
              >
                {/* Pixel corners */}
                <div className="pixel-corner top-left" style={{ background: feature.color }} />
                <div className="pixel-corner top-right" style={{ background: feature.color }} />
                <div className="pixel-corner bottom-left" style={{ background: feature.color }} />
                <div className="pixel-corner bottom-right" style={{ background: feature.color }} />

                {/* Icon */}
                <div 
                  className="feature-icon"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.pixelColor})`,
                    boxShadow: `inset 0 0 0 4px ${feature.color}40`,
                    transform: hoveredCard === feature.id ? 'rotate(360deg)' : 'rotate(0deg)'
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="feature-title">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="feature-description">
                  {feature.description}
                </p>

                {/* Hover effect particles */}
                {hoveredCard === feature.id && (
                  <div 
                    className="sparkle"
                    style={{ background: feature.color }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Achievement badge */}
          <div className="achievement-badge">
            ⭐
          </div>
        </div>
      </section>
    </>
  );
};

export default PixelatedFeatures;