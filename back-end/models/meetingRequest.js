const mongoose = require("mongoose");
const MeetingRequestSchema = mongoose.Schema({
    intern :{type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mentor :{type:String,required:true },
    title :{type:String,required:true },
    note :{type:String,required:true },
    start:{type:Date},
    end:{type:Date},
    status:{type:Boolean,default:false},
});

module.exports = mongoose.model("MeetingRequest", MeetingRequestSchema);