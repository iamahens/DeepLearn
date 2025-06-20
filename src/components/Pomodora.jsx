import styled from 'styled-components';
import React from 'react'
import { useState } from 'react';
import Pomodoro_Tags from '../Pomodoro_Components/Pomodoro_Tags.jsx';
import Timer from '../Pomodoro_Components/Timer.jsx';
import Modal from '../Pomodoro_Components/Modal.jsx';
import { FaCog } from 'react-icons/fa';
import PomodoroTimer from '../Pomodoro_Components/PomodoroTimer.jsx';
import StreakDisplay from '../Pomodoro_Components/StreakDisplay.jsx';
import ProgressTracker from '../Pomodoro_Components/ProgressTracker.jsx';
import AboutPomodoro from '../Pomodoro_Components/AboutPomodoro.jsx';
const Pomodora = () => {

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  const onOpen = () => {
    setIsOpen(true);
  }

 
  const [completedCycles, setCompletedCycles] = useState(0);
  

  const handleCycleComplete = () => {
    setCompletedCycles((prev) => prev + 1);
  };



  return (
    <>

    <Modal isOpen={isOpen} onClose={onClose} />
      <Title>Pomodoro Timer</Title>
      {/* Tags */}
     < Pomodoro_Tags />

     

      {/* Timer */}
      < Timer />

      <div className="pomodoro-container">
       <ProgressTracker />
    </div>

      {/* Settings Icons */}

      <CogIcon onClick={onOpen}>
       
        <FaCog/>
      </CogIcon>

      <AboutPomodoro />
    </>
  )
}

export default Pomodora;

const Title = styled.h1`

  color: #000;
  padding: 2rem 0;
  text-align: center;
  font-size: 2rem;
  margin: 1rem 0;
  font-family: 'Press Start 2P', cursive;
  

  
`;


const CogIcon = styled.div`
  position: absolute;
  z-index: 100;
  top: 22rem;
  right: 28rem;
  font-size: 1.6rem;
  cursor: pointer;
  color: #000;
  background: linear-gradient(135deg, #f0fdfc 0%,#d3fcf4 25%, #c3e7ff 50%, #ffe8e8 75%,#cde6ff 100%    );
  

  &:hover {
    color: orange;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
  }

@media screen {

  @media (max-width: 768px) {
    top: 22rem;
    right: 24rem;
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    top: 20.5rem;
    right: 12rem;
    font-size: 1rem;
  }

}

  

`;


