import mongoose from "mongoose";
const quizSchema = mongoose.Schema(
  {
    id: String,
    course: String,
    name: String,
    available_date: String,
    due_date: String,
    points: Number,
    num_questions: Number,
    time_due: String,
    published: Boolean,
  },
  { collection: "quizzes" }
);
export default quizSchema;