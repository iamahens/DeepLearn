
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import React, { useContext } from 'react';
import { StateContext } from '../Pomodoro_Components/StateProvider.jsx';

const Clock = () => {
    const { time, setTime } = useContext(StateContext);
    const { isActive, setIsActive, initTime, setCompletedSessions, setCycle } = useContext(StateContext);


    useEffect(() => {
  let interval;

  if (isActive && time > 0) {
    interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  } else if (time === 0 && isActive) {
    setIsActive(false);

    // ✅ Correctly update session and cycle
    setCompletedSessions((prev) => {
      const updated = prev + 1;
      if ((updated) % 4 === 0) {
        setCycle((prevCycle) => prevCycle +1);
      }
      return updated;
    });
  }

  return () => clearInterval(interval);
}, [isActive, time]);

    useEffect(() => {
        if (isActive && time > 0) {
            const interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [time, isActive]);

    const toggleClock = () => {
        setIsActive(!isActive);
    }

    const resetClock = () => {
        setTime(initTime);
        setIsActive(false);
    }

    const getTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };


    return (
        <ClockContainer>
            <TimerText>
                {getTime(time)}
            </TimerText>
            <StartPauseButton onClick={toggleClock}>{isActive ? "⏸️Pause" : "▶️Start"}</StartPauseButton>
            {time === 0 && <ResetButton onClick={resetClock}>🔄Reset</ResetButton>}
        </ClockContainer>
    );
};

export default Clock;

const ClockContainer = styled.div`
display: grid;
place-items: center;


@media screen {

    @media (max-width: 768px) {
        font-size: 6rem;
    }
    @media (max-width: 480px) {
        font-size: 5rem;
    }
}
`;

const TimerText = styled.h1`
font-size: 5rem;
font-weight: 200;
font-family: 'Press Start 2P', cursive;

@media screen {
    @media (max-width: 768px) {
        font-size: 6rem;
    }
    @media (max-width: 480px) {
        font-size: 5rem;
    }
}
`;

const StartPauseButton = styled.button`
all: unset;
text-align: center;
background-color: Orange ;
border: 2px solid black;
border-bottom: 4px solid black;
border-right: 4px solid black;
border-radius: 1rem;
font-size: 1.2rem;
padding:  0.5rem 1rem;
font-family: 'Times New Roman', Times, serif;
text-transform: uppercase;
letter-spacing: 0.5rem;


@media screen {
 
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.3rem 0.6rem;
    }
}


`;

const ResetButton = styled(StartPauseButton)`
margin-top: 0.5rem;
background-color: #fff;

@media screen {
 
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.3rem 0.6rem;
    }
}
`;