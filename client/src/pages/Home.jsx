import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/CourseContext'
import { Link } from 'react-router-dom'
import assets from '../assets/assets.js';

const Home = () => {
  const { topic, setTopic, lesson, setLesson, loading, setLoading, modules, setModules, setModuleContent, extractModules } = useContext(Context);
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Title: ", title)
    setTopic(title)
    localStorage.setItem('topic', title);
    try {
        setLoading(true)
        const response = await fetch('http://localhost:8001/api/generateLearningOutcomes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: title })
        })
        const data = await response.json()
        console.log(data)
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
      console.log("Topic: ", topic)
      console.log("Module: ", module)
      const response = await fetch('http://localhost:8001/api/generateModuleContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, module })
      })
      const data = await response.json()
      setModuleContent(data.content)
    } catch(error) {
      console.error("Error fetching data: ", error)
    }
    setLoading(false)
  };

  const goToCourse = () => {
    if(topic) {
        handleModuleClick(modules[0]); 
        navigate('/course');
    } else {
        console.warn("Topic not yet available, cannot navigate to course.");
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

        <div className='mt-20'>
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

        {/* <div className="p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Enter a topic...' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className='outline outline-1 px-3 py-2 rounded-md flex-grow' 
                    />
                    <button type='submit' className='bg-red-500 px-5 py-2 rounded-md text-white'>
                        Submit
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <h2 className='text-2xl font-semibold mb-4'>Lesson Content</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : lesson ? (
                    <div className="lesson-content bg-white p-6 rounded-lg shadow">
                        <div className="prose max-w-none">
                            <ReactMarkdown>
                                {lesson}
                            </ReactMarkdown>
                        </div>
                        
                        <div className="mt-6">
                            <button 
                                className='bg-red-500 px-5 py-2 rounded-md text-white' 
                                onClick={goToCourse}
                            >
                                View Course
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Enter a topic to generate lesson content.</p>
                )}
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default Home