import React, { useState, useEffect } from 'react';

const FreeForeverCTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Trigger random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Trigger pulse effect on badge
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%)',
      fontFamily: '"Press Start 2P", monospace, Arial, sans-serif',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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

      {/* Main CTA Card */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        background: '#ffffff',
        border: '8px solid #2c2c2c',
        borderRadius: '20px',
        padding: '60px 40px',
        position: 'relative',
        textAlign: 'center',
        boxShadow: isHovered 
          ? '15px 15px 0px #2c2c2c, 0 0 50px rgba(0,0,0,0.3)'
          : '12px 12px 0px #2c2c2c, 0 0 30px rgba(0,0,0,0.1)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        imageRendering: 'pixelated',
        animation: 'cardFloat 8s ease-in-out infinite',
        zIndex: 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pixel corners */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '-4px',
          width: '16px',
          height: '16px',
          background: '#ffc107',
          imageRendering: 'pixelated'
        }} />
        <div style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '16px',
          height: '16px',
          background: '#ffc107',
          imageRendering: 'pixelated'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '-4px',
          width: '16px',
          height: '16px',
          background: '#ffc107',
          imageRendering: 'pixelated'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          right: '-4px',
          width: '16px',
          height: '16px',
          background: '#ffc107',
          imageRendering: 'pixelated'
        }} />

        {/* FREE FOREVER Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: '#ffffff',
          border: '4px solid #2c2c2c',
          borderRadius: '25px',
          padding: '12px 24px',
          marginBottom: '40px',
          transform: pulseActive ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)'
        }}>
          <div style={{
            fontSize: '16px',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            ⚡
          </div>
          <span style={{
            fontSize: '14px',
            color: '#2c2c2c',
            fontWeight: 'bold',
            textShadow: '1px 1px 0px rgba(255, 193, 7, 0.3)'
          }}>
            100% FREE FOREVER
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 48px)',
          color: '#2c2c2c',
          marginBottom: '30px',
          lineHeight: '1.2',
          textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
          filter: glitchActive ? 'hue-rotate(45deg)' : 'none',
          transition: 'filter 0.1s ease'
        }}>
          No Premium Tiers. No Hidden Fees.
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '50px',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '600px',
          margin: '0 auto 50px auto'
        }}>
          All tools are completely free to use without restrictions. No premium features, no account required, no limitations.
        </p>

        {/* CTA Button */}
        <button
          style={{
            background: 'linear-gradient(135deg, #ffc107, #ffb300)',
            border: '6px solid #2c2c2c',
            borderRadius: '0',
            padding: '20px 40px',
            fontSize: '18px',
            color: '#2c2c2c',
            fontWeight: 'bold',
            cursor: 'pointer',
            textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
            transform: isHovered ? 'scale(1.1) rotate(-2deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: isHovered 
              ? '10px 10px 0px #2c2c2c, 0 0 30px rgba(255, 193, 7, 0.6)'
              : '6px 6px 0px #2c2c2c, 0 0 15px rgba(255, 193, 7, 0.3)',
            imageRendering: 'pixelated',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Button shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: isHovered ? '100%' : '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transition: 'left 0.6s ease',
            pointerEvents: 'none'
          }} />
          
          <span style={{ position: 'relative', zIndex: 1 }}>
            🚀 Start Using Now
          </span>
        </button>

        {/* Decorative elements */}
        {isHovered && (
          <>
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              width: '8px',
              height: '8px',
              background: '#ffc107',
              animation: 'sparkle 1s ease-in-out infinite',
              imageRendering: 'pixelated'
            }} />
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '40px',
              width: '6px',
              height: '6px',
              background: '#ff6b35',
              animation: 'sparkle 1s ease-in-out infinite 0.3s',
              imageRendering: 'pixelated'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '50px',
              width: '10px',
              height: '10px',
              background: '#4a90e2',
              animation: 'sparkle 1s ease-in-out infinite 0.6s',
              imageRendering: 'pixelated'
            }} />
          </>
        )}
      </div>

      {/* Achievement badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '180px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
        border: '4px solid #2c2c2c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        animation: 'badge 3s ease-in-out infinite',
        cursor: 'pointer',
        imageRendering: 'pixelated',
        zIndex: 1
      }}>
        💎
      </div>

      <style jsx>{`
        @keyframes floatPixels {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes badge {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
        }

        @media (max-width: 768px) {
          div[style*="padding: 60px 40px"] {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FreeForeverCTA;