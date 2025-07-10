import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';


import Clock from '../Pomodoro_Components/Clock.jsx';
import { StateContext } from '../Pomodoro_Components/StateProvider.jsx';

const Timer_Progress = () => {
    const { progress, setProgress, time, initTime } = useContext(StateContext);

    useEffect(() => {
        setProgress((time / initTime) * 100);
    }, [setProgress, time, initTime]);

    return (
        <OuterProgress progress={progress}>
            <InnerProgress>
                <Clock />
            </InnerProgress>
        </OuterProgress>
    );
};

export default Timer_Progress;

const OuterProgress = styled.div`
    width: 30rem;
    height: 30rem;
    background-color: orange;
    border: 2px solid black;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: conic-gradient(darkorange ${({ progress }) => progress}%, transparent ${({ progress }) => progress}%);
    
    @media (max-width: 1024px) {
        width: 25rem;
        height: 25rem;
    }
    
    @media (max-width: 768px) {
        width: 22rem;
        height: 22rem;
    }
    
    @media (max-width: 600px) {
        width: 85vw;
        height: 85vw;
        max-width: 20rem;
        max-height: 20rem;
    }
    
    @media (max-width: 480px) {
        width: 90vw;
        height: 90vw;
        max-width: 18rem;
        max-height: 18rem;
        border-width: 1px;
    }
    
    @media (max-width: 360px) {
        width: 95vw;
        height: 95vw;
        max-width: 16rem;
        max-height: 16rem;
    }
`;

const InnerProgress = styled.div`
    width: 28rem;
    height: 28rem;
    background-color: #fff;
    border: 2px solid black;
    border-radius: 50%;
    display: grid;
    place-items: center;
    
    @media (max-width: 1024px) {
        width: 23rem;
        height: 23rem;
    }
    
    @media (max-width: 768px) {
        width: 20rem;
        height: 20rem;
    }
    
    @media (max-width: 600px) {
        width: calc(85vw - 2rem);
        height: calc(85vw - 2rem);
        max-width: 18rem;
        max-height: 18rem;
    }
    
    @media (max-width: 480px) {
        width: calc(90vw - 2rem);
        height: calc(90vw - 2rem);
        max-width: 16rem;
        max-height: 16rem;
        border-width: 1px;
    }
    
    @media (max-width: 360px) {
        width: calc(95vw - 2rem);
        height: calc(95vw - 2rem);
        max-width: 14rem;
        max-height: 14rem;
    }
`;
