import db from "../Database/index.js";

function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes
            .filter((q) => q.course === cid);
        res.send(quizzes);
    });

    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const { published } = req.body;
        const quiz = db.quizzes.find(q => q._id === qid);

        if (quiz) {
            quiz.published = published;
            res.status(200).send(quiz);
        } else {
            res.status(404).send({ message: "Quiz not found" });
        }
    });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });
}
export default QuizRoutes;