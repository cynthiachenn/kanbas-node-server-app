import mongoose from "mongoose";
const questionSchema = mongoose.Schema(
  {
    id: String,
    quiz: String,
    description: String,
    title: String,
    type: String,
    points: Number,
    answers: Array,
  },
  { collection: "questions" }
);
export default questionSchema;