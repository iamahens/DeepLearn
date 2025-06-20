import React from 'react'
import styled from 'styled-components';
import Timer_Progress from '../Pomodoro_Components/Timer_Progress.jsx';

const Timer = () => {
  return (
    <TimerContainer>
        <Timer_Progress />
    </TimerContainer>
  )
}

export default Timer
;
const TimerContainer = styled.div`
width: 40rem;
height: 32rem;
background-color: white;
margin: 2rem auto;
border: 2px solid black;
border-radius: 0.8rem;
border-bottom: 3px solid black;
border-right: 3px solid black;
display: grid;
place-items: center;
box-shadow: 6px 6px 0px #1a1a1a;

@media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 3rem 5rem ;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 2rem 1rem;
    border-width: 1px;
    border-bottom-width: 5px;
    border-right-width: 5px;
  }


`;