import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateLessonFromAPI, generateModuleFromAPI } from './controllers/CourseController.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'POST, GET, OPTIONS', 
  allowedHeaders: 'Content-Type', 
}));
app.use(express.json());


// API Route
app.post('/api/generateLearningOutcomes', async (req, res) => {
  const { topic, difficulty, estimatedTime } = req.body;
  if(!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }
  try {
    const lessonContent = await generateLessonFromAPI(topic, difficulty, estimatedTime);
    res.json({ content: lessonContent })
  } catch(error) {
    console.error("Error generating lesson:" , error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
});


app.post('/api/generateModuleContent', async (req,res) => {
  const { topic, module } = req.body;
  if(!topic || !module) {
    return res.status(400).json({ error: 'Topic is required' });
  } 
  try {
    const moduleContent = await generateModuleFromAPI(topic, module);
    res.json({ content: moduleContent });
  } catch(error) {
    console.error("Error generating module: ", error);
    res.status(500).json({ error: 'Failed to generate modules' });
  }
})


app.listen(8001, () => {
  console.log('Server running on port 8001');
});
