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
      const title = localStorage.getItem('topic')
      const response = await fetch(`http://localhost:8001/api/generateModuleContent`, {
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
    if (modules.length > 0 && !activeModule) {
      setActiveModule(modules[0]); 
    }
  }, [modules, activeModule]);

  useEffect(() => {
    if(activeModule) {
      handleModuleClick(activeModule)
    }
  }, [])

  // return (
  //   <div className={`fixed overflow-y-auto w-64 min-h-screen p-4 flex flex-col justify-between bg-darkBlue text-zinc-300`}>
  //       <div>
  //           <div className='flex gap-2 items-center w-[100px] pl-2'>
  //               <img src={assets.noBgLogo} alt="" className='w-[25px]'/>
  //               <p className='text-lg font-light'>Course<span className='font-semibold'>GPT</span></p>
  //           </div>
  //           <hr className="my-3 h-[1px] bg-gradient-to-r from-[#1c1e39] via-[#343850] to-[#1c1e39] border-0 mx-3" />
            
  //           <div className='mt-4 h-full'>
  //               <p className='font-semibold text-lg pl-2 mb-4 text-zinc-100'>Modules</p>
  //               {modules.map((module, index) => {
  //                 const isActive = activeModule === module;
  //                 return (
  //                   <div key={index} className={`flex items-center gap-2 p-2 rounded-lg mb-4 cursor-pointer ${isActive? 'bg-[#1a1f37]' : 'bg-transparent'}`}
  //                     onClick={() => handleModuleClick(module)}
  //                   >
  //                     <p className='text-sm font-semibold'>{module}</p>
  //                   </div>
  //                 )
  //               })}

  //           </div>
  //       </div>
        
  //       <div className='flex items-center p-1.5 rounded-lg cursor-pointer' onClick={handleLogout}>
  //           <div className="p-2 rounded-md">
  //               <assets.IoMdLogOut className="text-[18px]" />
  //           </div>
  //           <p className="text-sm font-semibold">Home</p>
  //       </div>
  //   </div> 
  // )
  return (
    <div className="fixed overflow-y-auto w-64 min-h-screen bg-gradient-to-br from-[#131627]/70 to-[#1a1442] text-zinc-300 shadow-xl">
      {/* Header */}
      <div className="p-4">
        <div className="flex gap-3 items-center">
          <div className="bg-[#a392f9]/10 p-2 rounded-lg">
            <img src={assets.noBgLogo} alt="CourseGPT Logo" className="w-[25px]" />
          </div>
          <p className="text-lg font-light text-zinc-100">
            Course<span className="font-semibold">GPT</span>
          </p>
        </div>
      </div>
      
      {/* Divider */}
      <div className="px-4">
        <hr className="h-[1px] bg-gradient-to-r from-[#1c1e39]/30 via-[#343850] to-[#1c1e39]/30 border-0" />
      </div>
      
      {/* Course Progress */}
      <div className="px-4 py-4">
        <div className="bg-[#262063]/30 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-zinc-400">Course Progress</p>
            <span className="text-xs font-semibold text-[#a392f9]">42%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full">
            <div className="h-full bg-[#a392f9] rounded-full w-[42%]"></div>
          </div>
        </div>
      </div>
      
      {/* Modules Section */}
      <div className="px-4 py-2 flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-zinc-100">Modules</p>
          <div className="bg-[#262063]/40 p-1 rounded text-xs text-zinc-400">
            {modules.length} total
          </div>
        </div>
        
        <div className="space-y-1.5">
          {modules.map((module, index) => {
            const isActive = activeModule === module;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#a392f9]/10 text-[#a392f9] border-l-2 border-[#a392f9]'
                    : 'hover:bg-[#262063]/30 text-zinc-400 hover:text-zinc-200'
                }`}
                onClick={() => handleModuleClick(module)}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isActive 
                    ? 'bg-[#a392f9] text-white' 
                    : 'bg-[#262063]/50 text-zinc-300'
                }`}>
                  {index + 1}
                </div>
                <p className="text-sm font-medium line-clamp-1">
                  {module}
                </p>
                {isActive && (
                  <div className="ml-auto">
                    <assets.IoIosArrowDown className="text-sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Resources Section */}
      <div className="px-4 py-4">
        <p className="font-semibold text-zinc-100 mb-3">Resources</p>
        <div className="space-y-1">
          <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#262063]/30 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-lg bg-zinc-800/70 flex items-center justify-center">
              <assets.FaCode className="text-zinc-400 text-sm" />
            </div>
            <p className="text-sm text-zinc-400">Code Examples</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#262063]/30 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-lg bg-zinc-800/70 flex items-center justify-center">
              <assets.BiSolidAnalyse className="text-zinc-400 text-sm" />
            </div>
            <p className="text-sm text-zinc-400">Additional Reading</p>
          </div>
        </div>
      </div>
      
      {/* User Section */}
      <div className="mt-auto px-4 py-4 border-t border-zinc-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={assets.pfp} alt="User" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-zinc-200">{JSON.parse(localStorage.getItem('user')).name || JSON.parse(localStorage.getItem('user')).email}</p>
              <p className="text-xs text-zinc-500">Student</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 bg-zinc-800/70 rounded-md hover:bg-zinc-700/70 transition-colors">
              <assets.FaBell className="text-zinc-400 text-xs" />
            </button>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/30 cursor-pointer transition-colors"
          onClick={handleLogout}
        >
          <assets.IoMdLogOut className="text-[18px] text-zinc-400" />
          <p className="text-sm font-medium">Return to Home</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar