const Question = require('../models/question');


module.exports.createQuestion=async function(req, res, next) {
    const question = {...req.body};
  try {
    const newQuestion = await Question.create(question);
    res.status(201).json({
        message: 'Question created successfully',
        question: newQuestion
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
module.exports.getAllQuestionsForQuiz=async function(req, res, next) {
    try {
        const questions = await Question.find({ quizId: req.params.id });
        res.status(200).json({
            message: 'Questions retrieved successfully',
            data: questions
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.updateQuestion=async function(req, res, next) {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({
            message: 'Question updated successfully',
            data: updatedQuestion
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
module.exports.deleteQuestion=async function(req, res, next) {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}