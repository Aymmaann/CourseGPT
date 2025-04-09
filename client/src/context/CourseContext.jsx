import { createContext, useState } from "react";


const Context = createContext()

const CourseContextProvider = ({children}) => {
    const [topic, setTopic] = useState('')
    const [modules, setModules] = useState([])
    const [lesson, setLesson] = useState('')
    const [moduleContent, setModuleContent] = useState('')
    const [loading, setLoading] = useState(false)

    const extractModules = (content) => {
        const modulesSection = content.split("**Course Modules:**")[1];
        if (!modulesSection) {
          console.log("No modules section found");
          return [];
        }
        const moduleRegex = /\*\*Module\s*\d+:\*\*\s*([^\n]+)/g;
        const extractedModules = [];
        
        let match;
        while ((match = moduleRegex.exec(modulesSection)) !== null) {
          if (match[1]) {
            extractedModules.push(match[1].trim());
          }
        }
        setModules(extractedModules);
        console.log("Modules: ", modules)
        return extractedModules;
    };

    return (
        <Context.Provider value={{
            topic, setTopic,
            modules, setModules,
            lesson, setLesson,
            loading, setLoading,
            moduleContent, setModuleContent,
            extractModules
         }}
        >
            {children}
        </Context.Provider>
    )
}

export { Context, CourseContextProvider}