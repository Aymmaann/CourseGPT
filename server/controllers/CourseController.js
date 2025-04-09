import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateLessonFromAPI = async (topic) => {
    const prompt = `Generate the initial information for a course on the topic of "${topic}". Please ensure the output adheres to the following format:

    **Course Title:** [Compelling Course Title]

    **Course Description:** [Concise Course Description]

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

export default generateLessonFromAPI;