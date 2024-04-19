import express from 'express'
import mongoose from "mongoose";
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import "dotenv/config"
import CourseRoutes from './Kanbas/courses/routes.js';
import cors from "cors";
import ModuleRoutes from './Kanbas/modules/routes.js';
import UserRoutes from './Users/routes.js';
import session from 'express-session';
const app = express()
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL, "https://a5--joyful-puffpuff-1c9ea6.netlify.app"]
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
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
app.use(session(sessionOptions));

app.use(express.json());
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000)