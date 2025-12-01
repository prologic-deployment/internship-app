const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/TaskCtr');

router.get("", taskCtrl.findAll)
router.get("/:id", taskCtrl.findTaskById)
router.post("", taskCtrl.create)
router.get("/offer/:id", taskCtrl.findTasksByOffer)
router.delete("/:id", taskCtrl.delete)
router.put("/:id", taskCtrl.update)
router.put("/:id/progress", taskCtrl.changeTaskProgress)

router.get("/myTasks/:id", taskCtrl.findUserTasks)
module.exports = router;