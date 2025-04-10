# CourseGPT - An AI-Powered Course Authoring Platform

## Overview

CourseGPT is an innovative web application designed to empower educators and content creators to efficiently create, organize, and enhance educational content. This platform addresses the significant challenges faced by content creators, such as the time-intensive nature of producing high-quality materials, maintaining structural coherence, generating engaging activities, and ensuring pedagogical effectiveness at scale. This prototype focuses on implementing key features like AI-assisted lesson generation, a basic module organization system, and an intuitive content editor.

## Key Features Implemented

* **AI-Powered Lesson Generation:**
    * **Interface for Input:** A user-friendly interface allows inputting a topic or concept for a lesson.
    * **Structured Lesson Generation (AI-Assisted):** Leveraging the Gemini API (via a backend), the platform generates structured lessons including:
        * Compelling titles and descriptions.
        * Well-crafted learning outcomes.
        * Key concepts and terminology.
        * Engaging learning activities and examples.
* **Basic Module Organization System:**
    * **Grouping Lessons:** While intelligent sequencing isn't fully implemented, the current structure allows for the conceptual grouping of generated lessons into modules.
    * **Metadata Management:** Metadata like difficulty level and estimated completion time can be specified during the initial content generation request, laying the groundwork for more comprehensive metadata tracking.
* **Interactive Content Editor (Basic):**
    * **Intuitive Editing Interface:** A `textarea` allows direct editing of the AI-generated main lesson content.
    * **Section-Specific Regeneration (Conceptual):** The current "Edit content" functionality allows modification of the entire main content. The prompt engineering and backend design consider the potential for future section-specific regeneration by structuring the AI's output into distinct sections.
    * **Basic Formatting Tools:** The platform relies on Markdown rendering (`ReactMarkdown`) as a foundational formatting tool optimized for educational content.

## Technology Stack

CourseGPT is built using a modern JavaScript-based technology stack for a responsive and dynamic user experience, aligning with the suggested technologies:

* **Frontend:**
    * **React:** Chosen for its component-based architecture, reusability, and efficient state management, crucial for building a dynamic user interface for content creation and editing.
    * **React Router:** Used for navigation between different views, such as the initial search/topic input and the display of generated content.
    * **React Markdown:** Essential for rendering the AI-generated Markdown content into a readable format, directly addressing the need for structured educational materials.
    * **useState, useContext, useEffect:** React Hooks are used extensively for managing component state (e.g., user input, generated content, edit mode), sharing data across components (`CourseContext`), and handling side effects (like API calls and local storage interaction).
* **Backend:**
    * The backend of CourseGPT handles API requests from the frontend and interacts with the Gemini API. Utilized **Node.js** as the runtime environment due to its JavaScript familiarity and large ecosystem. The **Express.js** framework was employed to structure the backend API, handling routing, request parsing, and response generation.
* **API Interaction:**
    * **Fetch API:** The browser's built-in Fetch API is used to make asynchronous HTTP requests to the backend API endpoints for triggering AI content generation.
* **Styling:**
    * **Tailwind CSS:** Provides the visual design and layout of the application, ensuring a user-friendly and intuitive interface for content creators.

## APIs Used and Their Purpose

CourseGPT leverages the following API to achieve its intelligent content generation capabilities:

* **Gemini API (via Backend):**
    * **What it is:** Google's advanced multimodal AI model.
    * **Used for:**
        * **`/api/generateLearningOutcomes` (Backend Endpoint):** This endpoint receives a user-provided topic, difficulty level, and estimated time. The backend uses the Gemini API with a carefully designed prompt to generate a structured outline of potential learning outcomes, forming the basis of lessons.
            * **Why we did it:** To address the problem of time-intensive initial content creation and to provide a starting point for well-crafted learning objectives, aligning with the project objective of streamlining the authoring workflow.
        * **`/api/generateModuleContent` (Backend Endpoint):** This endpoint takes a course topic and a specific module name (or a general lesson topic in the current scope) as input. The backend employs the Gemini API with a detailed prompt to generate structured lesson content, including titles, descriptions, learning outcomes, key concepts, activities, and examples, directly addressing the core feature of the Lesson Generator.
            * **Why we did it:** To automate the generation of engaging and pedagogically relevant learning materials, tackling the challenge of generating diverse content and ensuring pedagogical effectiveness. The structured JSON format facilitates the organization of different lesson components.
        * **(Future Potential - `/api/gradeQuiz`):** An envisioned backend endpoint for handling quiz submissions and potentially using the Gemini API for feedback, contributing to the development of engaging assessments.

