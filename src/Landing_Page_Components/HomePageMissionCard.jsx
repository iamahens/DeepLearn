import React, { useEffect } from 'react';

/**
 * [NEW] Home Page Mission Highlight Component
 * A more visually engaging section for your home page to introduce the app's mission.
 * It's designed to be distinct from the full "About" page.
 */
export const HomePageMissionCard = () => {
  return (
    <>
      <style>{`
        .mission-highlight {
          background: #ffffff;
          border: 4px solid #2c2c2c;
          padding: clamp(25px, 5vw, 50px);
          box-shadow: 8px 8px 0 #ddd;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .mission-highlight {
            grid-template-columns: 1fr 2fr;
          }
        }
        .mission-highlight .font-title {
          font-family: 'Press Start 2P', cursive;
        }
        .mission-icon-container {
          text-align: center;
        }
        .mission-icon {
          font-size: clamp(60px, 15vw, 100px);
          line-height: 1;
          color: #14b8a6;
          text-shadow: 4px 4px 0 #2c2c2c;
          animation: icon-pulse 3s ease-in-out infinite;
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .mission-content {
          text-align: center;
        }
        @media (min-width: 768px) {
          .mission-content {
            text-align: left;
          }
        }
        .mission-title {
          font-size: clamp(20px, 3.5vw, 32px);
          color: #2c2c2c;
          margin-bottom: 15px;
        }
        .mission-text {
          font-family: 'VT323', monospace;
          font-size: clamp(18px, 2.2vw, 22px);
          color: #444;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .mission-button {
          display: inline-block;
          background: #14b8a6;
          border: 2px solid #2c2c2c;
          color: #fff;
          padding: 12px 24px;
          font-family: 'Press Start 2P', cursive;
          font-size: clamp(12px, 1.8vw, 16px);
          cursor: pointer;
          transition: all 0.2s ease;
          text-shadow: 2px 2px 0px #0d9488;
          box-shadow: 4px 4px 0px #2c2c2c;
        }
        .mission-button:hover {
            background: #0d9488;
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px #2c2c2c;
        }
      `}</style>
      <section className="mission-highlight">
        <div className="mission-icon-container">
            <div className="mission-icon">🌍</div>
        </div>
        <div className="mission-content">
            <h2 className="mission-title font-title">For Every Student</h2>
            <p className="mission-text">
              We believe powerful learning tools should be for everyone, not just a few. This app is our commitment to breaking down barriers for students in underserved communities.
            </p>
            {/* In your app, replace the href with your routing link e.g., <Link to="/about"> */}
            <a href="/about" className="mission-button">
              Our Mission &gt;
            </a>
        </div>
      </section>
    </>
  );
};


