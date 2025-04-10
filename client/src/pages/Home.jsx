import React from 'react'
import { Link } from 'react-router-dom'
import assets from '../assets/assets.js';

const Home = () => {

  return (
    <div className='w-full h-screen text-zinc-200 bg-darkGray bg-[url("/src/assets/images/home-bg.jpg")] bg-top'>
      {/* <Navbar /> */}
      <div className='relative flex items-center justify-between py-5 px-6 text-zinc-300'>
        <div className='flex gap-2 items-center w-[100px]'>
            <img src={assets.noBgLogo} alt="" className='w-[25px]'/>
            <p className='text-lg font-light'>Course<span className='font-semibold'>GPT</span></p>
        </div>

        <div>
            <ul className='flex items-center gap-28 text-sm'>
            <Link to='/home' className='smoothTransition hover:text-zinc-400'>Home</Link>
            <Link to='/search' className='smoothTransition hover:text-zinc-400'>Search</Link>
            <Link to='/courses' className='smoothTransition hover:text-zinc-400'>Courses</Link>
            </ul>
        </div>

        <div className='text-sm flex items-center gap-1 smoothTransition hover:text-zinc-400 cursor-pointer'>
            <span>Log out</span>
            <assets.IoMdLogOut className='mt-0.5 text-[16px]' />
        </div>
      </div>


      <div className='w-[750px] mx-auto mt-20'>
        <div className='flex items-center gap-3 rounded-2xl bg-[#18153c] p-1 w-[300px] mx-auto'>
          <div className='bg-gradient-to-b from-[#6671ea] to-[#a264e3] text-xs rounded-xl py-1 px-2 font-semibold'>New</div>
          <p className='text-xs mr-3 font-light'>Assess Your Learning Progress Instantly</p>
        </div>

        <div className='text-center mt-7'>
          <p className='text-5xl font-semibold text-zinc-200'>Meet CourseGPT</p>
          <p className='font-light mt-6 text-sm'>Advanced learning platform with real-time progress insights. Analyze your understanding and identify focus areas effortlessly.</p>
          <Link to="/search">
            <button className='mt-6 py-2 px-4 bg-zinc-200 text-[#262063] rounded-md smoothTransition cursor-pointer font-medium text-sm hover:bg-zinc-300'>Get started</button>
          </Link>
        </div>

        <div className='mt-16'>
          <p className='text-2xl font-semibold'>Why CourseGPT?</p>
          <div className='flex-col items-center mt-7'>
            <div className='flex justify-between items-center text-sm w-full'>
              <div className='flex gap-2 w-[300px]'>
                <assets.BiSolidAnalyse className='text-violet text-3xl'/>
                <div className='leading-6'>
                  <p className='font-semibold mt-1'>Smart Learning Analysis</p>
                  <p className='text-zinc-400'>Gain insights into your learning progress and identify key areas for focus</p>
                </div>
              </div>
              <div className='flex gap-2 w-[300px]'>
                <assets.MdSpatialTracking className='text-[#a392f9] text-3xl'/>
                <div className='leading-6'>
                  <p className='font-semibold mt-1'>Progress Tracking in Real-Time</p>
                  <p className='text-zinc-400'>Monitor your course completion and understanding as you learn</p>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center text-sm w-full mt-7'>
              <div className='flex gap-2 w-[300px]'>
                <assets.FaBell className='text-violet text-xl mt-1'/>
                <div className='leading-6'>
                  <p className='font-semibold'>Personalized Learning Alerts</p>
                  <p className='text-zinc-400'>Stay informed about new content, upcoming quizzes, and learning milestones relevant to your journey</p>
                </div>
              </div>
              <div className='flex gap-2 w-[300px]'>
                <assets.FaReact className='text-violet text-3xl'/>
                <div className='leading-6'>
                  <p className='font-semibold mt-1'>Intuitive Learning Interface</p>
                  <p className='text-zinc-400'>Enjoy a seamless and user-friendly platform designed for effortless learning and navigation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home