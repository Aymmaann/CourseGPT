import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateLessonFromAPI = async (topic, difficulty, estimatedTime) => {
    const prompt = `Generate the initial information for a course on the topic of "${topic}". Please ensure the output adheres to the following format:

    **Course Title:** [Compelling Course Title]

    **Course Description:** [Concise Course Description]

    **Difficulty Level:** ${difficulty}

    **Estimated Completion Hours:** ${estimatedTime} hours

    **Key Course Learning Outcomes:**

    * By the end of this course, learners will be able to: [Specific Learning Outcome 1]
    * By the end of this course, learners will be able to: [Specific Learning Outcome 2]
    * By the end of this course, learners will be able to: [Specific Learning Outcome 3]
    * By the end of this course, learners will be able to: [Specific Learning Outcome 4]

    **Course Modules:**

    **Module 1:** [Concise Module Title 1]
    **Module 2:** [Concise Module Title 2]
    **Module 3:** [Concise Module Title 3]
    **Module 4:** [Concise Module Title 4]
    **Module 5:** [Concise Module Title 5]

    Replace the bracketed placeholders with content relevant to "${topic}". Maintain the exact markdown formatting, including bold text for headings and module titles, and bullet points for learning outcomes. Ensure each section is separated by one or two newline characters.`;


    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.candidates[0].content.parts[0].text;
      return responseText;
    } catch(error) {
      console.error("Lesson API Error: ", error);
      throw error;
    }
};


export const generateModuleFromAPI = async (topic, moduleName) => {
  const prompt = `Generate detailed and comprehensive content for the module "${moduleName}" within the course "${topic}". Please format your response as a JSON object with the following keys:
    {
      "moduleTitle": "[Compelling Title for ${moduleName}]",
      "moduleDescription": "[Concise Description of ${moduleName}]",
      "learningOutcomes": [
        "[Learning Outcome 1 for ${moduleName}]",
        "[Learning Outcome 2 for ${moduleName}]",
        "[Learning Outcome 3 for ${moduleName}]"
      ],
      "mainContent": "[Detailed and comprehensive content for the module '${moduleName}'. Use markdown formatting extensively to structure this content with headings (## Subheadings, ### Sub-subheadings), bold text (**important**), italic text (*emphasis*), bullet points (* item), numbered lists (1. item), code blocks (using backticks \`\`\`), and any other relevant markdown to make it well-organized and readable.]",
      "keyConcepts": [
        {"term": "[Key Term 1 for ${moduleName}]", "definition": "[Brief Definition 1]"},
        {"term": "[Key Term 2 for ${moduleName}]", "definition": "[Brief Definition 2]"}
      ],
      "examples": [
        {"title": "[Example 1 Title for ${moduleName}]", "description": "[Description of Example 1]", "code": "[Optional Code for Example 1]"},
        {"title": "[Example 2 Title for ${moduleName}]", "description": "[Description of Example 2]", "code": "[Optional Code for Example 2]"}
      ],
      "activities": [
        {"title": "[Engaging Activity 1 for ${moduleName}]", "description": "[Instructions for Activity 1]"},
        {"title": "[Interactive Activity 2 for ${moduleName}]", "description": "[Instructions for Activity 2]"}
      ],
      "resources": [
        {"title": "[Practice Resource Title 1]", "description": "[Brief Description or Link 1]"},
        {"title": "[Reference Material Title 1]", "description": "[Brief Description or Link 2]"},
        {"title": "[Interactive Exercise Title 1]", "description": "[Brief Description or Link 3]"}
      ],
      "quiz": [
        {
          "question": "[Question 1 related to ${moduleName}]",
          "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
          "correctAnswer": "[Correct Option - e.g., Option B]"
        },
        {
          "question": "[Question 2 related to ${moduleName}]",
          "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
          "correctAnswer": "[Correct Option - e.g., Option C]"
        },
        {
          "question": "[Question 3 related to ${moduleName}]",
          "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
          "correctAnswer": "[Correct Option - e.g., Option A]"
        },
        {
          "question": "[Question 4 related to ${moduleName}]",
          "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
          "correctAnswer": "[Correct Option - e.g., Option D]"
        },
        {
          "question": "[Question 5 related to ${moduleName}]",
          "options": ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
          "correctAnswer": "[Correct Option - e.g., Option B]"
        }
      ]
    }

  Ensure the entire response is a valid JSON object. The content for 'mainContent' should be rich and detailed, utilizing markdown for structure and readability. Include relevant learning outcomes, key concepts, examples, and activities that are specific to the module '${moduleName}' within the context of the course on '${topic}'. Additionally, provide a 'resources' array containing titles and brief descriptions or links to practice materials, further reading, or interactive exercises related to this module. Aim for at least three helpful resources. Finally, include a 'quiz' array with exactly 5 multiple-choice questions directly related to the content of this module. Each question should have a 'question' field, an 'options' array with four possible answers, and a 'correctAnswer' field indicating the correct option from the 'options' array.`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.candidates[0].content.parts[0].text;

    if (responseText.startsWith("```json")) {
      responseText = responseText.substring("```json".length).trimStart();
    }
    if (responseText.endsWith("```")) {
      responseText = responseText.substring(0, responseText.length - "```".length).trimEnd();
    }

    try {
      const parsedJSON = JSON.parse(responseText);
      return parsedJSON;
    } catch (error) {
      console.error("Error parsing module JSON:", error);
      console.error("Raw response text:", responseText);
      return { error: "Failed to parse module content" };
    }
  } catch(error) {
    console.error("Module API Error: ", error);
    throw error;
  }
};

export default { 
  generateLessonFromAPI,
  generateModuleFromAPI
};