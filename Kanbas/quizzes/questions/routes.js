import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    const findQuestionsForQuiz = async (req, res) => {
        const { id } = req.params;
        const questions = await dao.findQuestionsForQuiz(id);
        res.json(questions);
    };

    const updateQuestion = async (req, res) => {
        const { quid } = req.params;
        const status = await dao.updateQuestion(quid, req.body);
        res.json(status);
    };

    const deleteQuestion = async (req, res) => {
        const status = await dao.deleteQuestion(req.params.quid);
        res.json(status);
    };

    const createQuestion = async (req, res) => {
        const newQuestion = req.body;
        const result = await dao.createQuestion(newQuestion);
        res.json(result);
    };

    const findQuestionById = async (req, res) => {
        const question = await dao.findQuestionById(req.params.quid);
        res.json(question);
    }

    app.delete("/api/questions/:quid", deleteQuestion);
    app.post("/api/questions", createQuestion);
    app.put("/api/questions/:quid", updateQuestion);
    app.get("/api/questions/:quid",findQuestionById);
    app.get("/api/quizzes/:qid/questions", findQuestionsForQuiz);
    ///api/courses/:cid/quizzes/:qid/questions
}