## Detailed Working Explanation (Relating to the Task)

1.  **Lesson Topic Input:** The user interacts with the `Search` view, providing a `title` (representing a lesson topic or concept). This directly addresses the "Create an interface for inputting topic/concept information" requirement of the Lesson Generator.

2.  **AI-Powered Lesson Generation (`handleSubmit` in `Search.jsx`):**
    * Upon submitting the topic, the `handleSubmit` function sends a `POST` request to the `/api/generateLearningOutcomes` endpoint. While named for learning outcomes, in the context of this task, it serves as the initial trigger for AI-assisted lesson structure generation. The backend uses the Gemini API to interpret the topic and generate a foundational structure that informs the subsequent detailed lesson content.
    * The backend then (or in a subsequent step via `handleModuleClick`) uses the `/api/generateModuleContent` endpoint to generate the detailed lesson components (title, description, outcomes, concepts, activities, examples) based on the initial topic. This directly implements the "AI-powered generation of structured lessons" core feature.
    * The generated content, structured in JSON and often including Markdown for formatting, is sent back to the frontend.

3.  **Displaying the Generated Lesson (`ModuleDetails.jsx`):**
    * The `ModuleDetails` component receives the AI-generated lesson data (`moduleData`). It renders the various components of the lesson, such as the title, description, learning outcomes (displayed as a list), key concepts (displayed as a list with definitions), examples (with titles, descriptions, and optional code), and activities (displayed as a list with descriptions). The `ReactMarkdown` component ensures the "mainContent" is displayed with appropriate formatting, contributing to the creation of well-crafted learning materials.

4.  **Basic Content Editing (`ModuleDetails.jsx`):**
    * The "Edit content" button toggles the display of the `mainContent` between a rendered Markdown view and a `textarea`. This provides a basic "intuitive editing interface for refining AI-generated content." While section-specific regeneration isn't implemented in this prototype, the underlying structured JSON response from the backend lays the groundwork for potentially targeting specific sections for regeneration in the future.

5.  **Metadata Input:** The difficulty level and estimated time are input during the initial topic submission in the `Search` view. These are sent to the backend, demonstrating the initial implementation of "metadata management for tracking difficulty levels and estimated completion times," even if a dedicated UI for managing this metadata per module isn't fully built yet.

6.  **Conceptual Module Organization:** While a dedicated UI for grouping lessons into modules isn't fully implemented, the current flow where a topic leads to a set of generated content represents a single "module" or lesson. The `modules` state in the `CourseContext` and the `handleModuleClick` function lay the foundation for a future system where multiple lessons can be grouped and organized.

## Objectives

* **Streamlining Authoring Workflow:** The AI-powered content generation directly addresses this objective by automating the initial creation of lesson structures and content, reducing the time and effort required by educators.
* **Implementing AI-Assisted Content Generation:** The core functionality of fetching and displaying AI-generated lessons using the Gemini API directly fulfills this objective.
* **Creating Tools for Logical Organization:** The basic module structure (represented by the fetched `moduleData`) and the underlying context for managing multiple modules (`CourseContext`, `modules` state) represent the initial steps towards building tools for logical organization, even if the UI for explicit grouping and sequencing is a future enhancement.
* **Developing an Intuitive Editing Interface:** The provision of a direct editing capability for the main lesson content, even in its basic `textarea` form, provides an initial intuitive interface for refining the AI-generated output. The use of Markdown also aligns with creating formatting optimized for educational content.

## Expected Deliverables (Status)

* **Functional Prototype:** A functional prototype of the CourseGPT platform is implemented, allowing users to input a topic and view AI-generated lesson content with basic editing capabilities and a quiz. The deployed URL will be available soon.
* **Technical Documentation:** This README serves as part of the technical documentation, outlining the project overview, features, stack, APIs, working explanation, and relation to the task requirements.

## Lessons Learned

* The power of large language models like Gemini in rapidly generating structured educational content is significant.
* Designing effective prompts is crucial for guiding the AI to produce relevant and high-quality learning materials.
* Even a basic editing interface provides valuable control to the content creator.
* Structuring the frontend state and backend API with future features (like module organization and section-specific regeneration) in mind is important for scalability.
* Balancing automation with user control is key to creating a useful authoring tool.

This prototype demonstrates a foundational implementation of CourseGPT, showcasing the potential of AI to revolutionize educational content creation. Further development will focus on expanding the module organization system, enhancing the editing capabilities, and refining the AI-powered content generation based on user feedback and educational design principles.