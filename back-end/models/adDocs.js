const mongoose = require("mongoose");
const DocsSchema = mongoose.Schema({
    user :{type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    demande_stage:{type:String , default : ""},
    convention:{type:String , default : ""},
    cin:{type:String , default : ""},
    lettre_affectation:{type:String , default : ""},
    fiche_presence:{type:String , default : ""},
    rapport:{type:String , default : ""},
    attestation:{type:String , default : ""},
    cv_file:{type:String , default : ""},
});

module.exports = mongoose.model("Docs", DocsSchema);