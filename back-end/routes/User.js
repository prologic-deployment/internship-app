const express = require("express");
const router = express.Router();
const userCtr = require("../controllers/userController");
const multer = require("multer");
const { authMiddleware } = require("../middlewares/authMiddleware");

const { fileStorageEngine } = require("../tools/FileStorageEngine");
const upload = multer({ storage: fileStorageEngine });

const { cvStorageEngine } = require("../tools/FileStorageEngine");
const upload_cv_file = multer({ storage: cvStorageEngine });


router.post("/signup", userCtr.signUp);
router.get("/signup/requests",authMiddleware,userCtr.getSignUpRequests);
router.post("/confirm-signup/:id",authMiddleware,userCtr.confirmSignUp);
router.put("/update/:id",authMiddleware,upload.single("image"),userCtr.UpdateUser);
router.patch("/updatePass/:id",authMiddleware,userCtr.updatePass);
router.post("/forgotPassword", userCtr.forgotPassword);  //1
router.post("/checkpass",  userCtr.checkPassword);
router.post("/validateCode", userCtr.validateCode); //2
router.patch("/change-psw/:id", userCtr.changePswd); //3
router.get("/getall",authMiddleware, userCtr.getAllUsers);
router.post("/delete/:id",authMiddleware,userCtr.deleteUser);
router.get("/getUserByID/:id",authMiddleware,userCtr.getUserById);
router.post("/getUserByEmail/",userCtr.getUserByEmail);
router.get("/:id",authMiddleware,userCtr.getUserById);

module.exports = router;
