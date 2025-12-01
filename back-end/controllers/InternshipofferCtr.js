const InternshipOffer = require('../models/InternshipOffer');
const Quiz = require('../models/quiz');
const User = require('../models/user');
const Evaluation = require('../models/evaluation');
const nodemailer = require('nodemailer');
const { Roles } = require('../models/enum');
require('dotenv').config();


exports.createInternshipOffer = async (req, res) => {
    const body = {...req.body};
    try {
        const offer = await InternshipOffer.create(body);
        if(offer){
            res.status(201).send({message : "Offer created successfully",data: offer});
        }else{
            res.status(500).send({message: 'Cannot create internship offer',data: offer});
        }
    } catch (error) {
        res.status(500).send({message : "Error creating internship offer.",error:error});
    }
};
exports.deleteInternshipOffer = async (req, res) => {
    const offerId = req.params.id
    try {
        const offer = await InternshipOffer.findByIdAndDelete(offerId);
            res.status(200).send({message : "Offer deleted successfully",data: offer});
    } catch (error) {
        res.status(500).send({message : "Error deleting internship offer.",error:error});
    }
};
exports.updateInternshipOffer = async (req, res) => {
    const body = {...req.body};
    const offerId = req.params.id
    try {
        const offer = await InternshipOffer.findByIdAndUpdate(offerId,body);
        const updatedOffer = await InternshipOffer.findById(offerId);
        if(updatedOffer){
            res.status(200).send({message : "Offer updated successfully",data: updatedOffer});
        } else{
            res.status(404).send({message: 'Cannot update internship offer',data: offer});
        }
    } catch (error) {
        res.status(500).send({message : "Error updating internship offer.",error:error});
    }
};
module.exports.getOfferById = async function (req, res,next) {
    const id = req.params.id;
    try {
        const offer = await InternshipOffer.findById(id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).send({
            message: 'Offer successfully retrieved',
            data: offer
        });
    } catch (error) {
        console.error('Error fetching offer:', error);
        res.status(400).send({
            message: 'Error fetching offer',
            error: error
        });
    }

}
module.exports.getMentorOffers = async function (req, res,next) {
    const mentorId = req.params.id;
    try {
        const offers = await InternshipOffer.find({encadrant: mentorId });
        res.status(200).send({
            message: 'Offers successfully retrieved',
            data: offers
        });
    } catch (error) {
        res.status(400).send({
            message: 'Error fetching offer',
            error: error
        });
    }


}
exports.assignQuizToOffer = async (req, res) => {
    try {
        const { offerId, quizId } = req.body;

        // Vérifie si l'offre de stage existe
        const offer = await InternshipOffer.findById(offerId);
        if (!offer) {
            return res.status(404).send({ error: 'Internship offer not found' });
        }

        // Vérifie si le quiz existe
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).send({ error: 'Quiz not found' });
        }

        // Met à jour l'offre de stage avec l'ID du quiz
        offer.quiz = quizId; // Ajoute l'ID du quiz à l'offre
        await offer.save();

        res.status(200).send(offer);
    } catch (error) {
        console.error('Error assigning quiz to offer:', error);
        res.status(400).send(error);
    }
};
exports.getAllInternshipOffers = async (req, res) => {
    try {
        const offers = await InternshipOffer.find()   
        res.status(200).send({message : "Offer list retrieved successfully",data:offers});
    } catch (error) {
        console.error('Error fetching internship offers:', error);
        res.status(500).send({message :error});
    }
};
exports.getQuizForOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const offer = await InternshipOffer.findById(offerId)
            .populate({
                path: 'quiz',
                 select: '-_id',
                populate: {
                    path: 'questions',
                     select: '-_id',
                    populate: {
                        path: 'responses',
                        select: ' -isTrue'
                    }
                }
            });
        
        if (!offer || !offer.quiz) {
            return res.status(404).send({ error: 'Offer or associated quiz not found' });
        }

        res.status(200).send(offer.quiz);
    } catch (error) {
        console.error('Error retrieving quiz for offer:', error);
        res.status(400).send(error);
    }
};
exports.getInternshipOfferById = async (req, res) => { // New function to get offer by ID
    try {
        const offerId = req.params.id;
        const offer = await InternshipOffer.findById(offerId);
        if (!offer) {
            return res.status(404).send({ error: 'Internship offer not found' });
        }
        res.status(200).send(offer);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getDetailedInternshipOffers = async (req, res) => {
    try {
        const offers = await InternshipOffer.find()
            .populate('user', 'fullName email status _id')
            .populate('quiz', 'description questions')
            .exec();

        const detailedOffers = await Promise.all(offers.map(async (offer) => {
            const usersWithScoresAndStatus = await Promise.all(offer.user.map(async (user) => {
                const evaluation = await Evaluation.findOne({ user: user._id, internshipOffer: offer._id });
                return {
                    userId: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    score: evaluation ? evaluation.score : 'N/A',
                    status: user.status,
                
                
                
                };
            }));

            return {
                title: offer.title,
                description: offer.description,
                quizDescription: offer.quiz ? offer.quiz.description : 'No Quiz',
                quizQuestionsLength: offer.quiz ? offer.quiz.questions.length : 0, // Nombre de questions du quiz
                users: usersWithScoresAndStatus
            };
        }));

        res.status(200).send(detailedOffers);
    } catch (error) {
        console.error('Error fetching detailed internship offers:', error);
        res.status(500).send({ error: 'An error occurred while fetching detailed internship offers' });
    }
};
exports.updateUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const newStatus = req.body.status;

        const user = await User.findByIdAndUpdate(userId, { status: newStatus }, { new: true });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Configuration du transporteur d'emails
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "notification@prologic.com.tn",
                pass: "*73zDw:41Hh!V",
            },
        });

        // Corps de l'email personnalisé en fonction du statut
        let emailBody = '';
        switch (newStatus) {
            case 'Accepted':
                emailBody = `{Dear ${user.fullName},\n\nCongratulations! Your application has been accepted. We look forward to having you onboard.\n\nBest regards,\nThe Team`;
                break;
            case 'Declined':
                emailBody =` Dear ${user.fullName},\n\nWe regret to inform you that your application has been declined. We encourage you to apply for other positions in the future.\n\nBest regards,\nThe Team`;
                break;
            case 'WaitingList':
                emailBody = `Dear ${user.fullName},\n\nYour application is currently on the waiting list. We will notify you if a spot becomes available.\n\nBest regards,\nThe Team`;
                break;
            case 'Waiting':
                emailBody = `Dear ${user.fullName},\n\nYour application is still under review. We will update you on the status shortly.\n\nBest regards,\nThe Team`;
                break;
            default:
                emailBody = `Dear ${user.fullName},\n\nYour application status has been updated to: ${newStatus}.\n\nBest regards,\nThe Team`;
        }

        // Options de l'email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Application Status Update',
            text: emailBody
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ error: 'Error sending email' });
            }
            console.log('Email sent:', info.response);
        });

        res.status(200).send(user);
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(400).send(error);
    }
};
exports.getAcceptedUsersForOffers = async (req, res) => {
    try {
        // Récupérer toutes les offres de stage
        const offers = await InternshipOffer.find().exec();

        const result = await Promise.all(offers.map(async (offer) => {
            // Parcourir les IDs des utilisateurs associés à l'offre
            const acceptedUsers = await Promise.all(offer.user.map(async (userId) => {
                const user = await User.findById(userId).exec();
                
                // Ne retourner que les utilisateurs dont le statut est "Accepted"
                if (user && user.status === 'Accepted') {
                    return {
                        fullName: user.fullName,
                        email: user.email
                    };
                }
                return null; // Retourner null si le statut n'est pas "Accepted"
            }));

            // Filtrer les valeurs nulles (utilisateurs non "Accepted")
            const filteredUsers = acceptedUsers.filter(user => user !== null);

            return {
                title: offer.title,
                description: offer.description,
                users: filteredUsers
            };
        }));

        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching accepted users for internship offers:', error);
        res.status(500).send({ error: 'An error occurred while fetching accepted users for internship offers' });
    }
};
exports.getUsersWithRoleEncadrant = async (req, res) => {
    try {
        const encadrants = await User.find({ role: Roles.ENCADRANT });
        res.status(200).send(encadrants);
    } catch (error) {
        console.error('Error fetching encadrants:', error);
        res.status(500).send({ error: 'An error occurred while fetching encadrants' });
    }
};
exports.assignEncadrantToOffer = async (req, res) => {
    try {
        const { encadrantId, offerId } = req.body;

        // Vérifie si l'encadrant existe
        const encadrant = await User.findById(encadrantId);
        if (!encadrant) {
            return res.status(404).send({ error: 'Encadrant not found' });
        }

        // Vérifie si l'offre de stage existe
        const offer = await InternshipOffer.findById(offerId);
        if (!offer) {
            return res.status(404).send({ error: 'Internship offer not found' });
        }

        // Assigne l'encadrant à l'offre
        offer.encadrant = encadrantId;
        await offer.save();

        res.status(200).send(offer);
    } catch (error) {
        console.error('Error assigning encadrant to offer:', error);
        res.status(500).send({ error: 'An error occurred while assigning encadrant to offer' });
    }
};
exports.getOffersWithEncadrantAndAcceptedUsers = async (req, res) => {
    try {
        const offers = await InternshipOffer.find()
            .populate({
                path: 'encadrant',
                select: 'fullName email' // Sélectionne les champs souhaités pour l'encadrant
            })
            .populate({
                path: 'user',
                match: { status: 'Accepted' }, // Filtre les utilisateurs ayant le statut "Accepted"
                select: 'fullName email status' // Sélectionne les champs souhaités pour les utilisateurs
            })
            .select('title description'); // Sélectionne les champs souhaités pour l'offre

        res.status(200).json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUsersForEncadrant = async (req, res) => {
    try {
        const encadrantId = req.params.encadrantId;

        // Récupérer les offres de stage associées à l'encadrant
        const offers = await InternshipOffer.find({ encadrant: encadrantId })
        .populate({
            path: 'user',
            match: { status: 'Accepted' }, // Filtre les utilisateurs ayant le statut "Accepted"
            select: 'fullName email status' // Sélectionne les champs souhaités pour les utilisateurs
        })
        
            .exec();

        // Créer une liste de tous les utilisateurs affectés aux offres de l'encadrant
        const users = offers.flatMap(offer => offer.user);

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users for encadrant:', error);
        res.status(500).send({ error: 'An error occurred while fetching users for encadrant' });
    }
};
exports.getUsersinoffersForEncadrant = async (req, res) => {
    try {
        const encadrantId = req.params.encadrantId;

        // Récupérer les offres de stage associées à l'encadrant
        const offers = await InternshipOffer.find({ encadrant: encadrantId })
        .populate({
            path: 'user',
            match: { status: 'Accepted' }, // Filtre les utilisateurs ayant le statut "Accepted"
            select: 'fullName email status' // Sélectionne les champs souhaités pour les utilisateurs
        })
            .exec();

        // Construire une réponse avec les détails de chaque offre et les utilisateurs associés
        const response = offers.map(offer => ({
            title: offer.title,
            description: offer.description,
            users: offer.user.map(user => ({
                fullName: user.fullName,
                email: user.email,
                status: user.status
            }))
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching users for encadrant:', error);
        res.status(500).send({ error: 'An error occurred while fetching users for encadrant' });
    }
};