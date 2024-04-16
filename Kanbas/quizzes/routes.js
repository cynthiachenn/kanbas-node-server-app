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

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            _id: `Q${Date.now()}`,
            course: cid,
            name: req.body.name || "New Quiz",
            available_date: req.body.available_date || new Date().toISOString(),
            due_date: req.body.due_date || new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),  // Default: one week from now
            points: req.body.points || "0",
            num_questions: req.body.num_questions || "0",
            time_due: req.body.time_due || "23:59",
            published: req.body.published || false
        };
        db.quizzes.push(newQuiz);
        res.status(201).send(newQuiz);
    });
}
export default QuizRoutes;