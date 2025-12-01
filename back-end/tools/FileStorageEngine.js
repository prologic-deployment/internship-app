
const multer = require("multer");

module.exports.cvStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
     if (
       file.mimetype === "application/pdf" 
     ) {
       cb(null, "./static/cv_files");
     } 
   },
   filename: (req, file, cb) => {
     const date = new Date();
     const day = date.getDate().toString().padStart(2, '0');
     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
     const year = date.getFullYear();
     const hours = date.getHours().toString().padStart(2, '0');
     const minutes = date.getMinutes().toString().padStart(2, '0');
     const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
     cb(null, formattedDate + "--" + file.originalname);
   },
 });



 
 module.exports.addRequestStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/request");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addConventionStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/convention");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addCinStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/cin");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addLetterStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/letter");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addPresenceStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/presence");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addReportStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/report");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});
 module.exports.addCertifStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"  || 
      file.mimetype === "image/png"  ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" 
    ) {
      cb(null, "./static/intern_ad_docs/attestation");
    } 
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
    cb(null, formattedDate + "--" + file.originalname);
  },
});