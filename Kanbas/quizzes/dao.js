import quizModel from "./model.js";
export const findAllQuizzes = () => quizModel.find();
export const findQuizzesForCourse = (courseId) => quizModel.find({ course: courseId });
export const findQuizById = (id) => quizModel.findById(id);
export const createQuiz = (quiz) => quizModel.create(quiz);
export const updateQuiz = (id, quiz) =>
quizModel.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz = (id) => quizModel.deleteOne({ _id: id });