const AboutPage = () => {

  // This useEffect hook replicates the JavaScript logic from the original HTML file.
  // It runs once after the component mounts to add the interactive hover effects to the cards.
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const cardColors = {
        'card-1': '#0d9488', // Darker Teal
        'card-2': '#f43f5e', // Darker Coral
        'card-3': '#4f46e5', // Darker Indigo
    };

    cards.forEach(card => {
        const handleMouseEnter = () => {
            const hoverColor = cardColors[card.id];
            card.style.transform = 'translateY(-8px) scale(1.03)';
            card.style.boxShadow = `clamp(10px, 2vw, 20px) clamp(10px, 2vw, 20px) 0px ${hoverColor}, 0 0 40px rgba(0,0,0,0.3)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'clamp(5px, 1vw, 10px) clamp(5px, 1vw, 10px) 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1)';
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    });
  }, []); // The empty dependency array ensures this effect runs only once.

  return (
    <>
      {/* We include the styles directly in the JSX for a self-contained component. */}
      <style>{`
        body {
            /* This style is applied for demonstration; in a real app, a parent component would control the background. */
            background: linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%);
        }
        .about-page-container {
            font-family: 'VT323', monospace;
            padding: clamp(20px, 5vw, 80px) clamp(10px, 3vw, 20px);
            overflow-x: hidden;
            position: relative;
        }
        .font-title {
            font-family: 'Press Start 2P', cursive;
        }
        .card {
            background: #ffffff;
            border: clamp(3px, 0.5vw, 6px) solid #2c2c2c;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            image-rendering: pixelated;
            overflow: hidden;
            cursor: default;
            box-shadow: clamp(5px, 1vw, 10px) clamp(5px, 1vw, 10px) 0px #2c2c2c, 0 0 20px rgba(0,0,0,0.1);
        }
        .card-header {
            padding: clamp(15px, 3vw, 30px);
            border-bottom: clamp(2px, 0.3vw, 4px) solid #2c2c2c;
            position: relative;
        }
        .card-icon {
            position: absolute;
            top: 50%;
            right: clamp(10px, 2vw, 20px);
            transform: translateY(-50%);
            font-size: clamp(24px, 4vw, 40px);
            transition: transform 0.6s ease;
        }
        .card:hover .card-icon {
            transform: translateY(-50%) rotate(360deg);
        }
        .card-content {
            padding: clamp(20px, 3vw, 30px);
            font-family: 'VT323', monospace;
            font-size: clamp(18px, 2.2vw, 22px);
            line-height: 1.6;
            color: #333;
        }
        .card-title {
            font-size: clamp(16px, 2.5vw, 24px);
            color: #fff;
            text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
        }
        .back-button {
            background: #2c2c2c;
            border: clamp(2px, 0.4vw, 4px) solid #fff;
            color: #fff;
            padding: clamp(12px, 2.5vw, 20px) clamp(15px, 3vw, 25px);
            font-size: clamp(14px, 2.2vw, 20px);
            cursor: pointer;
            transition: all 0.2s ease;
            text-shadow: 2px 2px 0px #000;
            box-shadow: clamp(5px, 1vw, 10px) clamp(5px, 1vw, 10px) 0px #999;
        }
        .back-button:hover {
            background: #000;
            box-shadow: clamp(8px, 1.5vw, 15px) clamp(8px, 1.5vw, 15px) 0px #777;
            transform: translate(-2px, -2px);
        }
        @keyframes cardFloat1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        @keyframes cardFloat2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(8px); }
        }
        .card-float-1 { animation: cardFloat1 7s ease-in-out infinite; }
        .card-float-2 { animation: cardFloat2 7s ease-in-out infinite; }
        .pixel-bg {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.1) 2px, transparent 2px),
                        radial-gradient(circle at 40% 70%, rgba(251, 113, 133, 0.1) 2px, transparent 2px),
                        radial-gradient(circle at 90% 40%, rgba(99, 102, 241, 0.1) 2px, transparent 2px),
                        radial-gradient(circle at 130% 80%, rgba(20, 184, 166, 0.1) 2px, transparent 2px),
                        radial-gradient(circle at 160% 30%, rgba(251, 113, 133, 0.1) 2px, transparent 2px);
            background-size: 200px 200px;
            animation: floatPixels 40s linear infinite;
            pointer-events: none;
            z-index: 0;
        }
        @keyframes floatPixels {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-200px, -200px); }
        }
      `}</style>

      <div className="about-page-container">
        <div className="pixel-bg"></div>
        <main style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <header style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
                <h1 className="font-title" style={{ fontSize: 'clamp(24px, 5vw, 48px)', color: '#2c2c2c', textShadow: '4px 4px 0px rgba(0,0,0,0.1)', lineHeight: '1.2' }}>
                    Knowledge is a Right, Not a Privilege.
                </h1>
                <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#666', marginTop: '20px' }}>
                    Using AI to level the educational playing field for every student, everywhere.
                </p>
            </header>

            <section style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}>
                 <div style={{ background: '#fff', border: '4px solid #2c2c2c', padding: 'clamp(20px, 4vw, 40px)', textAlign: 'center', boxShadow: '8px 8px 0 #ddd' }}>
                    <h2 className="font-title" style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: '#2c2c2c', marginBottom: '15px' }}>The Challenge We Face</h2>
                    <p style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', color: '#444', lineHeight: '1.6' }}>
                        Talent is everywhere, but opportunity is not. For many students in underserved communities, access to quality tutors and modern learning tools is a daily struggle. This resource gap can stand in the way of their dreams.
                    </p>
                 </div>
            </section>

            <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'stretch' }}>
                <div id="card-1" className="card card-float-1">
                    <div className="card-header" style={{ backgroundColor: '#14b8a6' }}>
                        <h3 className="card-title font-title">Your Personal Tutor</h3>
                        <div className="card-icon">🎯</div>
                    </div>
                    <div className="card-content">
                        <strong>No private tutor? No problem.</strong> Our AI Quiz Master acts as your personal guide. It turns any text—from a school handout or a photo of a book page—into a practice test. This helps you find what you don't know and master subjects without needing extra help.
                    </div>
                </div>

                <div id="card-2" className="card card-float-2">
                    <div className="card-header" style={{ backgroundColor: '#fb7185' }}>
                        <h3 className="card-title font-title">The Information Edge</h3>
                        <div className="card-icon">📚</div>
                    </div>
                    <div className="card-content">
                        <strong>Limited access to books or the internet?</strong> Make every word count. The Info Synthesizer extracts the most crucial points from any dense text. It helps you study smarter and more efficiently, even with limited resources.
                    </div>
                </div>

                <div id="card-3" className="card card-float-1">
                    <div className="card-header" style={{ backgroundColor: '#6366f1' }}>
                        <h3 className="card-title font-title">A Gateway to Tech</h3>
                        <div className="card-icon">💻</div>
                    </div>
                    <div className="card-content">
                        <strong>Dream of a career in technology?</strong> Don't let a lack of mentorship stop you. The Code Catalyst is your 24/7 coding partner. It helps you learn by providing clear, working examples, turning any computer into a launchpad for your future.
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 8vw, 80px)' }}>
                 {/* In a real React app, you would use React Router's <Link> component here */}
                 <a href="/" className="back-button font-title">
                    &lt; Return to the App
                </a>
            </div>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
