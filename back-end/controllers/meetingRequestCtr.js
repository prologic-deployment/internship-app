const MeetingRequest = require('../models/meetingRequest');
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const { startSession } = require('../models/InternshipOffer');

module.exports.addMeetingRequest = async function (req,res) {
    const body = {...req.body};
    try{
        const userReq = await MeetingRequest.create(body)
        res.status(200).json({
            data: userReq,
            error : false,
            message: "Meeting request sent successfully"
        })
    }catch(error){
        res.status(500).json({
            error : true,
            message : error.message
        });
    }
}
module.exports.getRequestById=async function(req, res, next) {
    try {
        const request = await MeetingRequest.findById(req.params.id).populate('intern');
        if (!request) return res.status(404).json({ message: 'Meeting Request not found' });
        res.status(200).json({message: 'Meeting Request successfully retrieved', data: request});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.AcceptMeeting=async function(req, res, next) {

    try {
        const eventExist = await MeetingRequest.find({
      start: { $gte: req.body.obj.start }, 
      end: { $lte: req.body.obj.end },     
      mentor: req.body.obj.mentor,       
    });
    
    if (eventExist.length > 0) {
      return res.status(500).json({error : true,message : "Dates already reserved, Please choose other dates."});
    } else {
        console.log(req.body)
            const request = await MeetingRequest.findByIdAndUpdate(
            req.params.id,
            {
                status : true, 
                start:req.body.obj.start,
                end:req.body.obj.end
            },{new:true})
        res.status(200).json({message: 'Meeting Request successfully updated', data: request});
    }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.getRequestByMentor=async function(req, res, next) {
    const mentorId = req.params.id
    try {
        const request = await MeetingRequest.find({mentor:mentorId}).populate('intern');
        res.status(200).json({message: 'Meeting Request successfully retrieved', data: request});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports.getUserMeetingRequest = async function (req,res) {
    const userId = req.params.id
    try{
        const userReq = await MeetingRequest.find({intern : userId})
        .populate({ path: "intern", select: "-password -salt" })
        res.status(200).json({
            data: userReq,
            message: "Meeting request retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.approveMeetingRequest = async function (req,res) {
    const reqId = req.params.id
    try{
        await MeetingRequest.findByIdAndUpdate(reqId,{
            status : true
        })
        // .populate({ path: "user", select: "-password -salt" })

        const updatedRequest = await MeetingRequest.findById(reqId)
        // .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: updatedRequest,
            message: "Meeting request retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.getUserMeetingRequests = async function (req,res) {
    try{
        const userReq = await MeetingRequest.find()
        .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: userReq,
            message: "Meeting requests retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}