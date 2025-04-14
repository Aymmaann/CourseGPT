import React from 'react'
import assets from '../assets/assets'
import { Link } from 'react-router-dom'

const MainNavbar = () => {
  return (
    <div className="relative backdrop-blur-sm bg-darkGray border-b border-white/10 py-3 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <img src={assets.noBgLogo} alt="CourseGPT Logo" className="w-7" />
                <p className="text-xl font-light tracking-wide">
                    Course<span className="font-bold">GPT</span>
                </p>
            </div>

            <div className="flex-1 max-w-md mx-auto">
                <ul className="flex items-center justify-center gap-28 text-sm font-medium">
                    <Link to="/home" className="transition-all duration-300 hover:text-violet-300 px-2 py-1 relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/search" className="transition-all duration-300 hover:text-violet-300 px-2 py-1 relative group">
                        Search
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/courses" className="transition-all duration-300 hover:text-violet-300 px-2 py-1 relative group">
                        Courses
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </ul>
            </div>

            <Link to="/" className="text-sm flex items-center gap-2 transition-all duration-300 hover:text-violet-300 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <span>Log out</span>
                <assets.IoMdLogOut className="text-base" />
            </Link>
        </div>
    </div>
  )
}

export default MainNavbar;