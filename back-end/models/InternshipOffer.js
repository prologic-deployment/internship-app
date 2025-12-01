const { InternStatus } = require('./enum');

const mongoose = require('mongoose');

const InternshipOfferSchema = new mongoose.Schema({
    title: {type: String , required: true},
    description: {type :String , required: true},
    technologies: {type:String , required: true},
    encadrant: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    internsNumber:{type: Number , required: true},
    period :  {type : Number , required: true},
    expirationDate : {type: Date, required: true},
    departement: {type: String , required: true},
    userApplied : { 
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        status : {type: String, enum: Object.values(InternStatus)}, 
        applicationDate : {type: Date } 
    },
    progress : {type : Number, default: 0},
    team : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    closedAt :{ type:Date}
},
{ timestamps: true }
);

module.exports = mongoose.model('InternshipOffer', InternshipOfferSchema);
