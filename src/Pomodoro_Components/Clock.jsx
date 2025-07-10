import styled from 'styled-components';
import {  useEffect } from 'react';
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
                    setCycle((prevCycle) => prevCycle + 1);
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
            <ButtonContainer>
                <StartPauseButton onClick={toggleClock}>
                    {isActive ? "⏸️Pause" : "▶️Start"}
                </StartPauseButton>
                {time === 0 && (
                    <ResetButton onClick={resetClock}>🔄Reset</ResetButton>
                )}
            </ButtonContainer>
        </ClockContainer>
    );
};

export default Clock;

const ClockContainer = styled.div`
    display: grid;
    place-items: center;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    max-width: 100%;
    
    @media (max-width: 768px) {
        gap: 0.75rem;
        padding: 0.75rem;
    }
    
    @media (max-width: 480px) {
        gap: 0.5rem;
        padding: 0.5rem;
    }
`;

const TimerText = styled.h1`
    font-size: 5rem;
    font-weight: 200;
    font-family: 'Press Start 2P', cursive;
    margin: 0;
    text-align: center;
    line-height: 1;
    
    @media (max-width: 1024px) {
        font-size: 4rem;
    }
    
    @media (max-width: 768px) {
        font-size: 3rem;
    }
    
    @media (max-width: 600px) {
        font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
        font-size: 2rem;
    }
    
    @media (max-width: 360px) {
        font-size: 1.5rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    
    @media (max-width: 480px) {
        gap: 0.25rem;
    }
`;

const StartPauseButton = styled.button`
    all: unset;
    text-align: center;
    background-color: Orange;
    border: 2px solid black;
    border-bottom: 4px solid black;
    border-right: 4px solid black;
    border-radius: 1rem;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    font-family: 'Times New Roman', Times, serif;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    min-width: 120px;
    
    &:hover {
        transform: translateY(2px);
        border-bottom: 2px solid black;
        border-right: 2px solid black;
    }
    
    &:active {
        transform: translateY(4px);
        border-bottom: 1px solid black;
        border-right: 1px solid black;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
        letter-spacing: 0.3rem;
        min-width: 100px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.3rem 0.6rem;
        letter-spacing: 0.2rem;
        min-width: 80px;
        border-radius: 0.5rem;
    }
    
    @media (max-width: 360px) {
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
        letter-spacing: 0.1rem;
        min-width: 70px;
    }
`;

const ResetButton = styled(StartPauseButton)`
    margin-top: 0.5rem;
    background-color: #fff;
    
    @media (max-width: 768px) {
        margin-top: 0.25rem;
    }
    
    @media (max-width: 480px) {
        margin-top: 0.125rem;
    }
`;