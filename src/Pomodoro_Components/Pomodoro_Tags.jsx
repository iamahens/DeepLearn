import React from 'react'
import styled, {css} from 'styled-components';
import { useContext } from 'react';
import { StateContext } from '../Pomodoro_Components/StateProvider.jsx';
const Pomodoro_Tags = () => {

  const { activeTag, setActiveTag } = useContext(StateContext);

  const handleTagClick = (index) => {
    setActiveTag(index);
  };

  return (<TagContainer>

    {
     ["Work", "Short Break" , "Long Break"].map((tag,i) => (
      <Tag onClick={()=>handleTagClick(i)} activeTag={activeTag === i } key={i}>{tag}</Tag>

     )
     )
    }

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


  @media screen {
    @media (max-width: 768px) {
      padding: 1.5rem 0.8rem;
      width: 25rem;
      
    }
    @media (max-width: 480px) {
      
      padding: 1.2rem 0.5rem;
      width: 20rem;
    }
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


  ${({ activeTag }) => activeTag && css`
    background: orange;
  `}


  @media screen {
    @media (max-width: 768px) {
      font-size: 1rem;
      height: 1.5rem;
    }
    @media (max-width: 480px) {
      font-size: 0.8rem;
      height: 1.8rem;
    }
  }
`;

