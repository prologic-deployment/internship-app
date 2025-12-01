const NetworkRequest = require('../models/networkRequest');
const InternshipOffer = require('../models/InternshipOffer');
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

module.exports.addNetworkRequest = async function (req,res) {
    const body = {...req.body};
    try{
        const userReq = await NetworkRequest.create(body)
        // .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: userReq,
            message: "Network request added successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.getUserNetworkRequest = async function (req,res) {
    const userId = req.params.id
    try{
        const userReq = await NetworkRequest.findOne({user : userId})
        .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: userReq,
            message: "Network request retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.approveNetworkRequest = async function (req,res) {
    const reqId = req.params.id
    try{
        await NetworkRequest.findByIdAndUpdate(reqId,{
            ssid : req.body.ssid,
            login : req.body.login,
            password : req.body.password,
            status : "TREATED"
        })
        .populate({ path: "user", select: "-password -salt" })

        const updatedRequest = await NetworkRequest.findById(reqId)
        .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: updatedRequest,
            message: "Network request retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.getUserNetworkRequests = async function (req,res) {
    try{
        const userReq = await NetworkRequest.find()
        .populate({ path: "user", select: "-password -salt" })
        res.status(200).json({
            data: userReq,
            message: "Network requests retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}