import React from 'react'
import assets from '../assets/assets.js';
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx';

const CoursesPage = () => {
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

        <div className='px-14 mt-14'>
            <p className='text-[35px] font-semibold'>Courses</p>
            <div className='mt-6 grid grid-cols-3 gap-10 w-full justify-between'>
                <CourseCard imageComponent='FaReact' name="Web Development" description="This comprehensive course is your starting point to the exciting world of web development. Learn the fundamental building blocks of the internet – HTML, CSS, and JavaScript – and gain the skills to create your own interactive and visually appealing websites from scratch. No prior coding experience required!" />
                <CourseCard imageComponent='FaReact' name="Data Science Fundamentals" description="This course would introduce the core concepts of data science, including data analysis, visualization, and basic statistical methods using tools like Python and Pandas. It could cover data cleaning, exploratory data analysis, and understanding different types of data." />
                <CourseCard imageComponent='FaReact' name="Machine Learning Basics" description="This course would provide an introduction to machine learning concepts, algorithms, and applications. It could cover supervised and unsupervised learning, model evaluation, and basic algorithms like linear regression and decision trees." />
                <CourseCard imageComponent='FaReact' name="Introduction to AI" description="This course would cover the basics of artificial intelligence, including its history, applications, and ethical considerations. It could introduce concepts like natural language processing, computer vision, and reinforcement learning." />
                <CourseCard imageComponent='FaReact' name="Cloud Computing Essentials" description="This course would introduce the fundamentals of cloud computing, including different service models (IaaS, PaaS, SaaS) and deployment models (public, private, hybrid). It could cover major cloud providers like AWS, Azure, and Google Cloud." />
                <CourseCard imageComponent='FaReact' name="Cybersecurity Basics" description="This course would cover the fundamental principles of cybersecurity, including threat modeling, risk assessment, and basic security practices. It could introduce concepts like encryption, firewalls, and secure coding practices." />
                <CourseCard imageComponent='FaReact' name="Mobile App Development" description="This course would introduce the basics of mobile app development, including design principles, user experience, and development frameworks. It could cover both Android and iOS platforms." />
                <CourseCard imageComponent='FaReact' name="Game Development Fundamentals" description="This course would cover the basics of game development, including game design principles, programming concepts, and game engines. It could introduce students to popular game development tools and languages." />
                <CourseCard imageComponent='FaReact' name="Blockchain Basics" description="This course would introduce the fundamentals of blockchain technology, including its history, architecture, and applications. It could cover concepts like smart contracts, consensus algorithms, and decentralized applications." />
            </div>
        </div>
    </div>
  )
}

export default CoursesPage