const express =require('express');
const router =express.Router();
const MeetingRequestCtr = require("../controllers/meetingRequestCtr");

router.post("/addMeetingRequest", MeetingRequestCtr.addMeetingRequest);
router.get("/getUserMeetingRequest/:id", MeetingRequestCtr.getUserMeetingRequest);
router.get("/getUserMeetingRequests", MeetingRequestCtr.getUserMeetingRequests);
router.put("/approveMeetingRequest/:id", MeetingRequestCtr.approveMeetingRequest);
router.get("/getRequestById/:id", MeetingRequestCtr.getRequestById);
router.get("/getRequestByMentor/:id", MeetingRequestCtr.getRequestByMentor);
router.put("/AcceptMeeting/:id", MeetingRequestCtr.AcceptMeeting);

module.exports = router;
