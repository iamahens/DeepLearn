import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createGlobalStyle} from 'styled-components'
import StateProvider from './Pomodoro_Components/StateProvider.jsx'


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    background-color: #F7F1E1;
    font-size: 60.2%;
    color: black;
  }
  
`;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProvider>
      <GlobalStyle />
      <App />
      </StateProvider>
      

  </StrictMode>,
);
