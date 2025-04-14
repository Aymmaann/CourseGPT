import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/CourseContext'
import assets from '../assets/assets.js';
import { Link } from 'react-router-dom'
import MainNavbar from '../components/MainNavbar.jsx';

const Search = () => {
    const { topic, setTopic, lesson, setLesson, loading, setLoading, modules, setModules, setModuleContent, extractModules } = useContext(Context);
    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('Beginner')
    const [estimatedTime, setEstimatedTime] = useState('1')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
    e.preventDefault()
    setTopic(title)
    localStorage.setItem('topic', title);
    try {
        setLoading(true)
        if(estimatedTime === '') {
            setEstimatedTime('1')
        }
        const response = await fetch(`http://localhost:8001/api/generateLearningOutcomes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: title, difficulty, estimatedTime })
        })
        const data = await response.json()
        setLoading(false)
        
        const cleanContent = data.content.replace(/^```|```$/g, '');
        setLesson(cleanContent)
        extractModules(cleanContent);
    } catch(error) {
        console.error("Error fetching data: ", error)
    }
    }

    const handleModuleClick = async(module) => {
    try {
        setLoading(true)
        const response = await fetch(`http://localhost:8001/api/generateModuleContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, module })
        })
        const data = await response.json()
        setModuleContent(data.content)
        localStorage.setItem('module-content', data.content);
    } catch(error) {
        console.error("Error fetching data: ", error)
    }
    setLoading(false)
    };

    const goToCourse = () => {
        if(topic && modules.length > 0) { 
            handleModuleClick(modules[0]);
            navigate('/course');
        } else {
            console.warn("Topic or modules not yet available, cannot navigate to course.");
        }
    }

    useEffect(() => {
    const storedModules = localStorage.getItem('modules');
    if (storedModules) {
        setModules(JSON.parse(storedModules));
        console.log('Modules loaded from localStorage:', JSON.parse(storedModules));
    }

    const storedTopic = localStorage.getItem('topic');
    if (storedTopic) {
        setTopic(storedTopic);
        console.log('Topic loaded from localStorage:', storedTopic);
    }
    }, [setModules, setTopic]);


    useEffect(() => {
    if (modules.length > 0) {
        localStorage.setItem('modules', JSON.stringify(modules));
        console.log('Modules saved to localStorage:', modules);
    }
    }, [modules]);

return (
    <div className='w-full min-h-screen text-zinc-200 bg-black bg-[url("/src/assets/images/home-bg.jpg")] bg-top pb-16'>
      <MainNavbar />
  
      {/* Main Content Area - Redesigned to 2-column layout */}
      <div className='container mx-auto px-6 mt-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Column - Hero Content */}
          <div className='text-left'>
            <h1 className='text-5xl md:text-[60px] font-bold leading-[1.1] text-zinc-100 mb-6'>
              Master <span className='text-[#a392f9]'>In-Demand</span> Skills
            </h1>
            <p className='text-lg mt-4 max-w-xl text-zinc-300 leading-relaxed'>
              Discover courses designed to equip you with the expertise and practical abilities to excel in your chosen field.
            </p>
            <div className='mt-8 flex gap-4'>
              <Link to='/courses' className='px-6 py-3 bg-[#a392f9] text-white rounded-md font-medium hover:bg-[#8b7ff0] transition-colors'>
                Explore Courses
              </Link>
              <Link to='/home' className='px-6 py-3 bg-transparent border border-zinc-600 text-zinc-200 rounded-md font-medium hover:bg-zinc-800 transition-colors'>
                Learn More
              </Link>
            </div>
          </div>
  
          <div className="relative mt-6 lg:mt-0">
            <div className="bg-gradient-to-br from-[#131627]/70 to-black/80 border border-[#131627]/50 rounded-xl p-6 w-full max-w-lg shadow-xl backdrop-blur-sm">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#a392f9] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-100 ml-3">Create New Course</h3>
                </div>
                
                <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-2">Course Topic</label>
                    <input
                    type="text"
                    placeholder="Enter a topic you want to learn..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full outline-none px-4 py-3 rounded-lg bg-[#262063]/20 text-zinc-200 border border-[#262063]/70 focus:border-[#a392f9] transition-colors placeholder-zinc-500"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                    <label htmlFor="difficulty" className="block text-sm text-zinc-400 mb-2">Difficulty Level</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full outline-none px-4 py-3 rounded-lg bg-[#262063]/20 text-zinc-200 text-sm border border-[#262063]/70 focus:border-[#a392f9] transition-colors"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    </div>
                    
                    <div>
                        <label htmlFor="estimatedTime" className="block text-sm text-zinc-400 mb-2">Study Time (hours)</label>
                        <div className="relative">
                            <input
                            type="number"
                            id="estimatedTime"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            className="w-full outline-none px-4 py-3 rounded-lg bg-[#262063]/20 text-zinc-200 text-sm border border-[#262063]/70 focus:border-[#a392f9] transition-colors"
                            />
                        </div>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="w-full mt-2 bg-gradient-to-r from-[#a392f9] to-[#8474e0] px-5 py-2.5 smoothTransition rounded-lg cursor-pointer text-white hover:from-[#8b7ff0] hover:to-[#7364d0] transition-all font-medium flex items-center justify-center gap-2 smoothTransition"
                >
                    <span>Generate Course</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-[#262063]/50">
                    <p className="text-xs text-zinc-400 text-center">Our AI will generate a customized course based on your preferences</p>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#a392f9]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#262063]/20 rounded-full blur-xl"></div>
            </div>
        </div>
  
        {/* Course Result Section - Full width */}
        <div className="mt-16 mb-8">
          {loading ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <svg xmlns='http://www.w3.org/2000/svg' width="80px" viewBox='0 0 300 150'>
                <path fill='none' stroke='#A392F9' strokeWidth='11' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
                  <animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate>
                </path>
              </svg>
              <p className='text-zinc-200 mt-4 text-sm'>Hang tight while we fetch your course details...</p>
            </div>
          ) : lesson ? (
            <div className="lesson-content max-w-4xl mx-auto bg-darkBlue text-zinc-200 p-8 rounded-lg shadow-lg border border-[#262063]/50">
              <h2 className='text-2xl font-semibold mb-6 text-zinc-100 border-b border-[#262063] pb-3'>Course Overview</h2>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {lesson}
                </ReactMarkdown>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button 
                  className='bg-[#a392f9] px-6 py-3 rounded-md text-white hover:bg-[#8b7ff0] transition-colors font-medium' 
                  onClick={goToCourse}
                >
                  Access Full Course
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center bg-darkBlue/30 py-16 rounded-lg border border-[#262063]/30">
              <p className='text-zinc-300 mb-2'>Ready to learn something new?</p>
              <p className='text-sm text-zinc-500'>Create a course by entering a topic in the form</p>
            </div>
          )}
        </div>
  
        {/* Featured Courses Section - Added for better space utilization */}
        {!lesson && !loading && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-zinc-100">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Web Development', 'Machine Learning', 'Digital Marketing','Data Science', 'Python for beginners', 'C++ Basics'].map((topic, index) => (
                <div 
                  key={index} 
                  className="bg-darkBlue/40 border border-[#262063]/30 p-6 rounded-lg hover:border-[#a392f9]/50 transition-all cursor-pointer"
                  onClick={() => setTitle(topic)}
                >
                  <h3 className="text-lg font-medium text-zinc-200 mb-2">{topic}</h3>
                  <p className="text-sm text-zinc-400">Click to instantly create a course on this topic</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search