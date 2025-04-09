import React from 'react'
import ReactMarkdown from 'react-markdown'

const ModuleDetails = ({ moduleData }) => {
  if(!moduleData) {
    return <p>Loading...</p>
  }

  return (
    <div className="module-details p-5">
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
                <pre className="rounded-md bg-[#282c34] text-zinc-300 p-3 mt-2 overflow-auto">
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
    </div>
  );
}

export default ModuleDetails