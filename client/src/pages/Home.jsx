import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/CourseContext'

const Home = () => {
  const { topic, setTopic, lesson, setLesson, loading, setLoading, modules, setModules, extractModules } = useContext(Context);
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Title: ", title)
    setTopic(title)
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

  const goToCourse = () => {
    navigate('/course')
  }

  useEffect(() => {
    const storedModules = localStorage.getItem('modules');
    if (storedModules) {
      setModules(JSON.parse(storedModules));
      console.log('Modules loaded from localStorage:', JSON.parse(storedModules));
    }
  }, [setModules]);


  useEffect(() => {
    if (modules.length > 0) {
      localStorage.setItem('modules', JSON.stringify(modules));
      console.log('Modules saved to localStorage:', modules);
    }
  }, [modules]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
    </div>
  )
}

export default Home