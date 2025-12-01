const VirtualizationEnv = require('../models/Lab');
const InternshipOffer = require('../models/InternshipOffer');
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

module.exports.getUserLabEnv = async function (req,res) {
    try{
        const userID = req.params.id;
        if (!ObjectId.isValid(userID)) {
            return res.status(404).json("ID is not valid");
        }
        const userReq = await VirtualizationEnv.find({applicant:userID})
        .populate({ path: "applicant", select: "-password -salt" })
        .populate({ path: "offer"})
        res.status(200).json({
            data: userReq,
            message: "User's virtualization environments retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.getAllInternLabs = async function (req,res) {
    try{
        const labs = await VirtualizationEnv.find()
        .populate({ path: "applicant", select: "-password -salt" })
        .populate({ path: "offer"})
        res.status(200).json({
            data: labs,
            message: "All virtualization environments retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}

module.exports.getVirtEnvById = async function (req, res, next) {
    try {
    const virtualizationEnv =await VirtualizationEnv.findById({
        _id: req.params.id
    }).populate({ path: "applicant", select: "firstName lastName image" });
        res.status(200).json(virtualizationEnv);
        
    }catch (error) {
        res.status(404).json("virtualization-Env not found" + error.message);
    }
}
module.exports.addVirtEnv = async function (req, res, next) {
    const generatedNumbers = new Set();
    do {
    code = Math.floor(1000 + Math.random() * 9000);
    } while (generatedNumbers.has(code));
    generatedNumbers.add(code);
    try {
        const virtualizationEnv = new VirtualizationEnv({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            code:"LAB"+code,
            departement:req.body.departement,
            type:req.body.type,
            backup:req.body.backup,
            ram:req.body.ram,
            disk:req.body.disk,
            processor:req.body.processor,
            dhcp:req.body.dhcp,
            start:req.body.start,
            end:req.body.end,
            goals:req.body.goals,
            applicant:req.body.applicant,
            offer:req.body.offer    
        })
        const v = await virtualizationEnv.save();


       const labManager = 'senda.benrjab@prologic.com.tn'
        if (v) {
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                  user: "notification@prologic.com.tn",
                  pass: "*73zDw:41Hh!V",
                },
                    });
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: labManager,
                        subject: 'Prologic -- Lab Booking', // Fixed the quotation marks
                        text: `You have a new lab request from ${req.body.firstName} ${req.body.lastName}.`,
                        html: `
                            <h1>New Lab Request</h1>
                            <p>You have a new lab request from <strong>${req.body.firstName} ${req.body.lastName}</strong>.</p>
                            <p><strong>You can check it out <a href="https://pte.prologic.com.tn:3200/#/dashboard/myRequest">here</a></strong></p>
                            <p>Thank you for using Prologic Technical Experience booking system.</p>
                            <p>Best regards</p>
                            <p>DEV TEAM</p>
                        `
                    };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
        res.status(200).json(v);
    
    }catch (error) {
        res.status(500).json({message :  error.message});
    }
}

module.exports.getMentorLabs = async function (req,res) {
    const mentorId = req.params.id;
    try{

        // const mentorOffer = await InternshipOffer.find({encadrant: mentorId})

        let internlabs = []
        const labs = await VirtualizationEnv.find({})
        .populate({ path: "applicant", select: "-password -salt" })
        .populate({ path: "offer" })
        for(let i=0 ; i<labs.length;i++){
            if(labs[i].offer.encadrant==mentorId){
                internlabs.push(labs[i])
            }
        }
        res.status(200).json({
            data: internlabs,
            message: "Your intern's virtualization environments retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.getLabsByOffer = async function (req,res) {
    const offerId = req.params.id;
    try{
        const labs = await VirtualizationEnv.find({
            offer: offerId,
            
        })
        .populate({ path: "applicant", select: "-password -salt" })
        .populate({ path: "offer" })
        
        res.status(200).json({
            data: labs,
            message: "Your intern's virtualization environments retrieved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}

module.exports.approveLab = async function (req,res) {
    const labId = req.params.id;
    try{
        const lab = await VirtualizationEnv.findByIdAndUpdate(labId, {
            isMentorAccepted: true
        }, { new: true })
        const updatedLab = await VirtualizationEnv.findById(labId)
        .populate('applicant', '-password -salt')
        .populate('offer')
        res.status(200).json({
            data: updatedLab,
            message: "Lab approved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.managerApproveLab = async function (req,res) {
    const labId = req.params.id;
    try{
        const lab = await VirtualizationEnv.findByIdAndUpdate(labId, {
            isMentorAccepted : true,
            isLabManagerAccepted: true,
            status : 'ACTIVE'
        }, { new: true })
        const updatedLab = await VirtualizationEnv.findById(labId)
        .populate('applicant', '-password -salt')
        .populate('offer')
        let isSameResources = true
        if(updatedLab.ram !=  req.body.ram || updatedLab.disk !=  req.body.disk || updatedLab.processor != req.body.processor){
            isSameResources = false;
        }   
        if (updatedLab) {
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: "notification@prologic.com.tn",
                  pass: "*73zDw:41Hh!V",
                  },
                });
              let mailOptions
              if(isSameResources){
                 mailOptions = {
                    from: process.env.EMAIL,
                    to: updatedLab.email,
                    subject: 'Prologic -- Lab Booking', // Fixed the quotation marks
                    text: `
                        The lab manager has just accepted your request. Your lab is now active.
                        
                        Your VM Credential is:
                        IP Address: ${req.body.ip}
                        IP Range: ${req.body.ip_start} <--------> ${req.body.ip_end}
                        Username: ${req.body.uname}
                        Password: ${req.body.password}
                        
                        VM Resources:
                        RAM (GB): ${req.body.ram}
                        DISK (GB): ${req.body.disk}
                        Processors: ${req.body.processor}
                    `,
                    html: `
                        <h1>Lab Booking Confirmation</h1>
                        <p>The lab manager has just accepted your request. Your lab is now active.</p>
                        <h2>Your VM Credentials:</h2>
                        <p><strong>IP Address:</strong> ${req.body.ip}</p>
                        <p><strong>IP Range:</strong> ${req.body.ip_start} <strong>to</strong> ${req.body.ip_end}</p>
                        <p><strong>Username:</strong> ${req.body.uname}</p>
                        <p><strong>Password:</strong> ${req.body.password}</p>
                        <h2>VM Resources:</h2>
                        <p><strong>RAM (GB):</strong> ${req.body.ram}</p>
                        <p><strong>DISK (GB):</strong> ${req.body.disk}</p>
                        <p><strong>Processors:</strong> ${req.body.processor}</p>
                    `
                };
                }else{
                     mailOptions = {
                        from: process.env.EMAIL,
                        to: updatedLab.email,
                        subject: 'Prologic -- Lab Booking', // Fixed the quotation marks
                        text: `
                            Your lab is now active, but we've had to reduce some of the resources you requested due to constraints.
                            Thank you for your understanding, and we apologize for any inconvenience caused.
                    
                            Your VM Credentials:
                            IP Address: ${req.body.ip}
                            IP Range: ${req.body.ip_start} <--------> ${req.body.ip_end}
                            Username: ${req.body.uname}
                            Password: ${req.body.password}
                    
                            VM Resources:
                            RAM (GB): ${req.body.ram}
                            DISK (GB): ${req.body.disk}
                            Processors: ${req.body.processor}
                        `,
                        html: `
                            <h1>Lab Booking Confirmation</h1>
                            <p>Your lab is now active, but we've had to reduce some of the resources you requested due to constraints.</p>
                            <p>Thank you for your understanding, and we apologize for any inconvenience caused.</p>
                            <h2>Your VM Credentials:</h2>
                            <p><strong>IP Address:</strong> ${req.body.ip}</p>
                            <p><strong>IP Range:</strong> ${req.body.ip_start} <strong>to</strong> ${req.body.ip_end}</p>
                            <p><strong>Username:</strong> ${req.body.uname}</p>
                            <p><strong>Password:</strong> ${req.body.password}</p>
                            <h2>VM Resources:</h2>
                            <p><strong>RAM (GB):</strong> ${req.body.ram}</p>
                            <p><strong>DISK (GB):</strong> ${req.body.disk}</p>
                            <p><strong>Processors:</strong> ${req.body.processor}</p>
                        `
                    };
            }
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    } 
        res.status(200).json({
            data: updatedLab,
            message: "Lab approved successfully"
        })
    }catch(error){
        res.status(500).json({message :  error.message});
    }
}
module.exports.declineLab = async function (req,res) {
    const labId = req.params.id;
    try{
        const lab = await VirtualizationEnv.findByIdAndUpdate(labId, {
            status: "DECLINED"
        }, { new: true })
        const updatedLab = await VirtualizationEnv.findById(labId)
        .populate('applicant', '-password -salt')
        .populate('offer')
        res.status(200).json({
            data: updatedLab,
            message: "Lab declined successfully"
        })
    }catch(error){
        res.status(500).json({message : error.message});
    }
}