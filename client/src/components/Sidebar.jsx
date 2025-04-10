import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets.js';
import { Context } from '../context/CourseContext.jsx';

const Sidebar = () => {
  const { topic, setTopic, moduleContent, setModuleContent, setLoading } = useContext(Context);
  const [activeModule, setActiveModule] = useState(null);

  const modules = JSON.parse(localStorage.getItem('modules')) || [];
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/home")
  }

  const handleModuleClick = async(module) => {
    setActiveModule(module); 
    try {
      setLoading(true)
      if(topic === '') {
        setTopic(localStorage.getItem('topic'));
      }
      console.log("Topic: ", topic)
      console.log("Module: ", module)
      const title = localStorage.getItem('topic')
      const response = await fetch('http://localhost:8001/api/generateModuleContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: title, module })
      })
      const data = await response.json()
      setModuleContent(data.content)
      localStorage.setItem('module-content', data.content);
    } catch(error) {
      console.error("Error fetching data: ", error)
    }
    setLoading(false)
  };

  useEffect(() => {
    console.log("Modules: ", modules)
    if (modules.length > 0 && !activeModule) {
      setActiveModule(modules[0]); 
    }
  }, [modules, activeModule]);

  useEffect(() => {
    if(activeModule) {
      handleModuleClick(activeModule)
    }
  }, [])

  return (
    <div className={`fixed overflow-y-auto w-64 min-h-screen p-4 flex flex-col justify-between bg-darkBlue text-zinc-300`}>
        <div>
            <div className='flex gap-2 items-center w-[100px] pl-2'>
                <img src={assets.noBgLogo} alt="" className='w-[25px]'/>
                <p className='text-lg font-light'>Course<span className='font-semibold'>GPT</span></p>
            </div>
            <hr className="my-3 h-[1px] bg-gradient-to-r from-[#1c1e39] via-[#343850] to-[#1c1e39] border-0 mx-3" />
            
            <div className='mt-4 h-full'>
                <p className='font-semibold text-lg pl-2 mb-4 text-zinc-100'>Modules</p>
                {modules.map((module, index) => {
                  const isActive = activeModule === module;
                  return (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded-lg mb-4 cursor-pointer ${isActive? 'bg-[#1a1f37]' : 'bg-transparent'}`}
                      onClick={() => handleModuleClick(module)}
                    >
                      <p className='text-sm font-semibold'>{module}</p>
                    </div>
                  )
                })}

            </div>
        </div>
        
        <div className='flex items-center p-1.5 rounded-lg cursor-pointer' onClick={handleLogout}>
            <div className="p-2 rounded-md">
                <assets.IoMdLogOut className="text-[18px]" />
            </div>
            <p className="text-sm font-semibold">Home</p>
        </div>
    </div> 
  )
}

export default Sidebar