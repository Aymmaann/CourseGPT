import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/CourseContext'
import assets from '../assets/assets.js';
import { Link } from 'react-router-dom'

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
        const response = await fetch('http://localhost:8001/api/generateLearningOutcomes', {
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
        const response = await fetch('http://localhost:8001/api/generateModuleContent', {
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

        <div className='text-center mt-20 leading-[60px] w-[80%] mx-auto text-zinc-200'>
            <p className='text-[60px]'>Master In-Demand <br /> Skills</p>
            <p className='text-[18px] mt-2 w-[90%] text-center mx-auto text-zinc-300'>Discover courses designed to equip you with the expertise and practical abilities to excel in your chosen field.</p>
        </div>


        <div className="p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
                <div className="flex flex-col gap-2 bg-zinc-300 opacity-90 rounded-md p-4 w-[500px]">
                    <input
                        type="text"
                        placeholder='Enter a topic...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='outline-none px-3 py-2 rounded-md bg-white text-darkGray'
                    />
                    <div className='flex items-center gap-3 mt-4'>
                        <label htmlFor="difficulty" className="block text-sm text-darkGray">Difficulty:</label>
                        <select
                            id="difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className='outline-none px-3 py-2 rounded-md bg-white text-darkGray text-sm'
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                        <label htmlFor="estimatedTime" className="block text-sm text-darkGray">Estimated Completion (hours):</label>
                        <input
                            type="number"
                            id="estimatedTime"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            className='outline-none px-3 py-2 rounded-md bg-white text-darkGray text-sm'
                        />
                    </div>
                    <button type='submit' className=' mt-4 bg-violet px-5 py-2 rounded-md cursor-pointer text-white hover:bg-darkBlue smoothTransition'>
                        Submit
                    </button>
                </div>
            </form>

            <div className="mt-4">
                {loading ? (
                    <div className='flex flex-col items-center justify-center mt-20'>
                        <svg xmlns='http://www.w3.org/2000/svg' width="80px" viewBox='0 0 300 150'>
                            <path fill='none' stroke='#A392F9' strokeWidth='11' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
                                <animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate>
                            </path>
                        </svg>
                        <p className='text-zinc-200 mt-4 text-sm'>Hang tight while we fetch your course details...</p>
                    </div>
                ) : lesson ? (
                    <div className="lesson-content bg-violet text-darkGray p-6 rounded-lg shadow">
                        <h2 className='text-2xl font-semibold mb-4'>Lesson Content</h2>
                        <p className='text-sm  mb-2'>
                            (The content might render in Markdown format on first load. If it's not rendered correctly, please click the 'Submit' button again.)
                        </p>
                        <div className="prose max-w-none">
                            <ReactMarkdown>
                                {lesson}
                            </ReactMarkdown>
                        </div>
                        
                        <div className="mt-6">
                            <button 
                                className='bg-darkBlue px-5 py-2 rounded-md text-white w-full hover:opacity-80 smoothTransition' 
                                onClick={goToCourse}
                            >
                                View Course
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className='mt-10 text-center text-sm'>Enter a topic to generate lesson content!</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search