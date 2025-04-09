import React from 'react'
import { Link } from 'react-router-dom';
import assets from '../assets/assets.js';

const CourseCard = ({ imageComponent, name, description }) => {
  const ImageComponent = assets[imageComponent];

  return (
    <div className='bg-violet rounded-lg p-6 text-darkGray flex flex-col justify-between'>
        <div>
            <div className="flex items-center gap-3">
                <div className=' bg-darkGray rounded-full flex items-center justify-between p-3 w-[48px]'>
                    {ImageComponent ? <ImageComponent className="text-[24px] text-zinc-200" /> : null}
                </div>
                <p className='text-lg font-semibold'>{name}</p>
            </div>
            <p className='mt-4 '>{description}</p>
        </div>
        <Link to="/search">
            <button className='w-full bg-darkGray px-2 py-2 rounded-md text-zinc-200 text-sm mt-4 smoothTransition hover:opacity-80'>Search Details</button>
        </Link>
    </div>
  )
}

export default CourseCard