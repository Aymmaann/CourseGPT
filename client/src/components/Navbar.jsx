import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [displayOptions, setDisplayOptions] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const deleteAccount = () => {
    localStorage.removeItem('user')
    navigate("/")
  }

  return (
    <div className='relative flex items-center justify-between py-2.5 px-4 text-zinc-300 bg-darkBlue'>
        <div className='flex gap-3 items-center'>
            <img src={assets.pfp} className='w-[40px] rounded-full border border-1 border-violet ' />
            <p className=''>{JSON.parse(localStorage.getItem('user')).name || JSON.parse(localStorage.getItem('user')).email}</p>
        </div>

        <div onClick={() => setDisplayOptions(!displayOptions)} className='cursor-pointer relative'>
                {displayOptions? (
                    <assets.IoIosArrowUp className='text-[16px] text-zinc-300' />
                ) : (
                    <assets.IoIosArrowDown className='text-[16px] text-zinc-300' />
                )}

                {displayOptions && (
                    <div className='absolute top-10 right-0 border border-1 border-zinc-800 bg-darkBlue rounded-md p-4 min-w-[180px] z-10'>
                        <p className='text-sm'>{JSON.parse(localStorage.getItem('user')).name || JSON.parse(localStorage.getItem('user')).email}</p>
                        <button className='text-center text-sm w-full bg-teal-900 py-1.5 rounded-md mt-5 hover:bg-teal-800 smoothTransition' onClick={handleLogout}>
                            <span className=''>Log out</span>
                        </button>
                        <button className='text-center text-sm w-full bg-teal-900 py-1.5 rounded-md mt-5 hover:bg-teal-800 smoothTransition' onClick={deleteAccount}>
                            <span className=''>Delete Account</span>
                        </button>
                    </div>
                )}
        </div>
    </div>
  )
}

export default Navbar