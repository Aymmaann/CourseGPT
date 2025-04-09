import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom'
import Course from './pages/Course';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/course' element={<Course />} />
      </Routes>
    </div>
  )
}

export default App
