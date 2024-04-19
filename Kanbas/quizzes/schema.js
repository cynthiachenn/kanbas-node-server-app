import mongoose from "mongoose";
const quizSchema = mongoose.Schema(
  {
    id: String,
    course: String,
    name: String,
    available_date: String,
    due_date: String,
    type: String,
    points: Number,
    group: String,
    shuffle: Boolean,
    time_limit: Number,
    repeat: Boolean,
    answer_key: Boolean,
    access_code: String,
    one_at_a_time: Boolean,
    webcam: Boolean,
    locked_after_answering: Boolean,
    time_due: String,
    published: Boolean,
    questions: Array,
  },
  { collection: "quizzes" }
);
export default quizSchema;