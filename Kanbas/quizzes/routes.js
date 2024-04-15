import db from "../Database/index.js";

function QuizRoutes(app) {
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex(
          (q) => q._id === qid);
        db.quizzes[quizIndex] = {
          ...db.quizzes[quizIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
}
export default QuizRoutes;