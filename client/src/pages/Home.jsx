import React from 'react'
import { Link } from 'react-router-dom'
import assets from '../assets/assets.js';
import MainNavbar from '../components/MainNavbar.jsx';

const Home = () => {

  return (
    <div className='w-full pb-32 text-zinc-200 overflow-hidden relative bg-darkGray bg-[url("/src/assets/images/home-bg.jpg")] '>
      {/* Modern geometric shapes background */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-indigo-400 blur-3xl"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 rounded-full bg-violet-500 blur-3xl"></div>
      </div> */}
      
      <MainNavbar />
  
      {/* Hero section */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        {/* Badge */}
        <div className="flex items-center gap-3 rounded-full bg-[#18153c] p-1.5 pr-5 w-fit mx-auto border border-zinc-700/30">
          <div className="bg-gradient-to-b from-[#6671ea] to-[#a264e3] text-xs rounded-full py-1 px-3 font-semibold">New</div>
          <p className="text-xs font-light">Assess Your Learning Progress Instantly</p>
        </div>
  
        {/* Main heading */}
        <div className="text-center mt-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-violet-200 to-indigo-200 inline-block text-transparent bg-clip-text">Meet CourseGPT</h1>
          <p className="font-light mt-6 text-lg text-violet-100 max-w-2xl mx-auto">
            Advanced learning platform with real-time progress insights. Analyze your understanding and identify focus areas effortlessly.
          </p>
          <Link to="/courses">
            <button className="mt-8 py-2.5 px-6 bg-zinc-200 text-[#262063] cursor-pointer rounded-lg transition-all duration-300 hover:bg-zinc-300 font-medium text-sm shadow-lg shadow-black/20">
              Get started
            </button>
        </Link>
        </div>
  
        {/* Features section */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-10 text-left">Why CourseGPT?</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#131627]/70 to-black/80 border border-[#131627]/50 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group hover:border-[#a392f9]/50">
              <div className='flex items-center gap-4 mb-4'>
                <div className="p-2 rounded-xl bg-[#a392f9] text-white font-medium hover:bg-[#8b7ff0] transition-colors w-fit">
                  <assets.BiSolidAnalyse className="text-violet-400 text-2xl" />
                </div>
                <h3 className="font-semibold text-md group-hover:text-violet-300 transition-all duration-300">Smart Learning Analysis</h3>
              </div>
              <p className="text-violet-200/70 text-sm leading-relaxed">Gain insights into your learning progress and identify key areas for focus</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#131627]/70 to-black/80 border border-[#131627]/50 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group hover:border-[#a392f9]/50">
              <div className='flex items-center gap-4 mb-4'>
                <div className="p-2 rounded-xl bg-[#a392f9] text-white font-medium hover:bg-[#8b7ff0] transition-colors w-fit">
                  <assets.MdSpatialTracking className="text-violet-400 text-2xl" />
                </div>
                <h3 className="font-semibold text-md group-hover:text-violet-300 transition-all duration-300">Progress Tracking in Real-Time</h3>
              </div>
              <p className="text-violet-200/70 text-sm leading-relaxed">Monitor your course completion and understanding as you learn</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-[#131627]/70 to-black/80 border border-[#131627]/50 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group hover:border-[#a392f9]/50">
              <div className='flex items-center gap-4 mb-4'>
                <div className="p-2 rounded-xl bg-[#a392f9] text-white font-medium hover:bg-[#8b7ff0] transition-colors w-fit">
                  <assets.MdSpatialTracking className="text-violet-400 text-2xl" />
                </div>
                <h3 className="font-semibold text-md group-hover:text-violet-300 transition-all duration-300">Personalized Learning Alerts</h3>
              </div>
              <p className="text-violet-200/70 text-sm leading-relaxed">Stay informed about new content, upcoming quizzes, and learning milestones</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-[#131627]/70 to-black/80 border border-[#131627]/50 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group hover:border-[#a392f9]/50">
              <div className='flex items-center gap-4 mb-4'>
                <div className="p-2 rounded-xl bg-[#a392f9] text-white font-medium hover:bg-[#8b7ff0] transition-colors w-fit">
                  <assets.MdSpatialTracking className="text-violet-400 text-2xl" />
                </div>
                <h3 className="font-semibold text-md group-hover:text-violet-300 transition-all duration-300">Intuitive Learning Interface</h3>
              </div>
              <p className="text-violet-200/70 text-sm leading-relaxed">Enjoy a seamless and user-friendly platform designed for effortless learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home