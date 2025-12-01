const express = require('express');
const router = express.Router();
const DocsController = require('../controllers/docsController');
const multer = require("multer");

const { addRequestStorageEngine } = require("../tools/FileStorageEngine");
const upload_request = multer({ storage: addRequestStorageEngine });
const { addConventionStorageEngine } = require("../tools/FileStorageEngine");
const upload_convention = multer({ storage: addConventionStorageEngine });
const { addCinStorageEngine } = require("../tools/FileStorageEngine");
const upload_cin = multer({ storage: addCinStorageEngine });
const { addLetterStorageEngine } = require("../tools/FileStorageEngine");
const upload_letter = multer({ storage: addLetterStorageEngine });
const { addPresenceStorageEngine } = require("../tools/FileStorageEngine");
const upload_presence = multer({ storage: addPresenceStorageEngine });
const { addReportStorageEngine } = require("../tools/FileStorageEngine");
const upload_report = multer({ storage: addReportStorageEngine });
const { addCertifStorageEngine } = require("../tools/FileStorageEngine");
const upload_certif = multer({ storage: addCertifStorageEngine });

const { cvStorageEngine } = require("../tools/FileStorageEngine");
const upload_cv_file = multer({ storage: cvStorageEngine });

router.patch('/add_demande_stage',upload_request.single('demande_stage'),DocsController.submitRequest);
router.patch('/add_convention',upload_convention.single('convention'),DocsController.submitConvention);
router.patch('/add_cin',upload_cin.single('cin'),DocsController.submitCIN);
router.patch('/add_lettre_affectation',upload_letter.single('lettre_affectation'),DocsController.submitLetter);
router.patch('/add_fiche_presence',upload_presence.single('fiche_presence'),DocsController.submitPresence);
router.patch('/add_rapport',upload_report.single('rapport'),DocsController.submitReport);
router.patch('/add_attestation',upload_certif.single('attestation'),DocsController.submitAttestaion);
router.patch('/add_cv',upload_cv_file.single("cv_file"),DocsController.submitCv);

router.patch('/delete_demande_stage/:id',DocsController.deleteRequest);
router.patch('/delete_convention/:id',DocsController.deleteConvention);
router.patch('/delete_cin/:id',DocsController.deleteCIN);
router.patch('/delete_lettre_affectation/:id',DocsController.deleteLetter);
router.patch('/delete_fiche_presence/:id',DocsController.deletePresence);
router.patch('/delete_rapport/:id',DocsController.deleteReport);
router.patch('/delete_attestation/:id',DocsController.deleteAttestaion);
router.patch('/delete_cv/:id',DocsController.deleteCv);



router.get('/getUserDocs/:id',DocsController.getUserDocs);


module.exports = router;
