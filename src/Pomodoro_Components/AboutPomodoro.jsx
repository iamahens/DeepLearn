import React, { useState } from 'react';

const AboutPomodoro = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center px-4 pt-16 pb-4">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated-title {
          font-family: 'Press Start 2P', cursive;
          line-height: 1.6;
        }

        .accordion-container {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid transparent;
          background: linear-gradient(white, white) padding-box, 
                     linear-gradient(135deg, #f97316, #ea580c, #dc2626, #b91c1c, #7c3aed, #6366f1, #3b82f6, #0ea5e9, #06b6d4, #10b981, #22c55e, #84cc16, #eab308, #f59e0b, #f97316) border-box;
          box-shadow: 
            0 20px 40px rgba(249, 115, 22, 0.15),
            0 10px 20px rgba(249, 115, 22, 0.1),
            0 5px 10px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          max-width: 650px;
          width: 100%;
        }

        .accordion-container::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 19px;
          background: linear-gradient(135deg, #f97316, #ea580c, #dc2626, #b91c1c, #7c3aed, #6366f1, #3b82f6, #0ea5e9, #06b6d4, #10b981, #22c55e, #84cc16, #eab308, #f59e0b, #f97316);
          z-index: -1;
          animation: borderGlow 3s ease-in-out infinite alternate;
        }

        @keyframes borderGlow {
          0% {
            filter: blur(0px) brightness(1);
          }
          100% {
            filter: blur(1px) brightness(1.2);
          }
        }

        .accordion-header {
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 2px solid rgba(249, 115, 22, 0.2);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(249, 115, 22, 0.1) 100%);
          backdrop-filter: blur(10px);
        }

        .accordion-header:hover {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.2) 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(249, 115, 22, 0.2);
        }

        .accordion-title-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .accordion-icon {
          color: #f97316;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .accordion-arrow {
          transition: transform 0.3s ease;
        }

        .accordion-arrow.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 1.5rem;
          line-height: 1.7;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.02) 0%, rgba(249, 115, 22, 0.05) 100%);
          border-top: 1px solid rgba(249, 115, 22, 0.1);
        }

        .content-section {
          padding: 1.5rem;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
          border: 1px solid rgba(249, 115, 22, 0.2);
          box-shadow: 
            0 8px 16px rgba(249, 115, 22, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }

        .content-section:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 24px rgba(249, 115, 22, 0.15),
            0 6px 12px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-color: rgba(249, 115, 22, 0.3);
        }

        .content-section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .content-section-header span {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 0.75rem;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          box-shadow: 
            0 4px 8px rgba(249, 115, 22, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .content-section li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .accordion-header {
            padding: 0.75rem;
          }

          .accordion-content {
            padding: 1rem;
          }

          .content-section {
            padding: 1rem;
          }

          .pixelated-title {
            font-size: 0.875rem;
          }

          .accordion-icon {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .accordion-header {
            padding: 0.5rem;
          }

          .accordion-content {
            padding: 0.75rem;
          }

          .content-section {
            padding: 0.75rem;
          }

          .pixelated-title {
            font-size: 0.75rem;
          }

          .accordion-title-wrapper {
            gap: 0.5rem;
          }
        }
      `}</style>

      <div className="accordion-container">
        <div className="accordion-header" onClick={toggleAccordion}>
          <div className="flex items-center justify-between">
            <div className="accordion-title-wrapper">
              <span className="accordion-icon">ⓘ</span>
              <h2 className="pixelated-title text-sm sm:text-base md:text-lg">
                What is the Pomodoro Technique?
              </h2>
            </div>
            <div className={`accordion-arrow ${isOpen ? 'open' : ''}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="accordion-content">
            <p className="mb-6 text-sm sm:text-base">
              The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Combined with our task management tool, you can track what you're working on during each session.
            </p>

            <div className="content-sections-wrapper">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="content-section flex-1">
                  <div className="content-section-header font-bold text-base sm:text-lg">
                    <span>1</span> How to use it:
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
                    <li>Choose a task to work on</li>
                    <li>Start the Pomodoro (customizable)</li>
                    <li>Work until the timer rings</li>
                    <li>Take a short break (customizable)</li>
                    <li>After 4 pomodoros, take a longer break (customizable)</li>
                  </ol>
                </div>

                <div className="content-section flex-1">
                  <div className="content-section-header font-bold text-base sm:text-lg">
                    <span>2</span> Benefits:
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>Improved focus and concentration</li>
                    <li>Reduced mental fatigue</li>
                    <li>Increased productivity</li>
                    <li>Better work/break balance</li>
                    <li>Enhanced time awareness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPomodoro;