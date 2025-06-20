import React from 'react'
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import Backdrop from './Backdrop';
import { AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose }) => {
  return (
    <>
    
      <AnimatePresence>
          {isOpen && (
            <>
            <Backdrop />
            <ModalContainer isOpen={isOpen} onClose={onClose}/>
            </>
        ) }
      </AnimatePresence>

    </>
  )
} 

export default Modal;
