
import React from 'react';
import './App.css'
import './index.css'
import Navbar from './components/Navbar.jsx' // Import the Navbar component

import { BrowserRouter as  Router , Routes,Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import Reviewer from './components/Reviewer.jsx';
import Pomodora from './components/Pomodora.jsx';
import StudyCenter from './components/StudyCenter.jsx';
import Dashboard from './components/Dashboard.jsx';
function App() {
  

  return (
        
    <>
 <Router>
      <div className="App">
        <Navbar />
        <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/reviewer" element={<Reviewer />} />
          <Route path="/pomodora" element={<Pomodora />} />
          <Route path="/study-center" element={<StudyCenter />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
        
    </>
  )
}

export default App
