import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from './StateProvider';

const ProgressTracker = () => {
  const { completedSessions, cycle } = useContext(StateContext);

  return (
    <Container>
      <Header>
        <Title>
          🕒 <span>Today's Progress</span>
        </Title>
        <CompletedBox>{completedSessions} completed</CompletedBox>
      </Header>

      <BoxContainer>
        {Array.from({ length: 4 }, (_, i) => (
          <SessionBox key={i} completed={i < completedSessions % 4} />
        ))}
      </BoxContainer>

      <CycleBox>Cycle: {cycle}</CycleBox>
    </Container>
  );
};

export default ProgressTracker;

const Container = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 6px 6px 0px #1a1a1a;
  width: 40rem;
margin: 2rem auto;
border: 2px solid black;
border-bottom: 3px solid black;
border-right: 3px solid black;
display: grid;


/* place-items: center; */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  

  span {
    margin-left: 0.5rem;
  }
`;

const CompletedBox = styled.div`
  border: 2px solid #000;
  border-radius: 6px;
  padding: 0.2rem 0.6rem;
  font-size: 0.9rem;
;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const SessionBox = styled.div`
  width: 7rem;
  height: 40px;
  border: 2px solid #000;
  border-radius: 6px;
  background-color: ${({ completed }) => (completed ? 'orange' : 'white')};
  transition: background-color 0.3s ease;
`;

const CycleBox = styled.div`
  border: 2px solid #000;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #f5f5f5;
  display: inline-block;
  width: 6rem;
  
`;
