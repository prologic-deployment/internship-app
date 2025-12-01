const Evaluation = require('../models/evaluation');

exports.submitQuiz = async (req, res) => {
  const body = {...req.body}
  try {
    const evaluation = await Evaluation.create(body);
    res.status(201).json({
      message: 'Result submitted successfully',
      data : evaluation
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getAllEvaluationForQuiz = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ quizId: req.params.id , isSelected : false})
    .populate('quizId userId')
    .populate({
      path: 'responses.questionId', 
      model: 'Question', 
    })
    .populate({
      path: 'responses.chosenResponseIds',
    });
    res.status(200).json({
      message: 'Results retrieved successfully',
      data : evaluations
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getUserEvaluation = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ userId: req.params.id })
      .populate('quizId userId') 
      .populate({
        path: 'responses.questionId', 
        model: 'Question', 
      })
      .populate({
        path: 'responses.chosenResponseIds',
      });
    res.status(200).json({
      message: 'Results retrieved successfully',
      data: evaluations,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.selectIntern = async function(req,res){
  try {
    const result = await Evaluation.findByIdAndUpdate(req.params.id,{isSelected:true})
    const updated_result = await Evaluation.findById(req.params.id)
    if (result) {
      res.status(200).json({message : 'Intern selected successfully' , user: updated_result});
    }else{
      res.status(404).send({message:'No Intern found with this result'})
    }
  }
  catch (error) {
    res.status(500).json(error); 
  }
}
module.exports.getAllSelected = async function(req,res){
  try {
    const result = await Evaluation.find({isSelected:true})
    .populate("userId quizId")
    res.status(200).json({message : 'Selected interns retrieved successfully' , data: result});
  }
  catch (error) {
    res.status(500).json(error); 
  }
}


