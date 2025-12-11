const { ObjectId } = require("mongodb");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ForgetPassword = require("../models/forgotPassword");
const Cv = require("../models/cv");
const Docs = require("../models/adDocs");
const nodemailer = require("nodemailer");



module.exports.signUp = async function (req, res, next) {
  const body = { ...req.body };
  
  try {
    hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    
    const user = await User.create({ ...body });
    const cv = await Cv.create({ user: user._id });
    const docs = await Docs.create({ user: user._id });
      /** Create a user with career object*/
      const _user = await User.findByIdAndUpdate(user._id, {
        cv: cv._id,
      });
      if (_user && cv && docs ) {
        res.status(200).json({
          message:
            "Signup request sent successfully , waiting for confirmation",
          user: _user,
        });
      }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.addIntern = async function (req, res, next) {
  const body = { ...req.body };
  try {
    hashedPassword = await bcrypt.hash("Pfe@2026", 10);
    body.password = hashedPassword;
    
    const user = await User.create({ ...body });
    const cv = await Cv.create({ user: user._id });
    const docs = await Docs.create({ user: user._id });

      const _user = await User.findByIdAndUpdate(user._id, {
        cv: cv._id,
        isEnabled : true,
        pfe_year : "2026"
      });
      if (_user && cv && docs ) {
        res.status(200).json({
          message:
            "Pre-selected intern created!",
          user: _user,
        });
      }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.login = async function (req, res, next) {
  try {
    let fetchedUser = await User.findOne({ email: req.body.email })
    if (!fetchedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!fetchedUser.isEnabled) {
      return res.status(403).json({
        message: "Unauthorised login. Waiting for register confirmation ",
      });
    }
    var result = await bcrypt.compare(req.body.password, fetchedUser.password);
    if (!result) {
      return res.status(500).json({ message: "Please check your password!" });
    }
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        id: fetchedUser._id,
      },
      "secret_this_should_be_longer",
      { expiresIn: "2h" }
    );
    return res.status(200).json({
      token: token,
      expiresIn: 3600,
      userName: fetchedUser.firstName + " "+ fetchedUser.lastName,
      image: fetchedUser.image,
      id: fetchedUser._id,
      role: fetchedUser.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.checkPassword = async function (req, res, next) {
  try {
    let fetchedUser = await User.findById(req.body.id);

    var result = await bcrypt.compare(req.body.password, fetchedUser.password);
    if (!result) {
      return res.status(500).json("wrong password");
    }
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json({ message: "problem in bycript" });
  }
};
module.exports.UpdateUser = async function (req, res, next) {
  const body = { ...req.body };
  if (req.file) {
    body.image = req.file.filename;
  }
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  
  User.findByIdAndUpdate(ID, { $set: body })
    .then((result) => {
      User.findById(ID)
        .populate("cv")
        .then((user) => {
          return res.status(200).json(user);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
module.exports.updatePass= async function (req,res,next){
  const userID = req.params.id;
  if (!ObjectId.isValid(userID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    // const salt = bcrypt.genSaltSync(10);
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  }catch (error) {
    return res.status(500).json(error.message);
  }
  try{
    const user = await User.findByIdAndUpdate(userID,{password:hashedPassword}) 
    res.status(200).json({message:"password updated successfuly"})
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
module.exports.forgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({email:req.body.email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const code = Math.floor(Math.random() * 111111);
    await ForgetPassword.findOneAndDelete({ email: req.body.email });
    let forgetPassword = new ForgetPassword({
      email: req.body.email,
      code: code,
    });
   
    //send mail to user
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notification@prologic.com.tn",
        pass: "*73zDw:41Hh!V",
      },
    });
    transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Prologic -- Verification code for changing password",
      text: "This is your verification code for changing password : " + code,
    });

    forgetPassword.save();
    return res.status(200).json(forgetPassword._id);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
module.exports.validateCode = async function (req, res) {
  try {
    let forgetPassword = await ForgetPassword.findOne({
      email: req.body.email,
    });
    if (forgetPassword.code === req.body.code) {
      return res.status(200).json({ id: forgetPassword._id , message : "Right code"});
    } else {
      return res.status(500).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.changePswdAutorisation = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const forgotPassword = await ForgetPassword.findById(ID);
    if (forgotPassword) {
      res.status(200).json("ok");
    } else {
      res.status(401).json("error");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
module.exports.changePswd = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  const body = { ...req.body };
  try {
    body.password = await bcrypt.hash(body.password, 10);
    await User.findOneAndUpdate({ email: body.email }, { $set: body });
    await ForgetPassword.findByIdAndDelete(ID);
    res.status(200).json("password updated");
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.confirmSignUp = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user =await User.findByIdAndUpdate(ID, { isEnabled: true,isDeleted: false });
    if (user) {
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
        to: user.email,
        subject: 'Prologic -- Register Request Accepted', // Fixed the quotation marks
        text: 'Your registration request has been accepted.',
        html: `
            <h1>Registration Request Accepted</h1>
            <p>Dear ${user.firstName} ${user.lastName},</p>
            <p>Your registration request has been accepted.</p>
            <p>Thank you for joining Prologic!</p>
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
    return res.status(200).json({ message: "User accepted" });
  } catch (error) {
    return res.status(500).json({ message: "Someting went wrong!"});
  }
 
};
module.exports.getAllUsers = async function (req, res) {
  try { 
    const interns = await User.find({isEnabled : true,isDeleted : false})
    .select("-password")
    .populate("cv")

    return res.status(200).json({ message:"Interns retrieved successfully",data : interns });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Someting went wrong"})
  }
};
module.exports.getSignUpRequests = async function (req, res) {
  User.find({ isEnabled: false,isDeleted:false })
    .select("-password")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ message: error }));
};
module.exports.deleteUser = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await User.findByIdAndUpdate(ID,{
      isEnabled: false,
      isDeleted: true,
     });
    if (user) {
           
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
      to: user.email,
      subject: 'Prologic -- Register Request Declined', // Fixed the quotation marks
      text: 'Unfortunately, your registration request has been declined.',
      html: `
          <h1>Registration Request Declined</h1>
          <p>Dear  ${user.firstName} ${user.lastName},</p>
          <p>Unfortunately, your registration request has been declined.</p>
          <p>If you have any questions or would like to discuss this further, please feel free to reach out.</p>
          <p>Thank you for your understanding!</p>
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
    res.status(200).json({ message: "User deleted succefully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.getUserById = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await User.findById(ID).populate("cv");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.getUserByEmail = async function(req,res){
  try {
    const user = await User.findOne({email:req.body.email})
    if (user) {
      res.status(200).json(user);
    }else{
      res.status(404).send({message:'No user found with this email'})
    }
  }
  catch (error) {
    res.status(500).json(error); 
  }
}



