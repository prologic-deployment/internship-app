
const Docs = require('../models/adDocs');

exports.submitRequest = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {demande_stage : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitConvention = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {convention : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitCIN = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {cin : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitLetter = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {lettre_affectation : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitPresence = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {fiche_presence : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitReport = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {rapport : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitAttestaion = async (req, res) => {
  const body = {...req.body}
  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {attestation : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submitCv = async (req, res) => {
  const body = {...req.body}


  try {
    const doc = await Docs.findOne({user: body.user}).populate('user')
    const docs = await Docs.findByIdAndUpdate(doc._id,
        {cv_file : req.file.filename},
    )
    res.status(200).json({
      message: 'Document submitted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {rapport : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deletePresence = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {fiche_presence : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {demande_stage : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteConvention = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {convention : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteCIN = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {cin : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteLetter = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {lettre_affectation : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteAttestaion = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {attestation : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteCv = async (req, res) => {
  const id = req.params.id;
  try {
    const docs = await Docs.findByIdAndUpdate(id,
        {cv_file : ""},
    )
    res.status(200).json({
      message: 'Document deleted successfully',
      data : docs
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.getUserDocs = async (req, res) => {
  const userId = req.params.id
  try {
    const doc = await Docs.find({user: userId}).populate('user')
    res.status(200).json({
      message: 'Documents retrieved successfully',
      data : doc
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};