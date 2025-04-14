import React, { useState } from 'react'
import assets from '../assets/assets.js';
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx';
import MainNavbar from '../components/MainNavbar.jsx';

const CoursesPage = () => {
    const [fill, setFill] = useState('none')

    return (
      <div className='w-full min-h-screen text-zinc-200 bg-black bg-[url("/src/assets/images/home-bg.jpg")] bg-top pb-16'>
        <MainNavbar />
  
        {/* Courses Header with filtering options */}
        <div className='container mx-auto px-6 mt-12'>
          <div className='flex flex-wrap justify-between items-center mb-8'>
            <div>
              <h1 className='text-3xl md:text-4xl font-semibold'>Explore Courses</h1>
              <p className='text-zinc-400 mt-2'>Discover our curated collection of tech courses</p>
            </div>
            
            <div className='flex items-center gap-4 mt-4 md:mt-0'>
              <div className='relative'>
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className='px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 outline-none w-full md:w-64'
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-3 right-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select className='px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-[#a392f9] outline-none'>
                <option value="">All Categories</option>
                <option value="development">Development</option>
                <option value="data">Data Science</option>
                <option value="ai">AI & ML</option>
              </select>
            </div>
          </div>
  
          {/* Featured Course - Highlight */}
          <div className='mb-12 bg-gradient-to-br from-[#131627]/70 to-[#1a1442] p-1 rounded-xl'>
            <div className='rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center'>
              <div className='w-full md:w-2/3'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='bg-[#a392f9]/20 text-[#a392f9] rounded-full p-2.5'>
                    <assets.FaReact className="text-2xl" />
                  </div>
                  <span className='text-[#a392f9] text-sm font-medium px-3 py-1 bg-[#a392f9]/10 rounded-full'>Featured Course</span>
                </div>
                <h2 className='text-2xl font-bold mb-3'>Advanced Web Development Masterclass</h2>
                <p className='text-zinc-300 mb-6'>Master modern web technologies including React, Node.js, and advanced JavaScript concepts. Build complex web applications and elevate your development skills to professional standards.</p>
                <div className='flex flex-wrap gap-4'>
                  <Link to="/search" className='px-5 py-2.5 bg-[#a392f9] text-white rounded-lg font-medium hover:bg-[#8b7ff0] transition-colors'>
                    View Course Details
                  </Link>
                  <button className='px-5 py-2.5 bg-transparent border border-zinc-600 text-zinc-200 rounded-lg font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2' onClick={() => (fill==='none')? setFill('white') : setFill('none')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={fill} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save for Later
                  </button>
                </div>
              </div>
              <div className='w-full md:w-1/3 flex justify-center'>
                <div className='w-48 h-48 bg-[#262063] rounded-full flex items-center justify-center'>
                  <assets.FaReact className="text-[90px] text-[#a392f9]" />
                </div>
              </div>
            </div>
          </div>
  
          {/* Course Categories */}
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {[
                { icon: 'FaCode', name: 'Development' },
                { icon: 'FaDatabase', name: 'Data Science' },
                { icon: 'FaRobot', name: 'AI & ML' },
                { icon: 'FaCloud', name: 'Cloud' },
                { icon: 'FaShieldAlt', name: 'Security' },
                { icon: 'FaMobile', name: 'Mobile' }
            ].map((category, index) => {
                const IconComponent = assets[category.icon];
                return (
                <div key={index} className='bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center'>
                    {IconComponent && <IconComponent className="text-[#a392f9] text-2xl mb-2" />}
                    <span className='text-sm'>{category.name}</span>
                </div>
                );
            })}
            </div>
  
          {/* Course Grid */}
          <div className='my-12'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold'>All Courses</h2>
              <div className='flex items-center gap-2'>
                <button className='text-sm text-zinc-400 hover:text-white transition-colors'>Most Popular</button>
                <span className='text-zinc-600'>|</span>
                <button className='text-sm text-zinc-400 hover:text-white transition-colors'>Newest</button>
              </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <CourseCard imageComponent='FaReact' name="Web Development" description="This comprehensive course is your starting point to the exciting world of web development. Learn the fundamental building blocks of the internet – HTML, CSS, and JavaScript – and gain the skills to create your own interactive and visually appealing websites from scratch." />
              <CourseCard imageComponent='FaDatabase' name="Data Science Fundamentals" description="This course introduces the core concepts of data science, including data analysis, visualization, and basic statistical methods using tools like Python and Pandas. It covers data cleaning, exploratory data analysis, and understanding different types of data." />
              <CourseCard imageComponent='FaRobot' name="Machine Learning Basics" description="This course provides an introduction to machine learning concepts, algorithms, and applications. It covers supervised and unsupervised learning, model evaluation, and basic algorithms like linear regression and decision trees." />
              <CourseCard imageComponent='FaRobot' name="Introduction to AI" description="This course covers the basics of artificial intelligence, including its history, applications, and ethical considerations. It introduces concepts like natural language processing, computer vision, and reinforcement learning." />
              <CourseCard imageComponent='FaCloud' name="Cloud Computing Essentials" description="This course introduces the fundamentals of cloud computing, including different service models (IaaS, PaaS, SaaS) and deployment models (public, private, hybrid). It covers major cloud providers like AWS, Azure, and Google Cloud." />
              <CourseCard imageComponent='FaShieldAlt' name="Cybersecurity Basics" description="This course covers the fundamental principles of cybersecurity, including threat modeling, risk assessment, and basic security practices. It introduces concepts like encryption, firewalls, and secure coding practices." />
              <CourseCard imageComponent='FaMobile' name="Mobile App Development" description="This course introduces the basics of mobile app development, including design principles, user experience, and development frameworks. It covers both Android and iOS platforms." />
              <CourseCard imageComponent='IoGameController' name="Game Development Fundamentals" description="This course covers the basics of game development, including game design principles, programming concepts, and game engines. It introduces students to popular game development tools and languages." />
              <CourseCard imageComponent='SiBlockchaindotcom' name="Blockchain Basics" description="This course introduces the fundamentals of blockchain technology, including its history, architecture, and applications. It covers concepts like smart contracts, consensus algorithms, and decentralized applications." />
            </div>
          </div>
          
          {/* Pagination */}
          <div className='flex justify-center mt-10'>
            <div className='flex items-center gap-2'>
              <button className='w-10 h-10 rounded-lg border border-zinc-700 hover:border-[#a392f9] flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className='w-10 h-10 rounded-lg bg-[#a392f9] flex items-center justify-center'>1</button>
              <button className='w-10 h-10 rounded-lg border border-zinc-700 hover:border-[#a392f9] flex items-center justify-center'>2</button>
              <button className='w-10 h-10 rounded-lg border border-zinc-700 hover:border-[#a392f9] flex items-center justify-center'>3</button>
              <span className='text-zinc-500'>...</span>
              <button className='w-10 h-10 rounded-lg border border-zinc-700 hover:border-[#a392f9] flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default CoursesPage