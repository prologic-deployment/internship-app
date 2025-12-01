const mongoose = require('mongoose');


const EvaluationSchema = mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    responses: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        chosenResponseIds: { type: mongoose.Schema.Types.ObjectId },
        correctAnswer: { type: Boolean }
      },
    ],
    score: { type: Number, required: true},
    isSelected: { type: Boolean, default: false }
  },
  { timestamps: true }
);
  
  module.exports = mongoose.model('Evaluation', EvaluationSchema);
  