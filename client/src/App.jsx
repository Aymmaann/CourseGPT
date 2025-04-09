import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import CoursesPage from './pages/CoursesPage';
import Course from './pages/Course';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/course' element={<Course />} />
        <Route path='/courses' element={<CoursesPage />} />
      </Routes>
    </div>
  )
}

export default App
