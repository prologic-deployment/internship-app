
const Quiz = require('../models/quiz');  // Quiz model
const Question = require('../models/question');  // Question model


module.exports.getAllQuizzes=async function(req, res, next) {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.status(200).json({message: 'Quizzes successfully retrieved', data: quizzes});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.getQuizById=async function(req, res, next) {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json({message: 'Quiz successfully retrieved', data: quiz});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.getOfferQuiz=async function(req, res, next) {
    try {
        const quiz = await Quiz.find({offer:req.params.id}).populate('offer');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json({message: 'Quiz successfully retrieved', data: quiz});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.createQuiz=async function(req, res, next) {
    const body = {...req.body};
    try {
      const newQuiz = await Quiz.create(body);
      res.status(201).json({message:'Quiz created successfully',data:newQuiz });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}
module.exports.updateQuiz=async function(req, res, next) {
    const body = {...req.body};
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json({
            message: 'Quiz updated successfully',
            data: updatedQuiz
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
module.exports.deleteQuiz=async function(req, res, next) {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json({ message: 'Quiz deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}



exports.addQuestion = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const questionData = req.body;

        // Crée les réponses et les associe à la question
        const responses = await Promise.all(questionData.responses.map(async response => {
            const responseDoc = new Response(response);
            await responseDoc.save();
            return responseDoc._id; // Retourne l'ID de la réponse
        }));
        
        questionData.responses = responses;

        const quiz = await Quiz.findById(quizId);
        quiz.questions.push(questionData);
        await quiz.save();

        res.status(200).send(quiz);
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(400).send(error);
    }
};

exports.addResponse = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const questionIndex = req.params.questionIndex;
        const responseData = req.body;

        // Crée la réponse
        const responseDoc = new Response(responseData);
        await responseDoc.save();

        // Trouve le quiz et ajoute la réponse à la question spécifique
        const quiz = await Quiz.findById(quizId);
        if (!quiz || !quiz.questions[questionIndex]) {
            return res.status(404).send({ error: 'Quiz or question not found' });
        }

        quiz.questions[questionIndex].responses.push(responseDoc._id);
        await quiz.save();

        res.status(200).send(quiz);
    } catch (error) {
        console.error('Error adding response:', error);
        res.status(400).send(error);
    }
};


