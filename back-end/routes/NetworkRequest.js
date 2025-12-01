const express =require('express');
const router =express.Router();
const NetworkRequestCtr = require("../controllers/NetworkRequestCtr");

router.post("/addNetworkRequest", NetworkRequestCtr.addNetworkRequest);
router.get("/getUserNetworkRequest/:id", NetworkRequestCtr.getUserNetworkRequest);
router.get("/getUserNetworkRequests", NetworkRequestCtr.getUserNetworkRequests);
router.put("/approveNetworkRequest/:id", NetworkRequestCtr.approveNetworkRequest);

module.exports = router;
