const mongoose = require('mongoose');
const {LabStatus } = require('../models/enum');

const labSchema = new mongoose.Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email:{ type: String, required: true },
    departement:{ type: String, required: true },
    code:{type:String},
    type:{ type: String, required: true },
    backup:{ type: Boolean, required: true },
    ram:{ type: String, required: true },
    disk:{ type: String, required: true },
    processor:{ type: String, required: true },
    dhcp:{ type: Boolean, required: true},
    start:{type:Date , required: true},
    end:{type:Date , required: true},
  
    goals:{type:String , required: true},
  
    status:{type: String, enum: Object.values(LabStatus) ,default : LabStatus.PENDING},
    isMentorAccepted:{type:Boolean,default: false},
    isLabManagerAccepted:{type:Boolean,default: false},

    offer : { type: mongoose.Schema.Types.ObjectId, ref: "InternshipOffer" },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model('Lab', labSchema);
