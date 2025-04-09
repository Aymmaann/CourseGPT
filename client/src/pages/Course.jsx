import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Context } from '../context/CourseContext'
import Navbar from '../components/Navbar'
import ModuleDetails from '../components/ModuleDetails'

const Course = () => {
  const { modules, loading, moduleContent } = useContext(Context)

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
          <div className='p-5 mb-10'>
            <ModuleDetails moduleData={moduleContent} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Course