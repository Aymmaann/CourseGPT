import React, { useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Context } from '../context/CourseContext'

const ModuleDetails = ({ moduleData }) => {
  const { setModuleContent } = useContext(Context)
  const [edit, setEdit] = useState(false)
  const moduleContent = localStorage.getItem('module-content')
  const [localContent, setLocalContent] = useState(moduleContent?.mainContent || '')
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  if(!moduleData) {
    return (
        <div className='flex flex-col items-center justify-center mt-64'>
            <svg xmlns='http://www.w3.org/2000/svg' width="80px" viewBox='0 0 300 150'>
                <path fill='none' stroke='#A392F9' strokeWidth='11' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
                    <animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate>
                </path>
            </svg>
            <p className='text-zinc-200 mt-4 text-sm'>Hang tight while we fetch your module...</p>
        </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedModule = {
        ...moduleData,
        mainContent: localContent,
    };
    setModuleContent(updatedModule);
    localStorage.setItem('module-content', JSON.stringify(updatedModule));
    moduleData.mainContent = localContent;
    setEdit(false)
  }

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answer,
    });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    if (moduleData.quiz) {
      moduleData.quiz.forEach((question, index) => {
        if (quizAnswers[index] === question.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setShowScore(true);
    }
  };

  return (
    <div className="module-details p-5 pt-0">
      <button className='my-6 py-2 px-4 bg-zinc-200 text-[#262063] rounded-md smoothTransition cursor-pointer font-medium text-sm hover:bg-zinc-300'
              onClick={() => setEdit(!edit)}
      > 
        {!edit? 'Edit content' : 'Go back to view'}
      </button>
      {!edit? (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-zinc-100">{moduleData.moduleTitle}</h1>
      <p className="text-zinc-300 mb-3">{moduleData.moduleDescription}</p>

      {moduleData.learningOutcomes && moduleData.learningOutcomes.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-zinc-100">Learning Outcomes</h2>
            <ul className="list-disc list-inside text-zinc-300">
                {moduleData.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
                ))}
            </ul>
            </div>
        )}

        {moduleData.mainContent && (
            <div className="mb-4 text-zinc-300">
            <h2 className="text-lg font-semibold mb-2 text-zinc-100">Module Content</h2>
            <ReactMarkdown>{moduleData.mainContent}</ReactMarkdown>
            </div>
        )}

        {moduleData.keyConcepts && moduleData.keyConcepts.length > 0 && (
            <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-zinc-100">Key Concepts</h2>
            <ul className="list-disc list-inside text-zinc-300">
                {moduleData.keyConcepts.map((concept, index) => (
                <li key={index}>
                    <strong className="text-zinc-100">{concept.term}:</strong> {concept.definition}
                </li>
                ))}
            </ul>
            </div>
        )}

        {moduleData.examples && moduleData.examples.length > 0 && (
            <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-zinc-100">Examples</h2>
            {moduleData.examples.map((example, index) => (
                <div key={index} className="mb-3 p-3 rounded-md bg-[#1a1f37]">
                <h3 className="text-md font-semibold mb-1 text-zinc-100">{example.title}</h3>
                <p className="text-zinc-300">{example.description}</p>
                {example.code && (
                    <pre className="rounded-md bg-darkGray text-zinc-300 p-3 mt-2 overflow-auto">
                    <code>{example.code}</code>
                    </pre>
                )}
                </div>
            ))}
            </div>
        )}

        {moduleData.activities && moduleData.activities.length > 0 && (
            <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-zinc-100">Activities</h2>
            <ul className="list-decimal list-inside text-zinc-300">
                {moduleData.activities.map((activity, index) => (
                <li key={index}>
                    <strong className="text-zinc-100">{activity.title}:</strong> {activity.description}
                </li>
                ))}
            </ul>
            </div>
        )}

        {moduleData.resources && moduleData.resources.length > 0 && (
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-zinc-100">Further Resources</h2>
                <ul className="list-disc list-inside text-zinc-300">
                    {moduleData.resources.map((resource, index) => (
                    <li key={index}>
                        <strong className="text-zinc-100">{resource.title}:</strong>{' '}
                        {resource.description.startsWith('http') ? (
                        <a href={resource.description} target="_blank" rel="noopener noreferrer" className="text-[#a392f9] hover:underline">
                            Learn More
                        </a>
                        ) : (
                        resource.description
                        )}
                    </li>
                    ))}
                </ul>
            </div>
        )}

        {moduleData.quiz && moduleData.quiz.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-zinc-100">Module Quiz</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                {moduleData.quiz.map((question, index) => (
                  <div key={index} className="mb-6">
                    <p className="text-zinc-300 mb-2"><strong className="text-zinc-100">{index + 1}.</strong> {question.question}</p>
                    <div className="ml-4">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2">
                          <label className="inline-flex items-center text-zinc-300">
                            <input
                              type="radio"
                              className="form-radio mr-2 cursor-pointer"
                              name={`question-${index}`}
                              value={option}
                              onChange={(e) => handleQuizAnswer(index, e.target.value)}
                              checked={quizAnswers[index] === option}
                            />
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="py-2 px-4 bg-zinc-200 text-[#262063] rounded-md smoothTransition cursor-pointer font-medium text-sm hover:bg-zinc-300"
                  onClick={submitQuiz}
                >
                  Submit Quiz
                </button>

                {showScore && (
                  <div className="mt-4 text-lg text-green-400">
                    Your Score: {score} / {moduleData.quiz.length}
                  </div>
                )}
              </form>
            </div>
        )}
        </div>
      ) : (
        <form
            onSubmit={(e) => handleSubmit(e)}
        >
            <textarea
                className="w-full h-96 p-3 rounded-md bg-zinc-200 text-[#262063] outline-none resize-none"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Edit module content here..."
            />
            <button
                type="submit"
                className="mt-4 py-2 px-4 bg-[#a392f9] text-white rounded-md font-medium hover:bg-[#8b7ff0] text-sm transition duration-200"
            >
                Submit Changes
            </button>
        </form>
      )}
      {console.log('moduleContent:', moduleContent)}
      {console.log('mainContent:', moduleData.mainContent)}
    </div>
  );
}

export default ModuleDetails