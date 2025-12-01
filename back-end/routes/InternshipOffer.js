
const express = require('express');
const router = express.Router();
const InternshipOfferController = require('../controllers/InternshipofferCtr');
router.post('/create' , InternshipOfferController.createInternshipOffer);
router.get('/all', InternshipOfferController.getAllInternshipOffers);
router.get('/:id', InternshipOfferController.getOfferById);
router.get('/getMentorOffers/:id', InternshipOfferController.getMentorOffers);
router.delete('/:id' , InternshipOfferController.deleteInternshipOffer);
router.put('/:id' , InternshipOfferController.updateInternshipOffer);

router.get('/details', InternshipOfferController.getDetailedInternshipOffers);
router.get('/accepted-users', InternshipOfferController.getAcceptedUsersForOffers);
router.get('/encadrants', InternshipOfferController.getUsersWithRoleEncadrant);
router.post('/assignEncadrant', InternshipOfferController.assignEncadrantToOffer);
router.get('/offers-encadrant-accepted-users', InternshipOfferController.getOffersWithEncadrantAndAcceptedUsers);

router.post('/:offerId/assign', InternshipOfferController.assignQuizToOffer);
router.get('/:offerId', InternshipOfferController.getQuizForOffer);
router.get('/internship-offers/:id', InternshipOfferController.getInternshipOfferById);
router.patch('/:id/status', InternshipOfferController.updateUserStatus);

router.get('/users-for-encadrant/:encadrantId', InternshipOfferController.getUsersForEncadrant);

router.get('/encadrantinfo/:encadrantId', InternshipOfferController.getUsersinoffersForEncadrant);
module.exports = router;