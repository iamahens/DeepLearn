import React from 'react'
import styled, {css} from 'styled-components';
import { useContext } from 'react';
import { StateContext } from '../Pomodoro_Components/StateProvider.jsx';

const Pomodoro_Tags = () => {
  const { activeTag, setActiveTag } = useContext(StateContext);

  const handleTagClick = (index) => {
    setActiveTag(index);
  };

  return (
    <TagContainer>
      {["Work", "Short Break", "Long Break"].map((tag, i) => (
        <Tag 
          onClick={() => handleTagClick(i)} 
          activeTag={activeTag === i} 
          key={i}
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  )
}

export default Pomodoro_Tags

const TagContainer = styled.div`
  color: #fff;
  width: 40rem;
  height: 4rem;
  margin: 0 auto;
  border-radius: 2rem;
  border: 2px solid black;
  box-shadow: 6px 6px 0px #1a1a1a;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.5rem;
  max-width: 95%;
  
  @media (max-width: 1024px) {
    width: 35rem;
    gap: 0.75rem;
  }
  
  @media (max-width: 768px) {
    width: 30rem;
    height: 3.5rem;
    gap: 0.5rem;
    padding: 0 0.75rem;
    box-shadow: 4px 4px 0px #1a1a1a;
  }
  
  @media (max-width: 600px) {
    width: 90%;
    height: 3rem;
    gap: 0.25rem;
    padding: 0 0.5rem;
    border-radius: 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 95%;
    height: 2.5rem;
    gap: 0.125rem;
    padding: 0 0.25rem;
    border-radius: 1.25rem;
    box-shadow: 3px 3px 0px #1a1a1a;
  }
  
  @media (max-width: 360px) {
    width: 98%;
    height: 2.25rem;
    gap: 0.125rem;
    padding: 0 0.125rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 0px #1a1a1a;
  }
`;

const Tag = styled.button`
  all: unset;
  flex: 1;
  height: 2.2rem;
  background: #fff;
  text-align: center;
  color: #000;
  border-radius: 0.8rem;
  border: 2px solid black;
  border-bottom: 6px solid black;
  border-right: 6px solid black;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(2px);
    border-bottom: 4px solid black;
    border-right: 4px solid black;
  }
  
  &:active {
    transform: translateY(4px);
    border-bottom: 2px solid black;
    border-right: 2px solid black;
  }

  ${({ activeTag }) => activeTag && css`
    background: orange;
    transform: translateY(2px);
    border-bottom: 4px solid black;
    border-right: 4px solid black;
  `}

  @media (max-width: 1024px) {
    font-size: 0.7rem;
    height: 2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
    height: 1.8rem;
    border-radius: 0.6rem;
    border-bottom: 4px solid black;
    border-right: 4px solid black;
  }
  
  @media (max-width: 600px) {
    font-size: 0.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.4rem;
    height: 1.25rem;
    border-radius: 0.4rem;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    
    &:hover {
      border-bottom: 2px solid black;
      border-right: 2px solid black;
    }
    
    &:active {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
    
    ${({ activeTag }) => activeTag && css`
      border-bottom: 2px solid black;
      border-right: 2px solid black;
    `}
  }
  
  @media (max-width: 360px) {
    font-size: 0.35rem;
    height: 1rem;
    border-radius: 0.3rem;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    
    &:hover {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
    
    &:active {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
    
    ${({ activeTag }) => activeTag && css`
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    `}
  }
`;