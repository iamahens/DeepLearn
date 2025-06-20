import React, { useState } from 'react';
import './Accordion.css'; // Link to our CSS file

const AboutPomodoro = ({ title }) => { // No 'children' prop anymore
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close

  const toggleAccordion = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  return (
    <div className="accordion-container">
      {/* Accordion Header */}
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="accordion-title-wrapper">
          {/* Orange 'i' icon */}
          <span className="accordion-icon">ⓘ</span>
          <h2 className="accordion-title">
What is the Pomodoro Technique?
</h2>
        </div>
        {/* Arrow icon that rotates */}
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

      {/* Accordion Content - Conditionally rendered */}
      {isOpen && (
        <div className="accordion-content">
          {/* --- CONTENT STARTS HERE --- */}
          <div>
            <p>
              The Pomodoro Technique is a time management method developed by Francesco
              Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25
              minutes in length, separated by short breaks. Combined with our task
              management tool, you can track what you're working on during each session.
            </p>

            <div className="content-sections-wrapper">
  {/* Flex container for 2 columns */}
  <div className="flex flex-col md:flex-row gap-8">
    {/* "How to use it" section */}
    <div className="content-section flex-1">
      <div className="content-section-header font-bold text-lg mb-2">
        <span className="mr-2">1</span> How to use it:
      </div>
      <ol className="list-decimal list-inside space-y-1">
        <li>Choose a task to work on</li>
        <li>Start the Pomodoro (customizable)</li>
        <li>Work until the timer rings</li>
        <li>Take a short break (customizable)</li>
        <li>After 4 pomodoros, take a longer break (customizable)</li>
      </ol>
    </div>

    {/* "Benefits" section */}
    <div className="content-section flex-1">
      <div className="content-section-header font-bold text-lg mb-2">
        <span className="mr-2">2</span> Benefits:
      </div>
      <ul className="list-disc list-inside space-y-1">
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
          {/* --- CONTENT ENDS HERE --- */}
        </div>
      )}
    </div>
  );
};

export default AboutPomodoro;