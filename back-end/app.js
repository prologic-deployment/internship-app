// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");
const app = express();
const cors = require("cors")
const { init_stagiaire_account , init_stagiaire_docs, change_isSelected,change_AllPasswords,swap_cvFields} = require("./config/db_init")


// ============ imporing routes ================
const usersRoute = require("./routes/User");
const loginRoute = require("./routes/login");
const cvRoute = require("./routes/cv");
const offersRoute = require("./routes/InternshipOffer");
const quizRoutes = require('./routes/Quiz');
const questionRoutes = require('./routes/question');
const evaluationRoutes = require('./routes/Evaluaton');
const labRoute = require("./routes/Lab");
const taskRoute = require("./routes/Task");
const networkRoute = require("./routes/NetworkRequest");
const docsRoute = require("./routes/docs");

//========== configuration ============

app.use(cors())
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control");
  // intercept OPTIONS method
  if ('OPTIONS' == req.method){
    res.status(200).send();
  }
  else {
    next();
  }
app.use(bodyParser.urlencoded({ extended: true }));
})
//=========== connecting to database ==============
mongoose.set("strictQuery", true);
mongoose
    .connect( process.env.CONNECTION_STRING )
    .then(() => {
        console.log("Connected to database");
    })
  .catch((err) => console.log("error has been occured: ", err));

  // init_stagiaire_account();
  // init_stagiaire_docs();
  // change_isSelected();
   //change_AllPasswords();
//swap_cvFields();

// ========= configurring routes ==========
app.use("/images", express.static(path.join("./static/images")));
app.use("/certFiles", express.static(path.join("./static/certFiles")));
app.use("/cv_files", express.static(path.join("./static/cv_files")));
app.use("/request_files", express.static(path.join("./static/intern_ad_docs/request")));
app.use("/convention_files", express.static(path.join("./static/intern_ad_docs/convention")));
app.use("/cin_files", express.static(path.join("./static/intern_ad_docs/cin")));
app.use("/letter_files", express.static(path.join("./static/intern_ad_docs/letter")));
app.use("/presence_files", express.static(path.join("./static/intern_ad_docs/presence")));
app.use("/report_files", express.static(path.join("./static/intern_ad_docs/report")));
app.use("/intern_certificate", express.static(path.join("./static/intern_ad_docs/attestation")));

app.use("/api/users", usersRoute);
app.use("/api/login", loginRoute);
app.use("/api/cv", cvRoute);
app.use("/api/offers", offersRoute);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', evaluationRoutes);
app.use("/api/labs", labRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/network", networkRoute);
app.use("/api/docs", docsRoute);


// ======== exporting app ========

module.exports = app;
