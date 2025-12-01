const { response } = require('express');
const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz',  required: true},
    question: { type: String, required: true},
    responses: [{
      text :{type: String, required: true},
      isCorrect :{type:String}
      }],
  },
  { timestamps: true } 
);
  
  module.exports = mongoose.model('Question', QuestionSchema);
  