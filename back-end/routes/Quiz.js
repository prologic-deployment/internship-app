
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizCtr');






router.get('/',quizController.getAllQuizzes);
router.get("/:id",quizController.getQuizById);
router.get("/offer/:id",quizController.getOfferQuiz);
router.post("/",quizController.createQuiz);
router.put("/:id",quizController.updateQuiz);
router.delete("/:id",quizController.deleteQuiz);





module.exports = router;
