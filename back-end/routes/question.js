const express = require('express');
const router = express.Router();
const questionCtr = require('../controllers/questionCtr')


router.post('/', questionCtr.createQuestion)

router.get('/:id',questionCtr.getAllQuestionsForQuiz)
router.put('/:id',questionCtr.updateQuestion)
router.delete('/:id',questionCtr.deleteQuestion)

module.exports = router;
