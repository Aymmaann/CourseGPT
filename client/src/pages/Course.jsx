import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Context } from '../context/CourseContext'
import Navbar from '../components/Navbar'

const Course = ({ topic, modules }) => {
  const { loading } = useContext(Context)

  useEffect(() => {
    const storedModules = localStorage.getItem('modules');
    console.log(storedModules)
  }, [modules])

  return (
    <div className='flex text-zinc-300 bg-darkGray min-h-screen overscroll-none'>
      <Sidebar />
      
      <div className='flex-1 pl-64 bg-darkGray overflow-y-hidden'>
        <Navbar />
        {loading? (
          <p>Loading...</p>
        ) : (
          <p>Module Content</p>
        )}
      </div>
    </div>
  )
}

export default Course