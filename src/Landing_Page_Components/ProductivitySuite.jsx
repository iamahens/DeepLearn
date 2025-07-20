import React, { useState, useEffect } from 'react';

const ProductivitySuite = () => {
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

  const products = [
    {
      id: 1,
      title: 'Study Dashboard',
      icon: '📈',
      bgColor: '#ffc107',
      hoverColor: '#ffb300',
      newFeature: 'Achievement tracking & gamified learning experience',
      features: [
        'Track daily study time and achievements',
        'Gain experience levels as you learn',
        'Monitor your progress with visual charts'
      ],
      buttonText: 'Open Dashboard',
      buttonIcon: '🔗',
      link: 'https://deep-learn-nine.vercel.app/dashboard' // Replace with your actual URL
    },
    {
      id: 2,
      title: 'Study Center',
      icon: '💡',
      bgColor: '#9c27b0',
      hoverColor: '#8e24aa',
      newFeature: 'Flashcards & custom quiz question types',
      features: [
        'Create interactive flashcards for studying',
        'Generate custom quizzes from your materials',
        'Save and revisit your learning resources'
      ],
      buttonText: 'Study Now',
      buttonIcon: '🚀',
      link: 'https://deep-learn-nine.vercel.app/study-center' // Replace with your actual URL
    },
    {
      id: 3,
      title: 'Pomodoro Timer',
      icon: '⏲️',
      bgColor: '#ff5722',
      hoverColor: '#f4511e',
      newFeature: 'Integrated task management & focus streaks',
      features: [
        'Customizable work and break durations',
        'Integrated to-do list for task management',
        'Visual progress indicators and history'
      ],
      buttonText: 'Start Timer',
      buttonIcon: '▶️',
      link: 'https://deep-learn-nine.vercel.app/pomodora' // Replace with your actual URL
    },
    {
      id: 4,
      title: 'Reviewer Maker',
      icon: '📝',
      bgColor: '#2196f3',
      hoverColor: '#1976d2',
      newFeature: 'Improved file support & organization options',
      features: [
        'Extract key terms and definitions',
        'Organize content hierarchically',
        'Export to PDF, DOCX, or CSV formats'
      ],
      buttonText: 'Extract Notes',
      buttonIcon: '📋',
      link: 'https://deep-learn-nine.vercel.app/reviewer' // Replace with your actual URL
    }
  ];

  const handleButtonClick = (link) => {
    window.location.href = link;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%)',
      fontFamily: '"Press Start 2P", monospace, Arial, sans-serif',
      padding: 'clamp(20px, 5vw, 80px) clamp(10px, 3vw, 20px)',
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
          radial-gradient(2px 2px at 20px 30px, rgba(255, 193, 7, 0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(156, 39, 176, 0.3), transparent),
          radial-gradient(2px 2px at 90px 40px, rgba(255, 87, 34, 0.3), transparent),
          radial-gradient(2px 2px at 130px 80px, rgba(33, 150, 243, 0.3), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255, 179, 0, 0.3), transparent)
        `,
        backgroundSize: '200px 100px',
        animation: 'floatPixels 20s linear infinite',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <h1 style={{
            fontSize: 'clamp(16px, 4vw, 48px)',
            color: '#2c2c2c',
            marginBottom: '20px',
            textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            filter: glitchActive ? 'hue-rotate(90deg)' : 'none',
            transition: 'filter 0.1s ease',
            lineHeight: '1.2'
          }}>
            Our Productivity Suite
          </h1>
        </div>

        {/* Products Grid */}
        <div 
          className="products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
            gap: 'clamp(20px, 4vw, 40px)',
            alignItems: 'stretch'
          }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#ffffff',
                border: 'clamp(3px, 0.5vw, 6px) solid #2c2c2c',
                borderRadius: '0',
                padding: '0',
                position: 'relative',
                cursor: 'pointer',
                transform: hoveredCard === product.id ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: hoveredCard === product.id 
                  ? `clamp(10px, 2vw, 20px) clamp(10px, 2vw, 20px) 0px ${product.hoverColor}, 0 0 40px rgba(0,0,0,0.3)`
                  : 'clamp(5px, 1vw, 10px) clamp(5px, 1vw, 10px) 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
                animation: `cardFloat${(index % 2) + 1} 6s ease-in-out infinite`,
                overflow: 'hidden'
              }}
            >
              {/* Header Section */}
              <div style={{
                background: product.bgColor,
                padding: 'clamp(15px, 3vw, 30px)',
                borderBottom: 'clamp(2px, 0.3vw, 4px) solid #2c2c2c',
                position: 'relative'
              }}>
                {/* Icon */}
                <div style={{
                  position: 'absolute',
                  top: 'clamp(10px, 2vw, 20px)',
                  right: 'clamp(10px, 2vw, 20px)',
                  width: 'clamp(24px, 4vw, 40px)',
                  height: 'clamp(24px, 4vw, 40px)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'clamp(2px, 0.3vw, 3px) solid #2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(12px, 2.5vw, 20px)',
                  imageRendering: 'pixelated',
                  transform: hoveredCard === product.id ? 'rotate(360deg)' : 'rotate(0deg)',
                  transition: 'transform 0.6s ease'
                }}>
                  {product.icon}
                </div>

                <h3 style={{
                  fontSize: 'clamp(12px, 2.5vw, 20px)',
                  color: '#2c2c2c',
                  marginBottom: 'clamp(10px, 2vw, 20px)',
                  textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
                  paddingRight: 'clamp(30px, 6vw, 60px)',
                  lineHeight: '1.3'
                }}>
                  {product.title}
                </h3>

                {/* NEW Badge */}
                <div style={{
                  background: '#ffffff',
                  border: 'clamp(2px, 0.3vw, 3px) solid #2c2c2c',
                  padding: 'clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px)',
                  display: 'inline-block',
                  marginBottom: 'clamp(8px, 1.5vw, 15px)'
                }}>
                  <span style={{
                    fontSize: 'clamp(6px, 1.2vw, 10px)',
                    color: '#2c2c2c',
                    fontWeight: 'bold'
                  }}>
                    NEW:
                  </span>
                  <span style={{
                    fontSize: 'clamp(6px, 1.2vw, 10px)',
                    color: '#666',
                    marginLeft: 'clamp(4px, 1vw, 8px)',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {product.newFeature}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: 'clamp(15px, 3vw, 30px)' }}>
                {/* Features List */}
                <div style={{ marginBottom: 'clamp(15px, 3vw, 30px)' }}>
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: 'clamp(8px, 1.5vw, 15px)',
                      fontSize: 'clamp(8px, 1.5vw, 12px)',
                      color: '#666',
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: '1.4'
                    }}>
                      <div style={{
                        width: 'clamp(4px, 1vw, 8px)',
                        height: 'clamp(4px, 1vw, 8px)',
                        background: product.bgColor,
                        marginRight: 'clamp(6px, 1.5vw, 12px)',
                        marginTop: 'clamp(3px, 0.8vw, 6px)',
                        flexShrink: 0,
                        imageRendering: 'pixelated'
                      }} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleButtonClick(product.link)}
                  style={{
                    width: '100%',
                    background: product.bgColor,
                    border: 'clamp(2px, 0.4vw, 4px) solid #2c2c2c',
                    color: '#2c2c2c',
                    padding: 'clamp(8px, 2vw, 15px) clamp(10px, 2.5vw, 20px)',
                    fontSize: 'clamp(8px, 1.8vw, 14px)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textShadow: '1px 1px 0px rgba(255,255,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(5px, 1vw, 10px)',
                    transform: hoveredCard === product.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === product.id ? `0 0 20px ${product.bgColor}50` : 'none',
                    minHeight: 'clamp(32px, 5vw, 48px)'
                  }}
                >
                  <span>{product.buttonIcon}</span>
                  <span>{product.buttonText}</span>
                </button>
              </div>

              {/* Pixel corners */}
              <div style={{
                position: 'absolute',
                top: 'clamp(-2px, -0.3vw, -3px)',
                left: 'clamp(-2px, -0.3vw, -3px)',
                width: 'clamp(6px, 1.5vw, 12px)',
                height: 'clamp(6px, 1.5vw, 12px)',
                background: product.bgColor,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                top: 'clamp(-2px, -0.3vw, -3px)',
                right: 'clamp(-2px, -0.3vw, -3px)',
                width: 'clamp(6px, 1.5vw, 12px)',
                height: 'clamp(6px, 1.5vw, 12px)',
                background: product.bgColor,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 'clamp(-2px, -0.3vw, -3px)',
                left: 'clamp(-2px, -0.3vw, -3px)',
                width: 'clamp(6px, 1.5vw, 12px)',
                height: 'clamp(6px, 1.5vw, 12px)',
                background: product.bgColor,
                imageRendering: 'pixelated'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 'clamp(-2px, -0.3vw, -3px)',
                right: 'clamp(-2px, -0.3vw, -3px)',
                width: 'clamp(6px, 1.5vw, 12px)',
                height: 'clamp(6px, 1.5vw, 12px)',
                background: product.bgColor,
                imageRendering: 'pixelated'
              }} />

              {/* Hover sparkle */}
              {hoveredCard === product.id && (
                <div style={{
                  position: 'absolute',
                  top: 'clamp(5px, 1vw, 10px)',
                  left: 'clamp(5px, 1vw, 10px)',
                  width: 'clamp(3px, 0.8vw, 6px)',
                  height: 'clamp(3px, 0.8vw, 6px)',
                  background: product.hoverColor,
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
          top: 'clamp(10px, 2vw, 20px)',
          right: 'clamp(10px, 2vw, 20px)',
          width: 'clamp(40px, 8vw, 60px)',
          height: 'clamp(40px, 8vw, 60px)',
          background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
          border: 'clamp(2px, 0.4vw, 4px) solid #2c2c2c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(16px, 3vw, 24px)',
          animation: 'badge 3s ease-in-out infinite',
          cursor: 'pointer',
          imageRendering: 'pixelated',
          zIndex: 1000
        }}>
          🎮
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

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes badge {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
        }

        @media (max-width: 480px) {
          .productivity-suite {
            padding: 20px 10px;
          }
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 767px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductivitySuite;
