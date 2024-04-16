import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import CourseRoutes from './Kanbas/courses/routes.js';
import cors from "cors";
import ModuleRoutes from './Kanbas/modules/routes.js';
import QuizRoutes from './Kanbas/quizzes/routes.js';
const app = express()
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://a5--joyful-puffpuff-1c9ea6.netlify.app"]
  }));
app.use(express.json());
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000)