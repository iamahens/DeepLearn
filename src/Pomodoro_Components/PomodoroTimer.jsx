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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.div`
  border: 2px solid #000;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const SessionBox = styled.div`
  width: 60px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 6px;
  background-color: ${({ completed }) => (completed ? "orange" : "white")};
`;

const CycleTag = styled.div`
  font-size: 0.85rem;
  border: 2px solid #aaa;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  width: fit-content;
`;

