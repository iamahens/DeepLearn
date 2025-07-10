import styled from "styled-components";
import { useContext } from "react";
import { StateContext } from "../Pomodoro_Components/StateProvider.jsx";

const ProgressTracker = () => {
    const { completedSessions, cycle } = useContext(StateContext);

    const sessionBoxes = Array.from({ length: 4 }, (_, i) => (
        <SessionBox key={i} completed={i < completedSessions % 4} />
    ));

    return (
        <ProgressContainer>
            <Header>
                <h3>🕒 Today's Progress</h3>
                <Badge>{completedSessions} completed</Badge>
            </Header>
            <BoxContainer>{sessionBoxes}</BoxContainer>
            <CycleTag>Cycle: {cycle}</CycleTag>
        </ProgressContainer>
    );
};

export default ProgressTracker;

// Styled Components
const ProgressContainer = styled.div`
    border: 2px solid #000;
    border-radius: 12px;
    padding: 1rem;
    background: white;
    width: fit-content;
    max-width: 100%;
    
    @media (max-width: 768px) {
        width: 90%;
        max-width: 90%;
        margin: 0 auto;
        padding: 0.75rem;
    }
    
    @media (max-width: 480px) {
        width: 95%;
        padding: 0.5rem;
        border-width: 1px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    h3 {
        margin: 0;
        font-size: 1rem;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
        
        h3 {
            font-size: 0.9rem;
        }
    }
`;

const Badge = styled.div`
    border: 2px solid #000;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    white-space: nowrap;
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.2rem 0.4rem;
        border-width: 1px;
    }
`;

const BoxContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    justify-content: center;
    flex-wrap: wrap;
    
    @media (max-width: 480px) {
        gap: 0.25rem;
        margin: 0.5rem 0;
    }
`;

const SessionBox = styled.div`
    width: 60px;
    height: 40px;
    border: 2px solid #000;
    border-radius: 6px;
    background-color: ${({ completed }) => (completed ? "orange" : "white")};
    flex-shrink: 0;
    
    @media (max-width: 480px) {
        width: 45px;
        height: 30px;
        border-width: 1px;
    }
`;

const CycleTag = styled.div`
    font-size: 0.85rem;
    border: 2px solid #aaa;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    width: fit-content;
    
    @media (max-width: 480px) {
        font-size: 0.75rem;
        padding: 0.2rem 0.4rem;
        border-width: 1px;
    }
`;