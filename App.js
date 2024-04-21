import express from 'express'
import Hello from './Hello.js'
import session from "express-session";
import Lab5 from './Lab5.js'
import CourseRoutes from './Kanbas/courses/routes.js';
import cors from "cors";
import ModuleRoutes from './Kanbas/modules/routes.js';
import QuizRoutes from './Kanbas/quizzes/routes.js';
import "dotenv/config";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000)