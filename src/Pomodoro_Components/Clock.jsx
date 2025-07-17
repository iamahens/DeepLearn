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

            // === Dashboard Integration ===
            const now = new Date();
            const dateKey = now.toISOString().slice(0, 10); // YYYY-MM-DD
            // Session count for today
            const sessionKey = `sessions_${dateKey}`;
            const studyKey = `studytime_${dateKey}`;
            const totalSessionsKey = 'total_sessions';
            const streakKey = 'current_streak';
            const bestStreakKey = 'best_streak';
            // Increment today's session count
            let todaySessions = parseInt(localStorage.getItem(sessionKey) || '0', 10) + 1;
            localStorage.setItem(sessionKey, todaySessions);
            // Add session minutes to today's study time
            let sessionMinutes = Math.round(initTime / 60);
            let todayMinutes = parseInt(localStorage.getItem(studyKey) || '0', 10) + sessionMinutes;
            localStorage.setItem(studyKey, todayMinutes);
            // Increment total sessions
            let totalSessions = parseInt(localStorage.getItem(totalSessionsKey) || '0', 10) + 1;
            localStorage.setItem(totalSessionsKey, totalSessions);
            // Update streaks
            let streak = parseInt(localStorage.getItem(streakKey) || '0', 10);
            let bestStreak = parseInt(localStorage.getItem(bestStreakKey) || '0', 10);
            // Check if yesterday had a session
            const yesterday = new Date(now.getTime() - 86400000);
            const yKey = `sessions_${yesterday.toISOString().slice(0, 10)}`;
            if (localStorage.getItem(yKey)) {
                streak = streak + 1;
            } else {
                streak = 1;
            }
            if (streak > bestStreak) bestStreak = streak;
            localStorage.setItem(streakKey, streak);
            localStorage.setItem(bestStreakKey, bestStreak);
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