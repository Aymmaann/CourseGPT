// import React, { useEffect, useState } from 'react'
// import ReactMarkdown from 'react-markdown'
// import { useNavigate } from 'react-router-dom'

// const Input = () => {
//   const [title, setTitle] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [lesson, setLesson] = useState('')
//   const [modules, setModules] = useState([])
//   const navigate = useNavigate()

//   const handleSubmit = async(e) => {
//     e.preventDefault()
//     console.log("Title: ", title)
//     try {
//         setLoading(true)
//         const response = await fetch('http://localhost:8001/api/generateLearningOutcomes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ topic: title })
//         })
//         const data = await response.json()
//         console.log(data)
//         setLoading(false)
//         setLesson(data.content)

        
//         const extractedModules = extractModules(data.content);
//         setModules(extractedModules);
//         console.log("Modules: ", modules)
//     } catch(error) {
//         console.error("Error fetching data: ", error)
//     }
//   }

//   const extractModules = (content) => {
//     const matches = content.match(/Module\s*\d+:\s*([^\n]+)/g);
//     if (!matches) {
//       return []; 
//     }
//     const moduleTitles = matches.map((match) => match.replace(/^Module\s*\d+:\s*/, '').trim());
//     return moduleTitles;
//   };
  
//   const goToCourse = async() => {
//     navigate('/course')
//   }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <input type="text"
//                    placeholder='Enter a topic...' 
//                    value={title} 
//                    onChange={(e) => setTitle(e.target.value)} 
//                    className='outline outline-1' 
//             />
//             <button type='submit' className='bg-red-500 px-3 py-2 rounded-md'>Submit</button>
//         </form>

//         <p className='text-xl font-semibold'>Lesson Content</p>
//         {loading? (
//             <p>Loading...</p>
//         ) : (
//             <div>
//                 <ReactMarkdown>{lesson}</ReactMarkdown>
//                 <button className='bg-red-500 px-3 py-2 rounded-md' onClick={goToCourse}>Go to course</button>
//             </div>
//         )}
//     </div>
//   )
// }

// export default Input