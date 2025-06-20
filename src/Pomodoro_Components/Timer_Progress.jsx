import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { useState } from 'react'; 
import Clock from '../Pomodoro_Components/Clock.jsx';
import { StateContext } from '../Pomodoro_Components/StateProvider.jsx';  

const Timer_Progress = () => {
    const { progress, setProgress,time, initTime } = useContext(StateContext);

    useEffect(() => {
      setProgress((time / initTime) * 100); 
        
    }, [setProgress, time, initTime]);
  return (
    <OuterProgress progress={progress}>
        <InnerProgress >
            <Clock/>
        </InnerProgress>
    </OuterProgress>
  );
};

export default Timer_Progress;

const OuterProgress = styled.div`
width: 30rem;
height: 30rem;
background-color: orange ;
border: 2px solid black;
border-radius: 20rem;
display: grid;
place-items: center;
background: conic-gradient(darkorange ${({ progress }) => progress}%, transparent ${({ progress }) => progress}%);

@media (max-width: 768px) {
    width: 90%;
    height: 20rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 18rem;
    border-width: 1px;
  }
`;

const InnerProgress = styled.div`
width: 28rem;
height: 28rem;
background-color: #fff ;
border: 2px solid black;
border-radius: 20rem;
display: grid;
place-items: center;

   @media (max-width: 768px) {
    width: 85%;
    height: 18rem;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 16rem;
    border-width: 1px;
  }
`;