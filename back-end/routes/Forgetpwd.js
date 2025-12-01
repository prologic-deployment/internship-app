
const express = require('express');
const { requestResetPassword, resetPassword } = require('../controllers/forgetpwdCtr');

const router = express.Router();

router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
