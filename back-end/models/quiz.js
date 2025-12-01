const mongoose = require('mongoose');


const QuizSchema = mongoose.Schema({
  title: {type: String,required: true},
  description: { type: String ,required: true},
  offer: {type: mongoose.Schema.Types.ObjectId, ref: 'InternshipOffer'},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

},
{
  timestamps: true,
});

module.exports = mongoose.model('Quiz', QuizSchema);
