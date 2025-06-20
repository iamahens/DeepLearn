import React from 'react'
import styled from 'styled-components';
import Modal from './Modal';
import { FaMotorcycle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaWindowClose } from 'react-icons/fa';
import {Formik,Form,Field} from 'formik';
import { StateContext } from './StateProvider';
import { useContext } from 'react';

const ModalContainer = ({ isOpen, onClose }) => {


   const {workTime, setWorkTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime} = useContext(StateContext)

  return <Container>
    <ModalContent initial={{y: '-100vh', scale: 0}} animate={{y: 0, scale: 1}} exit={{y: '-100vh', scale: 0}} >
    <ModalHeader>
        <ModalTitle>Settings</ModalTitle>
        <ModalCloseButton onClick={onClose}><FaWindowClose /></ModalCloseButton>
    </ModalHeader>
    <ModalBody>
        <Formik initialValues={{ workDuration: workTime/60, shortBreakDuration: shortBreakTime/60 , longBreakDuration: longBreakTime/60, }} onSubmit={(values) => {
            setWorkTime(values.workDuration * 60);
            setShortBreakTime(values.shortBreakDuration * 60);  
            setLongBreakTime(values.longBreakDuration * 60);
            onClose();
        }}>
            <Form>
               <InputWrapper>
               <FormControl>
                <label htmlFor="work">Work </label>
                <Field name="workDuration"  min="1"  max="60" />
               </FormControl>

               <FormControl>
                <label htmlFor="shortBreak">Short Break </label>
                <Field name="shortBreakDuration"  min="1"  max="60" />
               </FormControl>

               <FormControl>
                <label htmlFor="longBreak">Long Break </label>
                <Field name="longBreakDuration"  min="1"  max="60" />
               </FormControl>
               </InputWrapper>

               <ButtonWrapper>
                <ApplyButton type="submit">Apply</ApplyButton>
               </ButtonWrapper>
            </Form>
        </Formik>
    </ModalBody>
  </ModalContent>
  </Container>
}

export default ModalContainer

const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
padding: 0.5rem;



`;

const ApplyButton = styled.button`
padding: 0.5rem 2rem;
background-color: orange;
color: black;
border:2px solid #000;
border-radius: 0.5rem;
font-size: 1.2rem;
font-weight: bold;
font-family: 'Times New Roman', Times, serif;
border-bottom: 4px solid #000;
border-right: 4px solid #000;
cursor: pointer;
&:hover {
    background-color: darkorange;
    color: #000;
    transform: scale(1.05);
}


@media screen {
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
    @media (max-width: 480px) {
        font-size: 1rem;
    }   
}
`;


const InputWrapper = styled.div`
display: flex;
padding: 1rem 2rem;
gap: 2rem;
`;

const FormControl = styled.div`
flex: 1;
display: flex;
flex-direction: column;
margin: 0.5rem 0;
color: #000;
gap: 0.7rem;

label{
    font-size: 1.2rem;

    @media screen {
       @media (max-width: 768px) {
           font-size: 1.2rem;
       }
       @media (max-width: 480px) {
           font-size: 0.9rem;
       }
    }
}

input{
    all: unset;
    width: 100%;
    height: 2.5rem;
    border: 2px solid #000;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    font-size: 1rem;
    color: #000;
    background-color: #fff4ce;
    

    &:focus {
        outline: none;
        border-color: orange;
        box-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
    }

    @media screen {
       @media (max-width: 768px) {
           font-size: 1.5rem;
       }
       @media (max-width: 480px) {
           font-size: 1.2rem;
       }
    }
}
`;





const Container = styled.div`
position: absolute;
display: grid;
place-items: center;
height: 100vh;
width: 99vw;
margin-top:7rem;
z-index: 150;

@media screen {
   @media (max-width: 768px) {
       width: 90%;
       height: 82%;
   }

   @media (max-width: 480px) {
       width: 95%;
       height: 82%;
       
   }
}

`;


const ModalContent = styled(motion.div)`
width: 37rem;
height: 23rem;
background-color: #fff4ce;
border-radius: 0.8rem;
border: 2px solid #000;
border-bottom: 4px solid #000;
border-right: 4px solid #000;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media screen {

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
    }

    @media (max-width: 480px) {
        width: 95%;
        height: auto;
        border-width: 1px;
    }
}


`;
const ModalHeader = styled.div`
color: #000;
padding: 1rem;
display: flex;
justify-content: space-between;
border-bottom: 1px solid #000;




`;
const ModalTitle = styled.h2`
font-size: 2rem;
font-weight: bold;
font-family: 'Times New Roman', Times, serif;


@media screen {
 
    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
}`;

const ModalCloseButton = styled.button`
all: unset;
font-size: 2rem;
cursor: pointer;
color: #000;
&:hover {
    color: orange;
    transform: scale(1.1);
}

`;
const ModalBody = styled.div``;