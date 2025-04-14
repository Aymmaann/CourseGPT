import React from 'react'
import { Link } from 'react-router-dom';
import assets from '../assets/assets.js';

// const CourseCard = ({ imageComponent, name, description }) => {
//   const ImageComponent = assets[imageComponent];

//   return (
//     <div className='bg-violet rounded-lg p-6 text-darkGray flex flex-col justify-between'>
//         <div>
//             <div className="flex items-center gap-3">
//                 <div className=' bg-darkGray rounded-full flex items-center justify-between p-3 w-[48px]'>
//                     {ImageComponent ? <ImageComponent className="text-[24px] text-zinc-200" /> : null}
//                 </div>
//                 <p className='text-lg font-semibold'>{name}</p>
//             </div>
//             <p className='mt-4 '>{description}</p>
//         </div>
//         <Link to="/search">
//             <button className='w-full bg-darkGray px-2 py-2 rounded-md text-zinc-200 text-sm mt-4 smoothTransition hover:opacity-80'>Search Details</button>
//         </Link>
//     </div>
//   )
// }

const CourseCard = ({ imageComponent, name, description }) => {
    const ImageComponent = assets[imageComponent];
  
    return (
      <div className='bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 border border-zinc-700 hover:border-[#a392f9]/60 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-[#a392f9]/10'>
        <div className='h-40 bg-[#262063]/90 flex items-center justify-center'>
          {ImageComponent && <ImageComponent className="text-[60px] text-[#a392f9]" />}
        </div>
        
        <div className='p-6'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-semibold text-zinc-100'>{name}</h3>
            <div className='flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className='text-sm font-medium'>4.8</span>
            </div>
          </div>
          
          <div className='flex items-center gap-3 mb-4'>
            <div className='px-2.5 py-1 rounded-full bg-[#a392f9]/10 text-[#a392f9] text-xs'>
              Popular
            </div>
            <div className='text-zinc-400 text-xs flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              8 weeks
            </div>
          </div>
          
          <p className='text-zinc-300 text-sm line-clamp-3 mb-5'>{description}</p>
          
          <div className='flex items-center justify-between mt-4'>
            <Link to="/search" className='px-4 py-2 bg-[#a392f9] text-white rounded-lg text-sm font-medium hover:bg-[#8b7ff0] transition-colors'>
              View Course
            </Link>
            <button className='p-2 rounded-full border border-zinc-700 hover:border-[#a392f9]/60 transition-colors'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

export default CourseCard