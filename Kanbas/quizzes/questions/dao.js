import questionModel from "./model.js";
export const findAllQuestions = () => questionModel.find();
export const findQuestionsForQuiz = (quizId) => questionModel.find({ quiz: quizId });
export const findQuestionById = (id) => questionModel.findById(id);
export const createQuestion = (quiz) => questionModel.create(quiz);
export const updateQuestion = (id, question) =>
questionModel.updateOne({ _id: id }, { $set: question });
export const deleteQuestion = (id) => questionModel.deleteOne({ _id: id });