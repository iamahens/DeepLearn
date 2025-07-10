import React, { useState, useEffect } from 'react';

const Allyouneed = () => {
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
      icon: '🚀',
      title: 'Progress Tracking',
      description: 'Track study time, achievements, and learning milestones on your personal dashboard',
      color: '#ff6b35',
      pixelColor: '#ff4500'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Flashcards',
      description: 'Create and review custom flashcards with spaced repetition for better retention',
      color: '#4a90e2',
      pixelColor: '#1e90ff'
    },
    {
      id: 3,
      icon: '📜',
      title: 'Custom Quizzes',
      description: 'Generate personalized quizzes from your study materials with multiple question types',
      color: '#ff6b35',
      pixelColor: '#ff8c00'
    },
    { 
      id: 4,
      icon: '📚',
      title: 'Notes Extraction',
      description: 'Transform complex documents into organized notes with key terms and definitions',
      color: '#78ff35',
      pixelColor: '#00ffaa'
    },
    {
      id: 5,
      icon: '📜',
      title: 'Pomodoro Timer',
      description: 'Stay focused with customizable work and break cycles and integrated task management',
      color: '#ff35a4',
      pixelColor: '#f877be'
    },
    {
      id: 6,
      icon: '🏆',
      title: 'Achievements',
      description: 'Earn badges and unlock achievements as you reach learning and productivity milestones',
      color: '#9a0a9f',
      pixelColor: '#d562ff'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ fontFamily: '"Press Start 2P", monospace, Arial, sans-serif' }}>
      {/* Floating pixels background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            background: `
              radial-gradient(2px 2px at 20px 30px, rgba(255, 107, 53, 0.3), transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(74, 144, 226, 0.3), transparent),
              radial-gradient(2px 2px at 90px 40px, rgba(255, 140, 0, 0.3), transparent),
              radial-gradient(2px 2px at 130px 80px, rgba(255, 69, 0, 0.3), transparent),
              radial-gradient(2px 2px at 160px 30px, rgba(30, 144, 255, 0.3), transparent)
            `,
            backgroundSize: '200px 100px',
            animation: 'floatPixels 20s linear infinite',
            imageRendering: 'pixelated'
          }}
        />
      </div>

      <div className="w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 w-full">
          <h1 
            className="text-2xl sm:text-3xl lg:text-5xl text-gray-800 mb-4 sm:mb-6 font-bold"
            style={{
              fontFamily: '"Press Start 2P", monospace, Arial, sans-serif',
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
              filter: glitchActive ? 'hue-rotate(90deg)' : 'none',
              transition: 'filter 0.1s ease',
              marginBottom:'30px',
              marginTop:'30px',
            }}
          >
            Why Choose DeepTerm?
          </h1>
          <div 
            className="w-16 sm:w-20 lg:w-24 h-2 mx-auto"
            style={{
              background: 'linear-gradient(90deg, #ff6b35, #ff8c00)',
              imageRendering: 'pixelated',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
            }}
          />
        </div>

        {/* Features Grid */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white border-4 sm:border-6 border-gray-800 relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 w-full max-w-sm"
              style={{
                borderRadius: '0',
                padding: window.innerWidth >= 1024 ? '48px 30px' : window.innerWidth >= 640 ? '32px 24px' : '24px 20px',
                boxShadow: hoveredCard === feature.id 
                  ? `20px 20px 0px ${feature.pixelColor}, 0 0 40px rgba(0,0,0,0.3)`
                  : '10px 10px 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
                animation: `cardFloat${(index % 3) + 1} 6s ease-in-out infinite`
              }}
            >
              {/* Pixel corners */}
              <div 
                className="absolute -top-1 -left-1"
                style={{ 
                  width: window.innerWidth >= 1024 ? '12px' : '8px',
                  height: window.innerWidth >= 1024 ? '12px' : '8px',
                  background: feature.color, 
                  imageRendering: 'pixelated' 
                }}
              />
              <div 
                className="absolute -top-1 -right-1"
                style={{ 
                  width: window.innerWidth >= 1024 ? '12px' : '8px',
                  height: window.innerWidth >= 1024 ? '12px' : '8px',
                  background: feature.color, 
                  imageRendering: 'pixelated' 
                }}
              />
              <div 
                className="absolute -bottom-1 -left-1"
                style={{ 
                  width: window.innerWidth >= 1024 ? '12px' : '8px',
                  height: window.innerWidth >= 1024 ? '12px' : '8px',
                  background: feature.color, 
                  imageRendering: 'pixelated' 
                }}
              />
              <div 
                className="absolute -bottom-1 -right-1"
                style={{ 
                  width: window.innerWidth >= 1024 ? '12px' : '8px',
                  height: window.innerWidth >= 1024 ? '12px' : '8px',
                  background: feature.color, 
                  imageRendering: 'pixelated' 
                }}
              />

              {/* Icon */}
              <div 
                className="border-4 border-gray-800 flex items-center justify-center mx-auto transition-transform duration-500"
                style={{
                  width: window.innerWidth >= 1024 ? '80px' : window.innerWidth >= 640 ? '64px' : '56px',
                  height: window.innerWidth >= 1024 ? '80px' : window.innerWidth >= 640 ? '64px' : '56px',
                  fontSize: window.innerWidth >= 1024 ? '32px' : window.innerWidth >= 640 ? '28px' : '24px',
                  marginBottom: window.innerWidth >= 1024 ? '30px' : window.innerWidth >= 640 ? '24px' : '20px',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.pixelColor})`,
                  imageRendering: 'pixelated',
                  transform: hoveredCard === feature.id ? 'rotate(360deg)' : 'rotate(0deg)',
                  boxShadow: `inset 0 0 0 4px ${feature.color}40`
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 
                className="text-gray-800 text-center leading-tight"
                style={{ 
                  fontSize: window.innerWidth >= 1024 ? '18px' : window.innerWidth >= 640 ? '16px' : '14px',
                  marginBottom: window.innerWidth >= 1024 ? '20px' : window.innerWidth >= 640 ? '16px' : '12px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.1)' 
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p 
                className="text-gray-600 leading-relaxed text-center font-sans"
                style={{ 
                  fontSize: window.innerWidth >= 1024 ? '12px' : window.innerWidth >= 640 ? '11px' : '10px',
                  letterSpacing: '0.5px' 
                }}
              >
                {feature.description}
              </p>

              {/* Hover effect particles */}
              {hoveredCard === feature.id && (
                <div 
                  className="absolute top-4 right-4 w-2 h-2 animate-pulse"
                  style={{
                    background: feature.color,
                    animation: 'sparkle 1s ease-in-out infinite',
                    imageRendering: 'pixelated'
                  }}
                />
              )}
            </div>
                      ))}
          </div>
        </div>

        {/* Achievement badge */}
        <div 
          className="fixed top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-800 flex items-center justify-center text-xl sm:text-2xl cursor-pointer z-50"
          style={{
            background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
            animation: 'badge 3s ease-in-out infinite',
            imageRendering: 'pixelated'
          }}
        >
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
      `}</style>
    </div>
  );
};

export default Allyouneed;