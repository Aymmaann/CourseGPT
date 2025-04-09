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
          <div className='flex flex-col items-center justify-center mt-64'>
            <svg xmlns='http://www.w3.org/2000/svg' width="80px" viewBox='0 0 300 150'>
                <path fill='none' stroke='#A392F9' strokeWidth='11' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
                    <animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate>
                </path>
            </svg>
            <p className='text-zinc-200 mt-4 text-sm'>Hang tight while we fetch your module...</p>
          </div>
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