const express = require('express');
const router = express.Router();
const EvaluationController = require('../controllers/EvaluationCtr');



router.post('/',EvaluationController.submitQuiz);
router.get('/quiz/:id',EvaluationController.getAllEvaluationForQuiz)
router.get('/result/:id', EvaluationController.getUserEvaluation)
router.get('/getAllSelected', EvaluationController.getAllSelected)
router.patch("/selectIntern/:id",EvaluationController.selectIntern);

module.exports = router;
