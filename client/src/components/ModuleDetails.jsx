import React, { useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Context } from '../context/CourseContext'
import Toast from './Toast'

const ModuleDetails = ({ moduleData }) => {
  const { setModuleContent } = useContext(Context)
  const [edit, setEdit] = useState(false)
  const moduleContent = localStorage.getItem('module-content')
  const [localContent, setLocalContent] = useState(moduleContent?.mainContent || '')
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [toastMessage, setToastMessage] = useState({
    isShown: false,
    message: "",
  })

  const handleCloseToast = () => {
    setToastMessage({
        isShown: false,
        message: ""
    })
  }

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
    setToastMessage({
        isShown: true,
        message: "Changes saved successfully!",
    });
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
      {/* <button className='my-6 py-2 px-4 bg-zinc-200 text-[#262063] rounded-md smoothTransition cursor-pointer font-medium text-sm hover:bg-zinc-300'
              onClick={() => setEdit(!edit)}
      > 
        {!edit? 'Edit content' : 'Go back to view'}
      </button> */}
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
                <div className='flex items-center gap-4'>
                    <h2 className="text-lg font-semibold text-zinc-100">Module Content</h2>
                    <button className='my-3 py-2 px-4 bg-zinc-200 text-[#262063] rounded-md smoothTransition cursor-pointer font-medium text-sm hover:bg-zinc-300'
                            onClick={() => setEdit(!edit)}
                    > 
                        {!edit? 'Edit content' : 'Go back to view'}
                    </button>
                </div>
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
        <div className="mt-8 bg-darkBlue p-5 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-100">Module Quiz</h2>
            <hr className="my-3 h-[1px] bg-gradient-to-r from-[#1c1e39] via-[#343850] to-[#1c1e39] border-0 mx-3" />
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
                {moduleData.quiz.map((question, index) => {
                const questionId = `question-${index}`;
                return (
                    <div key={index} className="p-4 bg-[#262063]/20 rounded-lg border border-[#262063]/50 shadow-sm">
                    <p className="font-medium text-zinc-200 mb-3">
                        <div className='inline-block bg-[#262063] text-zinc-100 rounded-full mr-2'>
                            <span className="text-sm w-6 h-6 flex items-center justify-center">
                            {index + 1}
                            </span>
                        </div>
                        {question.question}
                    </p>
                    <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                        <button
                            key={optionIndex}
                            onClick={() => handleQuizAnswer(index, option)}
                            className={`w-full text-left p-3 rounded-lg border smoothTransition ${
                            quizAnswers[index] === option
                                ? "border-[#a392f9] bg-[#a392f9]/10"
                                : "border-zinc-700 hover:border-[#a392f9]/50"
                            }`}
                        >
                            <div className="flex items-center">
                            <div
                                className={`w-5 h-5 flex-shrink-0 rounded-full border ${
                                quizAnswers[index] === option
                                    ? "border-[#a392f9] bg-[#a392f9]"
                                    : "border-zinc-500"
                                } mr-3 flex items-center justify-center`}
                            >
                                {quizAnswers[index] === option && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                            <p className="text-zinc-300">{option}</p>
                            </div>
                        </button>
                        ))}
                    </div>

                    {showScore && (
                        <div
                        className={`p-3 rounded-lg ${
                            quizAnswers[index] === question.correctAnswer
                            ? "bg-green-900/20 border border-green-900/50"
                            : "bg-red-900/20 border border-red-900/50"
                        }`}
                        >
                        <p
                            className={`font-medium mb-1 ${
                            quizAnswers[index] === question.correctAnswer
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                        >
                            {quizAnswers[index] === question.correctAnswer
                            ? "Correct!"
                            : "Incorrect"}
                        </p>
                        {question.explanation && (
                            <p className="text-zinc-300 text-sm">
                            {question.explanation}
                            </p>
                        )}
                        </div>
                    )}
                    </div>
                );
                })}
            </div>

            <button
                type="button"
                className="mt-6 py-3 px-6 bg-[#1a1f37] w-full text-white opacity-80 rounded-md smoothTransition cursor-pointer font-medium hover:opacity-100 transition duration-200"
                onClick={submitQuiz}
            >
                {showScore ? "Retry Quiz" : "Submit Quiz"}
            </button>

            {showScore && (
                <div className="mt-6 p-4 rounded-md bg-[#262063]/30 border border-[#a392f9]/50">
                <p className="text-lg font-medium">
                    Your Score: <span className="text-[#a392f9]">{score}</span> / <span className="text-zinc-300">{moduleData.quiz.length}</span>
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                    {score === moduleData.quiz.length ? "Perfect score! Well done!" : 
                    score >= moduleData.quiz.length / 2 ? "Good job! Keep learning to improve." : 
                    "Keep studying and try again soon."}
                </p>
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
                className="w-full h-96 p-3 rounded-md bg-zinc-200 text-darkGray outline-none resize-none"
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
      <Toast
            isShown={toastMessage.isShown}
            message={toastMessage.message}
            onClose={handleCloseToast}
      />
    </div>
  );
}

export default ModuleDetails