const NetworkRequest = require('../models/networkRequest');
const InternshipOffer = require('../models/InternshipOffer');
const nodemailer = require("nodemailer");
const User = require('../models/user');
const sendMail = require('../config/mailer');
const { ObjectId } = require("mongodb");

module.exports.addNetworkRequest = async function (req, res) {
    const body = { ...req.body };
    try {
        const userReq = await NetworkRequest.create(body)
        const sender = await User.findById(body.user).select("firstName lastName email");
        const date = new Date().toLocaleString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });

        const htmlEmail = `
                <table width="100%" cellpadding="0" cellspacing="0" style="background:whitesmoke;padding:30px;font-family:Arial,Helvetica,sans-serif;">
                <tr>
                    <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;border:1px solid #e6e6e6;">
                        
                        <!-- Header -->
                        <tr>
                        <td style="padding:20px 30px;border-bottom:1px solid #eee;">
                            <h2 style="margin:0;color:#2c3e50;font-size:22px;">
                            📡 Nouvelle demande réseau
                            </h2>
                        </td>
                        </tr>

                        <!-- Message -->
                        <tr>
                        <td style="padding:20px 30px;color:#555;font-size:14px;">
                            Une nouvelle demande réseau vient d'être soumise dans l'application.
                        </td>
                        </tr>

                        <!-- Info table -->
                        <tr>
                        <td style="padding:0 30px 20px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                            
                            <tr>
                                <td style="padding:10px;border-bottom:1px solid #eee;color:#555;">
                                <strong>Demandeur</strong>
                                </td>
                                <td style="padding:10px;border-bottom:1px solid #eee;color:#2c3e50;">
                                ${sender.firstName} ${sender.lastName}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:10px;border-bottom:1px solid #eee;color:#555;">
                                <strong>Email</strong>
                                </td>
                                <td style="padding:10px;border-bottom:1px solid #eee;color:#2c3e50;">
                                ${sender.email || "-"}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:10px;color:#555;">
                                <strong>Date</strong>
                                </td>
                                <td style="padding:10px;color:#2c3e50;">
                                ${date}
                                </td>
                            </tr>

                            </table>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="padding:20px 30px;border-top:1px solid #eee;color:#888;font-size:12px;">
                            Notification automatique – InternLink
                        </td>
                        </tr>
                    </table>

                    </td>
                </tr>
                </table>
                `;
        await sendMail(
            [
                // "firas.bouallegue@prologic.com.tn",
                // "nadine.tourkhani@prologic.com.tn",
                // "med_yassine.rezgui@prologic.com.tn"
                
                "zineddine.boubaker@prologic.com.tn"
            ],
            "New Network Request",
            htmlEmail
        );
        res.status(200).json({
            data: userReq,
            message: "Network request added successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
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