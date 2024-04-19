import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const findQuizzesForCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.json(quizzes);
    };

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };

    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    };

    const createQuiz = async (req, res) => {
        const newQuiz = req.body;
        const result = await dao.createQuiz(newQuiz);
        res.json(result);
    };

    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
}